<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN109X_BrotherhoodOfStMark extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN109X_BrotherhoodOfStMark';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => KNIGHT,
      ]
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate('Grand Master Hans Talhoffer of the Marxbrüder fencing guild was granted the imperial monopoly on the title "master of the long sword" in 1487. A Zweihänder-Landsknecht with his certification was entitled to twice the pay of a normal soldier (Doppelsöldner).'),
      clienttranslate("Talhoffer was the leading duel adjudicator in trial by combat as encoded in Germanic law.")
    ];
    $this->name = clienttranslate('Brotherhood of St. Mark');
    $this->ops = [
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate("Kampf-probe legal dueling"),
        'top' => 67,
        'left' => 4,
      ],
    ];
    $this->region = EAST;
  }
}
