<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN061_Qizilbash extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN061_Qizilbash';
    $this->name = clienttranslate('Qizilbāsh');
    $this->region = EAST;
  }
}
