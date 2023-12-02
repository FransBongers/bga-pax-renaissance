<?php
namespace PaxRenaissance\Borders;

class HolyRomanEmpirePapalStatesBorder extends \PaxRenaissance\Models\Border
{
  public function __construct()
  {
    $this->id = BORDER_HOLY_ROMAN_EMPIRE_PAPAL_STATES;
    $this->name = clienttranslate('HolyRomanEmpirePapalStatesBorder');
  }
}
