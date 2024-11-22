<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN139X_FrenchPirates extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN139X_FrenchPirates';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => PIRATE,
      ],
    ];
    $this->empire = FRANCE;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate("The pirate Nicolò Griego bankrupted the Republic of Venice when he plundered the Venetian galleys headed to the 1485 Flanders trade fair."),
      clienttranslate("Among his crew was Cristoforo Colombo, who would make history 7 years later."),
      clienttranslate("French pirates also augmented an armada larger than the Spanish Armada that invaded England in 1545."),
    ];
    $this->name = clienttranslate('French Pirates');
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate('Commerce raid'),
        'top' => 66.5,
        'left' => 112,
      ],
      [
        'id' => CORSAIR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Solent landing'),
        'top' => 105.5,
        'left' => 112,
      ]
    ];
    $this->prestige = [DISCOVERY];
    $this->region = WEST;
  }
}
