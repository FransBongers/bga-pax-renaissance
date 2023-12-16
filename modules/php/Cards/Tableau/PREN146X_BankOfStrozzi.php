<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN146X_BankOfStrozzi extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN146X_BankOfStrozzi';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ],
    ];
    $this->empire = PAPAL_STATES;
    $this->flavorText = [
      clienttranslate("The Strozzi banking dynasy bribed the Florentine Signoria to exile their biggest rival, Cosimo de' Medici. This backfired and the Strozzi were exiled in 1434."),
      clienttranslate('Fillipo Strozzi reconciled with Cosimo and returned to Florence in 1462, but his son, Fillipo II (above) sponsored the assassination of a Medice duke and an unsuccessful anti-Medici uprising in 1537.'),
    ];
    $this->name = clienttranslate('Bank Of Strozzi');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate('Signoria bribes'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('friar Luca Pacioli'),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = WEST;
  }
}
