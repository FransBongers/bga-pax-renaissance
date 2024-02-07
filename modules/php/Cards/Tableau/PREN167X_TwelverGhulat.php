<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN167X_TwelverGhulat extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN167X_TwelverGhulat';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => BISHOP,
      ],
    ];
    $this->empire = MAMLUK;
    $this->flavorText = [
      clienttranslate("Sheikh Junayd was the first Safavi spiritual leader to espouse specifically Shia Islamic teachings, and in particular those of the Twelver ghulat, the predominant sect of Ithnā'ashari Shia Islam."),
      clienttranslate('Junayd was viewed as a divine incarnation by his followers.'),
    ];
    $this->name = clienttranslate("Twelver Ghulat");
    $this->oneShot = APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT;
    $this->ops = [
      [
        'id' => INQUISITOR_OP_ISLAMIC,
        'flavorText' => clienttranslate("Sheikh Junayd"),
        'top' => 67.5,
        'left' => 4,
      ],
    ];
    $this->prestige = [ISLAMIC];
    $this->region = EAST;
  }
}
