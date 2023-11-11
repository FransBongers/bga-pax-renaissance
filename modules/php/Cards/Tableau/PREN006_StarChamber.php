<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN006_StarChamber extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN006_StarChamber';
    $this->flavorText = [
      clienttranslate('This court of law was established by Henry VII to break the power of the landed gentry which had caused the War of the Roses. Court sessions were held in secret, with no indictments or witnesses.'),
      clienttranslate('Under the leadership of Cardinal Wolsey in the reign of King Henry VIII, the Star Chamber became a political tool, and a symbol of the abuse of royal power.')
    ];
    $this->name = clienttranslate('Star Chamber');
    $this->region = WEST;
  }
}
