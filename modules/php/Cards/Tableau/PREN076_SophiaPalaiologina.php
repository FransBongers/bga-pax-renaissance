<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN076_SophiaPalaiologina extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN076_SophiaPalaiologina';
    $this->flavorText = [
      clienttranslate('This Byzantine princess married Ivan III (the Great) of Russia, and also became the grandmother of Ivan the Terrible, the first Tsar of all the Russias.'),
      clienttranslate('Sophia favored the vision of Moscow as the "third Rome", the legitimate successor to Constantinople and its Byzantine emperors, with the Moscow Primate as the overall head of the Orthodox religion.')
    ];
    $this->name = clienttranslate('Sophia Palaiologina');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate("Ivan's Sudebnik"),
        'top' => 32.5,
        'left' => 4,
      ],
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate("Latin-Greek Unification"),
        'top' => 73.5,
        'left' => 4,
      ]
    ];
    $this->prestige = [REFORMIST];
    $this->region = EAST;
    // Queen specific props
    $this->height = 111;
    $this->suitors = [
      HUNGARY,
      BYZANTIUM,
      HOLY_ROMAN_EMIRE,
    ];
  }
}
