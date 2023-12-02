<?php
namespace PaxRenaissance\Empires;

class PapalStates extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = PAPAL_STATES;
    $this->name = clienttranslate('Papal States');
    $this->borders = [
      BORDER_ARAGON_PAPAL_STATES,
      BORDER_HOLY_ROMAN_EMPIRE_PAPAL_STATES,
      BORDER_OTTOMAN_PAPAL_STATES,
    ];
    $this->cities = [VENICE];
  }
}
