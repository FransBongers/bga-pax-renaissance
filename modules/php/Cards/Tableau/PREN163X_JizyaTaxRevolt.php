<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN163X_JizyaTaxRevolt extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN163X_JizyaTaxRevolt';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => KNIGHT,
      ],
    ];
    $this->empire = EAST;
    $this->flavorText = [
      clienttranslate('Vlad Ţepeş the Impaler refused to pay the jizya (tax on non-Muslims) of 10,000 ducats to the Sultan Mehmed and impaled over 23,000 Turks and Bulgarians to make his point.'),
      clienttranslate('The illustration shows Vlad making a surprise night raid on the Turkish camp in an unsuccessful bid to assassinate the Sultan.'),
    ];
    $this->name = clienttranslate("Jizya Tax Revolt");
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Forest of the Dead"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = EAST;
  }
}
