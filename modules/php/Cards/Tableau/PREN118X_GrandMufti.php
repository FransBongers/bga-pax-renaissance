<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN118X_GrandMufti extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN118X_GrandMufti';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => BISHOP,
      ],
    ];
    $this->empire = EAST;
    $this->flavorText = [
      clienttranslate("Although Sultan Süleyman is honored as the Lawgiver, he was the opposite. As ordained by Grand Mufti Ebussuud - supreme judge and highest official - the sharia ceased being religious Law applied to all, even the Sultan. Instead it became Kanun - decrees issues by the Sultan - and the judges became his bureaucrats."),
      clienttranslate('This gave Süleyman the freedom to ethnically cleanse the Yazidis.')
    ];
    $this->name = clienttranslate("Grand Mufti");
    $this->oneShot = JIHAD_ONE_SHOT;
    $this->ops = [
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate("Fatwās"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [ISLAMIC];
    $this->region = EAST;
    $this->specialAbilities = [
      [
        'id' => SA_BEHEAD_EAST_CARD_WITH_ISLAMIC_REFORMIST_BISHOP_ONLY,
        'title' => clienttranslate('GENOCIDE:'),
        'text' => [
          'log' => clienttranslate("The card's Op can only be used on any east card with a green or red Bishop token."),
          'args' => [],
        ],
      ]
    ];
  }
}
