<?php
namespace PaxRenaissance\Borders;

class ByzantiumMamlukBorder extends \PaxRenaissance\Models\Border
{
  public function __construct()
  {
    $this->id = BORDER_BYZANTIUM_MAMLUK;
    $this->name = clienttranslate('ByzantiumMamlukBorder');
  }
}
