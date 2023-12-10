<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN082_DamascusCoffee extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN082_DamascusCoffee';
    $this->agents = [
      [
        'religion' => ISLAMIC,
        'type' => ROOK,
      ]
    ];
    $this->empire = MAMLUK;
    $this->flavorText = [
      clienttranslate('Janbirdi al-Ghazali, Viceroy in the Mamluk Sultanate, defected to the invading Ottomans and was rewarded with the governorship of Damascus by Selim.'),
      clienttranslate("He subjugated the local Turkmen nomads and collected tolls from the pilgrims. Trying to restore Mamluk rule, he declared himself independent ruler of Damascus, but was beheaded by Süleyman's armies in 1521.")
    ];
    $this->name = clienttranslate('Damascus Coffee');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("al-Ghazali Mamluk revolt"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => clienttranslate("Shams coffee house, first in the world"),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = EAST;
  }
}
