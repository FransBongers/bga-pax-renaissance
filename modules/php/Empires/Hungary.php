<?php
namespace PaxRenaissance\Empires;

class Hungary extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = HUNGARY;
    $this->name = clienttranslate('Hungary');
    $this->borders = [
      BORDER_BYZANTIUM_HUNGARY,
      BORDER_HOLY_ROMAN_EMPIRE_HUNGARY,
      BORDER_HUNGARY_OTTOMAN,
    ];
    $this->cities = [BUDA, VARNA];
  }
}
