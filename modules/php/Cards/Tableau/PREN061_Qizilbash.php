<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN061_Qizilbash extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN061_Qizilbash';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => BISHOP,
      ]
    ];
    $this->empire = EAST;
    $this->flavorText = [
      clienttranslate("The warlord Ismail I conquered Persia in 1501, declaring himself Shah of Azerbaijan and Iran. His Qizilbāsh followers declared him to be devine Shi'i birth, and the various Sufi orders followed suit."),
      clienttranslate("The establishment of the state religion of Shi'ism, opposed to the Sunni Islam of the Ottomans, marked the beginnings of modern Persian history.")
    ];
    $this->name = clienttranslate('Qizilbāsh');
    $this->oneShot = JIHAD_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Khurramites"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Shi'i militia"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => INQUISITOR_OP_ISLAMIC,
        'flavorText' => clienttranslate("Shi'i Alevi holocaust"),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [ISLAMIC];
    $this->region = EAST;
  }
}
