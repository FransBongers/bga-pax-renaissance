<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN107X_TersaneIAmire extends \PaxRenaissance\Models\Cards\ConcessionsCannotBeKilledByPiratesCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN107X_TersaneIAmire';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => PIRATE,
      ]
    ];
    $this->empire = OTTOMAN;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate("After the fall of Constantinople, Mehmed established a new shipyard called the Tersâne-i Âmire (Imperial Arsenal) across the Golden Horn."),
      clienttranslate("From here, Ottoman Admiral Kemal Reis personally directed the reparation and conversion of his galleys. He led the fleet evacuating Granada (1487), to crush the Venetian navy (1499, the first time cannon were used on ships), and into the Atlantic to occupy the Canaries (1501).")
    ];
    $this->name = clienttranslate('Tersâne-i Âmire');
    $this->oneShot = TRADE_SHIFT_RED_SEA_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate("Commerce raid"),
        'top' => 65,
        'left' => 4,
      ],
      [
        'id' => CORSAIR_OP_ISLAMIC,
        'flavorText' => clienttranslate('Privateer'),
        'top' => 105,
        'left' => 4,
      ],
    ];
    $this->region = EAST;
    $this->specialAbilities = [
      [
        'id' => SA_CONCESSIONS_CANNOT_BE_KILLED_BY_PIRATES,
        'title' => clienttranslate('IMPERIAL ARSENAL'),
        'text' => [
          'log' => clienttranslate('Your Concessions cannot be killed by Pirates.'),
          'args' => [],
        ],
      ]
    ];
  }
}
