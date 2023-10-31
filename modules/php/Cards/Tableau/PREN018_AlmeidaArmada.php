<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN018_AlmeidaArmada extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN018_AlmeidaArmada';
    $this->name = clienttranslate('Almeida Armada');
    $this->region = WEST;
  }
}
