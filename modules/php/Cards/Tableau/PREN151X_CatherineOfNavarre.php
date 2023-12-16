<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN151X_CatherineOfNavarre extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN151X_CatherineOfNavarre';
    $this->flavorText = [
      clienttranslate('Upon the death of her brother the King, Catherine became queen of Navarre, a small Basque based kingdom in the Pyrenees. Her uncle also claimed the throne in a civil war (1483-1492) that rekindled the old Beaumont-Agramont feuds.'),
      clienttranslate('The Beaumonts favored Cahterine (age 15) to marry the son of Isabella and Ferdinand. When she instad married a French lord, after Ferdinand subdued Granada, he invaded and annexed Navarre in 1512.'),
    ];
    $this->name = clienttranslate('Catherine of Navarre');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Basque War of the Bands'),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = WEST;
  }
}
