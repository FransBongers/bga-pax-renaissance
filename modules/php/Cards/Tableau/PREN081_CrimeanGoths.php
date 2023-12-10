<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN081_CrimeanGoths extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN081_CrimeanGoths';
    $this->agents = [
      [
        'religion' => REFORMIST,
        'type' => ROOK,
      ]
    ];
    $this->empire = BYZANTIUM;
    $this->flavorText = [
      clienttranslate('Several Gothic tribes settled the rugged highlands of Crimea, becoming the longest surviving Gothic culture. They sheltered refugees from the brutal Ottoman takeover of Caffa in 1475.'),
      clienttranslate('To justify his racist ambitions in the Crimea, Adolf Hitler claimed the region was still inhabited by German-speaking Goths, making them native Aryen peoples.')
    ];
    $this->name = clienttranslate('Crimean Goths');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => VOTE_OP_EAST,
        'flavorText' => clienttranslate("Golden Horder Jarig Law"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Tatar goths"),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [LAW];
    $this->region = EAST;
  }
}
