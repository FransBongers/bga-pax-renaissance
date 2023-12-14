<?php

namespace PREN165X_TransylvanianSaxons\Cards\Tableau;

class PREN163X_JizyaTaxRevolt extends \PaxRenaissance\Models\TableauCard
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
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Voivode of Transylvania"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = EAST;
  }
}
