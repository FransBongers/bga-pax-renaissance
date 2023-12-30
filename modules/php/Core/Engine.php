<?php

namespace PaxRenaissance\Core;

use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\AtomicActions;
// use PaxRenaissance\Managers\Scores;
// use PaxRenaissance\Managers\ZooCards;
use PaxRenaissance\Helpers\Log;
use PaxRenaissance\Helpers\QueryBuilder;
use PaxRenaissance\Helpers\UserException;

/*
 * Engine: a class that allows to handle complex flow
 */

class Engine
{
  public static $tree = null;

  public function boot()
  {
    $t = Globals::getEngine();
    self::$tree = self::buildTree($t);
    self::ensureSeqRootNode();
  }

  /**
   * Save current tree into Globals table
   */

  public function save()
  {
    $t = self::$tree->toArray();
    Globals::setEngine($t);
  }

  /**
   * Ensure the root is a SEQ node to be able to insert easily in the current flow
   */
  protected function ensureSeqRootNode()
  {
    if (!self::$tree instanceof \PaxRenaissance\Core\Engine\SeqNode) {
      self::$tree = new \PaxRenaissance\Core\Engine\SeqNode([], [self::$tree]);
      self::save();
    }
  }

  /**
   * Setup the engine, given an array representing a tree
   * @param array $t
   */
  public function setup($t, $callback)
  {
    self::$tree = self::buildTree($t);
    self::save();
    Globals::setCallbackEngineResolved($callback);
    Globals::setEngineChoices(0);
    Log::enable(); // Enable log
    Log::startEngine();
  }

  /**
   * Convert an array into a tree
   * @param array $t
   */
  public static function buildTree($t)
  {
    $t['children'] = $t['children'] ?? [];
    $type = $t['type'] ?? (empty($t['children']) ? NODE_LEAF : NODE_SEQ);

    $children = [];
    foreach ($t['children'] as $child) {
      $children[] = self::buildTree($child);
    }

    $className = '\PaxRenaissance\Core\Engine\\' . ucfirst($type) . 'Node';
    unset($t['children']);
    return new $className($t, $children);
  }

  /**
   * Recursively compute the next unresolved node we are going to address
   */
  public function getNextUnresolved()
  {
    return self::$tree->getNextUnresolved();
  }

  /**
   * Proceed to next unresolved part of tree
   * // TODO: check $isUndo flag 
   */
  public function proceed($confirmedPartial = false, $isUndo = false)
  {
    $node = self::$tree->getNextUnresolved();
    // If there are no nodes to resolve we are done. Either transition to
    // confirm state of auto confirm if no choices were made by the player
    if ($node == null) {
      if (Globals::getEngineChoices() == 0) {
        self::confirm(); // No choices were made => auto confirm
      } else {
        // Confirm/restart
        Game::get()->gamestate->jumpToState(ST_CONFIRM_TURN);
      }
      return;
    }

    $oldPlayerId = Game::get()->getActivePlayerId();
    $playerId = $node->getPlayerId();

    // Confirm partial turn in case next unresolved node in tree
    // activates a different player and player has made choices
    if (
      $playerId != null &&
      $oldPlayerId != $playerId &&
      Globals::getEngineChoices() != 0 &&
      !$confirmedPartial
    ) {
      Game::get()->gamestate->jumpToState(ST_CONFIRM_PARTIAL_TURN);
      return;
    }

    $player = Players::get($playerId);
    // Jump to resolveStack state to ensure we can change active playerId
    if ($playerId != null && $oldPlayerId != $playerId) {
      Game::get()->gamestate->jumpToState(ST_RESOLVE_STACK);
      Game::get()->gamestate->changeActivePlayer($playerId);
    }

    if ($confirmedPartial) {
      Log::enable();
      Log::checkpoint();
      Globals::setEngineChoices(0);
    }

    self::proceedToState($node);
  }

  public function proceedToState($node)
  {
    $state = $node->getState();
    Game::get()->gamestate->jumpToState($state);
  }

  /**
   * Resolve the current unresolved node
   * @param array $args : store informations about the resolution (choices made by players)
   */
  public function resolve($args = [])
  {
    // Get current node
    $node = self::$tree->getNextUnresolved();
    // Resolve node
    $node->resolve($args);
    self::save();
  }

  /**
   * Resolve action : resolve the action of a leaf action node
   */
  public function resolveAction($args = [], $checkpoint = false, &$node = null)
  {
    if (is_null($node)) {
      $node = self::$tree->getNextUnresolved();
    }

    $node->resolveAction($args);
    if ($node->isResolvingParent()) {
      $node->getParent()->resolve([]);
    }


    self::save();

    if (!isset($args['automatic']) || $args['automatic'] === false) {
      Globals::incEngineChoices();
    }
    if ($checkpoint) {
      self::checkpoint();
    }
  }

  /**
   * Checkpoint for undo func functionality
   */
  public function checkpoint()
  {
    Globals::setEngineChoices(0);
    Log::checkpoint();
  }

  /**
   * Insert a new node at root level of the tree at the end of seq node
   */
  public function insertAtRoot($t, $last = true)
  {
    self::ensureSeqRootNode();
    $node = self::buildTree($t);
    if ($last) {
      self::$tree->pushChild($node);
    } else {
      self::$tree->unshiftChild($node);
    }
    self::save();
    return $node;
  }


  /**
   * insertAsChild: turn the node into a SEQ if needed, then insert the flow tree as a child
   */
  public static function insertAsChild($t, &$node = null)
  {
    if (is_null($t)) {
      return;
    }
    if (is_null($node)) {
      $node = self::$tree->getNextUnresolved();
    }

    // If the node is an action leaf, turn it into a SEQ node first
    if ($node->getType() == NODE_LEAF) {
      $newNode = $node->toArray();
      $newNode['type'] = NODE_SEQ;
      $node = $node->replace(self::buildTree($newNode));
    }

    // Push child
    $node->pushChild(self::buildTree($t));
    self::save();
  }

  /**
   * Confirm the full resolution of current flow
   */
  public function confirm()
  {
    $node = self::$tree->getNextUnresolved();
    // Are we done ?
    if ($node != null) {
      throw new \feException("You can't confirm an ongoing turn");
    }

    // Callback
    $callback = Globals::getCallbackEngineResolved();
    if (isset($callback['state'])) {
      Game::get()->gamestate->jumpToState($callback['state']);
    } elseif (isset($callback['order'])) {
      Game::get()->nextPlayerCustomOrder($callback['order']);
    } elseif (isset($callback['method'])) {
      $name = $callback['method'];
      Game::get()->$name();
    }
  }

  public function confirmPartialTurn()
  {
    $node = self::$tree->getNextUnresolved();

    // Are we done ?
    if ($node == null) {
      throw new \feException("You can't partial confirm an ended turn");
    }

    $oldPlayerId = Game::get()->getActivePlayerId();
    $playerId = $node->getPlayerId();

    if ($oldPlayerId == $playerId) {
      throw new \feException("You can't partial confirm for the same player");
    }

    // Clear log
    self::checkpoint();
    Engine::proceed(true);
  }

  /**
   * Restart the whole flow
   */
  public function restart()
  {
    Log::undoTurn();

    // Force to clear cached informations
    Globals::fetch();
    self::boot();
    self::proceed(false, true);
  }

  /**
   * Restart at a given step
   */
  public function undoToStep($stepId)
  {
    Log::undoToStep($stepId);

    // Force to clear cached informations
    Globals::fetch();
    self::boot();
    self::proceed(false, true);
  }

  /**
   * Clear all nodes related to the current active zombie player
   */
  public function clearZombieNodes($playerId)
  {
    self::$tree->clearZombieNodes($playerId);
  }

  /**
   * Get all resolved actions of given types
   */
  public function getResolvedActions($types)
  {
    return self::$tree->getResolvedActions($types);
  }

  /**
   * Get all unresolved actions of given types
   */
  public function getUnresolvedActions($types)
  {
    return self::$tree->getUnresolvedActions($types);
  }

  public function getLastResolvedAction($types)
  {
    $actions = self::getResolvedActions($types);
    return empty($actions) ? null : $actions[count($actions) - 1];
  }

  public static function insertExtraPlayerAction($player)
  {
    $freeActions = Engine::getUnresolvedActions([FREE_ACTION]);
    $node = $freeActions[count($freeActions) - 1];
    $node->insertBefore(new LeafNode([
      'action' => PLAYER_ACTION,
      'optional' => true,
      'playerId' => $player->getId(),
    ]));
  }
}
