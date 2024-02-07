<?php

namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Aragon extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Aragon';
    $this->empire = ARAGON;
    $this->flavorText = [
      KING => [
        clienttranslate('John II fought a long nasty civil was against his son, the prince of Viana. Eventually the royalists prevailed against the Catalan constitutionalists.')
      ],
      REPUBLIC => [
        clienttranslate('Founded by the University of Pavia, the Milanese Republic used mercenaries under Francesco Sforza to repel the forces of Venice. However, Sforza betrayed the Republic and seized Milan for himself.')
      ],
    ];
    $this->name = [
      KING => clienttranslate('John the Faithless King of Aragon'),
      REPUBLIC => clienttranslate('Golden Ambrosian Republic'),
    ];
    $this->ops = [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Navarrese Civil War"),
          'top' => 64.5,
          'left' => 110.5,
        ]
      ],
      REPUBLIC => [
        [
          'id' => VOTE_OP_WEST,
          'flavorText' => clienttranslate("University of Pavia"),
          'top' => 64.5,
          'left' => 109.5,
        ],
        [
          'id' => COMMERCE_OP_WEST,
          'flavorText' => '',
          'top' => 103,
          'left' => 109.5,
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
