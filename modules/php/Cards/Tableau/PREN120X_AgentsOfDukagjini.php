<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN120X_AgentsOfDukagjini extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN120X_AgentsOfDukagjini';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => ROOK,
      ],
      [
        'separator' => REFORMIST,
        'type' => ROOK,
      ],
    ];
    $this->empire = OTTOMAN;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate("Lekë Dukagjini, a violent member of Dukagjini family, is remembered as the angel prince, as contrasted to the dragon prince Skanderbeg."),
      clienttranslate("Dukagjini wrote the Albanian laws known as the Kanunu i Lekë Dukagjinit, some aspects of which (blood feuds) have been reinstated in 1990's Albania"),
    ];
    $this->name = clienttranslate("Agents of Dukagjini");
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN_ROOK,
        'flavorText' => clienttranslate("Pronoier"),
        'top' => 67,
        'left' => 4,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("League of Lezha"),
        'top' => 105.5,
        'left' => 4,
      ],
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate("Zaharia feud"),
        'top' => 146.5,
        'left' => 4,
      ],
    ];
    $this->prestige = [LAW];
    $this->region = EAST;
  }
}
