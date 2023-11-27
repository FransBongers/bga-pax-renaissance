<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireHolyRomanEmpire extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireHolyRomanEmpire';
    $this->nameKing = clienttranslate('Frederick III House of Habsburg');
    $this->nameRepublic = clienttranslate('Reichstag Imperial Diet');
    $this->startLocation = 'empire_holyRomanEmpire';
  }
}
