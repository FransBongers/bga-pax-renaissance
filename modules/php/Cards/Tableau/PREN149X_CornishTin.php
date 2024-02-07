<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN149X_CornishTin extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN149X_CornishTin';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ],
    ];
    $this->empire = ENGLAND;
    $this->flavorText = [
      clienttranslate("The tax levy of 1497 overturned previous rights granted to the Cornish Stannary Parliament. The Cornish tin miners revolted, stiffened by an Arthurian tradition of resistance to Norman rule. Led by a blacksmith, the protesters marched peacefully towards London, but were brutally crushed by royal troops recalled from Scotland."),
      clienttranslate('However, in 1508 the king granted the Stannary veto power in Parliament.'),
    ];
    $this->name = clienttranslate('Cornish Tin');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate('Stannary Parliament'),
        'top' => 66.5,
        'left' => 111,
      ],
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Cornish Tin Guild'),
        'top' => 106,
        'left' => 111,
      ],
    ];
    $this->prestige = [LAW];
    $this->region = WEST;
  }
}
