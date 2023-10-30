<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireByzantium extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireByzantium';
    $this->nameKing = clienttranslate('David Comnenus Basileus of Trebizond');
    $this->nameRepublic = clienttranslate('Confederation of White Sheep Turkomen');
    $this->startLocation = 'empire_byzantium';
  }
}
