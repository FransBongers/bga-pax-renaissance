<?php
namespace PaxRenaissance\Empires;

class Portugal extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = PORTUGAL;
    $this->adjacentEmpires = [
      ARAGON,
      ENGLAND,
      FRANCE,
    ];
    $this->empireSquareId = 'EmpireSquare_Portugal';
    $this->name = clienttranslate('Portugal');
    $this->borders = [
      BORDER_ARAGON_PORTUGAL,
      BORDER_ENGLAND_PORTUGAL,
    ];
    $this->cities = [
      GRANADA,
      TOLEDO,
      SPICE_ISLANDS
    ];
    $this->region = WEST;
  }
}
