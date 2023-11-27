<?php
namespace PaxRenaissance\Empires;

class Portugal extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = PORTUGAL;
    $this->name = clienttranslate('Portugal');
    $this->cities = [
      GRANADA,
      TOLEDO,
      SPICE_ISLANDS
    ];
  }
}
