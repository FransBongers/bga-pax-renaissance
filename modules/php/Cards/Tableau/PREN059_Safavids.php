<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN059_Safavids extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN059_Safavids';
    $this->name = clienttranslate('Safavids');
    $this->region = EAST;
    $this->type = TABLEAU_CARD;
  }
}
