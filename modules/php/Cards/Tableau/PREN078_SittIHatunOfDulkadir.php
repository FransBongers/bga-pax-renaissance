<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN078_SittIHatunOfDulkadir extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN078_SittIHatunOfDulkadir';
    $this->flavorText = [
      clienttranslate('Sitt-î Mükrime Hatun was one of the daughters of Süleyman Bey, the sixth ruler of Dulkadir State.'),
      clienttranslate('Her marriage to Mehmed II served as an alliance between the Ottomans and this important buffer state.')
    ];
    $this->name = clienttranslate('Sitt-î Hatun of Dulkadir');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->prestige = [ISLAMIC];
    $this->region = EAST;
    // Queen specific props
    $this->height = 79;
    $this->suitors = [
      MAMLUK,
      OTTOMAN,
      HUNGARY,
    ];
  }
}
