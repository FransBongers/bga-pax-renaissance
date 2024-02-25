<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Managers\Players;

class PREN021_Conquistadors extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN021_Conquistadors';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ],
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ]
    ];
    $this->empire = PORTUGAL;
    $this->flavorText = [
      clienttranslate('In Spanish Cuba in 1519, Hernán Cortés funded an expedition of 500 men to the Mexican mainland.'),
      clienttranslate('There, he successfully pitted some native groups against others, using the local interpreter Malinche. In the Aztec capital, he took its emperor hostage and plundered its gold. The captured city was renamed Mexico City, later sacked during a native revolt.')
    ];
    $this->name = clienttranslate('Conquistadors');
    $this->oneShot = TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate('Council of the Indies'),
        'top' => 66.5,
        'left' => 111,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Castilian professionals'),
        'top' => 105.5,
        'left' => 111,
      ]
    ];
    $this->prestige = [DISCOVERY];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_SELL_FOR_4,
        'title' => clienttranslate('AZTEC GOLD'),
        'text' => [
          'log' => clienttranslate('Sell this card for 4 instead of 2 Florins.'),
          'args' => [],
        ],
      ]
    ];
  }

  public function getSellValue($player = null)
  {
    $player = $player === null ? Players::get() : $player;

    if ($this->isInTableau() && !$this->isSilenced($player)) {
      return 4;
    }
    return 2;
  }
}
