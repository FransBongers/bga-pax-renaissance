<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN007_PetersPence extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN007_PetersPence';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => BISHOP,
      ]
    ];
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('Collectors for both the Apostolic Camera, the Papal central board of finance, traveled throughout Christendom to collect the papal taxes.'),
      clienttranslate('Sometimes the "Peter\'s Pence" collectors would be rebuffed by monarchs trying to coerce uncooperative popes.'),
      clienttranslate('In reformist England, the "pence" was abolished by King Henry VIII in 1534.')
    ];
    $this->name = clienttranslate("Peter's Pence");
    $this->oneShot = APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Peter's Pence"),
        'top' => 66.5,
        'left' => 111,
      ],
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Apostolic Camera'),
        'top' => 107,
        'left' => 111,
      ]
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
  }
}
