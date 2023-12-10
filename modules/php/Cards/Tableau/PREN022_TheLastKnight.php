<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN022_TheLastKnight extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN022_TheLastKnight';
    $this->agents = [
      [
        'religion' => REFORMIST,
        'type' => KNIGHT,
      ]
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      clienttranslate('Franz von Sickingen, like many knights, made his living collecting debts and protection money from cities, and providing muscle during imperial elections, and private feuds. However the 1495 Reichstag banned these sources of income, giving more power to the nobility.'),
      clienttranslate("Sickingen led a Knight's Revolt, designed to unite the merchants, knights, and peasants against the nobility.")
    ];
    $this->name = clienttranslate('The Last Knight');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate('Anti-noble 1522 revolt'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Brotherly Conventions of Knights'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = WEST;
  }
}
