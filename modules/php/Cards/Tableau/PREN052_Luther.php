<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN052_Luther extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN052_Luther';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => ROOK,
      ],
      [
        'separator' => REFORMIST,
        'type' => ROOK,
      ]
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      clienttranslate("Martin Luther's powerful testimony of faith and the Diet of Worms in 1521, caused the emperor to brand him as a heretic, but ir made an indelible impression upon some powerful German princes."),
      clienttranslate("They formed a defensive alliance of Lutheranism, the League of Schmalkaldic, which sought to replace the Holy Roman Empire as their source of political allegiance.")
    ];
    $this->name = clienttranslate('Luther');
    $this->oneShot = REFORMATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate('Anti-Semitism'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('League of Schmalkaldic'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [REFORMIST];
    $this->region = WEST;
  }
}