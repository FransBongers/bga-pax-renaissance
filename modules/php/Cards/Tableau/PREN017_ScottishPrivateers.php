<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN017_ScottishPrivateers extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN017_ScottishPrivateers';
    $this->name = clienttranslate('Scottish Privateers');
    $this->region = WEST;
  }
}
