<?php

namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Portugal extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Portugal';
    $this->empire = PORTUGAL;
    $this->flavorText = [
      KING => [
        clienttranslate('Henry of Portugal sponsored new ship designs, cartography, and the exploration of western Africa in search of new trade routes, thus initiating the Age of Discoveries.')
      ],
      REPUBLIC => [
        clienttranslate('The Castilian Parliament, composed of bourgeoisie and nobility, controlled Spanish finances. As powerful as she was, Queen Isabella had to first convince the Cortes to fund the voyage of Columbus.')
      ],
    ];
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
