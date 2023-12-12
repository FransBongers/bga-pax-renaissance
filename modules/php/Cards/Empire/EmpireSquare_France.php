<?php

namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_France extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_France';
    $this->empire = FRANCE;
    $this->name = [
      KING => clienttranslate('Louis XI the Spider House of Valois'),
      REPUBLIC => clienttranslate('States-General of Burgundy'),
    ];
    $this->ops = [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Centralized state"),
          'top' => 0,
          'left' => 0,
        ]
      ],
      REPUBLIC => [
        [
          'id' => COMMERCE_OP_WEST,
          'flavorText' => clienttranslate('Great Privilege'),
          'top' => 0,
          'left' => 0,
        ],
      ]
    ];
    $this->startLocation = 'throne_france';
    $this->side = $this->getExtraData('side');
  }
}
