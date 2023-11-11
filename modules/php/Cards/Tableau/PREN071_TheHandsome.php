<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN071_TheHandsome extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN071_TheHandsome';
    $this->flavorText = [
      clienttranslate("The boy Radu of Dracul became close friends with the sultan's son, Mehmed II (aka The Conqueror), after he and his brother Vlad were taken hostage. When Radu converted to Islam, the two brothers became mortal enemies."),
      clienttranslate('Vlad assumed command of the armies defending Wallachia and Transylvania, opposed by Radu in command of the invading Janissaries. Radu won, becoming pasha of Wallachia.')
    ];
    $this->name = clienttranslate('The Handsome');
    $this->region = EAST;
  }
}
