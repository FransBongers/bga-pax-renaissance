<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN124X_TheLastByzantine extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN124X_TheLastByzantine';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => ROOK,
      ],
    ];
    $this->empire = BYZANTIUM;
    $this->flavorText = [
      clienttranslate('George Amiroutzes, the Protovestarios and Treasurer of Trebizond, secretly negotiated its surrender to his cousin Mahmud Pasha, the Grand Vizier under Mehmed.'),
      clienttranslate('Thus in 1461 the last Byzantine empire ended with the enslavement of its citizens and the execution of its ruler, while Amiroutzes attained a good Ottoman position.'),
    ];
    $this->name = clienttranslate("The Last Byzantine");
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate("Amiroutzes treachery"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => REPRESS_OP_PAWN_ROOK,
        'flavorText' => clienttranslate("Enslavement"),
        'top' => 0,
        'left' => 0,
      ],

      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate("Council of Florence bribe"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [REFORMIST];
    $this->region = EAST;
  }
}
