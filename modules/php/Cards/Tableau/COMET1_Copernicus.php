<?php
namespace PaxRenaissance\Cards\Tableau;

class COMET1_Copernicus extends \PaxRenaissance\Models\CometCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'COMET1_Copernicus';
    $this->flavorText = [
      clienttranslate('Nicolaus Copernicus, the mathematician and astronomer who formulated a heliocentric model of the universe which placed the Sun at its center. This downgraded Earth into just another planet, subject to planetary laws. As the Advisor to the Royal Prussian sejmik, Copernicus also established the modern quantity theory of money.')
    ];
    $this->name = clienttranslate('Copernicus & the Heliocentric Revolution');
    $this->region = EAST;
  }
}
