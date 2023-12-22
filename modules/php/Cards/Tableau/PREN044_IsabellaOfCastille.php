<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN044_IsabellaOfCastille extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN044_IsabellaOfCastille';
    $this->flavorText = [
      clienttranslate("Isabella's marriage to Ferdinand II of Aragon eventually formed the state of Spain."),
      clienttranslate("Her legacy includes the Reconquista, the exile of her Muslim and Jewish subjects in the Spanish Inquisition, and her financing of Columbus' 1492 voyage that established Spain as the world's first global power.")
    ];
    $this->name = clienttranslate('Isabella of Castille');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN_ROOK,
        'flavorText' => clienttranslate('Alhambra Decree'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate('Reconquista'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
    // Queen specific props
    $this->height = 108;
    $this->suitors = [
      PORTUGAL,
      ARAGON,
      FRANCE,
      HOLY_ROMAN_EMIRE,
    ];
  }
}
