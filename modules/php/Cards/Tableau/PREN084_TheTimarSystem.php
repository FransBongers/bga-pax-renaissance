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
        'separator' => ISLAMIC,
        'type' => ROOK,
      ]
    ];
    $this->empire = EAST;
    $this->flavorText = [
      clienttranslate('This feudal system awarded Sipahis (Ottoman cavalry) control of arable lands within an estate called the Timar. Ownership, however, was retained by the Ottoman state.'),
      clienttranslate('The Sipahis were responsible for the peasants on the estate, and employed agents (Keetuda) to collect revenues and punish miscreants while they were away on campaign.')
    ];
    $this->name = clienttranslate('The Timar System');
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Kapikulu sipahi"),
        'top' => 66.5,
        'left' => 4,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Timarli sipahi"),
        'top' => 105.5,
        'left' => 4,
      ],
      [
        'id' => INQUISITOR_OP_ISLAMIC,
        'flavorText' => clienttranslate("Keetuda"),
        'top' => 146,
        'left' => 4,
      ],
    ];
    $this->region = EAST;
  }
}
