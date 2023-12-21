<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN159X_ConsentOfTheGoverned extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN159X_ConsentOfTheGoverned';
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate("A government's legitimacy and moral right to use state power is only justiffied when consented to by the people over which that political power is exercised."),
      clienttranslate("This Enlightenment principle contradicted the divine right of kings, and was first promoted by Nicholas of Cusa, a German humanist."),
    ];
    $this->name = clienttranslate('Consent of the Governed');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->prestige = [LAW];
    $this->region = WEST;
  }
}