<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN062_BarbarossaBrothers extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN062_BarbarossaBrothers';
    $this->name = clienttranslate('Barbarossa Brothers');
    $this->region = EAST;
  }
}
