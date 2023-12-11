<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN063_OttomanNavy extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN063_OttomanNavy';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => PIRATE,
      ]
    ];
    $this->empire = OTTOMAN;
    $this->flavorText = [
      clienttranslate('The Ottoman Corsairs Kurtoglu Muslihiddin Reis, Kemal Reis, Piri Reis, and the Barbarossas frequently cooperated in the Mediterranean, using both sultanate ships and their private fleets. In 1522 Hayreddin sent his private fleet to assist the Kurtoglu besieging the Knights of Rhodes.'),
      clienttranslate('The flagship of Admiral Kemal Reis was the Man of War Göke (shown), which carried 700 soldiers and the strongest cannons of her time.')
    ];
    $this->name = clienttranslate('Ottoman Navy');
    $this->oneShot = APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate('Commerce raid'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => CORSAIR_OP_ISLAMIC,
        'flavorText' => clienttranslate('Göke flagship'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = EAST;
  }
}
