<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireEngland extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireEngland';
    $this->nameKing = clienttranslate('King Edward IV House of York');
    $this->nameRepublic = clienttranslate('English Parliament');
    $this->startLocation = 'empire_england';
  }
}
