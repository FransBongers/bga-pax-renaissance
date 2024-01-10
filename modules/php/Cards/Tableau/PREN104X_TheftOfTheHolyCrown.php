<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Managers\Players;

class PREN104X_TheftOfTheHolyCrown extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN104X_TheftOfTheHolyCrown';
    $this->flavorText = [
      clienttranslate("No king of Hungary was regarded as legitimate without a coronation using the Holy Crown of St. Stephen."),
      clienttranslate("In 1440 a very pregnant Queen Elisabeth, in hiding at Komorn Castle, commanded her nanny, Helene Kottanner, to steal the crown from her rivals in he Visegrád Stronghold. Helene crept over thin ice on the Danube and snuck into the fort. She bent the crown's cross during the cat burglary (above).")
    ];
    $this->name = clienttranslate('Theft of the Holy Crown');
    $this->oneShot = CORONATION_ONE_SHOT;

    $this->prestige = [CATHOLIC];
    $this->region = EAST;
    $this->specialAbilities = [
      [
        'id' => SA_SELL_FOR_4,
        'title' => clienttranslate('RANSOM:'),
        'text' => [
          'log' => clienttranslate('Sell this card for 4 instead of 2 Florins.'),
          'args' => [],
        ],
      ]
    ];
    // Queen specific props
    $this->height = 95;
    $this->suitors = [
      HUNGARY,
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
