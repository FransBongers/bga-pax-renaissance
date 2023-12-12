<?php

namespace PaxRenaissance\Cards\Empire;

use PaxRenaissance\Core\Notifications;

class EmpireSquare_England extends \PaxRenaissance\Models\EmpireCard
{

  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_England';
    $this->empire = ENGLAND;
    $this->name = [
      KING => clienttranslate('King Edward IV House of York'),
      REPUBLIC => clienttranslate('English Parliament'),
    ];
    $this->ops = [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("War of the Roses"),
          'top' => 0,
          'left' => 0,
        ]
      ],
      REPUBLIC => [
        [
          'id' => VOTE_OP_WEST,
          'flavorText' => clienttranslate("House of Commons"),
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
      REPUBLIC => [LAW]
    ];
    $this->startLocation = 'throne_england';
    $this->side = $this->getExtraData('side');
  }
}
