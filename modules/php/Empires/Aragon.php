<?php
namespace PaxRenaissance\Empires;

class Aragon extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = ARAGON;
    $this->name = clienttranslate('Aragon');
    $this->cities = [ALGIERS, TIMBUKTU, VALENCIA];
  }
}
