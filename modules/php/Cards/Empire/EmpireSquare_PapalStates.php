<?php

namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_PapalStates extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_PapalStates';
    $this->empire = PAPAL_STATES;
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
