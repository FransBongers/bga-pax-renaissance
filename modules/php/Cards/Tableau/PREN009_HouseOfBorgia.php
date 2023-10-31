<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN009_HouseOfBorgia extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN009_HouseOfBorgia';
    $this->name = clienttranslate("House of Borgia");
    $this->region = WEST;
  }
}
