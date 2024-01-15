<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN123X_NothingNew extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN123X_NothingNew';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => ROOK,
      ],
    ];
    $this->empire = HUNGARY;
    $this->flavorText = [
      clienttranslate('In 1505 the "Nihil Novi" (latin for "nothing new") act was passed, meaning the Polish king was not allowed to issue new laws without permission from the Sejm, represented by the upper and lower nobles.'),
      clienttranslate('The "Nihil Novi Dla Szlachty" established a Commonwealth featuring both the Golden Liberty (for the nobles) and the second serfdom (relapse of serfs into slavery).'),
    ];
    $this->name = clienttranslate("Nothing New");
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN_KNIGHT,
        'flavorText' => clienttranslate("Second serfdom"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => VOTE_OP_EAST,
        'flavorText' => clienttranslate("Szlacheckie"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Polish-Lithuanian commonwealth"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [LAW];
    $this->region = EAST;
  }
}
