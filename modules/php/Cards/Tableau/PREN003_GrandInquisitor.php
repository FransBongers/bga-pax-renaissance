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
        'religion' => CATHOLIC,
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
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate('Consejo Real'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Alumbrados'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
  }
}
