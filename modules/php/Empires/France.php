<?php

namespace PaxRenaissance\Empires;

class France extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = FRANCE;
    $this->name = clienttranslate('France');
    $this->cities = [
      BRUGES,
      LYON,
      PARIS,
    ];
  }
}
