<?php
namespace PaxRenaissance\Borders;

class HolyRomanEmpireHungaryBorder extends \PaxRenaissance\Models\Border
{
  public function __construct()
  {
    $this->id = BORDER_HOLY_ROMAN_EMPIRE_HUNGARY;
    $this->name = clienttranslate('Holy Roman Empire-Hungary Border');
  }
}
