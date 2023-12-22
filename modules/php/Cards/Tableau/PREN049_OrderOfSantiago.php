<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN049_OrderOfSantiago extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN049_OrderOfSantiago';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => ROOK,
      ],
      [
        'separator' => CATHOLIC,
        'type' => ROOK,
      ]
    ];
    $this->empire = PORTUGAL;
    $this->flavorText = [
      clienttranslate('Rodrigo Manrique de Lara, a hero of the Reconquista and a rebellious Spanish noble, led a committee of magnates against Henry IV "the impotent" of Castile. In 1465, de Lara participated in the "Farce of Ávila", symbolically executing an effigy of Henry IV.'),
      clienttranslate('After three years of civil war the nobles gained more power and Castile became less centralized.')
    ];
    $this->name = clienttranslate('Order of Santiago');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate('Cortes de Santarém'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('The Farce of Avila'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
  }
}
