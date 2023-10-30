<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN006_StarChamber extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN006_StarChamber';
    $this->name = clienttranslate('Star Chamber');
    $this->region = WEST;
  }
}
