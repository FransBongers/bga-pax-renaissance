<?php

namespace PREN165X_TransylvanianSaxons\Cards\Tableau;

class PREN168X_ZionistState extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN168X_ZionistState';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ],
    ];
    $this->empire = MAMLUK;
    $this->flavorText = [
      clienttranslate('Gracia Mendes Nasi inherited the Mendes bank, and used its riches and trade networks to establish a Zionist state in Galilee.'),
      clienttranslate('Conversos and other refugees of the Jewish diaspora flocked to this sanctuary, despite the intrigues of the counter-reformation.'),
    ];
    $this->name = clienttranslate("Zionist State");
    $this->oneShot = REFORMATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate("Anti-papal embargo"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->ops = [
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => clienttranslate("Black Pepper Trade"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [REFORMIST];
    $this->region = EAST;
  }
}