<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN126X_LizardUnion extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN126X_LizardUnion';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => ROOK,
      ],
      [
        'separator' => REFORMIST,
        'type' => ROOK,
      ],
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      clienttranslate('The Teutonic Knights, who ruled Prussia, charged the cities steep taxes without representation.'),
      clienttranslate('The secret Prussian resistance, called the Lizard Union, asked King Casimir IV to incorporate the Prussian cities into the Polish real, where the lesser nobles (szlachta) and cities enjoyed tax representation through the Nieszawa Statutes. This started the 13-Years War.'),
    ];
    $this->name = clienttranslate("Lizard Union");
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_KNIGHT,
        'flavorText' => clienttranslate("Nieszama laws"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("13-years war"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate("Prussian Confederation"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [LAW];
    $this->region = EAST;
  }
}
