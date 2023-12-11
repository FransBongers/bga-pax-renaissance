<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN087_SoninkeWangara extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN087_SoninkeWangara';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => ROOK,
      ]
    ];
    $this->empire = ARAGON;
    $this->flavorText = [
      clienttranslate("This Algerian kingdom was loosely ruled by Abu Abdallah IV of the Zayyanids, a Berber Zenata dynasty of nomadic Arabs. Their livelihood centered on the trans-saharan gold caravans from Taghaza and Timbuktu. The locations of the gold's source or trading centers was a guarded secret."),
      clienttranslate('The Zayyanids were vassals of the Hafsids, Marindis, Aragon, and the Ottomans.')
    ];
    $this->name = clienttranslate('Soninke Wangara');
    $this->oneShot = TRADE_SHIFT_TIMBUKTU_ONE_SHOT;
    $this->ops = [
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => clienttranslate('Gold traders'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = EAST;
  }
}
