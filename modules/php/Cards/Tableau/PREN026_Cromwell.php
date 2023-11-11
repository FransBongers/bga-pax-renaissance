<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN026_Cromwell extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN026_Cromwell';
    $this->flavorText = [
      clienttranslate('Thomas Cromwell, reformation leader and perhaps the greatest English statesman.'),
      clienttranslate('Unlike his mentor, Cardinal Wolsey, Cromwell was not a priest but an efficient lawyer. Anti-Cromwell Catholics formed the Pilgrimage of Grace to protest his policies. Just months after he had him beheaded, Henry VIII was bemoaning his loss.')
    ];
    $this->name = clienttranslate('Cromwell');
    $this->region = WEST;
  }
}
