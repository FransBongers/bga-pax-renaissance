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
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate("The Oratory of Divine Love was a Catholic brotherhood formed in 1517 by the Papal Court. It became the philosophical basis for the Counter-Reformation."),
      clienttranslate("An early follower was the Roman mystic Saint Cajetan (above), who built hospitals and banks for the poor.")
    ];
    $this->name = clienttranslate('Oratory of Divine Love');
    $this->oneShot = APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT;
    $this->ops = [
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Papal Court'),
        'top' => 70,
        'left' => 111,
      ]
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_PERFORM_APOSTASY_AS_AN_ACTION,
        'title' => clienttranslate('COUNTER-REFORMATION'),
        'text' => [
          'log' => clienttranslate('As an action, may perform an apostasy between any 2 religions.'),
          'args' => [],
        ],
        'abilityAction' => true,
        'top' => 155,
        'left' => 108,
        'height' => 55,
        'width' => 36,
      ]
    ];
  }
}
