<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN041_PeasantRepublicOfDithmarschen extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN041_PeasantRepublicOfDithmarschen';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('From 1484 to 1500 many feudal attempts were made to subdue the free peasants of the North Sea marsh of Dithmarshen. Prince-archbishop Rode of Bremen formed an alliance with other Hansa cities to guard the republic and their access to free maritime trade.'),
      clienttranslate('The allies prevailed against the ruthless Black Guard mercenaries, who were promised the spoils if they could subdue the peasants.')
    ];
    $this->name = clienttranslate('Peasant Republic of Dithmarschen');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate('Dithmarschen autonomy'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Council of the 48 Hansa privileges'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [LAW];
    $this->region = WEST;
  }
}
