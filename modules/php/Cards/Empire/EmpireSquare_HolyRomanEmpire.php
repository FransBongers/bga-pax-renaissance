<?php

namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_HolyRomanEmpire extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_HolyRomanEmpire';
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      KING => [
        clienttranslate('Frederick III was a long-reigning Holy Roman Emperor from the mighty House of Habsburg. The "Holy" Emperors were crowned by the Pope, and (unlike centralized France) ruled a semiautonomous complex of fiefdoms.')
      ],
      REPUBLIC => [
        clienttranslate('The Imperial Estates used the Reichstag to gain control of their own affairs. The Emperor Maxmillian created the rival Aulic Court, with hand-picked catholics and protestants, to handle criminal and feudal cases.')
      ],
    ];
    $this->name = [
      KING => clienttranslate('Frederick III House of Habsburg'),
      REPUBLIC => clienttranslate('Reichstag Imperial Diet')
    ];
    $this->ops = [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Bohemian War"),
          'top' => 64.5,
          'left' => 110,
        ],
      ],
      REPUBLIC => [
        [
          'id' => VOTE_OP_WEST,
          'flavorText' => clienttranslate("Imperial reform"),
          'top' => 65.5,
          'left' => 110,
        ],
        [
          'id' => COMMERCE_OP_WEST,
          'flavorText' => '',
          'top' => 104,
          'left' => 110.5,
        ],
      ]
    ];
    $this->prestige = [
      KING => [],
      REPUBLIC => [LAW],
    ];
    $this->startLocation = 'throne_holyRomanEmpire';
    $this->side = $this->getExtraData('side');
  }
}
