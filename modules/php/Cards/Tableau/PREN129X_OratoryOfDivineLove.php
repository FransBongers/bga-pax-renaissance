<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN129X_OratoryOfDivineLove extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN129X_OratoryOfDivineLove';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => BISHOP,
      ],
      [
        'separator' => CATHOLIC,
        'type' => BISHOP,
      ]
    ];
    $this->empire = PAPAL_STATES;
    $this->flavorText = [
      clienttranslate("The Oratory of Divine Love was a Catholic brotherhood formed in 1517 by the Papal Court. It became the philosophical basis for the Counter-Reformation."),
      clienttranslate("An early follower was the Roman mystic Saint Cajetan (above), who buils hospitals and banks for the poor.")
    ];
    $this->name = clienttranslate('Oratory of Divine Love');
    $this->oneShot = APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT;
    $this->ops = [
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Papal Court'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
  }
}
