<?php
namespace PaxRenaissance\Empires;

class Aragon extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = ARAGON;
    $this->empireSquareId = 'EmpireSquare_Aragon';
    $this->name = clienttranslate('Aragon');
    $this->borders = [
      BORDER_ARAGON_FRANCE,
      BORDER_ARAGON_PORTUGAL,
      BORDER_ARAGON_PAPAL_STATES,
    ];
    $this->cities = [ALGIERS, TIMBUKTU, VALENCIA];
    $this->region = WEST;
  }
}
