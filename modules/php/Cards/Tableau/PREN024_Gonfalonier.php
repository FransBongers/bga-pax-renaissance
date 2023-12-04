<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN024_Gonfalonier extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN024_Gonfalonier';
    $this->agents = [
      [
        'religion' => CATHOLIC,
        'type' => KNIGHT,
      ],
      [
        'religion' => CATHOLIC,
        'type' => KNIGHT,
      ]
    ];
    $this->empire = PAPAL_STATES;
    $this->flavorText = [
      clienttranslate('Federigo da Montefeltro, count of Urbino. As gonfalonier (a position established by the Guelphs to keep the nobles in check), he fougnt for the Pope, Florence, Milan, and Naples, and never lost a war.'),
      clienttranslate('He used his mercenary profits to commission the construction of a great library in Urbino and sponsor the young Raphael.')
    ];
    $this->name = clienttranslate('Gonfalonier');
    $this->prestige = [PATRON, LAW];
    $this->region = WEST;
  }
}
