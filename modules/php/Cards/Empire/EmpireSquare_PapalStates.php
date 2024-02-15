<?php

namespace PaxRenaissance\Cards\Empire;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Managers\Empires;
use const PaxRenaissance\OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

class EmpireSquare_PapalStates extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    $ageOfReformationVariant = Globals::getStartingMap() === OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;
    $religion = Empires::get(PAPAL_STATES)->getReligion();

    parent::__construct($row);
    $this->id = 'EmpireSquare_PapalStates';
    $this->empire = PAPAL_STATES;
    $this->flavorText = [
      KING => [
        clienttranslate('Julius II "The Warrior Pope" aggressively expanded the Papal States, and commissioned the rebuilding of the Saint Peter\'s Basilica and Michelangelo\'s Sistine Chapel decorations.')
      ],
      REPUBLIC => [
        clienttranslate('The Signoria, or ruling council of Florence, was composed of 8 leaders of the major guilds. They chose the gonfaloniere, or executor of the law. Lesser guilds and guild members made up advisory councils.')
      ],
    ];
    if ($ageOfReformationVariant && $religion === REFORMIST) {
      $this->flavorText[KING] = [
        clienttranslate("For his humanist compromises between Catholics and Protestants, King Henry VIII had Pole's entire family martyred."),
        clienttranslate("Fleeing England, Pole became the leading candidate in the long and contentious papal conclave of 1549-50.")
      ];
    } else if ($ageOfReformationVariant && $religion === ISLAMIC) {
      $this->flavorText[KING] = [
        clienttranslate("As the first non-ideological alliance between a Christian and Muslim state, the Franco-Ottoman alliance scandalized the West."),
        clienttranslate("Joint Christian-Muslim navies caused havoc during the Italian Wars.")
      ];
    }

    $this->name = [
      KING => clienttranslate('Pope Julius II'),
      REPUBLIC => clienttranslate('Florentine Signoria'),
    ];
    if ($ageOfReformationVariant && $religion === REFORMIST) {
      $this->name[KING] = clienttranslate("Pope Reginald Pole");
    } else if ($ageOfReformationVariant && $religion === ISLAMIC) {
      $this->name[KING] = clienttranslate("Suleiman the Magnificent");
    }
    $this->prestige = [
      KING => [CATHOLIC, PATRON],
      REPUBLIC => [LAW]
    ];
    if ($ageOfReformationVariant && $religion === REFORMIST) {
      $this->prestige[KING] = [REFORMIST];
    } else if ($ageOfReformationVariant && $religion === ISLAMIC) {
      $this->prestige[KING] = [ISLAMIC];
    }
    $this->ops = [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Holy League"),
          'top' => 81,
          'left' => 109.5,
        ],
      ],
      REPUBLIC => [
        [
          'id' => VOTE_OP_WEST,
          'flavorText' => clienttranslate("Balance of Power"),
          'top' => 68,
          'left' => 109.5,
        ],
        [
          'id' => COMMERCE_OP_WEST,
          'flavorText' => '',
          'top' => 106.5,
          'left' => 109.5,
        ],
      ]
    ];
    if ($ageOfReformationVariant && $religion === REFORMIST) {
      $this->ops[KING] = [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Justification by Faith"),
          'top' => 65,
          'left' => 110,
        ],
      ];
    } else if ($ageOfReformationVariant && $religion === ISLAMIC) {
      $this->ops[KING] = [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Italian Wars"),
          'top' => 64.5,
          'left' => 110,
        ],
      ];
    }
    $this->startLocation = 'throne_papalStates';
    $this->side = $this->getExtraData('side');
  }
}
