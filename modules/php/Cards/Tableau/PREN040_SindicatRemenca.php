<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN040_SindicatRemenca extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN040_SindicatRemenca';
    $this->agents = [
      [
        'religion' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = ARAGON;
    $this->flavorText = [
      clienttranslate('Alfonso V "the Magnanimous" allowed the peasants of Aragon to form an independent peasant\'s guild called a sindicat remença. This was reversed by the Generalitat controlled by the nobles, resulting in the Rebellion of the Remences and the Irmandiña Wars.'),
      clienttranslate('The crown sided with the serfs, wishing an independent force against the nobles, and some reforms were gained.')
    ];
    $this->name = clienttranslate('Sindicat Remença');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Catalan artisan guilds'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [LAW];
    $this->region = WEST;
  }
}
