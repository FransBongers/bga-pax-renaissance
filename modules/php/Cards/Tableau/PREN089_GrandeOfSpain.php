<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN089_GrandeOfSpain extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN089_GrandeOfSpain';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => ROOK,
      ]
    ];
    $this->empire = BYZANTIUM;
    $this->flavorText = [
      clienttranslate('Rui Gomes da Silva, 1st Prince of Éboli. A Portuguese noble and an advisor to the king of Spain, known among foreign ambassadors as "Rey Gomes" (King Gomes).'),
      clienttranslate("He defended a federalist and compromise-oriented Spanish rule rather then a centralized monarchy. He was appointed Portuguese ambassador to Persia under Albuquerque the Great.")
    ];
    $this->name = clienttranslate('Grande of Spain');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Ebolist Party"),
        'top' => 66.5,
        'left' => 4.5,
      ],
      [
        'id' => REPRESS_OP_KNIGHT,
        'flavorText' => clienttranslate("Prince of Eboli"),
        'top' => 106,
        'left' => 4,
      ]
    ];
    $this->region = EAST;
  }
}
