<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN013_GenoeseFleet extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN013_GenoeseFleet';
    $this->name = clienttranslate('Genoese Fleet');
    $this->region = WEST;
  }
}
