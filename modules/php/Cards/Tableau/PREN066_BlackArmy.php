<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN066_BlackArmy extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN066_BlackArmy';
    $this->agents = [
      'number' => 2,
      'religion' => REFORMIST,
      'type' => KNIGHT,
    ];
    $this->empire = HUNGARY;
    $this->flavorText = [
      clienttranslate('Vuk Grgurević Branković was the titular Despot of Serbia under occupation of the Ottoman Empire. He ruled most of present-day Vojvodina under the overlordship of King Matthias Corvinus of Hungary.'),
      clienttranslate("Serbian epic poetry calls him Vuk the Fiery Dragon for his valor in commanding the Hungarian 'Black Army' against the Ottomans.")
    ];
    $this->name = clienttranslate('Black Army');
    $this->oneShot = REFORMATION_ONE_SHOT;
    $this->region = EAST;
  }
}
