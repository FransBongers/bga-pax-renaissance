<?php

namespace PaxRenaissance\Empires;

class HolyRomanEmpire extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = HOLY_ROMAN_EMIRE;
    $this->name = clienttranslate('Holy Roman Empire');
    $this->cities = [
      LUBECK,
      NOVGOROD,
      NURNBERG,
      VIENNA,
    ];
  }
}
