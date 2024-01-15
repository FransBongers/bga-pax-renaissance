<?php

namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_France extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_France';
    $this->empire = FRANCE;
    $this->flavorText = [
      KING => [
        clienttranslate('Louis, a master of intrigue, waylaid the ship bearing the Yorkish princess to stop the marriage of his arch-rival Charles the Bold, and sabotaged his coronation. He bribed Warwick to turncoat, installing a Lancastrian to the throne of England.')
      ],
      REPUBLIC => [
        clienttranslate('Townsmen irregulars defeated the French Army in the Battle of the Golden Spurs and established an independent council rule for Flemish cities, with representation for the guild of weavers, the lesser guilds, and the poorters (citizens).')
      ],
    ];
    $this->name = [
      KING => clienttranslate('Louis XI the Spider House of Valois'),
      REPUBLIC => clienttranslate('States-General of Burgundy'),
    ];
    $this->ops = [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Centralized state"),
          'top' => 0,
          'left' => 0,
        ]
      ],
      REPUBLIC => [
        [
          'id' => COMMERCE_OP_WEST,
          'flavorText' => clienttranslate('Great Privilege'),
          'top' => 0,
          'left' => 0,
        ],
      ]
    ];
    $this->startLocation = 'throne_france';
    $this->side = $this->getExtraData('side');
  }
}
