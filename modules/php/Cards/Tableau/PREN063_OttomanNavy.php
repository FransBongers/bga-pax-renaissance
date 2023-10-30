<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN063_OttomanNavy extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN063_OttomanNavy';
    $this->name = clienttranslate('Ottoman Navy');
    $this->region = EAST;
  }
}
