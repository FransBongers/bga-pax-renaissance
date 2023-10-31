<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN072_BosnianAndSerbianSilver extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN072_BosnianAndSerbianSilver';
    $this->name = clienttranslate('Bosnian & Serbian Silver');
    $this->region = EAST;
  }
}
