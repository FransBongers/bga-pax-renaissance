<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN151X_CatherineOfNavarre extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN151X_CatherineOfNavarre';
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate('Upon the death of her brother the King, Catherine became queen of Navarre, a small Basque based kingdom in the Pyrenees. Her uncle also claimed the throne in a civil war (1483-1492) that rekindled the old Beaumont-Agramont feuds.'),
      clienttranslate('The Beaumonts favored Catherine (age 15) to marry the son of Isabella and Ferdinand. When she instead married a French lord, after Ferdinand subdued Granada, he invaded and annexed Navarre in 1512.'),
    ];
    $this->name = clienttranslate('Catherine of Navarre');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Basque War of the Bands'),
        'top' => 4.5,
        'left' => 111,
      ],
    ];
    $this->region = WEST;
    // Queen specific props
    $this->height = 104;
    $this->suitors = [
      PORTUGAL,
      FRANCE,
      ARAGON,
    ];
    $this->specialAbilities = [
      [
        'id' => SA_PORTUGAL_FRANCE_NOT_ADJACENT,
        'title' => clienttranslate('BUFFER STATE'),
        'text' => [
          'log' => clienttranslate('Portugal and France are not adjacent for all players.'),
          'args' => [],
        ],
      ]
    ];
  }
}
