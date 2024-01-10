<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN024_Gonfalonier extends \PaxRenaissance\Models\Cards\CondottiereCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN024_Gonfalonier';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ],
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ]
    ];
    $this->empire = PAPAL_STATES;
    $this->flavorText = [
      clienttranslate('Federigo da Montefeltro, count of Urbino. As gonfalonier (a position established by the Guelphs to keep the nobles in check), he fougnt for the Pope, Florence, Milan, and Naples, and never lost a war.'),
      clienttranslate('He used his mercenary profits to commission the construction of a great library in Urbino and sponsor the young Raphael.')
    ];
    $this->name = clienttranslate('Gonfalonier');
    $this->ops = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate('Anti-Ghibelline'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Condottieri'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Noble Order of the Garter'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [PATRON, LAW];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS,
        'title' => clienttranslate('Condottiere:'),
        'text' => [
          'log' => clienttranslate('Venice can hold 2 Tokens if its City icon is gold (see G4c).'),
          'args' => [],
        ],
      ]
    ];
  }
}
