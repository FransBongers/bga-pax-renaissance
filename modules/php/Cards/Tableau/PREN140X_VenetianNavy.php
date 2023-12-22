<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN140X_VenetianNavy extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN140X_VenetianNavy';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => PIRATE,
      ],
    ];
    $this->empire = PAPAL_STATES;
    $this->flavorText = [
      clienttranslate("Giovanni Ser di Mocenigo, Jr., Doge of Venice from 1478 to 1485. He fought the Ottomans at sea and Ferrara on land."),
      clienttranslate("His brother, Pietro Mocenigo, was also a doge of Venice but also was one of the greatest Venetian admirals, who saw action in Smyrna, Cyprus, and Scutari."),
    ];
    $this->name = clienttranslate('Venetian Navy');
    $this->ops = [
      [
        'id' => CORSAIR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Arsenale Nuovo'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Italic League'),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = WEST;
  }
}
