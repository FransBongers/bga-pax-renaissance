<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN084_TheTimarSystem extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN084_TheTimarSystem';
    $this->agents = [
      [
        'religion' => ISLAMIC,
        'type' => ROOK,
      ]
    ];
    $this->empire = EAST;
    $this->flavorText = [
      clienttranslate('This feudal system awarded Sipahis (Ottoman cavalry) control of arable lands within an estate called the Timar. Ownership, however, was retained by the Ottoman state.'),
      clienttranslate('The Sipahis were responsible for the peasants on the estate, end employed agents (Keetuda) to collect revenues and punish miscreants while they were away on campaign.')
    ];
    $this->name = clienttranslate('The Timar System');
    $this->region = EAST;
  }
}
