<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN069_BashiBazouk extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN069_BashiBazouk';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => KNIGHT,
      ]
    ];
    $this->empire = EAST;
    $this->flavorText = [
      clienttranslate('The Bashi-bazouk, the irregular and undisciplined foot-soldiers of the Ottoman army, did not receive regular salaries and lived off loot. They were little more than legalized bandits.')
    ];
    $this->name = clienttranslate('Bashi-bazouk');
    $this->oneShot = REFORMATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Ottoman irregulars"),
        'top' => 67,
        'left' => 4,
      ]
    ];
    $this->region = EAST;
  }
}
