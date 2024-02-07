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
        'separator' => REFORMIST,
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
        'top' => 66.5,
        'left' => 111,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Brotherly Conventions of Knights'),
        'top' => 105.5,
        'left' => 111,
      ]
    ];
    $this->region = WEST;
  }
}
