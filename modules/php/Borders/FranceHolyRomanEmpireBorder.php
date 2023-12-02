<?php
namespace PaxRenaissance\Borders;

class FranceHolyRomanEmpireBorder extends \PaxRenaissance\Models\Border
{
  public function __construct()
  {
    $this->id = BORDER_FRANCE_HOLY_ROMAN_EMPIRE;
    $this->name = clienttranslate('FranceHolyRomanEmpireBorder');
    $this->seaBorder = true;
  }
}
