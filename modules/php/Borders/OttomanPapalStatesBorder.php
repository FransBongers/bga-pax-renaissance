<?php
namespace PaxRenaissance\Borders;

class OttomanPapalStatesBorder extends \PaxRenaissance\Models\Border
{
  public function __construct()
  {
    $this->id = BORDER_OTTOMAN_PAPAL_STATES;
    $this->name = clienttranslate('Ottoman-Papal States Border');
    $this->seaBorder = true;
    $this->adjacentEmpires = [
      OTTOMAN,
      PAPAL_STATES,
    ];
  }
}
