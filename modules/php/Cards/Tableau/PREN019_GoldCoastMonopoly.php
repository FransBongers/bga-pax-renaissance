<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN019_GoldCoastMonopoly extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN019_GoldCoastMonopoly';
    $this->name = clienttranslate('Gold Coast Monopoly');
    $this->region = WEST;
  }
}
