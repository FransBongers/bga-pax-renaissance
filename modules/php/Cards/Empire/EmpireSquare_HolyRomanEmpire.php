<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_HolyRomanEmpire extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_HolyRomanEmpire';
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->nameKing = clienttranslate('Frederick III House of Habsburg');
    $this->nameRepublic = clienttranslate('Reichstag Imperial Diet');
    $this->startLocation = 'throne_holyRomanEmpire';
  }
}
