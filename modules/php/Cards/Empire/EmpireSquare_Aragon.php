<?php

namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Aragon extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Aragon';
    $this->empire = ARAGON;
    $this->name = [
      KING => clienttranslate('John the Faithless King of Aragon'),
      REPUBLIC => clienttranslate('Golden Ambrosian Republic'),
    ];
    $this->ops = [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Navarrese Civil War"),
          'top' => 0,
          'left' => 0,
        ]
      ],
      REPUBLIC => [
        [
          'id' => VOTE_OP_WEST,
          'flavorText' => clienttranslate("University of Pavia"),
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
    $this->startLocation = 'throne_aragon';
    $this->side = $this->getExtraData('side');
  }
}
