<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN005_ReformedTheology extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN005_ReformedTheology';
    $this->name = clienttranslate('Reformed Theology');
    $this->region = WEST;
  }
}
