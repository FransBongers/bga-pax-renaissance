<?php

namespace PaxRenaissance\Empires;

class France extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = FRANCE;
    $this->adjacentEmpires = [
      ARAGON,
      ENGLAND,
      HOLY_ROMAN_EMIRE,
      PAPAL_STATES,
      PORTUGAL,
    ];
    $this->empireSquareId = 'EmpireSquare_France';
    $this->name = clienttranslate('France');
    $this->borders = [
      BORDER_ARAGON_FRANCE,
      BORDER_ENGLAND_FRANCE,
      BORDER_FRANCE_HOLY_ROMAN_EMPIRE,
    ];
    $this->cities = [
      BRUGES,
      LYON,
      PARIS,
    ];
    $this->region = WEST;
  }
}
