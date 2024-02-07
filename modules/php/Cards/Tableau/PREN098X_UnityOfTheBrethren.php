<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN098X_UnityOfTheBrethren extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN098X_UnityOfTheBrethren';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => BISHOP,
      ]
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      clienttranslate('In 1457 the disciples of Jan Hus called the "Unitas Fratrum" split from the Roman Church, which they viewed as hopelessly corrupt. Later they split from the Ultraquists and Luther as well, evolving into the modern Moravian Church.'),
      clienttranslate("The strictest standards of morals and modesty were exacted from the faithful. Luxuries, oaths, and military services were forbidden. Sins were publicly confessed and punished.")
    ];
    $this->name = clienttranslate('Unity of the Brethren');
    $this->oneShot = APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_KNIGHT,
        'flavorText' => clienttranslate("Pacifism"),
        'top' => 78,
        'left' => 4,
      ],
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate('Bohemian Reformation'),
        'top' => 117.5,
        'left' => 4,
      ]
    ];
    $this->prestige = [REFORMIST];
    $this->region = EAST;
  }
}
