<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN002_PapalElephant extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN002_PapalElephant';
    $this->name = clienttranslate('Papal Elephant');
    $this->region = WEST;
    $this->type = TABLEAU_CARD;
  }
}
