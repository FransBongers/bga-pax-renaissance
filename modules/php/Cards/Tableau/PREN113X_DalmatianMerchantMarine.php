<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN113X_DalmatianMerchantMarine extends \PaxRenaissance\Models\Cards\ConcessionsCannotBeKilledByPiratesCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN113X_DalmatianMerchantMarine';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ],
    ];
    $this->empire = OTTOMAN;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate('The republic of Ragusa was a maritime republic centered on the city of Dubrovnik.'),
      clienttranslate("In 1458 it became a vassal of the Ottomans, with an annual payment of 12,500 ducats to the sultan. In return the Ragusan ships were allowed access to the Black Sea, denied to other foreign merchants, and received special tax exemptions and trading benefits from the Porte.")
    ];
    $this->name = clienttranslate("Dalmatian Merchant Marine");
    $this->ops = [
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => clienttranslate("Euxine trade"),
        'top' => 67,
        'left' => 4,
      ],
    ];
    $this->region = EAST;
    $this->specialAbilities = [
      [
        'id' => SA_CONCESSIONS_CANNOT_BE_KILLED_BY_PIRATES,
        'title' => clienttranslate('RAGUSAN MARITIME IMMUNITY'),
        'text' => [
          'log' => clienttranslate('Your Concessions cannot be killed by Pirates.'),
          'args' => [],
        ],
      ]
    ];
  }
}
