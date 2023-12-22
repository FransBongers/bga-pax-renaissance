<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN047_MargaretOfAnjou extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN047_MargaretOfAnjou';
    $this->flavorText = [
      clienttranslate("This fighting queen assumed control of England and personally led the Lancastrian faction in the War of the Roses, a conflict she initiated by excluding the rival York clan in the Great Council of 1455."),
      clienttranslate("Thousands of deaths later, she was taken prisoner at Tewkesbury in 1471, and ransomed by her coursin, King Louis XI of France.")
    ];
    $this->name = clienttranslate('Margaret of Anjou');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_ROOK,
        'flavorText' => clienttranslate('Great Council'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('War of the Roses'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = WEST;
    // Queen specific props
    $this->height = 106;
    $this->suitors = [
      ENGLAND,
      FRANCE,
      ARAGON,
    ];
  }
}
