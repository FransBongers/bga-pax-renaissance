<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN108X_IsfendiyaridDynasty extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN108X_IsfendiyaridDynasty';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => PIRATE,
      ]
    ];
    $this->empire = BYZANTIUM;
    $this->flavorText = [
      clienttranslate("This Turkmen dynasty ruled the Beylik of Sinop on the southern coast of the Black Sea for over a century. When the fleet of Mehmed the Conqueror arrived in 1461, the city was fortified by 400 cannon manned by 2,000 artillerymen."),
      clienttranslate("Despite this, the Isfendiyarid Beylik, Kemâleddin Ismâil Bey, surrendered in return for a province in Thrace.")
    ];
    $this->name = clienttranslate('Isfendiyarid Dynasty');
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate("Commerce raid"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => CORSAIR_OP_ISLAMIC,
        'flavorText' => clienttranslate('Euxine pirates'),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = EAST;
  }
}
