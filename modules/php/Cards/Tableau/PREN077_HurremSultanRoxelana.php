<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN077_HurremSultanRoxelana extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN077_HurremSultanRoxelana';
    $this->flavorText = [
      clienttranslate('Hürrem Sultan, also known as Roxelana, was captured as a slave in the Ukraine and purchased by Süleyman the Magnificent in Caffa. She became his favorite consort and later his legal wife. As a tolerated Christian, she embodied the Ottoman millet system, a legal toleration of other faiths that anticipated modern religious pluralism.'),
      clienttranslate("Favoring her own son as the next sultan, she had the the sultan's son, Şehzade Mustafa, strangled.")
    ];
    $this->name = clienttranslate('Hürrem Sultan Roxelana');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate("Sultanate of Women"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate("Prince rivalry"),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = EAST;
    // Queen specific props
    $this->height = 103;
    $this->suitors = [
      BYZANTIUM,
      OTTOMAN,
      MAMLUK,
    ];
  }
}
