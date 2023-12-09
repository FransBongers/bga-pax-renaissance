<?php

namespace PaxRenaissance\Empires;

class Ottoman extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = OTTOMAN;
    $this->adjacentEmpires = [
      BYZANTIUM,
      HOLY_ROMAN_EMIRE,
      HUNGARY,
      MAMLUK,
      PAPAL_STATES,
    ];
    $this->empireSquareId = 'EmpireSquare_Ottoman';
    $this->name = clienttranslate('Ottoman');
    $this->borders = [
      BORDER_HUNGARY_OTTOMAN,
      BORDER_MAMLUK_OTTOMAN,
      BORDER_OTTOMAN_PAPAL_STATES,
    ];
    $this->cities = [CONSTANTINOPLE_1, CONSTANTINOPLE_2, CONSTANTINOPLE_3, MODON, RHODES];
    $this->region = EAST;
  }
}
