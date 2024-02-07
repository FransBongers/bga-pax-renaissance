<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN001_InquistionPope extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN001_InquistionPope';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => BISHOP,
      ]
    ];
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('When faced with a heretic, the papacy had two solutions: forced conversion or "auto-da-fé" (public burning).'),
      clienttranslate('Pope Innocent VIII preferred burning. In 1484 he issued a papal bull initiating the German inquisition against witchcraft and magicians.'),
      clienttranslate('He then confirmed Torquemada as the Grand Inquisitor of Spain, and funded a crusade against Waldensian heretics in France.'),
    ];
    $this->name = clienttranslate('Inquisition Pope');
    $this->oneShot = CRUSADE_ONE_SHOT;
    $this->ops = [
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate('Waldensian Persecutions'),
        'top' => 66.5,
        'left' => 111,
      ],
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Oratory of Divine Love'),
        'top' => 107,
        'left' => 111,
      ]
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_BEHEAD_WEST_CARD_WITH_CATHOLIC_REFORMIST_BISHOP_ONLY,
        'title' => clienttranslate('Holocaust:'),
        'text' => [
          'log' => clienttranslate("This cards's behead Op can only be used on any west card with a red or gold Bishop token."),
          'args' => [],
        ],
      ]
    ];
  }
}
