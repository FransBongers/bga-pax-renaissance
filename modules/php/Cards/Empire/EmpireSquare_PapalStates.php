<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_PapalStates extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_PapalStates';
    $this->empire = PAPAL_STATES;
    $this->nameKing = clienttranslate('Pope Julius II');
    $this->nameRepublic = clienttranslate('Florentine Signoria');
    $this->startLocation = 'throne_papalStates';
  }
}
