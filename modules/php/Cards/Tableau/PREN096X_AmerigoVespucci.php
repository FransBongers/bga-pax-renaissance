<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN096X_AmerigoVespucci extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN096X_AmerigoVespucci';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = ARAGON;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate("In 1492, the Florentine banker Amerigo Vespucci took over the Medici bank in Cádiz in Castile. He acted as provisioner for the Columbus voyages and as navigator in several voyages to South America between 1499 and 1502."),
      clienttranslate('As chief navigator of Spain, he discovered a method to crudely reckon longitude. This demonstrated that Brazil and the West Indies were not the eastern outskirts of Asia, so the new world "America" was named after him.')
    ];
    $this->name = clienttranslate('Amerigo Vespucci');
    $this->oneShot = TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate('Council of the Indies'),
        'top' => 66.5,
        'left' => 111,
      ],
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate('Archbishop Rodríguez de Fonseca'),
        'top' => 106,
        'left' => 111,
      ]
    ];
    $this->prestige = [DISCOVERY];
    $this->region = WEST;
  }
}
