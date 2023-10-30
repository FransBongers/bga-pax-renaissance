<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN066_BlackArmy extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN066_BlackArmy';
    $this->name = clienttranslate('Black Army');
    $this->region = EAST;
    $this->type = TABLEAU_CARD;
  }
}
