<?php

namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Portugal extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Portugal';
    $this->empire = PORTUGAL;
    $this->name = [
      KING => clienttranslate('Henry the Navigator'),
      REPUBLIC => clienttranslate('Cortes Generales of Castile'),
    ];
    $this->ops = [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Invention of the Caravel"),
          'top' => 0,
          'left' => 0,
        ],
      ],
      REPUBLIC => [
        [
          'id' => COMMERCE_OP_WEST,
          'flavorText' => clienttranslate('Fueros'),
          'top' => 0,
          'left' => 0,
        ],
      ]
    ];
    $this->prestige = [
      KING => [DISCOVERY],
      REPUBLIC => [DISCOVERY],
    ];
    $this->startLocation = 'throne_portugal';
    $this->side = $this->getExtraData('side');
  }
}
