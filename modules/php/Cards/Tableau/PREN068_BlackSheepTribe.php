<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN068_BlackSheepTribe extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN068_BlackSheepTribe';
    $this->name = clienttranslate('Black Sheep Tribe');
    $this->region = EAST;
  }
}
