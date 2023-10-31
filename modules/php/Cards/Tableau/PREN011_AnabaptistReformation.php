<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN011_AnabaptistReformation extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN011_AnabaptistReformation';
    $this->name = clienttranslate('Anabaptist Reformation');
    $this->region = WEST;
  }
}
