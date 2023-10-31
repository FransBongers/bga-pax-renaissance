<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN014_IndiaArmada extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN014_IndiaArmada';
    $this->name = clienttranslate('India Armada');
    $this->region = WEST;
  }
}
