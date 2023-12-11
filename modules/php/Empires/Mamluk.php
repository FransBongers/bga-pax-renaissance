<?php

namespace PaxRenaissance\Empires;

class Mamluk extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = MAMLUK;
    $this->adjacentEmpires = [
      BYZANTIUM,
      HUNGARY,
      OTTOMAN,
    ];
    $this->adjacentBySeaBorderEmpires = [
      OTTOMAN,
    ];
    $this->empireSquareId = 'EmpireSquare_Mamluk';
    $this->name = clienttranslate('Mamluk');
    $this->borders = [
      BORDER_BYZANTIUM_MAMLUK,
      BORDER_MAMLUK_OTTOMAN,
    ];
    $this->cities = [CYPRUS, CAIRO, RED_SEA];
    $this->region = EAST;
  }
}
