<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN116X_CelebiTaxRevolts extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN115X_SahkuluShiiteRevolt';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => KNIGHT,
      ],
    ];
    $this->empire = OTTOMAN;
    $this->flavorText = [
      clienttranslate("The Kalender Çelebi were a series of revolts against the Ottomans. They are named for the adherents of the mystic rebel Çelebi, although later revolts followed different leaders."),
      clienttranslate('The rebellions, carried out by sekban or sipahis troops in 1527, were not meant to overthrow the government but to protest non-Muslim admission into the army and Janissary dominance of tax revenues.')
    ];
    $this->name = clienttranslate("Çelebi Tax Revolts");
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate("Sipahis feudalism"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Şahkulu; Nur Ali Halife; Baba Zünnun"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => INQUISITOR_OP_ISLAMIC,
        'flavorText' => clienttranslate("Mystic rebel Celebi"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = EAST;
  }
}
