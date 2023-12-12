<?php

namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_HolyRomanEmpire extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_HolyRomanEmpire';
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->name = [
      KING => clienttranslate('Frederick III House of Habsburg'),
      REPUBLIC => clienttranslate('Reichstag Imperial Diet')
    ];
    $this->ops = [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Bohemian War"),
          'top' => 0,
          'left' => 0,
        ],
      ],
      REPUBLIC => [
        [
          'id' => VOTE_OP_WEST,
          'flavorText' => clienttranslate("Imperial reform"),
          'top' => 0,
          'left' => 0,
        ],
        [
          'id' => COMMERCE_OP_WEST,
          'flavorText' => '',
          'top' => 0,
          'left' => 0,
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
