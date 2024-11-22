<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN154X_EuropeanUnion extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN154X_EuropeanUnion';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => ROOK,
      ],
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate('The medieval concept of a world empire headed by the Emperor and the Pope was replaced by a new paradigm proposed in 1462 by George of Poděbrady, King of Bohemia. The vision was a multilateral agreement of equal Christian states, like an early EU.'),
      clienttranslate('The pope responded by excommunicating George and calling for a crusade against his Hussite Christians.'),
    ];
    $this->name = clienttranslate('European Union');
    $this->oneShot = TRADE_SHIFT_NOVGOROD_ONE_SHOT; 
    $this->ops = [
      [
        'id' => REPRESS_OP_ROOK,
        'flavorText' => clienttranslate('Zdeniek Lev, Supreme Burgrave of Prague'),
        'top' => 67,
        'left' => 111,
      ],
    ];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_DECLARE_IMPERIAL_COSTS_TWO_ACTIONS,
        'title' => '',
        'text' => [
          'log' => clienttranslate('Declaring Imperial Victory costs 2 actions (all players).'),
          'args' => [],
        ],
        'allPlayers' => true,
      ]
    ];
  }
}
