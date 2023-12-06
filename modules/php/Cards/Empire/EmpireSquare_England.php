<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_England extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_England';
    $this->empire = ENGLAND;
    $this->nameKing = clienttranslate('King Edward IV House of York');
    $this->nameRepublic = clienttranslate('English Parliament');
    $this->startLocation = 'throne_england';
  }
}
