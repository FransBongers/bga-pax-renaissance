<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN067_Janissaries extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN067_Janissaries';
    $this->name = clienttranslate('Janissaries');
    $this->region = EAST;
  }
}
