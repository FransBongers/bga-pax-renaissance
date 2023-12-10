<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN023_SpanishTercio extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN023_SpanishTercio';
    $this->agents = [
      [
        'religion' => CATHOLIC,
        'type' => KNIGHT,
      ]
    ];
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('This infantry formation, made up of pikemen, swordsmen and arquebusiers or musketeers in a combined arms formation, were deployed all over Europe under the Habsburg Emperors, who were kings of both Spain and the Holy Roman Empire.'),
      clienttranslate('Composed of highly trained volunteers, they dominated supreme on European battlefields.')
    ];
    $this->name = clienttranslate('Spanish Tercio');
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Combined arms mercenaries'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = WEST;
  }
}
