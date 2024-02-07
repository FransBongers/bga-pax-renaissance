<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN015_HanseaticLeague extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN015_HanseaticLeague';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = FRANCE;
    $this->flavorText = [
      clienttranslate('The Hansa privateer Paúel Benecke commanded the Peter von Danzig (above), the first large vessel in the Baltic featuring edge-to-edge planking. During the Anglo-Hanseatic War, Benecke defeated the English fleet at Zween in 1468.'),
      clienttranslate('In 1473, he seized a Medici Galleon in the North Sea. The Medici challenged the legality of this in the papal court, but failed to get their cargo returned.')
    ];
    $this->name = clienttranslate('Hanseatic League');
    $this->oneShot = TRADE_SHIFT_NOVGOROD_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate('Commerce raid'),
        'top' => 67,
        'left' => 111,
      ],
      [
        'id' => CORSAIR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Peter von Danzig'),
        'top' => 106,
        'left' => 111,
      ],
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Hansa Guild'),
        'top' => 145.5,
        'left' => 110,
      ]
    ];
    $this->region = WEST;
  }
}
