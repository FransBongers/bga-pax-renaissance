<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN102X_SahnISemanMadrese extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN102X_SahnISemanMadrese';
    $this->empire = OTTOMAN;
    $this->flavorText = [
      clienttranslate("The Ottoman Medrese (Islamic University) complex in Constantinople became Islam's greatest educational facility of theology, law, medicine, astonomy, physics and mathematics."),
      clienttranslate("It was founded in 1470 by Turk astronomer Ali Kuşçu, whose studies of the shape and size of the Earth, longitude and latitude, and the motions of the stars were a boon to nautical navigation.")
    ];
    $this->name = clienttranslate('Sahn-i Seman Madrese');
    $this->prestige = [DISCOVERY];
    $this->region = EAST;
  }
}