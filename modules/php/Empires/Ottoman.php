<?php
namespace PaxRenaissance\Empires;

use PaxRenaissance\Managers\ChessPieces;

class Ottoman extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = OTTOMAN;
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
