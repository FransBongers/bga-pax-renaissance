<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireMamluk extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireMamluk';
    $this->nameKing = clienttranslate("Qa'it Bay of the Burji Dynasty");
    $this->nameRepublic = clienttranslate('Karaman Beylik');
    $this->startLocation = 'empire_mamluk';
  }
}
