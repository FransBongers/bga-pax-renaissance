<?php

namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Hungary extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Hungary';
    $this->empire = HUNGARY;
    $this->flavorText = [
      KING => [
        clienttranslate('Mátyás Corvinus battled the Empire and Hungarian nobles to gain the crown. His "Black Army" stopped the Turk from overrunning Christendom. He patronized Renaissance artists including Leonardo.')
      ],
      REPUBLIC => [
        clienttranslate('The Polish-Lithuanian Commonwealth enacted legislative (sejm) checks upon monarchical power, as controlled by the nobility (szlachta).')
      ],
    ];
    $this->name = [
      KING => clienttranslate('Mátyás Corvinus King of Hungary'),
      REPUBLIC => clienttranslate('Polish-Lithuanian Sejm')
    ];
    $this->ops = [
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
    $this->prestige = [
      KING => [PATRON],
      REPUBLIC => [LAW],
    ];
    $this->startLocation = 'throne_hungary';
    $this->side = $this->getExtraData('side');
  }
}
