<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN086_SaintStefanCelMare extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN086_SaintStefanCelMare';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => ROOK,
      ],
      [
        'separator' => REFORMIST,
        'type' => ROOK,
      ],
    ];
    $this->empire = HUNGARY;
    $this->flavorText = [
      clienttranslate('Stefan cel Mare, king of Moldavia, is a saint in the Orthodox Church.'),
      clienttranslate('Attending a wedding, he survived an assassination by his brother-in-law that killed his father the king. As king, he stopped Mehmed the Conqueror from overrunning the Ukraine at Vaslui, and also skillfully defended Moldavia against Poland and Hungary.'),
      clienttranslate('In 1503 he became an Ottoman vassal.')
    ];
    $this->name = clienttranslate('Saint Stefan cel Mare');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Christianae fidei athleta"),
        'top' => 66,
        'left' => 4,
      ],
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate("Orthodox Putna monastery"),
        'top' => 107,
        'left' => 4,
      ],
    ];
    $this->prestige = [REFORMIST];
    $this->region = EAST;
  }
}
