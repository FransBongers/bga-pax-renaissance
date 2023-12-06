<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Byzantium extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Byzantium';
    $this->empire = BYZANTIUM;
    $this->nameKing = clienttranslate('David Comnenus Basileus of Trebizond');
    $this->nameRepublic = clienttranslate('Confederation of White Sheep Turkomen');
    $this->startLocation = 'throne_byzantium';
  }
}
