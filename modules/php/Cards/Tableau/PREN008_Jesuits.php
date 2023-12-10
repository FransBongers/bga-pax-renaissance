<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN008_Jesuits extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN008_Jesuits';
    $this->agents = [
      [
        'religion' => CATHOLIC,
        'type' => BISHOP,
      ]
    ];
    $this->empire = ARAGON;
    $this->flavorText = [
      clienttranslate("Ignatius of Loyola was a Spanish knight who had a spiritual vision after a near death experience in the battlefield. Loyola's devotion to the Catholic Church was characterized by absolute obedience to the Pope."),
      clienttranslate('In 1534 he founded the Society of Jesus (Jesuits) and later became its first Superior General. The Jesuits became a major factor in the Counter-Reformation.')
    ];
    $this->name = clienttranslate('Jesuits');
    $this->oneShot = CRUSADE_ONE_SHOT;
    $this->ops = [
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Council of Trent'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
  }
}
