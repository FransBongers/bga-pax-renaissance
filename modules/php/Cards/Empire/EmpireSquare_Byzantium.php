<?php

namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Byzantium extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Byzantium';
    $this->empire = BYZANTIUM;
    $this->flavorText = [
      KING => [
        clienttranslate('Trebizond, the last redoubt of the ancient Greeks, lay on the western shore of the Great Silk Road. Her last Emperor was the effeminate David of the Comnenus dynasty, who surrendered to the Turk in 1461.')
      ],
      REPUBLIC => [
        clienttranslate('Uzun Hasan of the White Sheep Turkomans conquered the Persian empire and married a Byzantine princess. Venice, Egypt, Cyprus, and Karamania sought his alliance against the Ottoman threat.')
      ],
    ];
    $this->name = [
      KING => clienttranslate('David Comnenus Basileus of Trebizond'),
      REPUBLIC => clienttranslate('Confederation of White Sheep Turkomen')
    ];
    $this->ops = [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("Despina Khatun of Ak Koyunlu"),
          'top' => 64.5,
          'left' => 4.5,
        ],
      ],
      REPUBLIC => [
        [
          'id' => COMMERCE_OP_EAST,
          'flavorText' => clienttranslate('Envoy of Venice, Caterino Zeno'),
          'top' => 64.5,
          'left' => 4.5,
        ],
      ]
    ];
    $this->startLocation = 'throne_byzantium';
    $this->side = $this->getExtraData('side');
  }
}
