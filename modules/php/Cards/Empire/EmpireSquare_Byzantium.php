<?php

namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Byzantium extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Byzantium';
    $this->empire = BYZANTIUM;
    $this->name = [
      KING => clienttranslate('David Comnenus Basileus of Trebizond'),
      REPUBLIC => clienttranslate('Confederation of White Sheep Turkomen')
    ];
    $this->ops = [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Despina Khatun of Ak Koyunlu"),
          'top' => 0,
          'left' => 0,
        ],
      ],
      REPUBLIC => [
        [
          'id' => COMMERCE_OP_EAST,
          'flavorText' => clienttranslate('TEnvoy of Venice, Caterino Zeno'),
          'top' => 0,
          'left' => 0,
        ],
      ]
    ];
    $this->startLocation = 'throne_byzantium';
    $this->side = $this->getExtraData('side');
  }
}
