<?php

namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Mamluk extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Mamluk';
    $this->empire = MAMLUK;
    $this->name = [
      KING => clienttranslate("Qa'it Bay of the Burji Dynasty"),
      REPUBLIC => clienttranslate('Karaman Beylik')
    ];
    $this->ops = [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Mamluk slaves"),
          'top' => 0,
          'left' => 0,
        ],
      ],
      REPUBLIC => [
        [
          'id' => COMMERCE_OP_EAST,
          'flavorText' => clienttranslate('Western conspiracy'),
          'top' => 0,
          'left' => 0,
        ],
      ]
    ];
    $this->prestige = [
      KING => [PATRON],
      REPUBLIC => [ISLAMIC],
    ];
    $this->startLocation = 'throne_mamluk';
    $this->side = $this->getExtraData('side');
  }
}
