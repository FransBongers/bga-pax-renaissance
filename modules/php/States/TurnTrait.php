<?php

namespace PaxRenaissance\States;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Log;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\ActionCards;
use PaxRenaissance\Managers\Meeples;
use PaxRenaissance\Managers\Scores;
use PaxRenaissance\Managers\AtomicActions;
use PaxRenaissance\Managers\ZooCards;

trait TurnTrait
{
  // function actOrderCards($cardIds)
  // {
  //   $player = Players::getCurrent();
  //   foreach ($cardIds as $i => $cardId) {
  //     $card = ZooCards::getSingle($cardId);
  //     if (is_null($card) || $card->isPlayed() || $card->getPId() != $player->getId()) {
  //       throw new \BgaVisibleSystemException("You can't reorder that card:" . $card->getId());
  //     }

  //     ZooCards::setState($cardId, $i);
  //   }
  // }

  /**
   * State function when starting a turn
   *  useful to intercept for some cards that happens at that moment
   */
  function stBeforeStartOfTurn()
  {
    // TODO: check end callback
    $this->initCustomDefaultTurnOrder('default', \ST_TURNACTION, ST_BEFORE_START_OF_TURN, true);
  }

  /**
   * Activate next player
   */
  function stTurnAction()
  {
    $player = Players::getActive();
    self::giveExtraTime($player->getId());

    // if (Globals::isEndTriggered() && Globals::getEndRemainingPlayers() == []) {
    //   $this->endOfGameInit();
    //   return;
    // }

    Stats::incTurns($player);
    $node = [
      'children' => [
        [
          'action' => PLAYER_ACTION,
          'pId' => $player->getId(),
        ],
      ],
    ];

    // Inserting leaf Action card
    Engine::setup($node, ['method' => 'stEndOfTurn']);
    Engine::proceed();
  }

  /*******************************
   ********************************
   ********** END OF TURN *********
   ********************************
   *******************************/

  /**
   * End of turn : replenish and check break
   */
  function stEndOfTurn()
  {
    // Globals::setUsedVenom(false);
    // Globals::setVenomPaid(false);
    // Globals::setVenomTriggered(false);
    // Globals::setEffectMap4(false);
    $player = Players::getActive();

    // // Solo mode: move one cube to the right
    // if (Globals::isSolo()) {
    //   $this->stEndOfSoloTurn();
    // }

    // // Replenish pool of cards
    // ZooCards::fillPool();
    // Players::checkEndOfGamePlayer($player);

    // if (Globals::isEndTriggered()) {
    //   $remaining = Globals::getEndRemainingPlayers();
    //   $remaining = array_diff($remaining, [$player->getId()]);
    //   Globals::setEndRemainingPlayers($remaining);
    // }

    // if (Globals::isMustBreak()) {
    //   Globals::setFirstPlayer(Players::getNextId(Players::getActiveId())); // for next start of order.
    //   Globals::setBreakPlayer(Players::getActiveId());
    //   Globals::setMustBreak(false);
    //   $this->endCustomOrder('labor');
    // } elseif (Globals::isEndTriggered() && Globals::getEndRemainingPlayers() == []) {
    //   $this->endOfGameInit();
    // } else {
      $this->nextPlayerCustomOrder('default');
    // }
  }

  function endOfGameInit()
  {
    // if (Globals::getEndFinalScoringDone() !== true) {
    //   // Trigger discard state
    //   Engine::setup(
    //     [
    //       'action' => DISCARD_SCORING,
    //       'pId' => 'all',
    //       'args' => ['current' => Players::getActive()->getId()],
    //     ],
    //     ''
    //   );
    //   Engine::proceed();
    // } else {
    //   // Goto scoring state
    //   $this->gamestate->jumpToState(\ST_PRE_END_OF_GAME);
    // }
    // return;
  }

  function stPreEndOfGame()
  {
    // Arcade first
    // $card = ZooCards::getSingle('S281_Arcade', false);
    // if (!is_null($card)) {
    //   $card->preScore();
    // }

    // foreach (Players::getAll() as $pId => $player) {
    //   foreach ($player->getPlayedCards(CARD_SPONSOR) as $cId => $card) {
    //     $card->score();
    //   }
    //   foreach ($player->getScoringHand() as $cId => $card) {
    //     $card->score();
    //   }
    // }

    // // Victory column last
    // $card = ZooCards::getSingle('S274_VictoryColumn', false);
    // if (!is_null($card)) {
    //   $card->postScore();
    // }

    // // Send final notif
    // foreach (Players::getAll() as $pId => $player) {
    //   // Make sure to call Players::get() because score was modified but it's cached in $player
    //   $score = $player->updateScore(true);
    // }

    // Log::clearUndoableStepNotifications(true);
    // if (Globals::isSolo() && Globals::getSoloChallenge() > 0) {
    //   // new setup for solo challenge
    //   $this->setupNextGame();
    // } else {
    //   Globals::setEnd(true);
    //   $this->gamestate->nextState('');
    // }
  }

  /*
  function stLaunchEndOfGame()
  {
    foreach (ZooCards::getAllCardsWithMethod('EndOfGame') as $card) {
      $card->onEndOfGame();
    }
    Globals::setTurn(15);
    Globals::setLiveScoring(true);
    Scores::update(true);
    Notifications::seed(Globals::getGameSeed());
    $this->gamestate->jumpToState(\ST_END_GAME);
  }
  */
}
