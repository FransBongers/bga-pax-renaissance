<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN125X_BeylerbeyOfEgypt extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN125X_BeylerbeyOfEgypt';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => ROOK,
      ],
      [
        'separator' => ISLAMIC,
        'type' => ROOK,
      ],
    ];
    $this->empire = MAMLUK;
    $this->flavorText = [
      clienttranslate('The Ottoman Governor Hain Ahmed Pasha was beheaded for declaring Egyptian independence with himself as Sultan in 1524. His replacement, Pargalı Ibrahim Paşa, was a polygot genius who had skyrocketed from slave to Grand Vizier.'),
      clienttranslate('Because of his reform of the military and civil codes, the Kanunname, and his diplomatic successes in the West, Süleyman had him beheaded as well.'),
    ];
    $this->name = clienttranslate("Beylerbey of Egypt");
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate("Süleyman the Magnificent"),
        'top' => 67,
        'left' => 4,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Cairo citadel"),
        'top' => 107,
        'left' => 4,
      ],
    ];
    $this->prestige = [LAW];
    $this->region = EAST;
  }
}
