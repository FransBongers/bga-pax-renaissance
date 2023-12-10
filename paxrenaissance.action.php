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

  public function endGame()
  {
    self::setAjaxMode();
    $result = $this->game->endGame();
    self::ajaxResponse();
  }

  public function restart()
  {
    self::setAjaxMode();
    $result = $this->game->restart();
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

  public function actFlipVictoryCard()
  {
    self::setAjaxMode();
    //  $action = self::getArg('action', AT_alphanum, true);
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actFlipVictoryCard', $args);
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
  
  public function actSelectToken()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actSelectToken', $args);
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

  public function actTableauOpRepress()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actTableauOpRepress', $args);
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

  public function actTradeFairLevy()
  {
    self::setAjaxMode();
    $args = self::getArg('args', AT_json, true);
    Utils::validateJSonAlphaNum($args, 'args');
    $this->game->actTakeAtomicAction('actTradeFairLevy', $args);
    self::ajaxResponse();
  }
}
