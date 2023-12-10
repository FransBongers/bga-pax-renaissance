<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN035_CommunerosGuilds extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN035_CommunerosGuilds';
    $this->agents = [
      [
        'religion' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = PORTUGAL;
    $this->flavorText = [
      clienttranslate('After Spain became part of the Holy Roman Empire in 1519, peasant revolts against the landed nobility sprang up everywhere.'),
      clienttranslate('The rebels, called "Comuneros" because they favored independent communities, demanded rule by a Castilian queen, Joanna the Mad. They also favored a return to the local-controlled encabezamiento system of taxation instead of the Cortes Corunna taxes.')
    ];
    $this->name = clienttranslate('Communeros Guilds');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Almadén mercury mine'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = WEST;
  }
}
