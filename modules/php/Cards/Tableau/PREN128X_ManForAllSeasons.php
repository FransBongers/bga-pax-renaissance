<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN128X_ManForAllSeasons extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN128X_ManForAllSeasons';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => BISHOP,
      ]
    ];
    $this->empire = ENGLAND;
    $this->flavorText = [
      clienttranslate("As Lord High Chancellor of England, Sir Thomas More attacked the Reformation, banning Lutheran books, spying on suspected Protestants, especially publishers, and arresting anyone holding in his possession, transporting, or selling books of the Protestant Reformation."),
      clienttranslate('But when King Henry VIII broke with the Roman Church, More disapproved and was tried for treason and decapitated.')
    ];
    $this->name = clienttranslate('Man for all Seasons');
    $this->oneShot = CRUSADE_ONE_SHOT;
    $this->ops = [
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate('Burning of heretics'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Archbishop Warham'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
  }
}
