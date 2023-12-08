<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Mamluk extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Mamluk';
    $this->empire = MAMLUK;
    $this->nameKing = clienttranslate("Qa'it Bay of the Burji Dynasty");
    $this->nameRepublic = clienttranslate('Karaman Beylik');
    $this->prestige = [PATRON];
    $this->startLocation = 'throne_mamluk';
  }
}
