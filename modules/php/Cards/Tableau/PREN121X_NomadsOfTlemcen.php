<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN121X_NomadsOfTlemcen extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN121X_NomadsOfTlemcen';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => ROOK,
      ],
    ];
    $this->empire = ARAGON;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate("The kingdom of Tlemcen (1236-1554), loosely ruled by Zayyanid sultans, harbored European trading centers (funduks) through which trans-saharan gold entered Europe."),
      clienttranslate("Genoese bills of exchange circulated there."),
    ];
    $this->name = clienttranslate("Nomads of Tlemcen");
    $this->oneShot = TRADE_SHIFT_TIMBUKTU_ONE_SHOT;
    $this->ops = [
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => clienttranslate("Gold traders"),
        'top' => 67,
        'left' => 4,
      ],
    ];
    $this->region = EAST;
  }
}
