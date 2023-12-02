<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN060_Dervishes extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN060_Dervishes';
    $this->agents = [
      'number' => 1,
      'religion' => ISLAMIC,
      'type' => BISHOP,
    ];
    $this->empire = EAST;
    $this->flavorText = [
      clienttranslate('The Bektashi were followers of Haji Bektaşî, a dervish who found refuge in Anatolia in the 13th century. From here Bektashism sprad into the Balkans, where its leaders (known as deded or babas) helped convert many to Islam.'),
      clienttranslate('The Bektaşî Sufi order became the official order of the elite Janissaries.')
    ];
    $this->name = clienttranslate('Dervishes');
    $this->oneShot = APOSTACY_REFORMIST_ISLAMIC_ONE_SHOT;
    $this->prestige = [ISLAMIC];
    $this->region = EAST;
  }
}
