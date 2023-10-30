<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireFrance extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireFrance';
    $this->nameKing = clienttranslate('Louis XI the Spider House of Valois');
    $this->nameRepublic = clienttranslate('States-General of Burgundy');
    $this->startLocation = 'empire_france';
  }
}
