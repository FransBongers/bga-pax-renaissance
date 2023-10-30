<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN060_Dervishes extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN060_Dervishes';
    $this->name = clienttranslate('Dervishes');
    $this->region = EAST;
  }
}
