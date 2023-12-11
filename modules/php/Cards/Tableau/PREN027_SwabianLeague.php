<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN027_SwabianLeague extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN027_SwabianLeague';
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
      clienttranslate('The Schwäbischer Bund was an alliance of Imperial Estates - free Imperial cities, prelates, principalities and knights. It was funded by the Archbishop of Mainz, whose conciliar views of the Reich often put him at odds with the emperor.'),
      clienttranslate("The League's Landsknechte fought expansionist Bavarian duked, Kempton and Swiss peasants rebelling against feudal duties (1491,1499), and the Bundschuh Uprising of 1524-1525. The League was disbanded by the Reformation.")
    ];
    $this->name = clienttranslate('Swabian League');
    $this->oneShot = APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN_ROOK,
        'flavorText' => clienttranslate('Bauernjörg, scourge of the peasants'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Imperial Ban'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = WEST;
  }
}
