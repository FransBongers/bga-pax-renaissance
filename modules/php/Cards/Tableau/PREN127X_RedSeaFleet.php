<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN127X_RedSeaFleet extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN127X_RedSeaFleet';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ],
    ];
    $this->empire = MAMLUK;
    $this->flavorText = [
      clienttranslate('In 1504, the Venetians sent Francesco Teldi, posing as a jewel buyer, as envoy to Cairo. He concluded a Venice-Mamluk alliance against the Portuguese, who had blockaded the Red Sea trade route.'),
      clienttranslate('In 1514 the Ottoman admiral Selman Reis also joined the Mamluks to break the blockade, and in 1525 did so by annexing Yemen and establishing a naval base there.'),
    ];
    $this->name = clienttranslate("Red Sea Fleet");
    $this->oneShot = TRADE_SHIFT_RED_SEA_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_ROOK,
        'flavorText' => clienttranslate("Al-Ghuri reprisals"),
        'top' => 66,
        'left' => 4,
      ],
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Al-Ghuri tax riots"),
        'top' => 105.5,
        'left' => 4,
      ],
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => clienttranslate("Red Sea trade"),
        'top' => 145.5,
        'left' => 4,
      ],
    ];
    $this->region = EAST;
    $this->specialAbilities = [
      [
        'id' => SA_DECLARE_GLOBALIZATION_COSTS_TWO_ACTIONS,
        'title' => '',
        'text' => [
          'log' => clienttranslate('Declaring globalization victory costs 2 actions (all players).'),
          'args' => [],
        ],
        'allPlayers' => true,
      ]
    ];
  }
}
