<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN216P_MargaretOfParma extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN216P_MargaretOfParma';
    $this->ageOfReformationPromo = true;
    $this->flavorText = [
      clienttranslate("As governor of the Netherlands, Margaret faced the Dutch Revolt against the Inquisition and Spanish despotism."),
      clienttranslate('Promising to rein in religious persecution, she quelled anti-Catholic iconoclastic riots.'),
    ];
    $this->name = clienttranslate('Margaret of Parma');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Dutch Revolt'),
        'top' => 8,
        'left' => 111,
      ],
      [
        'id' => INQUISITOR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Iconoclastic Fury'),
        'top' => 49.5,
        'left' => 111,
      ],
    ];
    $this->region = WEST;
    // Queen specific props
    $this->height = 92;
    $this->suitors = [
      PORTUGAL,
      ARAGON,
      FRANCE,
      HOLY_ROMAN_EMIRE,
    ];
  }
}
