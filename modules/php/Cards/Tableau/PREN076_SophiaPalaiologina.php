<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN076_SophiaPalaiologina extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN076_SophiaPalaiologina';
    $this->name = clienttranslate('Sophia Palaiologina');
    $this->region = EAST;
  }
}
