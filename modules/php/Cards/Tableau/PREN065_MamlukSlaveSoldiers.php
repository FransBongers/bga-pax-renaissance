<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN065_MamlukSlaveSoldiers extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN065_MamlukSlaveSoldiers';
    $this->name = clienttranslate('Mamluk Slave Soldiers');
    $this->region = EAST;
    $this->type = TABLEAU_CARD;
  }
}
