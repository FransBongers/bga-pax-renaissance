<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN009_HouseOfBorgia extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN009_HouseOfBorgia';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => BISHOP,
      ]
    ];
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('A powerful and ambitious Italian family of diplomats condottieri, politicians, and two popes. One was Alexander VI (above), a corrupt and libertine pope whose reign contributed to the development of the Protestant Reformation.'),
      clienttranslate('The Borgias made enemies of the Medici, the Sforza, Savonarola, and many others. They were also patrons of the arts.')
    ];
    $this->name = clienttranslate("House of Borgia");
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Cesare Borgia'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Extravagantes Communes'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [PATRON];
    $this->region = WEST;
  }
}
