<?php
namespace PaxRenaissance\Borders;

class ByzantiumHungaryBorder extends \PaxRenaissance\Models\Border
{
  public function __construct()
  {
    $this->id = BORDER_BYZANTIUM_HUNGARY;
    $this->name = clienttranslate('ByzantiumHungaryBorder');
    $this->seaBorder = true;
  }
}
