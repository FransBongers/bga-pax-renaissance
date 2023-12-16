<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN148X_TolfaAlum extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN148X_TolfaAlum';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ],
      [
        'separator' => null,
        'type' => PAWN,
      ],
    ];
    $this->empire = PAPAL_STATES;
    $this->flavorText = [
      clienttranslate("Tolfa achieved sudden importance when the Pope's godson discovered alum deposits in 1461. This chemical, essential for the dyeing industry, was formerly available only through a heavily taxed Venetian concession in the Ottoman Empire."),
      clienttranslate('The banker Agostino Chigi, a sponsor of Pope Julius II, was awarded this concession in 1501, becoming the richest man in Rome.'),
    ];
    $this->name = clienttranslate('Tolfa Alum');
    $this->ops = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate('Camera Apostolica'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Papal dyeing industry'),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = WEST;
  }
}
