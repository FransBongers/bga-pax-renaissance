<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN072_BosnianAndSerbianSilver extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN072_BosnianAndSerbianSilver';
    $this->agents = [
      [
        'religion' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = OTTOMAN;
    $this->flavorText = [
      clienttranslate('When Constantinople fell, the Byzantine despots of Morea fled and the frightened populace elected local archons: the Albanians under Petro Bua (above), Greeks under Manuel Kantakouzenos, and Archeans under Giovanni Asen Zaccaria.'),
      clienttranslate('The despots returned, paid heavy tribute to the Ottomans, and asked them to intervene to put down the "uprising".')
    ];
    $this->name = clienttranslate('Bosnian & Serbian Silver');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Anti-despot elections"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => clienttranslate("Srebrenica & Novo Brdo silver mines"),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = EAST;
  }
}
