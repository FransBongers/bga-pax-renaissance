<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Ottoman extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Ottoman';
    $this->empire = OTTOMAN;
    $this->nameKing = clienttranslate('Sultan Mehmed II the Conqueror');
    $this->nameRepublic = clienttranslate('Ottoman Millet System');
    $this->startLocation = 'throne_ottoman';
  }
}
