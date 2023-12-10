<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN032_DukeOfMilan extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN032_DukeOfMilan';
    $this->agents = [
      [
        'religion' => CATHOLIC,
        'type' => KNIGHT,
      ],
      [
        'religion' => CATHOLIC,
        'type' => KNIGHT,
      ]
    ];
    $this->empire = ARAGON;
    $this->flavorText = [
      clienttranslate('When the Italian condottiero Francesco Sforza betrayed the Golden Ambrosia Republic, he founded the Sforza dynasty in Milan.'),
      clienttranslate("His friendship of Cosimo de' Medici led to the Peace of Lodi and the Italic League, based on a balance of power in Italy.")
    ];
    $this->name = clienttranslate('Duke of Milan');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->prestige = [PATRON];
    $this->region = WEST;
  }
}
