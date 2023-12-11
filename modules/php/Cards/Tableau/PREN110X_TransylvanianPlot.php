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
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Medgyes siege"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate("Venetian spies"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = EAST;
  }
}
