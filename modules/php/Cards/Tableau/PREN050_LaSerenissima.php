<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN050_LaSerenissima extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN050_LaSerenissima';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => ROOK,
      ]
    ];
    $this->empire = PAPAL_STATES;
    $this->flavorText = [
      clienttranslate("The Venetian Arsenal's ability to mass-produce galleys was unique for its time and resulted in possibly the single largest industrial complex in Europe prior to the Industrial Revolution."),
      clienttranslate('With 180,000 inhabitants, Venice was the second largest city in Europe after Paris and probably the richest in the world. Her galleys ruled the Mediterranean.')
    ];
    $this->name = clienttranslate('La Serenissima');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate('Supreme Tribunal'),
        'top' => 67,
        'left' => 111,
      ],
      [
        'id' => CORSAIR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Venice arsenal'),
        'top' => 106,
        'left' => 111,
      ],
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Council of Ten'),
        'top' => 146,
        'left' => 111,
      ]
    ];
    $this->prestige = [LAW];
    $this->region = WEST;
  }
}
