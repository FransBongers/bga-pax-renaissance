<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN007_PetersPence extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN007_PetersPence';
    $this->name = clienttranslate("Peter's Pence");
    $this->region = WEST;
    $this->type = TABLEAU_CARD;
  }
}
