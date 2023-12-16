<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN160X_JacquesLefevreDEtaples extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN160X_JacquesLefevreDEtaples';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => BISHOP,
      ],
    ];
    $this->empire = FRANCE;
    $this->flavorText = [
      clienttranslate("Although this humanist theologian and Aristotelian scholar remained a Roman Catholic, his attempts at reform anticipated the Protestant movement."),
      clienttranslate("His efforts were branded as heresy and only the protection of the French king saved him from the pyre."),
    ];
    $this->name = clienttranslate("Jacques Lefèvre d'Étaples");
    $this->oneShot = REFORMATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate('Reformed Church'),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [REFORMIST];
    $this->region = WEST;
  }
}
