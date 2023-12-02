<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN014_IndiaArmada extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN014_IndiaArmada';
    $this->flavorText = [
      clienttranslate('Vasco da Gama of Portugal was the first European to reach India by sea, linking Europe and Asia for the first time by an ocean trade route (1498).'),
      clienttranslate('The scale of trade realignment was on a scale that would be unequaled until the invention of the airplane.'),
    ];
    $this->name = clienttranslate('India Armada');
    $this->prestige = [DISCOVERY];
    $this->region = WEST;
  }
}
