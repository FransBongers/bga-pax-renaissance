<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN094X_ZaporozhianHost extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN094X_ZaporozhianHost';
    $this->agents = [
      [
        'religion' => REFORMIST,
        'type' => KNIGHT,
      ]
    ];
    $this->empire = BYZANTIUM;
    $this->flavorText = [
      clienttranslate("The Zaporozhian Sich was a semi-autonomous Cossacks' polity in the Ukraine. It grew rapidly in 1471 from serfs fleeing the second serfdom of the Polish-Lithuanian Commonwealth."),
      clienttranslate("The Zaporozhian Cossacks, sworn to Orthodox Christianity, challenged the authority of the Polish-Lithunian Commonwealth, the Tsardom of Russia, and the Crimean Khanate.")
    ];
    $this->name = clienttranslate('Zaporozhian Host');
    $this->oneShot = REFORMATION_ONE_SHOT;
    $this->prestige = [REFORMIST];
    $this->region = EAST;
  }
}
