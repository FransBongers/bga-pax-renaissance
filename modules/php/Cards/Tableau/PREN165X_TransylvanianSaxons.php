<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN165X_TransylvanianSaxons extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN165X_TransylvanianSaxons';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => ROOK,
      ],
    ];
    $this->empire = HUNGARY;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate('Ethnic Germans of the patrician class had settled Transylvania in waves since the 12th century. After the 1437 peasant revolt, they formed a defensive union with the Hungarian nobility and the free military Székelys.'),
      clienttranslate('They adhered to Eastern Orthodoxy in a primarily Catholic Hungary.'),
    ];
    $this->name = clienttranslate("Transylvanian Saxons");
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => VOTE_OP_EAST,
        'flavorText' => clienttranslate("Unio Trium Nationum"),
        'top' => 66.5,
        'left' => 4,
      ],
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Voivode of Transylvania"),
        'top' => 106,
        'left' => 4,
      ],
    ];
    $this->region = EAST;
  }
}
