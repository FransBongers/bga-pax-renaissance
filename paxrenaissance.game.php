<?php

/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * PaxRenaissance implementation : © Frans Bongers <fjmbongers@gmail.com>
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
            var_dump('Cannot find file : ' . $file);
        }
    }
};
spl_autoload_register($swdNamespaceAutoload, true, true);


require_once APP_GAMEMODULE_PATH . 'module/table/table.game.php';

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Preferences;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Log;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\MapBoard;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\PlayersExtra;
use PaxRenaissance\Managers\Tokens;

use const PaxRenaissance\OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

class PaxRenaissance extends Table
{
    use PaxRenaissance\DebugTrait;
    use PaxRenaissance\States\EngineTrait;
    use PaxRenaissance\States\TurnTrait;

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
        Engine::boot();
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
        // Globals::setFirstPlayer($this->getNextPlayerTable()[0]);
        Stats::checkExistence();

        Empires::setupNewGame($players, $options);
        Cards::setupNewGame($players, $options);
        Tokens::setupNewGame($players, $options);
        Market::setupNewGame($players, $options);


        $this->setGameStateInitialValue('logging', false);
        $this->activeNextPlayer();

        /************ End of the game initialization *****/
    }

    /*
        getAllDatas: 
    */
    public function getAllDatas($playerId = null)
    {
        $playerId = $playerId ?? Players::getCurrentId();

        $players = Players::getAll()->toArray();

        $data = [
            'canceledNotifIds' => Log::getCanceledNotifIds(),
            'customPlayerOrder' => Players::getPlayerOrder(),
            'empireSquares' => Cards::getAllEmpireSquares(),
            'gameMap' => MapBoard::getUiData(),
            'gameOptions' => [
                'ageOfReformationPromo' => Globals::getStartingMap() === OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT,
                'openHands' => Globals::getOpenHands(),
            ],
            'market' => Market::getUiData(),
            'players' => Players::getUiData($playerId),
            'staticData' => [
                'tableauCards' => Cards::getStaticData()
            ],
            'supremeReligion' => Cards::get('VictoryHoly')->getSupremeReligionCounts(),
            'victoryCounts' => [
                'concessions' => Cards::get('VictoryGlobalization')->getNumberOfConcessionsPerPlayer($players),
                'discoveryPrestige' => Cards::get('VictoryGlobalization')->getDiscoveryPrestigePerPlayer($players),
                'kings' => Cards::get('VictoryImperial')->getNumberOfKingsPerPlayer($players),
                'republics' => Cards::get('VictoryRenaissance')->getNumberOfRepublicsPerPlayer($players),
                'lawPrestige' => Cards::get('VictoryRenaissance')->getLawPrestigePerPlayer($players),
            ],
            'tokens' => Tokens::getUiData(),
            'victoryCards' => Cards::getVictoryCards(),
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
        /**
         * Progression is calculated as the number of cards that has left the decks since game start
         */

        $playerCount = Players::count();

        $cardsInDecksStartGame = 28 + 8 * $playerCount - 12;


        if (Globals::getExtendedGame()) {
            $cardsInDecksStartGame += 8;
        }

        $deckCount = Cards::countInLocation(Locations::deck(EAST)) + Cards::countInLocation(Locations::deck(WEST));

        $progression = round((1 - ($deckCount / $cardsInDecksStartGame)) * 100);

        return $progression;
    }

    public static function get()
    {
        return self::$instance;
    }

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ////////////   Custom Turn Order   ////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    public function initCustomTurnOrder($key, $order, $callback, $endCallback, $loop = false, $autoNext = true, $args = [])
    {
        $turnOrders = Globals::getCustomTurnOrders();
        $turnOrders[$key] = [
            'order' => $order ?? Players::getTurnOrder(),
            'index' => -1,
            'callback' => $callback,
            'args' => $args, // Useful mostly for auto card listeners
            'endCallback' => $endCallback,
            'loop' => $loop,
        ];
        Globals::setCustomTurnOrders($turnOrders);

        if ($autoNext) {
            $this->nextPlayerCustomOrder($key);
        }
    }

    public function initCustomDefaultTurnOrder($key, $callback, $endCallback, $loop = false, $autoNext = true)
    {
        $this->initCustomTurnOrder($key, null, $callback, $endCallback, $loop, $autoNext);
    }

    public function nextPlayerCustomOrder($key)
    {
        $turnOrders = Globals::getCustomTurnOrders();
        if (!isset($turnOrders[$key])) {
            throw new BgaVisibleSystemException('Asking for the next player of a custom turn order not initialized : ' . $key);
        }

        // Increase index and save
        $o = $turnOrders[$key];
        $i = $o['index'] + 1;
        if ($i == count($o['order']) && $o['loop']) {
            $i = 0;
        }
        $turnOrders[$key]['index'] = $i;
        Globals::setCustomTurnOrders($turnOrders);

        if ($i < count($o['order'])) {
            $this->gamestate->jumpToState(ST_GENERIC_NEXT_PLAYER);
            $this->gamestate->changeActivePlayer($o['order'][$i]);
            $this->jumpToOrCall($o['callback'], $o['args']);
        } else {
            $this->endCustomOrder($key);
        }
    }

    public function endCustomOrder($key)
    {
        $turnOrders = Globals::getCustomTurnOrders();
        if (!isset($turnOrders[$key])) {
            throw new BgaVisibleSystemException('Asking for ending a custom turn order not initialized : ' . $key);
        }

        $o = $turnOrders[$key];
        $turnOrders[$key]['index'] = count($o['order']);
        Globals::setCustomTurnOrders($turnOrders);
        $callback = $o['endCallback'];
        $this->jumpToOrCall($callback);
    }

    public function jumpToOrCall($mixed, $args = [])
    {
        if (is_int($mixed) && array_key_exists($mixed, $this->gamestate->states)) {
            $this->gamestate->jumpToState($mixed);
        } elseif (method_exists($this, $mixed)) {
            $method = $mixed;
            $this->$method($args);
        } else {
            throw new BgaVisibleSystemException('Failing to jumpToOrCall  : ' . $mixed);
        }
    }




    /////////////////////////////////////////////////////////////
    // Exposing protected methods, please use at your own risk //
    /////////////////////////////////////////////////////////////

    // Exposing protected method getCurrentPlayerId
    public function getCurrentPId()
    {
        return $this->getCurrentPlayerId();
    }

    // Exposing protected method translation
    public function translate($text)
    {
        return $this->_($text);
    }


    // .########..#######..##.....##.########..####.########
    // ......##..##.....##.###...###.##.....##..##..##......
    // .....##...##.....##.####.####.##.....##..##..##......
    // ....##....##.....##.##.###.##.########...##..######..
    // ...##.....##.....##.##.....##.##.....##..##..##......
    // ..##......##.....##.##.....##.##.....##..##..##......
    // .########..#######..##.....##.########..####.########
    /*
   * zombieTurn:
   *   This method is called each time it is the turn of a player who has quit the game (= "zombie" player).
   *   You can do whatever you want in order to make sure the turn of this player ends appropriately
   */
    public function zombieTurn($state, $activePlayer)
    {
        // $skipped = Globals::getSkippedPlayers();
        // if (!in_array((int) $activePlayer, $skipped)) {
        //   $skipped[] = (int) $activePlayer;
        //   Globals::setSkippedPlayers($skipped);
        // }

        $stateName = $state['name'];
        if ($state['type'] == 'activeplayer') {
            if ($stateName == 'confirmTurn') {
                $this->actConfirmTurn(true);
            } else if ($stateName == 'confirmPartialTurn') {
                $this->actConfirmPartialTurn(true);
            }
            // Clear all node of player
            else if (Engine::getNextUnresolved() != null) {
                Engine::clearZombieNodes($activePlayer);
                Engine::proceed();
            } else {
                // TODO: check if we need this
                $this->gamestate->nextState('zombiePass');
            }
        }
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
        // Notifications::log('upgradeDb', []);
        // Example:
        // if ($from_version <= 2312262027) {
        // $cards = Cards::getAllCardsInTableaux();
        // foreach ($cards as $card) {
        //     $suzerainId = $card->getExtraData('suzerainId');
        //     if ($suzerainId !== null) {
        //         $suzerain = Cards::get($suzerainId);
        //         if ($suzerain->getLocation() === $card->getLocation()) {
        //             Cards::move($card->getId(), Locations::vassals($suzerain->getEmpireId()));
        //         } else {
        //             Cards::move($card->getId(), DISCARD);
        //         }
        //     };
        //     $kingId = $card->getExtraData('kingId');
        //     if ($kingId !== null) {
        //         $king = Cards::get($kingId);
        //         if ($king->getLocation() === $card->getLocation()) {
        //             Cards::move($card->getId(), Locations::queens($king->getEmpireId()));
        //         } else {
        //             Cards::move($card->getId(), DISCARD);
        //         }
        //     };
        // }
        // }

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
