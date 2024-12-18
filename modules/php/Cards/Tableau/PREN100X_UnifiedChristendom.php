<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN100X_UnifiedChristendom extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN100X_UnifiedChristendom';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => BISHOP,
      ]
    ];
    $this->empire = EAST;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate("At the 1439 Council of Florence, Bishops of the East and West signed a compromise for the reunification of the Catholic and Orthodox faiths. Upon their return, the Eastern Bishops under the Unionist Bessarion found their agreement broadly rejected until the Ottomans were almost at the gates."),
      clienttranslate("The East-West Union was proclaimed in 1452, but too late, Constantinople fell the next year. Bessarion became a Cardinal, humanist scholar, and Papal legate.")
    ];
    $this->name = clienttranslate('Unified Christendom');
    $this->oneShot = APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT;
    $this->ops = [
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate("Papal legate"),
        'top' => 67.5,
        'left' => 4,
      ],
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate('Anti-schism party'),
        'top' => 107,
        'left' => 4,
      ]
    ];
    $this->prestige = [PATRON];
    $this->region = EAST;
  }
}
