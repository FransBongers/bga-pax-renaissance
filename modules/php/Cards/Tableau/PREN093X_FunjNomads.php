<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN093X_FunjNomads extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN093X_FunjNomads';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => KNIGHT,
      ]
    ];
    $this->empire = MAMLUK;
    $this->flavorText = [
      clienttranslate('In 1504 Funj peoples migrated into Nubia and established the Sennar sultanate. Backed by armies of heavy cavalry, the sultan seized control of the gold caravans and the profitable Red Sea trade.'),
      clienttranslate("His monopoly and claims of divinity was eroded by a wealthy class of educated and literate Islamic merchants, who fought the lack of orthodoxy in the kingdom.")
    ];
    $this->name = clienttranslate('Funj Nomads');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate("Royal monopoly"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Amara Dunqas'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => clienttranslate("Red Sea trade"),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = EAST;
  }
}
