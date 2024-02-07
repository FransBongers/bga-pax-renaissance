<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN025_TeutonicKnights extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN025_TeutonicKnights';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ],
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ],
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      clienttranslate('The Prussian Confederation, a coalition of Prussian cities and local nobility, sought independence from the oppressive Teutonic Knights.'),
      clienttranslate("They asked the Jagiellon king of Poland to annex Prussia, so they could share the privileges of Poland's golden liberty. They eventually prevailed against the knights and imperial troops under Grand Master Ludwig von Erlichshausen.")
    ];
    $this->name = clienttranslate('Teutonic Knights');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN_ROOK,
        'flavorText' => clienttranslate('Großschäffer'),
        'top' => 67,
        'left' => 111,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('13-years war'),
        'top' => 105.5,
        'left' => 111,
      ]
    ];
    $this->region = WEST;
  }
}
