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
  	    if( self::isArg( 'notifwindow') )
  	    {
            $this->view = "common_notifwindow";
  	        $this->viewArgs['table'] = self::getArg( "table", AT_posint, true );
  	    }
  	    else
  	    {
            $this->view = "paxrenaissance_paxrenaissance";
            self::trace( "Complete reinitialization of board game" );
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

   public function actPlayerAction()
   {
     self::setAjaxMode();
    //  $action = self::getArg('action', AT_alphanum, true);
     $args = self::getArg('args', AT_json, true);
     Utils::validateJSonAlphaNum($args, 'args');
     $this->game->actTakeAtomicAction('actPlayerAction', $args);
     self::ajaxResponse();
   }

  }
  

