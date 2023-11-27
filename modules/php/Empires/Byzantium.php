<?php
namespace PaxRenaissance\Empires;

class Byzantium extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = BYZANTIUM;
    $this->name = clienttranslate('Byzantium');
    $this->cities = [CAFFA, TANA, TREBIZOND];
  }
}
