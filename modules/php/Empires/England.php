<?php

namespace PaxRenaissance\Empires;

class England extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = ENGLAND;
    $this->name = clienttranslate('England');
    $this->cities = [
      BORDEAUX,
      LONDON
    ];
  }
}
