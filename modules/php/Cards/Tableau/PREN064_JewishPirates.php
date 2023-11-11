<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN064_JewishPirates extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN064_JewishPirates';
    $this->flavorText = [
      clienttranslate('Born to a Sephardic Jewish family which fled the Spanish Inquisition, Sinan Reis sailed as a Barbary corsair for Hayreddin Barbarossa. He used galleots, fast ships powered by sails and oars.'),
      clienttranslate("When Sinan's son was captured for ransom by imperial forces in 1540, Barbarossa led a successful rescue mission.")
    ];
    $this->name = clienttranslate('Jewish Pirates');
    $this->region = EAST;
  }
}
