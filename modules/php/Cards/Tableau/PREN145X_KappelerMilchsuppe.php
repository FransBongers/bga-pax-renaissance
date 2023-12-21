<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN145X_KappelerMilchsuppe extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN145X_KappelerMilchsuppe';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ],
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      clienttranslate("In 1529, the Protestant Cantons of Switzerland marched against the Catholic Cantons. Last minute mediations by the Swiss Tagsatzung averted fighting."),
      clienttranslate('Instead, the armies peacefully shared Milchsuppe (milk soup), cooked in a pot placed exactly on the Cantonal border.'),
    ];
    $this->name = clienttranslate('Kappeler Milchsuppe');
    $this->ops = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate('Swiss federal diet'),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = WEST;
  }
}