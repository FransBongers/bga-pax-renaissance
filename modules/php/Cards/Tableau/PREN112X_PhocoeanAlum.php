<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN112X_PhocoeanAlum extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN112X_PhocoeanAlum';
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
    $this->empire = OTTOMAN;
    $this->flavorText = [
      clienttranslate('Alum, a mordant necessary to bind dyes to cloth, was one of the most valuable substances in the Renaissance. The only European source was in Phocoea, so Genoa and Venice fought wars to dominate this concession.'),
      clienttranslate("After the Ottoman blitzkries, the Venetians ransomed Bartolomeo Zorzi, a dyer of Constantinople, and thus gained control of this Ottoman concession.")
    ];
    $this->name = clienttranslate("Phocoean Alum");
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN_ROOK,
        'flavorText' => clienttranslate("Slave market of Chios"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => clienttranslate("Alum farmer Bartolomeo Zorzi"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = EAST;
  }
}