<?php

namespace PaxRenaissance\Empires;

class HolyRomanEmpire extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = HOLY_ROMAN_EMIRE;
    $this->adjacentEmpires = [
      ARAGON,
      FRANCE,
      HUNGARY,
      OTTOMAN,
      PAPAL_STATES,
    ];
    $this->adjacentBySeaBorderEmpires = [
      FRANCE,
    ];
    $this->empireSquareId = 'EmpireSquare_HolyRomanEmpire';
    $this->name = clienttranslate('Holy Roman Empire');
    $this->borders = [
      BORDER_FRANCE_HOLY_ROMAN_EMPIRE,
      BORDER_HOLY_ROMAN_EMPIRE_HUNGARY,
      BORDER_HOLY_ROMAN_EMPIRE_PAPAL_STATES,
    ];
    $this->cities = [
      LUBECK,
      NOVGOROD,
      NURNBERG,
      VIENNA,
    ];
    $this->region = WEST;
  }
}
