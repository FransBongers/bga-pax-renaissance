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
 * states.inc.php
 *
 * PaxRenaissance game states description
 *
 */

/*
   Game state machine is a tool used to facilitate game developpement by doing common stuff that can be set up
   in a very easy way from this configuration file.

   Please check the BGA Studio presentation about game state to understand this, and associated documentation.

   Summary:

   States types:
   _ activeplayer: in this type of state, we expect some action from the active player.
   _ multipleactiveplayer: in this type of state, we expect some action from multiple players (the active players)
   _ game: this is an intermediary state where we don't expect any actions from players. Your game logic must decide what is the next game state.
   _ manager: special type for initial and final state

   Arguments of game states:
   _ name: the name of the GameState, in order you can recognize it on your own code.
   _ description: the description of the current game state is always displayed in the action status bar on
                  the top of the game. Most of the time this is useless for game state with "game" type.
   _ descriptionmyturn: the description of the current game state when it's your turn.
   _ type: defines the type of game states (activeplayer / multipleactiveplayer / game / manager)
   _ action: name of the method to call when this game state become the current game state. Usually, the
             action method is prefixed by "st" (ex: "stMyGameStateName").
   _ possibleactions: array that specify possible player actions on this step. It allows you to use "checkAction"
                      method on both client side (Javacript: this.checkAction) and server side (PHP: self::checkAction).
   _ transitions: the transitions are the possible paths to go from a game state to another. You must name
                  transitions in order to use transition names in "nextState" PHP method, and use IDs to
                  specify the next game state for each transition.
   _ args: name of the method to call to retrieve arguments for this gamestate. Arguments are sent to the
           client side to be used on "onEnteringState" or to set arguments in the gamestate description.
   _ updateGameProgression: when specified, the game progression is updated (=> call to your getGameProgression
                            method).
*/

//    !! It is not a good idea to modify this file when a game is running !!



require_once 'modules/php/constants.inc.php';


$machinestates = [

    // The initial state. Please do not modify.
    ST_GAME_SETUP => [
        "name" => ST_GAME_SETUP_NAME,
        "description" => "",
        "type" => "manager",
        "action" => "stGameSetup",
        "transitions" => ["" => ST_BEFORE_START_OF_TURN]
    ],

    ST_GENERIC_NEXT_PLAYER => [
        'name' => 'genericNextPlayer',
        'type' => 'game',
    ],

    // Note: ID=2 => your first state

    2 => array(
        "name" => "playerTurn",
        "description" => clienttranslate('${actplayer} may end the game'),
        "descriptionmyturn" => clienttranslate('${you} may end the game'),
        "type" => "activeplayer",
        "possibleactions" => array("playCard", "pass", "endGame"),
        "transitions" => array("playCard" => 2, "pass" => 2, "gameEnd" => ST_END_GAME)
    ),


    //////////////////////////////
    //  _____
    // |_   _|   _ _ __ _ __
    //   | || | | | '__| '_ \
    //   | || |_| | |  | | | |
    //   |_| \__,_|_|  |_| |_|
    //////////////////////////////

    ST_BEFORE_START_OF_TURN => [
        'name' => 'beforeStartOfTurn',
        'description' => '',
        'type' => 'game',
        'action' => 'stBeforeStartOfTurn',
        'updateGameProgression' => true,
    ],

    ST_TURNACTION => [
        'name' => 'turnAction',
        'description' => '',
        'type' => 'game',
        'action' => 'stTurnAction',
        'transitions' => [
            'done' => ST_CLEANUP,
        ],
        'updateGameProgression' => true,
    ],

    ////////////////////////////////////
    //  _____             _
    // | ____|_ __   __ _(_)_ __   ___
    // |  _| | '_ \ / _` | | '_ \ / _ \
    // | |___| | | | (_| | | | | |  __/
    // |_____|_| |_|\__, |_|_| |_|\___|
    //              |___/
    ////////////////////////////////////
    ST_RESOLVE_STACK => [
        'name' => 'resolveStack',
        'type' => 'game',
        'action' => 'stResolveStack',
        'transitions' => [],
    ],

    ST_CONFIRM_TURN => [
        'name' => 'confirmTurn',
        'description' => clienttranslate('${actplayer} must confirm or restart their turn'),
        'descriptionmyturn' => clienttranslate('${you} must confirm or restart your turn'),
        'type' => 'activeplayer',
        'args' => 'argsConfirmTurn',
        'action' => 'stConfirmTurn',
        'possibleactions' => ['actConfirmTurn', 'actRestart'],
        'transitions' => [
            // 'breakStart' => ST_BREAK_MULTIACTIVE
        ],
    ],

    ST_CONFIRM_PARTIAL_TURN => [
        'name' => 'confirmPartialTurn',
        'description' => clienttranslate('${actplayer} must confirm the switch of player'),
        'descriptionmyturn' => clienttranslate('${you} must confirm the switch of player. You will not be able to restart turn'),
        'type' => 'activeplayer',
        'args' => 'argsConfirmTurn',
        // 'action' => 'stConfirmPartialTurn',
        'possibleactions' => ['actConfirmPartialTurn', 'actRestart'],
    ],

    ////////////////////////////////////////////////////////////////////////////
    //     _   _                  _         _        _   _
    //    / \ | |_ ___  _ __ ___ (_) ___   / \   ___| |_(_) ___  _ __  ___
    //   / _ \| __/ _ \| '_ ` _ \| |/ __| / _ \ / __| __| |/ _ \| '_ \/ __|
    //  / ___ \ || (_) | | | | | | | (__ / ___ \ (__| |_| | (_) | | | \__ \
    // /_/   \_\__\___/|_| |_| |_|_|\___/_/   \_\___|\__|_|\___/|_| |_|___/
    //
    ////////////////////////////////////////////////////////////////////////////

    ST_FLIP_VICTORY_CARD => [
        'name' => 'flipVictoryCard',
        'description' => clienttranslate('${actplayer} must flip an inactive Victory Card'),
        'descriptionmyturn' => clienttranslate('${you} must flip an inactive Victory Card'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        // 'transitions' => [],
        'possibleactions' => ['actFlipVictoryCard', 'actRestart'],
    ],

    ST_PLAYER_ACTION => [
        'name' => 'playerAction',
        'description' => clienttranslate('${actplayer} may perform actions'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        // 'transitions' => [],
        'possibleactions' => ['actPlayerAction', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_PURCHASE_CARD => [
        'name' => 'purchaseCard',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_PLAY_CARD => [
        'name' => 'playCard',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_SELL_CARD => [
        'name' => 'sellCard',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_TRADE_FAIR => [
        'name' => 'tradeFair',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    
    ST_TRADE_FAIR_PROFIT_DISPERSAL => [
        'name' => 'tradeFairProfitDispersal',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_TRADE_FAIR_LEVY => [
        'name' => 'tradeFairLevy',
        'description' => clienttranslate('${actplayer} must choose a City to place a Levy'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        // 'transitions' => [],
        'possibleactions' => ['actTradeFairLevy'],
    ],

    ST_PLACE_AGENT=> [
        'name' => 'placeAgent',
        'description' => clienttranslate('${actplayer} may place agent'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actPlaceAgent', 'pass'],
    ],

    ST_RESOLVE_PLACE_TOKEN => [
        'name' => 'resolvePlaceToken',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_SELECT_TOKEN => [
        'name' => 'selectToken',
        'description' => clienttranslate('${actplayer} must select a token'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actSelectToken', 'pass'],
    ],

    
    ST_BISHOP_DIET_OF_WORMS => [
        'name' => 'bishopDietOfWorms',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_BISHOP_PACIFICATION => [
        'name' => 'bishopPacification',
        'description' => clienttranslate('${actplayer} may choose a token to Kill'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actBishopPacification', 'pass'],
    ],

    ST_ANNOUNCE_ONE_SHOT => [
        'name' => 'announceOneShot',
        'description' => clienttranslate('${actplayer} must decide if One-shot occurs'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actAnnounceOneShot', 'pass'],
    ],

    ST_TRADE_SHIFT_ONE_SHOT => [
        'name' => 'tradeShiftOneShot',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_APOSTACY_ONE_SHOT => [
        'name' => 'apostacyOneShot',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_RESOLVE_DISCARD_CARD => [
        'name' => 'resolveDiscardCard',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_CLEANUP => [
        'name' => 'cleanup',
        'description' => '',
        'descriptionmyturn' => '',
        'action' => 'stAtomicAction',
        'type' => 'game',
    ],

    // // Generic state to change player
    // ST_CHANGE_ACTIVE_PLAYER => [
    //     'name' => ST_CHANGE_ACTIVE_PLAYER_NAME,
    //     'description' => '',
    //     'descriptionmyturn' => '',
    //     'type' => 'game',
    //     'action' => 'stChangeActivePlayer',
    // ],

    //////////////////////////////////////////////////////////////////
    //  _____           _    ___   __    ____
    // | ____|_ __   __| |  / _ \ / _|  / ___| __ _ _ __ ___   ___
    // |  _| | '_ \ / _` | | | | | |_  | |  _ / _` | '_ ` _ \ / _ \
    // | |___| | | | (_| | | |_| |  _| | |_| | (_| | | | | | |  __/
    // |_____|_| |_|\__,_|  \___/|_|    \____|\__,_|_| |_| |_|\___|
    //////////////////////////////////////////////////////////////////

    // Final state.
    // Please do not modify (and do not overload action/args methods).
    ST_END_GAME => [
        "name" => "gameEnd",
        "description" => clienttranslate("End of game"),
        "type" => "manager",
        "action" => "stGameEnd",
        "args" => "argGameEnd"
    ]

];
