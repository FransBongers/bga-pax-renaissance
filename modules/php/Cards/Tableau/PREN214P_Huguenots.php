<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN214P_Huguenots extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN214P_Huguenots';
    $this->ageOfReformationPromo = true;
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ],
    ];
    $this->empire = FRANCE;
    $this->flavorText = [
      clienttranslate('The French Protestants (Huguenots) were industrious artisans, entrepeneurs, and craftsmen, particularly in trades in the banking, textiles, weaving, clockmaking, and optiometrics industries.'),
      clienttranslate('Jealousy of their wealth and middleman status may have been the source of their widespread persecution.'),
    ];
    $this->name = clienttranslate("Huguenots");
    $this->oneShot = REFORMATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate("Human capital"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [REFORMIST];
    $this->region = WEST;
  }
}
