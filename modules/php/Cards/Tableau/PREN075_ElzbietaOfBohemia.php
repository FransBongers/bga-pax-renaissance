<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN075_ElzbietaOfBohemia extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN075_ElzbietaOfBohemia';
    $this->flavorText = [
      clienttranslate('Elzbieta of Habsburg, heiress to the Kingdoms of Hungary and Bohemia. Her 1453 marriage to Polish King Casimir IV Jagiellon allied them to the kings of Hungary-Bohemia but put them at odds with the Emperor.'),
      clienttranslate('Her 100,000 gold crown dowry was not paid immediately and that gave her a pretext to claim the Hungarian and Bohemian crowns.')
    ];
    $this->name = clienttranslate('Elzbieta of Bohemia');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->region = EAST;
    // Queen specific props
    $this->height = 114;
    $this->suitors = [
      HUNGARY,
      PORTUGAL,
      HOLY_ROMAN_EMIRE,
    ];
  }
}
