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
        'religion' => CATHOLIC,
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
    $this->region = EAST;
  }
}
