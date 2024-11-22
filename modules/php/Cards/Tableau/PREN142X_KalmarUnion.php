<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN142X_KalmarUnion extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN142X_KalmarUnion';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => PIRATE,
      ],
    ];
    $this->empire = FRANCE;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate("During a 1455 riot, German merchants in Bergen killed the Norwegian governor Nielson."),
      clienttranslate('His daughter Magdalene vowed revenge, and purchased ships and men for anti-Hansa piracy. One was Bertram Hoike, who caused grievous harm in 1491-92 until his execution (above). Even more rapacious were the Hunninghusen brothers. One Kalmar pirate is alleged to have discovered Newfoundland.'),
    ];
    $this->name = clienttranslate('Kalmar Union');
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate('Commerce raid'),
        'top' => 66.5,
        'left' => 111,
      ],
      [
        'id' => CORSAIR_OP_REFORMIST,
        'flavorText' => clienttranslate("Magdalene's vendetta"),
        'top' => 106,
        'left' => 111,
      ],
    ];
    $this->prestige = [DISCOVERY];
    $this->region = WEST;
  }
}
