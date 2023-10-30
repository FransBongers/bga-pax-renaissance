<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN004_Antipope extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN004_Antipope';
    $this->name = clienttranslate('Antipope');
    $this->region = WEST;
    $this->type = TABLEAU_CARD;
  }
}
