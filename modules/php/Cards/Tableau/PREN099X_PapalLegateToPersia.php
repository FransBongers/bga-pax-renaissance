<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN099X_PapalLegateToPersia extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN099X_PapalLegateToPersia';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => BISHOP,
      ]
    ];
    $this->empire = EAST;
    $this->flavorText = [
      clienttranslate("Mediated by the tireless Franciscan Fra Bologna, the Papacy and the Republic of Venice forged a military alliance with Uzun Hasan, leader of the vast Persian empire. Hasan's great offensive against the Ottomans was at first successsful, but stalled when western support did not arrive as expected."),
      clienttranslate("Uzun died in 1478, forcing Venice to sign an expensive peace treaty with the Ottomans.")
    ];
    $this->name = clienttranslate('Papal Legate to Persia');
    $this->oneShot = APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT;
    $this->ops = [
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate("Imperial & papal envoy"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate('Council of Florence'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [REFORMIST];
    $this->region = EAST;
  }
}
