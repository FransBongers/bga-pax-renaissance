<?php
namespace PaxRenaissance\Borders;

class OttomanPapalStatesBorder extends \PaxRenaissance\Models\Border
{
  public function __construct()
  {
    $this->id = BORDER_OTTOMAN_PAPAL_STATES;
    $this->name = clienttranslate('OttomanPapalStatesBorder');
    $this->seaBorder = true;
  }
}
