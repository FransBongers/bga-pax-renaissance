<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN058_TheGrim extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN058_TheGrim';
    $this->name = clienttranslate('The Grim');
    $this->region = EAST;
    $this->type = TABLEAU_CARD;
  }
}
