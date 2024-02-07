<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN211P_UskokPirates extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN211P_UskokPirates';
    $this->ageOfReformationPromo = true;
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => PIRATE,
      ],
    ];
    $this->empire = OTTOMAN;
    $this->flavorText = [
      clienttranslate('Uskoks were irregular Croatian soldiers along the eastern Adriatic. They used swift galleys to fight a guerrilla war against the Sultans.'),
      clienttranslate('Although nominally accepting the sovereignty of the Habsburg Emperor Ferdinand I, when their salaries were not paid, the freebooting Uskoks were a law unto themselves. In addition to attacking Ottoman ships, they attacked Venetian merchantmen.'),
    ];
    $this->name = clienttranslate("Uskok Pirates");
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Hundred Years' Croatian-Ottoman War"),
        'top' => 45.5,
        'left' => 4.5,
      ],
      [
        'id' => CORSAIR_OP_REFORMIST,
        'flavorText' => clienttranslate("Petar Kružić"),
        'top' => 106.5,
        'left' => 4,
      ],
      [
        'id' => CORSAIR_OP_CATHOLIC,
        'flavorText' => clienttranslate("Petar Kružić"),
        'top' => 140.5,
        'left' => 2.5,
      ],
    ];
    $this->region = EAST;
  }
}
