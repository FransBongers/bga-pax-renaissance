<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN006_StarChamber extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN006_StarChamber';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => BISHOP,
      ]
    ];
    $this->empire = ENGLAND;
    $this->flavorText = [
      clienttranslate('This court of law was established by Henry VII to break the power of the landed gentry which had caused the War of the Roses. Court sessions were held in secret, with no indictments or witnesses.'),
      clienttranslate('Under the leadership of Cardinal Wolsey in the reign of King Henry VIII, the Star Chamber became a political tool, and a symbol of the abuse of royal power.')
    ];
    $this->name = clienttranslate('Star Chamber');
    $this->oneShot = REFORMATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate('Tower of London'),
        'top' => 67,
        'left' => 111,
      ],
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate('Royal Bounty'),
        'top' => 107.5,
        'left' => 111,
      ]
    ];
    $this->prestige = [REFORMIST];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_CORONATION_CAN_CLAIM_MARRIED_KINGS,
        'title' => clienttranslate('HENRY VIII'),
        'text' => [
          'log' => clienttranslate("Your coronation One-shot can claim Kings who are married or in an opponent's Tableau."),
          'args' => [],
        ],
      ]
    ];
  }
}
