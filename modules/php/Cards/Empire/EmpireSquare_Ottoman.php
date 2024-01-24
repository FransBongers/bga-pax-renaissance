<?php

namespace PaxRenaissance\Cards\Empire;

use PaxRenaissance\Core\Globals;
use const PaxRenaissance\OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

class EmpireSquare_Ottoman extends \PaxRenaissance\Models\EmpireCard
{

  public function __construct($row)
  {
    $ageOfReformationVariant = Globals::getStartingMap() === OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

    parent::__construct($row);
    $this->id = 'EmpireSquare_Ottoman';
    $this->empire = OTTOMAN;
    $this->flavorText = $ageOfReformationVariant ?
      [
        KING => [
          clienttranslate('As the son of the last Byzantine ruler, David of Trebizond, the youthful Basil was executed on a pretense by the Sultan.'),
          clienttranslate('Had Constantinople not fallen, he might have become the next Basileus.')
        ],
        REPUBLIC => [
          clienttranslate('The senate of the Eastern Roman Empire was a continuation of the Roman senate of the 4th century. It declined in power until it disappeared in the 14th century.')
        ],
      ]
      : [
        KING => [
          clienttranslate('This 21-year sultan conquered Constantinople in 1453. So ended the Medieval Era, and the Byzantine Empire that had lasted nearly 1,500 years. In 1458-60 he expanded the Ottoman Empire into Morea.')
        ],
        REPUBLIC => [
          clienttranslate('The Ottoman millet system maintained separate legal courts accomodating Muslim Sharia, Christian Canon law and Jewish Halakha law. It granted important civil and judicial functions to the Patriarch of Constantinople.')
        ],
      ];
    $this->name = $ageOfReformationVariant ? [
      KING => clienttranslate('Basileus Basil Megas Komnenos'),
      REPUBLIC => clienttranslate('Byzantine Synkletos')
    ] : [
      KING => clienttranslate('Sultan Mehmed II the Conqueror'),
      REPUBLIC => clienttranslate('Ottoman Millet System')
    ];
    $this->ops = $ageOfReformationVariant ? [
      KING =>  [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Komnenian army"),
          'top' => 0,
          'left' => 0,
        ],
      ],
      REPUBLIC => []
    ] : [
      KING =>  [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Conquest of East Europe"),
          'top' => 0,
          'left' => 0,
        ],
      ],
      REPUBLIC => [
        [
          'id' => COMMERCE_OP_EAST,
          'flavorText' => clienttranslate('Tolerate dhimmis'),
          'top' => 0,
          'left' => 0,
        ],
      ]
    ];
    $this->prestige = [
      KING => [],
      REPUBLIC => [LAW],
    ];
    $this->startLocation = 'throne_ottoman';
    $this->side = $this->getExtraData('side');
  }
}
