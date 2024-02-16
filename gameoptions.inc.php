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
 * gameoptions.inc.php
 *
 * PaxRenaissance game options description
 * 
 * In this file, you can define your game options (= game variants).
 *   
 * Note: If your game has no variant, you don't have to modify this file.
 *
 * Note²: All options defined in this file should have a corresponding "game state labels"
 *        with the same ID (see "initGameStateLabels" in paxrenaissance.game.php)
 *
 * !! It is not a good idea to modify this file when a game is running !!
 *
 */

namespace PaxRenaissance;

require_once 'modules/php/gameoptions.inc.php';

$game_options = [
  OPTION_STARTING_MAP => [
    'name' => totranslate('Starting map'),
    'values' => [
      OPTION_STARTING_MAP_DEFAULT => [
        'name' => totranslate('Default'),
      ],
      OPTION_STARTING_MAP_1550_VARIANT => [
        'name' => totranslate('1550 Map Variant'),
        'tmdisplay' => totranslate('1550 Map'),
      ],
      OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT => [
        'name' => totranslate('Age of Reformation Promo Variant'),
        'tmdisplay' => totranslate('Age of Reformation Promo'),
      ],
    ]
  ],
  OPTION_OPEN_HANDS => [
    'name' => totranslate('Open hands'),
    'values' => [
      OPTION_OPEN_HANDS_ENABLED => [
        'name' => totranslate('Enabled'),
      ],
      OPTION_OPEN_HANDS_DISABLED => [
        'name' => totranslate('Disabled'),
        'tmdisplay' => totranslate('Hidden hands'),
      ],
    ]
  ],
  OPTION_FIRST_PLAYER_VARIANT => [
    'name' => totranslate('First Player Variant (unofficial)'),
    'values' => [
      OPTION_FIRST_PLAYER_VARIANT_DISABLED => [
        'name' => totranslate('Disabled'),
      ],
      OPTION_FIRST_PLAYER_VARIANT_ENABLED => [
        'name' => totranslate('Enabled'),
        'description' => totranslate('The player farthest along the West Trade Route will be the first player'),
        'tmdisplay' => totranslate('First Player Variant'),
      ],
    ],
    'displaycondition' => [
      [
          'type' => 'maxplayers',
          'value' => [2]
      ],
  ]
  ]
];

$game_preferences = [];
