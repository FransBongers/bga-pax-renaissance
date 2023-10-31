<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN015_HanseaticLeague extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN015_HanseaticLeague';
    $this->name = clienttranslate('Hanseatic League');
    $this->region = WEST;
  }
}
