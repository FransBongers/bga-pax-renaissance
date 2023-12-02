<?php
namespace PaxRenaissance\Borders;

class AragonPapalStatesBorder extends \PaxRenaissance\Models\Border
{
  public function __construct()
  {
    $this->id = BORDER_ARAGON_PAPAL_STATES;
    $this->name = clienttranslate('AragonPapalStatesBorder');
    $this->seaBorder = true;
  }
}
