<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN213P_NetherlandsInquisition extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN213P_NetherlandsInquisition';
    $this->ageOfReformationPromo = true;
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => BISHOP,
      ],
    ];
    $this->empire = FRANCE;
    $this->flavorText = [
      clienttranslate('The most notorious inquisitor of the Habsburg Netherlands was Pieter Titelmans. In his zeal to exterminate Calvinist and Anabaptist ideas, he used informers, torture, and burning at the stake.'),
      clienttranslate('This was a factor in the Dutch Revolt against the Habsburgs.'),
    ];
    $this->name = clienttranslate("Netherlands Inquisition");
    $this->oneShot = CRUSADE_ONE_SHOT;
    $this->ops = [
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate("Edict of 1521"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
  }
}
