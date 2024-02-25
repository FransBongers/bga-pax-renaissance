<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Managers\Players;

class PREN088_CemAntiHostage extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN088_CemAntiHostage';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => ROOK,
      ],
      [
        'separator' => ISLAMIC,
        'type' => ROOK,
      ]
    ];
    $this->empire = OTTOMAN;
    $this->flavorText = [
      clienttranslate("Upon the death of Sultan Mehmed, his sons Bayezid and Cem fought for this throne. Cem lost, and tried to escape to Egypt. Instead he made landfall at Rhodes, and asked for protection from the Knights."),
      clienttranslate("Money exchanged hands, but not for the hostage's release. Cem retained popular support for the sultanage and was a serious threat to Sultan Bayezid, who paid the Knights a huge annual sum to keep his brother captive.")
    ];
    $this->name = clienttranslate('Cem Anti-Hostage');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate("Legal fratricide"),
        'top' => 66.5,
        'left' => 4,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Janissary revolt"),
        'top' => 105.5,
        'left' => 4.5,
      ]
    ];
    $this->region = EAST;
    $this->specialAbilities = [
      [
        'id' => SA_SELL_FOR_4,
        'title' => clienttranslate('RANSOM'),
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
