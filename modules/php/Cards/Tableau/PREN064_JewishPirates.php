<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN064_JewishPirates extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN064_JewishPirates';
    $this->name = clienttranslate('Jewish Pirates');
    $this->region = EAST;
  }
}
