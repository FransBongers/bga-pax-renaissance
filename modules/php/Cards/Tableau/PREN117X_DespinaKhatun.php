<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN117X_DespinaKhatun extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN117X_DespinaKhatun';
    $this->flavorText = [
      clienttranslate("Famed for her beauty, the Byzantine princess Theodora Megale Comnenus married the Aq Koyunlu ruler Uzan Hasan in 1458, on the condition that she retain her Orthodox Christian religion."),
      clienttranslate('As queen of the White Sheep tribe, she made diplomatic overtures to Venice in 1465-1466, and to Stephen III of Moldavia in 1474.')
    ];
    $this->name = clienttranslate("Despina Khatun");
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("White Sheep Tribe"),
        'top' => 32.5,
        'left' => 4,
      ],
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate("Damsel in distress legend"),
        'top' => 72,
        'left' => 4,
      ],
    ];
    $this->prestige = [REFORMIST];
    $this->region = EAST;
    // Queen specific props
    $this->height = 110;
    $this->suitors = [
      BYZANTIUM,
      OTTOMAN,
      MAMLUK,
    ];
  }
}
