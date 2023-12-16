<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN147X_WilliamCaxton extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN147X_WilliamCaxton';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ],
    ];
    $this->empire = ENGLAND;
    $this->flavorText = [
      clienttranslate("The merchant William Caxton introduced the printing press into England (Westminster, 1476). The first book printed and retailed was an edition of Chaucer's Canterbury Tales."),
      clienttranslate('Caxton is credited with standardizing the regional dialects of English through printing.'),
    ];
    $this->name = clienttranslate('William Caxton');
    $this->ops = [
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Whorshipful Company of Mercers'),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [LAW];
    $this->region = WEST;
  }
}
