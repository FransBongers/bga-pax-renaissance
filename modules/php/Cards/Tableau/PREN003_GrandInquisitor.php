<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN003_GrandInquisitor extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN003_GrandInquisitor';
    $this->name = clienttranslate('Grand Inquisitor');
    $this->region = WEST;
    $this->type = TABLEAU_CARD;
  }
}
