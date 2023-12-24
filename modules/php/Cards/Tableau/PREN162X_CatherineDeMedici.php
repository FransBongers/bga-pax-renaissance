<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN162X_CatherineDeMedici extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN162X_CatherineDeMedici';
    $this->flavorText = [
      clienttranslate("This scion of the famed banking family became Queen consort of France and the most powerful woman in sixteenth-century Europe."),
      clienttranslate('Her reign saw almost constant religious and civil war in France.'),
    ];
    $this->name = clienttranslate("Catherine de' Medici");
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_ROOK,
        'flavorText' => clienttranslate("Saint Bartholomew's Day massacre"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = WEST;
    // Queen specific props
    $this->height = 115;
    $this->suitors = [
      FRANCE,
      ARAGON,
      HOLY_ROMAN_EMIRE,
    ];
  }
}
