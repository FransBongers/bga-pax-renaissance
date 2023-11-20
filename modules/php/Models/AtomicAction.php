<?php
namespace PaxRenaissance\Models;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
// use PaxRenaissance\Managers\ZooCards;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Helpers\Log;
use PaxRenaissance\Helpers\FlowConvertor;

/*
 * Action: base class to handle atomic action
 */
class AtomicAction
{
  protected $ctx = null; // Contain ctx information : current node of flow tree
  protected $description = '';
  public function __construct($ctx)
  {
    $this->ctx = $ctx;
  }

  public function isDoable($player)
  {
    return true;
  }

  public function isOptional()
  {
    return false;
  }

  public function getPlayer()
  {
    $playerId = $this->ctx->getPlayerId() ?? Players::getActiveId();
    return Players::get($playerId);
  }

  public function getState()
  {
    return null;
  }

  public function resolveAction($args = [], $checkpoint = false)
  {
    Engine::resolveAction($args, $checkpoint, $this->ctx);
    Engine::proceed();
  }

  /**
   * Insert flow as child of current node
   */
  public function insertAsChild($flow)
  {
    Engine::insertAsChild($flow, $this->ctx);
  }

  /**
   * Adds new step to logs, so it can be undone per step
   * TODO: check byPassActiveCheck
   */
  public static function checkAction($action, $byPassActiveCheck = false)
  {
    if ($byPassActiveCheck) {
      Game::get()->gamestate->checkPossibleAction($action);
    } else {
      Game::get()->checkAction($action);
      $stepId = Log::step();
      Notifications::newUndoableStep(Players::getCurrent(), $stepId);
    }
  }

  public function getClassName()
  {
    $classname = get_class($this);
    if ($pos = strrpos($classname, '\\')) {
      return substr($classname, $pos + 1);
    }
    return $classname;
  }
}
