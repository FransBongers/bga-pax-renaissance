<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN036_FlandersGuild extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN036_FlandersGuild';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = FRANCE;
    $this->flavorText = [
      clienttranslate('Flemish weavers and spinners were among the best anywhere, and trade with England, the Hansa and Venice made them the wealthiest guilds in Europe.'),
      clienttranslate('They gained veto power against new taxes after the succesful Guldensporen revolt of 1302.')
    ];
    $this->name = clienttranslate('Flanders Guild');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate('Golden Spurs'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Salt Wars'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Flemish weavers & spinners guild'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [LAW];
    $this->region = WEST;
  }
}
