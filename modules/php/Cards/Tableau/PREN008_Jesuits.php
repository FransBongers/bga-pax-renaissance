<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN008_Jesuits extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN008_Jesuits';
    $this->name = clienttranslate('Jesuits');
    $this->region = WEST;
    $this->type = TABLEAU_CARD;
  }
}
