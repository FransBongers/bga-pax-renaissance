<?php

namespace PaxRenaissance\Empires;

class Mamluk extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = MAMLUK;
    $this->name = clienttranslate('Mamluk');
    $this->borders = [
      BORDER_BYZANTIUM_MAMLUK,
      BORDER_MAMLUK_OTTOMAN,
    ];
    $this->cities = [CYPRUS, CAIRO, RED_SEA];
  }
}
