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
    $this->expansionCard = true;
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
        'top' => 75,
        'left' => 4,
      ],
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate('Council of Florence'),
        'top' => 122,
        'left' => 4,
      ]
    ];
    $this->prestige = [REFORMIST];
    $this->region = EAST;
  }
}
