<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN020_ArumerZwarteHoop extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN020_ArumerZwarteHoop';
    $this->name = clienttranslate('Arumer Zwarte Hoop');
    $this->region = WEST;
  }
}
