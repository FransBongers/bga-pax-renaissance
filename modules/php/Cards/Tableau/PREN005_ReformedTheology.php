<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN005_ReformedTheology extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN005_ReformedTheology';
    $this->agents = [
      [
        'religion' => REFORMIST,
        'type' => BISHOP,
      ]
    ];
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('Huldrych Zwingli, a leader of the Swiss Reformation, clashed with Lutherans and Anabaptists.'),
      clienttranslate('His alliance of Reformed Swiss cantons warred with the cantons that remained Catholic, and Zwingli was killed in battle in 1531.')
    ];
    $this->name = clienttranslate('Reformed Theology');
    $this->oneShot = REFORMATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate('Marburg Colloquy'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [REFORMIST];
    $this->region = WEST;
  }
}
