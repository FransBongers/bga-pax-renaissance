<?php

namespace PaxRenaissance\Empires;

class England extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = ENGLAND;
    $this->empireSquareId = 'EmpireSquare_England';
    $this->name = clienttranslate('England');
    $this->borders = [
      BORDER_ENGLAND_FRANCE,
      BORDER_ENGLAND_PORTUGAL,
    ];
    $this->cities = [
      BORDEAUX,
      LONDON
    ];
    $this->region = WEST;
  }
}
