<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Aragon extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Aragon';
    $this->empire = ARAGON;
    $this->nameKing = clienttranslate('John the Faithless King of Aragon');
    $this->nameRepublic = clienttranslate('Golden Ambrosian Republic');
    $this->startLocation = 'throne_aragon';
  }
}
