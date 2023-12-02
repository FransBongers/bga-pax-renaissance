<?php

namespace PaxRenaissance\Empires;

class France extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = FRANCE;
    $this->name = clienttranslate('France');
    $this->borders = [
      BORDER_ARAGON_FRANCE,
      BORDER_ENGLAND_FRANCE,
      BORDER_FRANCE_HOLY_ROMAN_EMPIRE,
    ];
    $this->cities = [
      BRUGES,
      LYON,
      PARIS,
    ];
  }
}
