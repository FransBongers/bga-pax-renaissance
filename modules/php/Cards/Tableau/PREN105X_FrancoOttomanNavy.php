<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN105X_FrancoOttomanNavy extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN105X_FrancoOttomanNavy';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => PIRATE,
      ]
    ];
    $this->empire = ARAGON;
    $this->flavorText = [
      clienttranslate("When Francis I found himself surrounded by the Habsburg domains of Charles V, he allied with the Ottomans and performed joint operations with Hayreddin Barbarossa in the sieges of Corfu (1537) and of Nice (1548)."),
      clienttranslate("The Christian world was scandalized.")
    ];
    $this->name = clienttranslate('Franco-Ottoman Navy');
    $this->oneShot = TRADE_SHIFT_NOVGOROD_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Siege of Corfu (1537)"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => CORSAIR_OP_ISLAMIC,
        'flavorText' => clienttranslate('Barbarossa'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => CORSAIR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Franco-Habsburg War (1521-29)'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [DISCOVERY];
    $this->region = EAST;
  }
}
