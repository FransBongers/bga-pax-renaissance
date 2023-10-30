<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN001_InquistionPope extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN001_InquistionPope';
    $this->name = clienttranslate('Inquistion Pope');
    $this->region = WEST;
    $this->type = TABLEAU_CARD;
  }
}
