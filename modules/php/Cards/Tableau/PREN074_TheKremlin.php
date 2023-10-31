<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN074_TheKremlin extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN074_TheKremlin';
    $this->name = clienttranslate('The Kremlin');
    $this->region = EAST;
  }
}
