<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN141X_WelserKleinVenedig extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN141X_WelserKleinVenedig';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ],
    ];
    $this->empire = PORTUGAL;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate("In 1528 the banker Bartholomeus Welser of Augsburg was commissioned by Charles V to outfit a fleet to conquer Venezuela at his own expense."),
      clienttranslate('Welser\'s colony of Klein-Venedig ("little Venice") established trade between the Netherlands, Germany and South America.'),
    ];
    $this->name = clienttranslate('Welser Klein-Venedig');
    $this->oneShot = TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT;
    $this->ops = [
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Venezuelan sugar'),
        'top' => 66.5,
        'left' => 111,
      ],
    ];
    $this->prestige = [DISCOVERY];
    $this->region = WEST;
  }
}
