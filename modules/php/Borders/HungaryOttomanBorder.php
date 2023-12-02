<?php
namespace PaxRenaissance\Borders;

class HungaryOttomanBorder extends \PaxRenaissance\Models\Border
{
  public function __construct()
  {
    $this->id = BORDER_HUNGARY_OTTOMAN;
    $this->name = clienttranslate('HungaryOttomanBorder');
    $this->seaBorder = true;
  }
}
