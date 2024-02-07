<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN003_GrandInquisitor extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN003_GrandInquisitor';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => BISHOP,
      ]
    ];
    $this->empire = PORTUGAL;
    $this->flavorText = [
      clienttranslate('As cardinal, grand inquisitor, and regent, Ximénes de Cisneros was the most powerful person in Spain other than Isabella and Ferdinand. He forced the conversion of the Spanish Moors and sponsored the North African Crusades.'),
      clienttranslate('The Consejo Real, appointed by Isabella starting in 1480, had full judicial powers over the nobles, keeping them subordinate to the crown.'),
    ];
    $this->name = clienttranslate('Grand Inquisitor');
    $this->oneShot = CRUSADE_ONE_SHOT;
    $this->ops = [
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate('Auto-da-fé'),
        'top' => 66.5,
        'left' => 110,
      ],
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate('Consejo Real'),
        'top' => 106,
        'left' => 111,
      ],
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Alumbrados'),
        'top' => 146.5,
        'left' => 110,
      ]
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
  }
}
