<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN077_HurremSultanRoxelana extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN077_HurremSultanRoxelana';
    $this->name = clienttranslate('Hürrem Sultan Roxelana');
    $this->region = EAST;
  }
}
