<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireAragon extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireAragon';
    $this->nameKing = clienttranslate('John the Faithless King of Aragon');
    $this->nameRepublic = clienttranslate('Golden Ambrosian Republic');
    $this->startLocation = 'empire_aragon';
  }
}
