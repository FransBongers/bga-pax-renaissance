<?php
namespace PaxRenaissance\States;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\Players;
// use PaxRenaissance\Managers\Meeples;
// use PaxRenaissance\Managers\Fences;
use PaxRenaissance\Managers\AtomicActions;
// use PaxRenaissance\Managers\ZooCards;
// use PaxRenaissance\Models\PlayerBoard;
// use PaxRenaissance\Actions\Effects\VenomPay;
// use PaxRenaissance\Actions\Animals;
use PaxRenaissance\Helpers\Log;

trait EngineTrait
{
  function addCommonArgs(&$args)
  {
    $args['previousEngineChoices'] = Globals::getEngineChoices();
    $args['previousSteps'] = Log::getUndoableSteps();
  }

  /**
   * Trying to get the atomic action corresponding to the state where the game is
   */
  function getCurrentAtomicAction()
  {
    $stateId = $this->gamestate->state_id();
    return AtomicActions::getActionOfState($stateId);
  }

  /**
   * Ask the corresponding atomic action for its args
   */
  function argsAtomicAction()
  {
    $player = Players::getActive();
    $action = $this->getCurrentAtomicAction();
    $node = Engine::getNextUnresolved();
    $args = AtomicActions::getArgs($action, $node);
    $args['automaticAction'] = AtomicActions::get($action, $node)->isAutomatic($player);
    $this->addCommonArgs($args);

    // $sourceId = $node->getSourceId() ?? null;
    // if (!isset($args['source']) && !is_null($sourceId)) {
    //   $args['sourceId'] = $sourceId;
    //   $args['source'] = ZooCards::get($sourceId)->getName();
    // }
    $source = $node->getSource() ?? null;
    if (!isset($args['source']) && !is_null($source)) {
      $args['source'] = $source;
    }

    return $args;
  }

  /**
   * Pass the argument of the action to the atomic action
   */
  function actTakeAtomicAction($actionName, $args)
  {
    self::checkAction($actionName);
    $action = $this->getCurrentAtomicAction();
    AtomicActions::takeAction($action, $actionName, $args, Engine::getNextUnresolved());
  }

  /**
   * To pass if the action is an optional one
   */
  function actPassOptionalAction($auto = false)
  {
    if ($auto) {
      $this->gamestate->checkPossibleAction('actPassOptionalAction');
    } else {
      self::checkAction('actPassOptionalAction');
    }

    $action = $this->getCurrentAtomicAction();
    AtomicActions::pass($action, Engine::getNextUnresolved());
  }

  /**
   * Pass the argument of the action to the atomic action
   */
  function stAtomicAction()
  {
    $action = $this->getCurrentAtomicAction();
    AtomicActions::stAction($action, Engine::getNextUnresolved());
  }

  /********************************
   ********************************
   ********** FLOW CHOICE *********
   ********************************
   ********************************/
  function argsResolveChoice()
  {
    $player = Players::getActive();
    $node = Engine::getNextUnresolved();

    $args = array_merge($node->getArgs() ?? [], [
      'choices' => Engine::getNextChoice($player),
    ]);
    if ($node instanceof \PaxRenaissance\Core\Engine\XorNode) {
      $args['xor'] = true;
    }
    $this->addCommonArgs($args, 'resolveChoice');
    return $args;
  }

  function actChooseAction($choiceId)
  {
    $player = Players::getActive();
    Engine::chooseNode($player, $choiceId);
  }

  public function stResolveStack()
  {
  }

  public function stResolveChoice()
  {
  }


  /*******************************
   ******* CONFIRM / RESTART ******
   ********************************/
  public function argsConfirmTurn()
  {
    $data = [
      'previousEngineChoices' => Globals::getEngineChoices(),
      'previousSteps' => Log::getUndoableSteps(),
      'automaticAction' => false,
    ];
    $this->addCommonArgs($data);
    return $data;
  }

  public function stConfirmTurn()
  {
    // Check user preference to bypass if DISABLED is picked
    // $pref = Players::getActive()->getPref(OPTION_CONFIRM);
    // if ($pref == OPTION_CONFIRM_DISABLED && !Players::getActive()->canUseMap(4)) {
    //   $this->actConfirmTurn(true);
    // }
  }

  public function actConfirmTurn($auto = false)
  {
    if (!$auto) {
      self::checkAction('actConfirmTurn');
    }
    Engine::confirm();
  }

  public function actConfirmPartialTurn($auto = false)
  {
    if (!$auto) {
      self::checkAction('actConfirmPartialTurn');
    }
    Engine::confirmPartialTurn();
  }

  public function actRestart()
  {
    self::checkAction('actRestart');
    if (Globals::getEngineChoices() < 1) {
      throw new \BgaVisibleSystemException('No choice to undo');
    }
    Engine::restart();
  }

  public function actUndoToStep($stepId)
  {
    self::checkAction('actRestart');
    Engine::undoToStep($stepId);
  }
}
