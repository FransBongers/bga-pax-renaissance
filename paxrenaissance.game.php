<?php

/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * PaxRenaissance implementation : © <Your name here> <Your email address here>
 * 
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 * 
 * paxrenaissance.game.php
 *
 * This is the main file for your game logic.
 *
 * In this PHP file, you are going to defines the rules of the game.
 *
 */

$swdNamespaceAutoload = function ($class) {
    $classParts = explode('\\', $class);
    if ($classParts[0] == 'PaxRenaissance') {
        array_shift($classParts);
        $file = dirname(__FILE__) . '/modules/php/' . implode(DIRECTORY_SEPARATOR, $classParts) . '.php';
        if (file_exists($file)) {
            require_once $file;
        } else {
            die('Cannot find file : ' . $file);
        }
    }
};
spl_autoload_register($swdNamespaceAutoload, true, true);


require_once(APP_GAMEMODULE_PATH . 'module/table/table.game.php');

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Preferences;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Log;
use PaxRenaissance\Managers\Players;

class PaxRenaissance extends Table
{
    use PaxRenaissance\DebugTrait;
    use PaxRenaissance\States\DispatchActionTrait;
    use PaxRenaissance\States\PlayerActionTrait;

    public static $instance = null;
    function __construct()
    {
        // Your global variables labels:
        //  Here, you can assign labels to global variables you are using for this game.
        //  You can use any number of global variables with IDs between 10 and 99.
        //  If your game has options (variants), you also have to associate here a label to
        //  the corresponding ID in gameoptions.inc.php.
        // Note: afterwards, you can get/set the global variables with getGameStateValue/setGameStateInitialValue/setGameStateValue
        parent::__construct();
        self::$instance = $this;
        self::initGameStateLabels(array(
            'logging' => 10,
        ));
        Stats::checkExistence();
    }

    protected function getGameName()
    {
        // Used for translations and stuff. Please do not modify.
        return "paxrenaissance";
    }

    public function getGameOptionValue($optionId)
    {
        $query = new PaxRenaissance\Helpers\QueryBuilder('global', null, 'global_id');
        $val = $query
            ->where('global_id', $optionId)
            ->get()
            ->first();
        return is_null($val) ? null : $val['global_value'];
    }

 /*
        setupNewGame:
        
        This method is called only once, when a new game is launched.
        In this method, you must setup the game according to the game rules, so that
        the game is ready to be played.
    */
    protected function setupNewGame($players, $options = array())
    {
        Globals::setupNewGame($players, $options);
        Preferences::setupNewGame($players, $options);
        Players::setupNewGame($players, $options);
        Stats::checkExistence();

        $this->setGameStateInitialValue('logging', false);

        $this->activeNextPlayer();

        /************ End of the game initialization *****/
    }

    /*
        getAllDatas: 
    */
    protected function getAllDatas($pId = null)
    {
        $pId = $pId ?? Players::getCurrentId();

        $data = [
            'canceledNotifIds' => Log::getCanceledNotifIds(),
            'players' => Players::getUiData($pId),
        ];

        return $data;
    }

    /*
        getGameProgression:
        
        Compute and return the current game progression.
        The number returned must be an integer beween 0 (=the game just started) and
        100 (= the game is finished or almost finished).
    
        This method is called each time we are in a game state with the "updateGameProgression" property set to true 
        (see states.inc.php)
    */
    function getGameProgression()
    {
        // TODO: compute and return the game progression

        return 0;
    }

    public static function get()
    {
        return self::$instance;
    }


        /**
     * Generic state to handle change of active player in the middle of a transition
     */
    function stChangeActivePlayer()
    {
        $t = Globals::getChangeActivePlayer();
        $this->gamestate->changeActivePlayer($t['pId']);
        $this->gamestate->jumpToState($t['st']);
    }

    /**
     * $pId can be either playerId or player
     */
    function changeActivePlayerAndJumpTo($pId, $state)
    {
        // Should probably always clear logs here?
        if (Globals::getLogState() == -1) {
            Globals::setLogState($state);
            // Globals::setActionCount(0);
            Log::clearAll();
        }

        Globals::setChangeActivePlayer([
            'pId' => is_int($pId) ? $pId : $pId->getId(),
            'st' => $state,
        ]);
        $this->gamestate->jumpToState(ST_CHANGE_ACTIVE_PLAYER);
    }

    /**
     * $pId can be either playerId or player
     */
    function nextState($transition, $pId = null)
    {
        // gets current game state to check if it is game or player gamestate
        $state = $this->gamestate->state(true, false, true);
        $st = $state['transitions'][$transition];

        if (Globals::getLogState() == -1) {
            Globals::setLogState($st);
            Log::clearAll();
        }

        $pId = is_null($pId) || is_int($pId) ? $pId : $pId->getId();
        if (is_null($pId) || $pId == $this->getActivePlayerId()) {
            $this->gamestate->nextState($transition);
        } else {
            if ($state['type'] == 'game') {
                $this->gamestate->changeActivePlayer($pId);
                $this->gamestate->nextState($transition);
            } else {
                $this->changeActivePlayerAndJumpTo($pId, $st);
            }
        }
    }

    /////////////////////////////////////////////////////////////
    // Exposing protected methods, please use at your own risk //
    /////////////////////////////////////////////////////////////

    // Exposing protected method getCurrentPlayerId
    public static function getCurrentPId()
    {
        return self::getCurrentPlayerId();
    }

    // Exposing protected method translation
    public static function translate($text)
    {
        return self::_($text);
    }



    //////////////////////////////////////////////////////////////////////////////
    //////////// Zombie
    ////////////

    /*
        zombieTurn:
        
        This method is called each time it is the turn of a player who has quit the game (= "zombie" player).
        You can do whatever you want in order to make sure the turn of this player ends appropriately
        (ex: pass).
        
        Important: your zombie code will be called when the player leaves the game. This action is triggered
        from the main site and propagated to the gameserver from a server, not from a browser.
        As a consequence, there is no current player associated to this action. In your zombieTurn function,
        you must _never_ use getCurrentPlayerId() or getCurrentPlayerName(), otherwise it will fail with a "Not logged" error message. 
    */

    function zombieTurn($state, $active_player)
    {
        $statename = $state['name'];

        if ($state['type'] === "activeplayer") {
            switch ($statename) {
                default:
                    $this->gamestate->nextState("zombiePass");
                    break;
            }

            return;
        }

        if ($state['type'] === "multipleactiveplayer") {
            // Make sure player is in a non blocking status for role turn
            $this->gamestate->setPlayerNonMultiactive($active_player, '');

            return;
        }

        throw new feException("Zombie mode not supported at this game state: " . $statename);
    }

    ///////////////////////////////////////////////////////////////////////////////////:
    ////////// DB upgrade
    //////////

    /*
        upgradeTableDb:
        
        You don't have to care about this until your game has been published on BGA.
        Once your game is on BGA, this method is called everytime the system detects a game running with your old
        Database scheme.
        In this case, if you change your Database scheme, you just have to apply the needed changes in order to
        update the game database and allow the game to continue to run with your new version.
    
    */

    function upgradeTableDb($from_version)
    {
        // $from_version is the current version of this game database, in numerical form.
        // For example, if the game was running with a release of your game named "140430-1345",
        // $from_version is equal to 1404301345

        // Example:
        //        if( $from_version <= 1404301345 )
        //        {
        //            // ! important ! Use DBPREFIX_<table_name> for all tables
        //
        //            $sql = "ALTER TABLE DBPREFIX_xxxxxxx ....";
        //            self::applyDbUpgradeToAllDB( $sql );
        //        }
        //        if( $from_version <= 1405061421 )
        //        {
        //            // ! important ! Use DBPREFIX_<table_name> for all tables
        //
        //            $sql = "CREATE TABLE DBPREFIX_xxxxxxx ....";
        //            self::applyDbUpgradeToAllDB( $sql );
        //        }
        //        // Please add your future database scheme changes here
        //
        //


    }
}
