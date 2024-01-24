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

    ST_FREE_ACTION => [
        'name' => 'freeAction',
        'description' => clienttranslate('${actplayer} may use free actions'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        // 'transitions' => [],
        'possibleactions' => ['actFreeAction', 'actPassOptionalAction', 'actRestart'],
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
        'possibleactions' => ['actTradeFairLevy', 'actRestart'],
    ],

    ST_PLACE_AGENT => [
        'name' => 'placeAgent',
        'description' => clienttranslate('${actplayer} may place agent'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actPlaceAgent', 'actPassOptionalAction', 'actRestart'],
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
        'possibleactions' => ['actSelectToken', 'actPassOptionalAction', 'actRestart'],
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
        'possibleactions' => ['actBishopPacification', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_BISHOP_SILENCE_CARD => [
        'name' => 'bishopSilenceCard',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_DISCARD_DOWN_TO_HAND_LIMT => [
        'name' => 'discardDownToHandLimit',
        'description' => clienttranslate('${actplayer} must discard cards from hand'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actDiscardDownToHandLimit', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_ANNOUNCE_ONE_SHOT => [
        'name' => 'announceOneShot',
        'description' => clienttranslate('${actplayer} must choose to perform One-shot'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actAnnounceOneShot', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_TRADE_SHIFT_ONE_SHOT => [
        'name' => 'tradeShiftOneShot',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_APOSTASY_ONE_SHOT => [
        'name' => 'apostasyOneShot',
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

    ST_BATTLE_LOCATION => [
        'name' => 'battleLocation',
        'description' => clienttranslate('${actplayer} must select empire to battle'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actBattleLocation', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_BATTLE_RESULT => [
        'name' => 'battleResult',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_BATTLE_CASUALTIES => [
        'name' => 'battleCasualties',
        'description' => clienttranslate('${actplayer} must select casualties'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actBattleCasualties', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_BATTLE_CHECK_BISHOP_AGENT => [
        'name' => 'battleCheckBishopAgent',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_BATTLE_CHECK_REGIME_CHANGE => [
        'name' => 'battleCheckRegimeChange',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_BATTLE_MAP_CHANGE_RELIGIOUS_WAR => [
        'name' => 'battleMapChangeReligiousWar',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_BATTLE_PLACE_ATTACKERS => [
        'name' => 'battlePlaceAttackers',
        'description' => clienttranslate('${actplayer} must place attackers'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actBattlePlaceAttackers', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_BATTLE_RECONFIGURE_CONSTANTINOPLE => [
        'name' => 'battleReconfigureContantinople',
        'description' => clienttranslate('${actplayer} may move Tokens within Constantinople'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actBattleReconfigureContantinople', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_REMOVE_TOKEN_FROM_CITY => [
        'name' => 'removeTokenFromCity',
        'description' => clienttranslate('${actplayer} must remove a Token'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actRemoveTokenFromCity', 'actPassOptionalAction', 'actRestart'],
    ],


    ST_REGIME_CHANGE_MOVE_EMPIRE_SQUARE => [
        'name' => 'regimeChangeMoveEmpireSquare',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_REGIME_CHANGE_EMANCIPATION => [
        'name' => 'regimeChangeEmancipation',
        'description' => clienttranslate('${actplayer} may move Repressed Tokens onto the Map'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actRegimeChangeEmancipation', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_CORONATION_ONE_SHOT => [
        'name' => 'coronationOneShot',
        'description' => clienttranslate('${actplayer} may select a suitor'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actCoronationOneShot', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_REGIME_CHANGE_GOLDEN_LIBERTY => [
        'name' => 'regimeChangeGoldenLiberty',
        'description' => clienttranslate('${actplayer} may create a Medieval state'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actRegimeChangeGoldenLiberty', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_TABLEAU_OPS_SELECT => [
        'name' => 'tableauOpsSelect',
        'description' => clienttranslate('${actplayer} may select ops'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actTableauOpsSelect', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_TABLEAU_OP_BEHEAD => [
        'name' => 'tableauOpBehead',
        'description' => clienttranslate('${actplayer} may behead'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actTableauOpBehead', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_TABLEAU_OP_CAMPAIGN => [
        'name' => 'tableauOpCampaign',
        'description' => clienttranslate('${actplayer} may Campaign'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actTableauOpCampaign', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_TABLEAU_OP_COMMERCE => [
        'name' => 'tableauOpCommerce',
        'description' => clienttranslate('${actplayer} may take one Florin'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actTableauOpCommerce', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_TABLEAU_OP_CORSAIR => [
        'name' => 'tableauOpCorsair',
        'description' => clienttranslate('${actplayer} may Corsair'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actTableauOpCorsair', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_TABLEAU_OP_INQUISITOR => [
        'name' => 'tableauOpInquisitor',
        'description' => clienttranslate('${actplayer} may move a Bishop'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actTableauOpInquisitor', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_TABLEAU_OP_REPRESS => [
        'name' => 'tableauOpRepress',
        'description' => clienttranslate('${actplayer} may Repress a Token'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actTableauOpRepress', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_TABLEAU_OP_SIEGE => [
        'name' => 'tableauOpSiege',
        'description' => clienttranslate('${actplayer} may Kill a Token'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actTableauOpSiege', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_TABLEAU_OP_TAX => [
        'name' => 'tableauOpTax',
        'description' => clienttranslate('${actplayer} may Tax'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actTableauOpTax', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_TABLEAU_OP_TAX_FLORINS_CHECK => [
        'name' => 'tableauOpTaxFlorinsCheck',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],


    ST_TABLEAU_OP_TAX_PAY_OR_REPRESS => [
        'name' => 'tableauOpTaxPayOrRepress',
        'description' => clienttranslate('${actplayer} must choose to pay or Repress'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actTableauOpTaxPayOrRepress', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_TABLEAU_OP_VOTE => [
        'name' => 'tableauOpVote',
        'description' => clienttranslate('${actplayer} may Vote'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actTableauOpVote', 'actPassOptionalAction', 'actRestart'],
    ],

    ST_PLACE_LEVY_AUTO_CHECK => [
        'name' => 'placeLevyAutoCheck',
        'description' => '',
        'type' => 'game',
        'action' => 'stAtomicAction',
        'transitions' => [],
    ],

    ST_PLACE_LEVY_SELECT => [
        'name' => 'placeLevySelectCity',
        'description' => clienttranslate('${actplayer} must choose a City to place a Levy'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        // 'transitions' => [],
        'possibleactions' => ['actPlaceLevySelectCity', 'actRestart'],
    ],

    ST_CLEANUP => [
        'name' => 'cleanup',
        'description' => '',
        'descriptionmyturn' => '',
        'action' => 'stAtomicAction',
        'type' => 'game',
    ],

    ST_DECLARE_VICTORY => array(
        "name" => "declareVictory",
        'description' => '',
        'descriptionmyturn' => '',
        'action' => 'stAtomicAction',
        "type" => "game",
    ),

    ST_PATRON_VICTORY => array(
        "name" => "patronVictory",
        'description' => '',
        'descriptionmyturn' => '',
        'action' => 'stAtomicAction',
        "type" => "game",
    ),

    ST_ABILITY_ACTION_USE => [
        'name' => 'abilityActionUse',
        'description' => '',
        'descriptionmyturn' => '',
        'action' => 'stAtomicAction',
        'type' => 'game',
    ],

    ST_ABILITY_ACTION_SELECT_APOSTASY => [
        'name' => 'abilityActionSelectApostasy',
        'description' => clienttranslate('${actplayer} must choose an apostasy to perform'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actAbilityActionSelectApostasy', 'actRestart'],
    ],


    ST_ABILITY_ACTION_SELECT_TRADE_FAIR => [
        'name' => 'abilityActionSelectTradeFair',
        'description' => clienttranslate('${actplayer} must select trade fair to perform'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actAbilityActionSelectTradeFair', 'actRestart'],
    ],

    ST_ABILITY_ACTION_LAUNCH_PEASANT_REVOLT => [
        'name' => 'abilityActionLaunchPeasantRevolt',
        'description' => '',
        'descriptionmyturn' => '',
        'action' => 'stAtomicAction',
        'type' => 'game',
    ],

    ST_ABILITY_OPPONENTS_PURPLE_OP => [
        'name' => 'abilityOpponentsPurpleOp',
        'description' => clienttranslate('${actplayer} may select a purple Op to perform'),
        'descriptionmyturn' => clienttranslate('${you}'),
        'type' => 'activeplayer',
        'args' => 'argsAtomicAction',
        'action' => 'stAtomicAction',
        'possibleactions' => ['actAbilityOpponentsPurpleOp', 'actRestart'],
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
