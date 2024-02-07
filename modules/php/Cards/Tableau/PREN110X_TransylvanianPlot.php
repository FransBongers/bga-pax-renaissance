<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN110X_TransylvanianPlot extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN110X_TransylvanianPlot';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => KNIGHT,
      ],
      [
        'separator' => REFORMIST,
        'type' => KNIGHT,
      ]
    ];
    $this->empire = HUNGARY;
    $this->flavorText = [
      clienttranslate('Alvise Gritti, son of the Doge of Venice, was simultaneously a regent of Hungary, a minister of the Sultan, a business partner of the Grand Vizier, a Venetian spy.'),
      clienttranslate("In 1533 he was betrayed to Carlos V as a double agent intriguing against the emperor with the Sultan, France, England, and Bavaria."),
      clienttranslate("In 1534, imperial troops killed Gritti in his attempted conquest of Transylvania.")
    ];
    $this->name = clienttranslate('Transylvanian Plot');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Medgyes siege"),
        'top' => 66.5,
        'left' => 4,
      ],
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate("Venetian spies"),
        'top' => 107,
        'left' => 4,
      ],
    ];
    $this->region = EAST;
    $this->specialAbilities = [
      [
        'id' => SA_EAST_AND_WEST_OPS_IN_ONE_ACTION,
        'title' => clienttranslate('GRITTI SPIES:'),
        'text' => [
          'log' => clienttranslate('May do east & west ops in one action.'),
          'args' => [],
        ],
        'abilityAction' => true,
        'top' => 0,
        'left' => 0,
        'height' => 0,
        'width' => 0,
      ]
    ];
  }
}
