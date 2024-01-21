<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN209P_BureauOfBarbarians extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN209P_BureauOfBarbarians';
    $this->ageOfReformationPromo = true;
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => BISHOP,
      ],
    ];
    $this->empire = EAST;
    $this->flavorText = [
      clienttranslate('Officially part of the Byzantine Imperial postal service, the Bureau of Barbarians dealt with various barbarian nations including with espionage, translation, communication and correspondence.'),
    ];
    $this->name = clienttranslate("Bureau of Barbarians");
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate('"Hunting Accident"'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate("Postal spy network"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => REPRESS_OP_ROOK,
        'flavorText' => clienttranslate("Purge of Andronikos"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = EAST;
    $this->specialAbilities = [
      [
        'id' => SA_BEHEAD_EAST_CARD_WITH_BISHOP_ONLY,
        'title' => clienttranslate('DISINFORMATION:'),
        'text' => [
          'log' => clienttranslate("This card's behead Op can only be used on any east card with a Bishop Token."),
          'args' => [],
        ],
      ]
    ];
  }
}
