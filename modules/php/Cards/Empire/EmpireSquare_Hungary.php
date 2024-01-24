<?php

namespace PaxRenaissance\Cards\Empire;

use PaxRenaissance\Core\Globals;
use const PaxRenaissance\OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

class EmpireSquare_Hungary extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    $ageOfReformationVariant = Globals::getStartingMap() === OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

    parent::__construct($row);
    $this->id = 'EmpireSquare_Hungary';
    $this->empire = HUNGARY;
    $this->flavorText = $ageOfReformationVariant ? [
      KING => [
        clienttranslate('Prince of Transylvania who became the third elected Hungarian king in 1576. By containing the Danzig rebellion and the invasion of Ivan the Terrible, he was one of the most successful monarchs of the Polish-Lithuanian Commonwealth.')
      ],
      REPUBLIC => [
        clienttranslate('The Polish-Lithuanian Commonwealth enacted legislative (sejm) checks upon monarchical power, as controlled by the nobility (szlachta).')
      ],
    ] : [
      KING => [
        clienttranslate('Mátyás Corvinus battled the Empire and Hungarian nobles to gain the crown. His "Black Army" stopped the Turk from overrunning Christendom. He patronized Renaissance artists including Leonardo.')
      ],
      REPUBLIC => [
        clienttranslate('The Polish-Lithuanian Commonwealth enacted legislative (sejm) checks upon monarchical power, as controlled by the nobility (szlachta).')
      ],
    ];
    $this->name = $ageOfReformationVariant ?
      [
        KING => clienttranslate('King Stephen Báthory'),
        REPUBLIC => clienttranslate('Union of Lublin')
      ] : [
        KING => clienttranslate('Mátyás Corvinus King of Hungary'),
        REPUBLIC => clienttranslate('Polish-Lithuanian Sejm')
      ];
    $this->ops = $ageOfReformationVariant ? [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Livonian War"),
          'top' => 0,
          'left' => 0,
        ],
      ],
      REPUBLIC => [
        [
          'id' => VOTE_OP_EAST,
          'flavorText' => clienttranslate("Free Elections"),
          'top' => 0,
          'left' => 0,
        ],
        [
          'id' => COMMERCE_OP_EAST,
          'flavorText' => '',
          'top' => 0,
          'left' => 0,
        ],
      ]
    ] : [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Black Army"),
          'top' => 0,
          'left' => 0,
        ],
      ],
      REPUBLIC => [
        [
          'id' => VOTE_OP_EAST,
          'flavorText' => clienttranslate("Mielnik Privilege"),
          'top' => 0,
          'left' => 0,
        ],
        [
          'id' => COMMERCE_OP_EAST,
          'flavorText' => '',
          'top' => 0,
          'left' => 0,
        ],
      ]
    ];
    $this->prestige = $ageOfReformationVariant ? [
      KING => [],
      REPUBLIC => [LAW],
    ] : [
      KING => [PATRON],
      REPUBLIC => [LAW],
    ];
    $this->startLocation = 'throne_hungary';
    $this->side = $this->getExtraData('side');
  }
}
