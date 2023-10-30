<?php
namespace PaxRenaissance\Cards\Empire;

class EmpirePortugal extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpirePortugal';
    $this->nameKing = clienttranslate('Henry the Navigator');
    $this->nameRepublic = clienttranslate('Cortes Generales of Castile');
    $this->startLocation = 'empire_portugal';
  }
}
