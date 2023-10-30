<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireOttoman extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireOttoman';
    $this->nameKing = clienttranslate('Sultan Mehmed II the Conqueror');
    $this->nameRepublic = clienttranslate('Ottoman Millet System');
    $this->startLocation = 'empire_ottoman';
  }
}
