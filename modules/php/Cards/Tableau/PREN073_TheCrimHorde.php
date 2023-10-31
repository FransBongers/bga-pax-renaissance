<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN073_TheCrimHorde extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN073_TheCrimHorde';
    $this->name = clienttranslate('The Crim Horde');
    $this->region = EAST;
  }
}
