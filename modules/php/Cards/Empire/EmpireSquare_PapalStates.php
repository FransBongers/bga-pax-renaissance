<?php

namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_PapalStates extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
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
    $this->name = [
      KING => clienttranslate('Pope Julius II'),
      REPUBLIC => clienttranslate('Florentine Signoria'),
    ];
    $this->prestige = [
      KING => [CATHOLIC, PATRON],
      REPUBLIC => [LAW]
    ];
    $this->ops = [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Holy League"),
          'top' => 0,
          'left' => 0,
        ],
      ],
      REPUBLIC => [
        [
          'id' => VOTE_OP_WEST,
          'flavorText' => clienttranslate("Balance of Power"),
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
    $this->startLocation = 'throne_papalStates';
    $this->side = $this->getExtraData('side');
  }
}
