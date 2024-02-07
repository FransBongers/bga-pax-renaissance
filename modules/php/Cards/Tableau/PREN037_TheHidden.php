<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN037_TheHidden extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN037_TheHidden';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = ARAGON;
    $this->flavorText = [
      clienttranslate('The Revolta de les Germanies (Revolt of the Brotherhoods) was an anti-monarchist, anti-feudal autonomist movement in the Kingdom of Aragon. Inspired by the Italian republics, the artisan guilds of Valancia fought against royalists from 1519-23.'),
      clienttranslate('The final stage of the guerilla warfare was led by a mysterious shrouded leader "The Hidden", who claimed messianic powers. His true name and lineage remain unknown.')
    ];
    $this->name = clienttranslate('The Hidden');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate('Golden republic'),
        'top' => 66,
        'left' => 111,
      ],
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Valencian artisan guilds'),
        'top' => 106,
        'left' => 111,
      ],
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate('Hidden Messiah'),
        'top' => 151.5,
        'left' => 110,
      ],
    ];
    $this->prestige = [LAW];
    $this->region = WEST;
  }
}
