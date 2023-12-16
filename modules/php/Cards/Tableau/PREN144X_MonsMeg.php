<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN144X_MonsMeg extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN144X_MonsMeg';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => KNIGHT,
      ],
    ];
    $this->empire = ENGLAND;
    $this->flavorText = [
      clienttranslate("Mons Meg was the largest bombard outside the Ottoman Empire. In 1453 the Duke of Burgundy sent it as a gift to his nephew James II, King of Scots. He believed that Scottish intervention in the War of the Roses would help Burgundy."),
      clienttranslate('James used the 510mm gun to siege Scottish towns still occupied by the English. James was killed in the siege when his own cannon exploded.'),
    ];
    $this->name = clienttranslate('Mons Meg');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Black Douglas'),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = WEST;
  }
}
