<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN030_SantaHermandad extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN030_SantaHermandad';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ]
    ];
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('To keep the peace, Ferdinand and Isabella adopted the existing hermandad into a police force called Santa Hermandad (Holy Brotherhood) with themselves at its head. It was sanctioned with large powers of summary jurisdiction, even in capital cases.'),
      clienttranslate('The rough and ready justice of the Santa Hermandades became infamous for brutality.')
    ];
    $this->name = clienttranslate('Santa Hermandad');
    $this->oneShot = APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate('"Green Sleeves" police'),
        'top' => 65.5,
        'left' => 111,
      ],
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Alhambra Decree'),
        'top' => 109.5,
        'left' => 111,
      ]
    ];
    $this->region = WEST;
  }
}
