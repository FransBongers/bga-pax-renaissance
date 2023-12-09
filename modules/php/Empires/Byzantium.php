<?php
namespace PaxRenaissance\Empires;

class Byzantium extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = BYZANTIUM;
    $this->adjacentEmpires = [
      HUNGARY,
      MAMLUK,
      OTTOMAN,
    ];
    $this->empireSquareId = 'EmpireSquare_Byzantium';
    $this->name = clienttranslate('Byzantium');
    $this->borders = [
      BORDER_BYZANTIUM_HUNGARY,
      BORDER_BYZANTIUM_MAMLUK,
    ];
    $this->cities = [CAFFA, TANA, TREBIZOND];
    $this->region = EAST;
  }
}
