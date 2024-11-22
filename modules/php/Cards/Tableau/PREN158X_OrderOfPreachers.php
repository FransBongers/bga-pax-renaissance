<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN158X_OrderOfPreachers extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN158X_OrderOfPreachers';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => BISHOP,
      ],
    ];
    $this->empire = WEST;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate('As Master of the Order of Preachers (Dominicans), Thomas Cajetan composed several works directed against Martin Luther and thus shaped the policy of the papal delegates in Germany.'),
    ];
    $this->name = clienttranslate('Order of Preachers');
    $this->oneShot = CRUSADE_ONE_SHOT;
    $this->ops = [
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Thomas Cajetan'),
        'top' => 68,
        'left' => 111,
      ],
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
  }
}
