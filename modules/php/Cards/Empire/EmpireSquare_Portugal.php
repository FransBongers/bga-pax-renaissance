<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Portugal extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Portugal';
    $this->empire = PORTUGAL;
    $this->nameKing = clienttranslate('Henry the Navigator');
    $this->nameRepublic = clienttranslate('Cortes Generales of Castile');
    $this->prestige = [DISCOVERY];
    $this->startLocation = 'throne_portugal';
  }
}
