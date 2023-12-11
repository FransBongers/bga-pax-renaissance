<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN028_TheBold extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN028_TheBold';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ],
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ],
    ];
    $this->empire = FRANCE;
    $this->flavorText = [
      clienttranslate('Charles the Bold, the ambitious Duke of Burgundy. To ally himself with England against his sworn enemy, Louis XI, he married Margaret of York. He led the Burgundian forces against rebellious Flanders cities, France, the Swiss, and the Empire.'),
      clienttranslate('Hie early death in battle disintegrated the Duchy of Burgundy, sparking 200 years of European wars over its lands.')
    ];
    $this->name = clienttranslate('The Bold');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate('Revolt of Liège'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('League of the Public Weal'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Golden Fleece'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = WEST;
  }
}
