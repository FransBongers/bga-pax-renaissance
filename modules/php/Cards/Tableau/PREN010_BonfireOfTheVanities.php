<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN010_BonfireOfTheVanities extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN010_BonfireOfTheVanities';
    $this->name = clienttranslate('Bonfire of the Vanities');
    $this->region = WEST;
  }
}
