<?php

namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Ottoman extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Ottoman';
    $this->empire = OTTOMAN;
    $this->name = [
      KING => clienttranslate('Sultan Mehmed II the Conqueror'),
      REPUBLIC => clienttranslate('Ottoman Millet System')
    ];
    $this->ops = [
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
      KING => [ISLAMIC],
      REPUBLIC => [ISLAMIC],
    ];
    $this->startLocation = 'throne_ottoman';
    $this->side = $this->getExtraData('side');
  }
}
