<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN053_FrieseFreedom extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN053_FrieseFreedom';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => ROOK,
      ]
    ];
    $this->empire = FRANCE;
    $this->flavorText = [
      clienttranslate("Medieval Frisia (i.e. the North Sea coast west of Denmark) was marked by an absence of feudal lords and serfdom. The absence of a manorial authority meant that there existed no central administration for law or justice."),
      clienttranslate("The Friese Freedom ended with the annexation by the Saxons in 1499.")
    ];
    $this->name = clienttranslate('Friese Freedom');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate('Friese Freedom'),
        'top' => 66.5,
        'left' => 111,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Vetkopers vs. Schieringers'),
        'top' => 105.5,
        'left' => 111,
      ]
    ];
    $this->prestige = [LAW];
    $this->region = WEST;
  }
}
