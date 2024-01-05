<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN014_IndiaArmada extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN014_IndiaArmada';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = PORTUGAL;
    $this->flavorText = [
      clienttranslate('Vasco da Gama of Portugal was the first European to reach India by sea, linking Europe and Asia for the first time by an ocean trade route (1498).'),
      clienttranslate('The scale of trade realignment was on a scale that would be unequaled until the invention of the airplane.'),
    ];
    $this->name = clienttranslate('India Armada');
    $this->oneShot = TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT;
    $this->prestige = [DISCOVERY];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_CONCESSIONS_2X_SPICE_ISLANDS_TRADE_FAIRS_1,
        'title' => clienttranslate("CAPE OF GOOD HOPE:"),
        'text' => [
          'log' => clienttranslate("Your Concessions count 2x is Spice Island trade fairs."),
          'args' => [],
        ],
      ]
    ];
  }
}
