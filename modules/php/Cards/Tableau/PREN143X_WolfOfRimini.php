<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN143X_WolfOfRimini extends \PaxRenaissance\Models\Cards\CondottiereCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN143X_WolfOfRimini';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ],
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ],
    ];
    $this->empire = PAPAL_STATES;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate("Sigismondo Pandolfo Malatesta, lord of Rimini, Fano, and Cesena from 1432. A brilliant condottiero, he served the Papacy, Florence, Siena, Naples and Sforza of Milan."),
      clienttranslate('He was excommunicated by Pius II, who launched a crusade against him. He was sheltered by Venice and commanded the Venetian forces in the 1465 campaign against the Ottoman Empire.'),
    ];
    $this->name = clienttranslate('Wolf of Rimini');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Neapolitan baron revolt'),
        'top' => 66,
        'left' => 111,
      ],
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate("Murano glassmakers"),
        'top' => 106,
        'left' => 111,
      ],
    ];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS,
        'title' => clienttranslate('Condottiere'),
        'text' => [
          'log' => clienttranslate('Venice can hold 2 gold Tokens instead of 1.'),
          'args' => [],
        ],
      ]
    ];
  }
}
