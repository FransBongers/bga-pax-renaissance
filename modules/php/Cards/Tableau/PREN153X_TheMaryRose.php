<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN153X_TheMaryRose extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN153X_TheMaryRose';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => PIRATE,
      ],
    ];
    $this->empire = ENGLAND;
    $this->flavorText = [
      clienttranslate('Henry VIII inherited five royal warships from the shipbuilding program of his father Henry VII. He expanded this to 40 ships, including his favorite, the Mary Rose, a huge carrack launched in 1511. She was the first to use gunports, allowing her to fire a broadside.'),
      clienttranslate('She sunk suddenly in a battle against a large French invasion in 1545.'),
    ];
    $this->name = clienttranslate('The Mary Rose');
    $this->ops = [
      [
        'id' => REPRESS_OP_ROOK_KNIGHT,
        'flavorText' => clienttranslate('Henry VII bonds & recognisances'),
        'top' => 64.5,
        'left' => 111,
      ],
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate('Benevolences'),
        'top' => 106,
        'left' => 111,
      ],
      [
        'id' => CORSAIR_OP_REFORMIST,
        'flavorText' => clienttranslate('Anglo-Hansa Wars'),
        'top' => 145,
        'left' => 110,
      ],
    ];
    $this->prestige = [DISCOVERY];
    $this->region = WEST;
  }
}
