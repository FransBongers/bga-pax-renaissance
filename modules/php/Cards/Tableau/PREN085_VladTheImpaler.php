<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN085_VladTheImpaler extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN085_VladTheImpaler';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => ROOK,
      ],
      [
        'separator' => CATHOLIC,
        'type' => ROOK,
      ],
    ];
    $this->empire = HUNGARY;
    $this->flavorText = [
      clienttranslate('Vlad III of the House of Dracul, Prince of Wallachia, was a member of the Order of the Dragons.'),
      clienttranslate("Dracula led the Romanians to initial victories against the Ottoman incursions, impaling his victims in a forest of stakes. Many appalled Boyars (nobles) defected to the Ottoman side, led by Vlad's hated brother Radu."),
      clienttranslate('Vlad was betrayed and imprisoned in 1462.')
    ];
    $this->name = clienttranslate('Vlad the Impaler');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate("Impalement"),
        'top' => 66,
        'left' => 4,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Night Attack"),
        'top' => 105.5,
        'left' => 4,
      ],
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate("Order of the Dragon"),
        'top' => 146.5,
        'left' => 4,
      ],
    ];
    $this->region = EAST;
  }
}
