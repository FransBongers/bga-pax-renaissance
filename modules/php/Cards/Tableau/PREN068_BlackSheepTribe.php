<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN068_BlackSheepTribe extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN068_BlackSheepTribe';
    $this->flavorText = [
      clienttranslate('Muzaffar al-Din Jahan Shah ibn Yusuf, the leader of the Kara Koyunlu Turkmen (Tribe of the Black Sheep) in Azerbaijan, Anatolia, and Arran. In 1447, he annexed portions of the Arabian Peninsula, Iraq, and Iran.'),
      clienttranslate('However, he was killed attempting to seize Diyar Bakr from the White Sheep Turkmen in 1466, and the Black Sheep Turkmen collapsed competely.')
    ];
    $this->name = clienttranslate('Black Sheep Tribe');
    $this->region = EAST;
  }
}
