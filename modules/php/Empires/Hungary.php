<?php
namespace PaxRenaissance\Empires;

class Hungary extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = HUNGARY;
    $this->name = clienttranslate('Hungary');
    $this->cities = [BUDA, VARNA];
  }
}
