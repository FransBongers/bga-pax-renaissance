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
  OPTION_OPEN_HANDS => [
    'name' => totranslate('Open hands'),
    'values' => [
      OPTION_OPEN_HANDS_DISABLED => [
        'name' => totranslate('Disabled'),
      ],
      OPTION_OPEN_HANDS_ENABLED => [
        'name' => totranslate('Enabled'),
        'tmdisplay' => totranslate('Open hands'),
      ]
    ]
  ],
  OPTION_FIRST_PLAYER_VARIANT => [
    'name' => totranslate('First Player Variant'),
    'values' => [
      OPTION_FIRST_PLAYER_VARIANT_ENABLED => [
        'name' => totranslate('Enabled'),
        'description' => totranslate('The player farthest along the West Trade Route becomes the first player'),
        'tmdisplay' => totranslate('First Player Variant'),
      ],
      OPTION_FIRST_PLAYER_VARIANT_DISABLED => [
        'name' => totranslate('Disabled'),
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
