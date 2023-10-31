<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN069_BashiBazouk extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN069_BashiBazouk';
    $this->name = clienttranslate('Bashi-bazouk');
    $this->region = EAST;
  }
}
