<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN067_Janissaries extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN067_Janissaries';
    $this->flavorText = [
      clienttranslate("The Janissaries were the Ottoman Sultan's elite household troops and bodyguards. Highly disciplined and advanced infantry, they were one of the first to use muskets and cannons."),
      clienttranslate("Their recruits were taken from the strongest sons of the sultan's Christian subjects. Their might gave them ever increasing political power.")
    ];
    $this->name = clienttranslate('Janissaries');
    $this->region = EAST;
  }
}
