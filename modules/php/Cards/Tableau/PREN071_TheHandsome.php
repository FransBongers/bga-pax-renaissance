<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN071_TheHandsome extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN071_TheHandsome';
    $this->name = clienttranslate('The Handsome');
    $this->region = EAST;
  }
}
