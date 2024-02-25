<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN018_AlmeidaArmada extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN018_AlmeidaArmada';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = PORTUGAL;
    $this->flavorText = [
      clienttranslate('The program of the Portuguese admiral Alfonso de Albuquerque was to seize control of all maritime trade routes with the East. In 1513, Albuquerque "The Great" led an armada into the Red Sea and blockaded the Egyptian trade with India.'),
      clienttranslate('In desperation, the Mamluk Sultan made an alliance with his traditional rivals, the Ottomans.')
    ];
    $this->name = clienttranslate('Almeida Armada');
    $this->oneShot = TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate('Commerce raid'),
        'top' => 67,
        'left' => 111,
      ],
      [
        'id' => CORSAIR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Albuquerque the Great'),
        'top' => 106,
        'left' => 111,
      ]
    ];
    $this->prestige = [DISCOVERY];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_CONCESSIONS_2X_SPICE_ISLANDS_TRADE_FAIRS_2,
        'title' => clienttranslate("CAPE OF GOOD HOPE"),
        'text' => [
          'log' => clienttranslate("Your Concessions count 2x in Spice Island trade fairs."),
          'args' => [],
        ],
      ]
    ];
  }
}
