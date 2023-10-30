<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireHungary extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireHungary';
    $this->nameKing = clienttranslate('Mátyás Corvinus King of Hungary');
    $this->nameRepublic = clienttranslate('Polish-Lithuanian Sejm');
    $this->startLocation = 'empire_hungary';
  }
}
