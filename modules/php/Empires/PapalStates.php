<?php
namespace PaxRenaissance\Empires;

class PapalStates extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = PAPAL_STATES;
    $this->name = clienttranslate('Papal States');
    $this->cities = [VENICE];
  }
}
