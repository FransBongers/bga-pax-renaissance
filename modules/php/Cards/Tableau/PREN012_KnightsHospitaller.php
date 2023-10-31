<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN012_KnightsHospitaller extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN012_KnightsHospitaller';
    $this->name = clienttranslate('Knights Hospitaller');
    $this->region = WEST;
  }
}
