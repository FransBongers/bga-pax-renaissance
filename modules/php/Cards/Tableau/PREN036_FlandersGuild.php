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
        'top' => 66.5,
        'left' => 111,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Salt Wars'),
        'top' => 105.5,
        'left' => 111,
      ],
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Flemish weavers & spinners guild'),
        'top' => 145,
        'left' => 110,
      ]
    ];
    $this->prestige = [LAW];
    $this->region = WEST;
  }
}
