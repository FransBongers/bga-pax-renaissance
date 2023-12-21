<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN143X_WolfOfRimini extends \PaxRenaissance\Models\TableauCard
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
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate("Murano glassmakers"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = WEST;
  }
}