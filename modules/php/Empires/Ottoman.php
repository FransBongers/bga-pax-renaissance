<?php
namespace PaxRenaissance\Empires;

use PaxRenaissance\Managers\ChessPieces;

class Ottoman extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = OTTOMAN;
    $this->name = clienttranslate('Ottoman');
    $this->cities = [CONSTANTINOPLE_1, CONSTANTINOPLE_2, CONSTANTINOPLE_3, MODON, RHODES];
  }
}
