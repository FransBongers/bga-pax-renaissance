<?php

/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * PaxRenaissance implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on https://boardgamearena.com.
 * See http://en.doc.boardgamearena.com/Studio for more information.
 * -----
 * 
 * paxrenaissance.action.php
 *
 * PaxRenaissance main action entry point
 *
 *
 * In this file, you are describing all the methods that can be called from your
 * user interface logic (javascript).
 *       
 * If you define a method "myAction" here, then you can call it from your javascript code with:
 * this.ajaxcall( "/paxrenaissance/paxrenaissance/myAction.html", ...)
 *
 */

use PaxRenaissance\Helpers\Utils;


class action_paxrenaissance extends APP_GameAction
{
  // Constructor: please do not modify
  public function __default()
  {
    if (self::isArg('notifwindow')) {
      $this->view = "common_notifwindow";
      $this->viewArgs['table'] = self::getArg("table", AT_posint, true);
    } else {
      $this->view = "paxrenaissance_paxrenaissance";
      self::trace("Complete reinitialization of board game");
    }
  }


  /*************************
   **** GENERIC METHODS ****
   *************************/


  public function actPassOptionalAction()
  {
    self::setAjaxMode();
    $result = $this->game->actPassOptionalAction();
    self::ajaxResponse();
  }

  public function actRestart()
  {
    self::setAjaxMode();
    $this->game->actRestart();
    self::ajaxResponse();
  }

  public function actUndoToStep()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $stepId = $args['stepId'];
    $this->game->actUndoToStep($stepId);
    self::ajaxResponse();
  }

  public function actAbilityActionSelectApostasy()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actAbilityActionSelectApostasy', $args);
    self::ajaxResponse();
  }

  public function actAbilityActionSelectTradeFair()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actAbilityActionSelectTradeFair', $args);
    self::ajaxResponse();
  }

  public function actAbilityOpponentsPurpleOp()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actAbilityOpponentsPurpleOp', $args);
    self::ajaxResponse();
  }

  public function actAnnounceOneShot()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actAnnounceOneShot', $args);
    self::ajaxResponse();
  }

  public function actBattleCasualties()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actBattleCasualties', $args);
    self::ajaxResponse();
  }

  public function actBattlePlaceAttackers()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actBattlePlaceAttackers', $args);
    self::ajaxResponse();
  }

  public function actBattleReconfigureContantinople()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actBattleReconfigureContantinople', $args);
    self::ajaxResponse();
  }

  public function actBattleLocation()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actBattleLocation', $args);
    self::ajaxResponse();
  }

  public function actBishopPacification()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actBishopPacification', $args);
    self::ajaxResponse();
  }

  public function actConfirmTurn()
  {
    self::setAjaxMode();
    $this->game->actConfirmTurn();
    self::ajaxResponse();
  }

  public function actConfirmPartialTurn()
  {
    self::setAjaxMode();
    $this->game->actConfirmPartialTurn();
    self::ajaxResponse();
  }

  public function actCoronationOneShot()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actCoronationOneShot', $args);
    self::ajaxResponse();
  }

  public function actDiscardDownToHandLimit()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actDiscardDownToHandLimit', $args);
    self::ajaxResponse();
  }

  public function actFlipVictoryCard()
  {
    self::setAjaxMode();
    //  $action = self::getArg('action', AT_alphanum, true);
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actFlipVictoryCard', $args);
    self::ajaxResponse();
  }

  public function actFreeAction()
  {
    self::setAjaxMode();
    //  $action = self::getArg('action', AT_alphanum, true);
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actFreeAction', $args);
    self::ajaxResponse();
  }

  public function actPlaceAgent()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actPlaceAgent', $args);
    self::ajaxResponse();
  }

  public function actPlaceLevySelectCity()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actPlaceLevySelectCity', $args);
    self::ajaxResponse();
  }

  public function actPlayerAction()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actPlayerAction', $args);
    self::ajaxResponse();
  }

  public function actRegimeChangeEmancipation()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actRegimeChangeEmancipation', $args);
    self::ajaxResponse();
  }

  public function actRegimeChangeGoldenLiberty()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actRegimeChangeGoldenLiberty', $args);
    self::ajaxResponse();
  }

  public function actRemoveTokenFromCity()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actRemoveTokenFromCity', $args);
    self::ajaxResponse();
  }

  public function actSelectToken()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actSelectToken', $args);
    self::ajaxResponse();
  }

  public function actTableauOpBehead()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actTableauOpBehead', $args);
    self::ajaxResponse();
  }

  public function actTableauOpCampaign()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actTableauOpCampaign', $args);
    self::ajaxResponse();
  }

  public function actTableauOpCommerce()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actTableauOpCommerce', $args);
    self::ajaxResponse();
  }

  public function actTableauOpCorsair()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actTableauOpCorsair', $args);
    self::ajaxResponse();
  }

  public function actTableauOpInquisitor()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actTableauOpInquisitor', $args);
    self::ajaxResponse();
  }

  public function actTableauOpRepress()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actTableauOpRepress', $args);
    self::ajaxResponse();
  }

  public function actTableauOpSiege()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actTableauOpSiege', $args);
    self::ajaxResponse();
  }

  public function actTableauOpsSelect()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actTableauOpsSelect', $args);
    self::ajaxResponse();
  }

  public function actTableauOpTax()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actTableauOpTax', $args);
    self::ajaxResponse();
  }

  public function actTableauOpTaxPayOrRepress()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actTableauOpTaxPayOrRepress', $args);
    self::ajaxResponse();
  }

  public function actTableauOpVote()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actTableauOpVote', $args);
    self::ajaxResponse();
  }

  public function actTradeFairLevy()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actTradeFairLevy', $args);
    self::ajaxResponse();
  }
}
