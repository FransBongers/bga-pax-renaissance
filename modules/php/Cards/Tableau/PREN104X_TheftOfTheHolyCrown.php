<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN104X_TheftOfTheHolyCrown extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN104X_TheftOfTheHolyCrown';
    $this->flavorText = [
      clienttranslate("No king of Hungary was regarded as legitimate without a coronation using the Holy Crown of St. Stephen."),
      clienttranslate("In 1440 a very pregnant Queen Elisabeth, in hiding at Komorn Castle, commanded her nanny, Helene Kottanner, to steal the crown from her rivals in he Visegrád Stronghold. Helene crept over thin ice on the Danube and snuck into the fort. She bent the crown's cross during the cat burglary (above).")
    ];
    $this->name = clienttranslate('Theft of the Holy Crown');
    $this->oneShot = CORONATION_ONE_SHOT;

    $this->prestige = [CATHOLIC];
    $this->region = EAST;
  }
}
