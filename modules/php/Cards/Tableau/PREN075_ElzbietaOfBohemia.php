<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN075_ElzbietaOfBohemia extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN075_ElzbietaOfBohemia';
    $this->name = clienttranslate('Elzbieta of Bohemia');
    $this->region = EAST;
  }
}
