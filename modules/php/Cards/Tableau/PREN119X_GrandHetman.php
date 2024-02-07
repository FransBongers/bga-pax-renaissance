<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN119X_GrandHetman extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN119X_GrandHetman';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => ROOK,
      ],
    ];
    $this->empire = HUNGARY;
    $this->flavorText = [
      clienttranslate("The Grand Hetman was the military commander of the dynastic union between Poland and Lithuania."),
      clienttranslate('The first was Konstanty Ostrogski, a devout Orthodox who led many campaigns against Muscovy, from 1497 to 1517.'),
      clienttranslate('He is one of the many depicted in the Matejko painting depicting the 1525 Prussian Homage (above).')
    ];
    $this->name = clienttranslate("Grand Hetman");
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Military tax"),
        'top' => 66.5,
        'left' => 4,
      ],
      [
        'id' => REPRESS_OP_PAWN_ROOK,
        'flavorText' => clienttranslate("Laski's statute"),
        'top' => 106,
        'left' => 4,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Polish-Lithuanian commonwealth"),
        'top' => 145,
        'left' => 4,
      ],
    ];
    $this->prestige = [REFORMIST];
    $this->region = EAST;
  }
}
