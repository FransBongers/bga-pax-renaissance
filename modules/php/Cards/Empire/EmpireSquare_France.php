<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_France extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_France';
    $this->empire = FRANCE;
    $this->nameKing = clienttranslate('Louis XI the Spider House of Valois');
    $this->nameRepublic = clienttranslate('States-General of Burgundy');
    $this->startLocation = 'throne_france';
  }
}
