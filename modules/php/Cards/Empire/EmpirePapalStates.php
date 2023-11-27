<?php
namespace PaxRenaissance\Cards\Empire;

class EmpirePapalStates extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpirePapalStates';
    $this->nameKing = clienttranslate('Pope Julius II');
    $this->nameRepublic = clienttranslate('Florentine Signoria');
    $this->startLocation = 'empire_papalStates';
  }
}
