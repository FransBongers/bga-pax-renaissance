<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN070_ZupyKrakowskieCompany extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN070_ZupyKrakowskieCompany';
    $this->name = clienttranslate('Zupy Krakowskie Company');
    $this->region = EAST;
  }
}
