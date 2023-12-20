<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN051_Kingmaker extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN051_Kingmaker';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => ROOK,
      ],
      [
        'separator' => CATHOLIC,
        'type' => ROOK,
      ]
    ];
    $this->empire = ENGLAND;
    $this->flavorText = [
      clienttranslate("Richard Neville, Earl of Warwick, was the wealthiest and most powerful of the English noblemen and originally supported the Lancastrian King Henry VI. In a territorial dispute, he defected to become the Yorkist commander, installing Edward IV onto the throne."),
      clienttranslate('After yet another dispute, he deposed Edward in 1470 and restored Henry VI, but died in battle soon after.')
    ];
    $this->name = clienttranslate('Kingmaker');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_ROOK,
        'flavorText' => clienttranslate('Constable of Calais'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('War of the Roses'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = WEST;
  }
}
