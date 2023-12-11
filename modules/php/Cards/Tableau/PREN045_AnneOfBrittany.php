<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN045_AnneOfBrittany extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN045_AnneOfBrittany';
    $this->flavorText = [
      clienttranslate("Anne, Duchess of Brittany, the last independent Breton ruler and one of the richest European women."),
      clienttranslate("Fighting to maintain Breton independence from France, she first married the Holy Roman Emperor. The French king Charles VIII intrigued to invalidate her marriage, and then invaded Brittany to marry her by force of arms. His successor annulled his own marriage to also marry Anne. Under Anne, Brittany enjoyed exemption from some taxes such as the gabelle, an unpopular tax on salt.")
    ];
    $this->name = clienttranslate('Anne of Brittany');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Brittany War of Independence'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = WEST;
  }
}
