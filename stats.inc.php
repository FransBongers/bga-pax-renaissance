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
 * stats.inc.php
 *
 * PaxRenaissance game statistics description
 *
 */

require_once 'modules/php/constants.inc.php';

$stats_type = [

    // Statistics global to table
    "table" => [
        'turnCount' => [
            'id' => STAT_TURN_COUNT,
            'name' => totranslate('Number of turns'),
            'type' => 'int'
        ],
        'victoryType' => [
            'id' => STAT_VICTORY_TYPE,
            'name' => totranslate('The victory that ended the game'),
            'type' => 'int'
        ],
        'victoryBanker' => [
            'id' => STAT_VICTORY_BANKER,
            'name' => totranslate('The banker that won the game'),
            'type' => 'int'
        ],
        'fuggerInGame' => [
            'id' => STAT_FUGGER_IN_GAME,
            'name' => totranslate('Fugger was in the game'),
            'type' => 'int',
            "display" => 'limited'
        ],
        'mediciInGame' => [
            'id' => STAT_MEDICI_IN_GAME,
            'name' => totranslate('Medici was in the game'),
            'type' => 'int',
            "display" => 'limited'
        ],
        'coeurInGame' => [
            'id' => STAT_COEUR_IN_GAME,
            'name' => totranslate('Coeur was in the game'),
            'type' => 'int',
            "display" => 'limited'
        ],
        'marchionniInGame' => [
            'id' => STAT_MARCHIONNI_IN_GAME,
            'name' => totranslate('Marchionni was in the game'),
            'type' => 'int',
            "display" => 'limited'
        ],
        'startingBanker' => [
            'id' => STAT_STARTING_BANKER,
            'name' => totranslate('The banker that started the game'),
            'type' => 'int'
        ],
        'turnOrderWinner' => [
            'id' => STAT_TURN_ORDER_WINNER,
            'name' => totranslate('Place in turn order of the winner'),
            'type' => 'int'
        ],
    ],

    // Statistics existing for each player
    "player" => [
        'playerTurnCount' => [
            'id' => STAT_PLAYER_TURN_COUNT,
            'name' => totranslate('Number of turns'),
            'type' => 'int'
        ],
        'purchaseCardCount' => [
            'id' => STAT_ACTION_PURCHASE_CARD,
            'name' => totranslate('Cards purchased'),
            'type' => 'int'
        ],
        'playCardCount' => [
            'id' => STAT_ACTION_PLAY_CARD,
            'name' => totranslate('Cards played'),
            'type' => 'int'
        ],
        'sellActionCount' => [
            'id' => STAT_ACTION_SELL,
            'name' => totranslate('Sell actions'),
            'type' => 'int'
        ],
        'tradeFairEastActionCount' => [
            'id' => STAT_ACTION_TRADE_FAIR_EAST,
            'name' => totranslate('East trade fair actions'),
            'type' => 'int'
        ],
        'tradeFairWestActionCount' => [
            'id' => STAT_ACTION_TRADE_FAIR_WEST,
            'name' => totranslate('West trade fair actions'),
            'type' => 'int'
        ],
        'tableauOpsEastActionCount' => [
            'id' => STAT_ACTION_TABLEAU_OPS_EAST,
            'name' => totranslate('East tableau ops actions'),
            'type' => 'int'
        ],
        'tableauOpsWestActionCount' => [
            'id' => STAT_ACTION_TABLEAU_OPS_WEST,
            'name' => totranslate('West tableau ops actions'),
            'type' => 'int'
        ],
        'passActionCount' => [
            'id' => STAT_ACTION_PASS,
            'name' => totranslate('Pass actions'),
            'type' => 'int'
        ],
        'inquisitorOpCount' => [
            'id' => STAT_OP_INQUISITOR,
            'name' => totranslate('Inquisitor ops'),
            'type' => 'int'
        ],
        'commerceOpCount' => [
            'id' => STAT_OP_COMMERCE,
            'name' => totranslate('Commerce ops'),
            'type' => 'int'
        ],
        'beheadOpCount' => [
            'id' => STAT_OP_BEHEAD,
            'name' => totranslate('Behead ops'),
            'type' => 'int'
        ],
        'taxOpCount' => [
            'id' => STAT_OP_TAX,
            'name' => totranslate('Tax ops'),
            'type' => 'int'
        ],
        'repressOpCount' => [
            'id' => STAT_OP_REPRESS,
            'name' => totranslate('Repress ops'),
            'type' => 'int'
        ],
        'voteOpCount' => [
            'id' => STAT_OP_VOTE,
            'name' => totranslate('Vote ops'),
            'type' => 'int'
        ],
        'corsairOpCount' => [
            'id' => STAT_OP_CORSAIR,
            'name' => totranslate('Corsair ops'),
            'type' => 'int'
        ],
        'siegeOpCount' => [
            'id' => STAT_OP_SIEGE,
            'name' => totranslate('Siege ops'),
            'type' => 'int'
        ],
        'campaignOpCount' => [
            'id' => STAT_OP_CAMPAIGN,
            'name' => totranslate('Campaign ops'),
            'type' => 'int'
        ],
    ],

    'value_labels' => [
        STAT_VICTORY_TYPE => [
            STAT_VICTORY_TYPE_PATRON => totranslate("Patron Victory"),
            STAT_VICTORY_TYPE_GLOBALIZATION => totranslate("Globalization Victory"),
            STAT_VICTORY_TYPE_IMPERIAL => totranslate("Imperial Victory"),
            STAT_VICTORY_TYPE_RENAISSANCE => totranslate("Renaissance Victory"),
            STAT_VICTORY_TYPE_HOLY_CATHOLIC => totranslate("Catholic Holy Victory"),
            STAT_VICTORY_TYPE_HOLY_ISLAMIC => totranslate("Islamic Holy Victory"),
            STAT_VICTORY_TYPE_HOLY_REFORMIST => totranslate("Reformist Holy Victory"),
        ],
        STAT_VICTORY_BANKER => [
            STAT_BANKER_NO_BANK => totranslate("Draw"), 
            STAT_BANKER_FUGGER => totranslate("Fugger"),
            STAT_BANKER_MEDICI => totranslate("Medici"),
            STAT_BANKER_COEUR => totranslate("Coeur"),
            STAT_BANKER_MARCHIONNI => totranslate("Marchionni"),
        ],
        STAT_FUGGER_IN_GAME => [
            STAT_IN_GAME_NO => totranslate("No"),
            STAT_IN_GAME_YES => totranslate("Yes"),
        ],
        STAT_MEDICI_IN_GAME => [
            STAT_IN_GAME_NO => totranslate("No"),
            STAT_IN_GAME_YES => totranslate("Yes"),
        ],
        STAT_COEUR_IN_GAME => [
            STAT_IN_GAME_NO => totranslate("No"),
            STAT_IN_GAME_YES => totranslate("Yes"),
        ],
        STAT_MARCHIONNI_IN_GAME => [
            STAT_IN_GAME_NO => totranslate("No"),
            STAT_IN_GAME_YES => totranslate("Yes"),
        ],
        STAT_STARTING_BANKER => [
            STAT_BANKER_FUGGER => totranslate("Fugger"),
            STAT_BANKER_MEDICI => totranslate("Medici"),
            STAT_BANKER_COEUR => totranslate("Coeur"),
            STAT_BANKER_MARCHIONNI => totranslate("Marchionni"),
        ],
    ]
];
