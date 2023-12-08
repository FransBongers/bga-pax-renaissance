<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Hungary extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Hungary';
    $this->empire = HUNGARY;
    $this->nameKing = clienttranslate('Mátyás Corvinus King of Hungary');
    $this->nameRepublic = clienttranslate('Polish-Lithuanian Sejm');
    $this->prestige = [PATRON];
    $this->startLocation = 'throne_hungary';
  }
}
