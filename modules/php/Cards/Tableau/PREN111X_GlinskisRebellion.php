<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN111X_GlinskisRebellion extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN111X_GlinskisRebellion';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ],
    ];
    $this->empire = HUNGARY;
    $this->flavorText = [
      clienttranslate('Descended from Hungarian Orthodox nobility, Michael Glinski became wealthy in the lucrative wax trade, angering the szlachta (nobles). After defeating the Crimean Khanate in 1506, he was accused of conspiracy and lost his wealth.'),
      clienttranslate("Proclaiming himself the defender of the discriminated Orthodox faithful, Glinski led a rebellion against the Lithuanian crown.")
    ];
    $this->name = clienttranslate("Glinski's Rebellion");
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_ROOK_KNIGHT,
        'flavorText' => clienttranslate("Council of Lords"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Battle of Kletsk"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => clienttranslate("Lithuanian was chandlers"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [REFORMIST];
    $this->region = EAST;
  }
}
