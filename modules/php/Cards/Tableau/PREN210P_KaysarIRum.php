<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN210P_KaysarIRum extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN210P_KaysarIRum';
    $this->ageOfReformationPromo = true;
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => PIRATE,
      ],
    ];
    $this->empire = PAPAL_STATES;
    $this->flavorText = [
      clienttranslate('After conquering Constantinople the Ottoman sultans claimed to be the legitimate Roman emperors, in succession to the Byzantine Basileus. The "Caesars of Rome" claimed to be the rulers of the entire world by right.'),
      clienttranslate('To legitimize this claim, Mehmed II invaded and sacked Otranto, part of the Roman heartland, in 1480. Christian forces recaptured the city in the following year.'),
    ];
    $this->name = clienttranslate("Kaysar-i-Rûm");
    $this->oneShot = JIHAD_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Siege of Otranto'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => INQUISITOR_OP_ISLAMIC,
        'flavorText' => clienttranslate("Martyrs of Otranto"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => CORSAIR_OP_ISLAMIC,
        'flavorText' => clienttranslate("Adm Gedik Ahmed Pasha"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [ISLAMIC];
    $this->region = EAST;
  }
}
