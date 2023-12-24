<?php
namespace PaxRenaissance\Borders;

class FranceHolyRomanEmpireBorder extends \PaxRenaissance\Models\Border
{
  public function __construct()
  {
    $this->id = BORDER_FRANCE_HOLY_ROMAN_EMPIRE;
    $this->name = clienttranslate('France-Holy Roman Empire Border');
    $this->seaBorder = true;
    $this->adjacentEmpires = [
      HOLY_ROMAN_EMIRE,
      FRANCE,
    ];
  }
}
