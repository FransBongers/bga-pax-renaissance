<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN212P_SzapolyaFamily extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN212P_SzapolyaFamily';
    $this->ageOfReformationPromo = true;
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => KNIGHT,
      ],
      [
        'separator' => ISLAMIC,
        'type' => KNIGHT,
      ],
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      clienttranslate('In 1526, the king of Hungary was killed fighting the Turks. Archduke Ferdinand of Austria, the brother of Emperor Charles V and brother-in-law of the late king, claimed the crown.'),
      clienttranslate('Another pretender to the throne was John Szápolya, voivode of Transylvania, who conspirred with Sultan Suleiman to support his bid. Suleiman invaded the HRE and put Vienna into an unsuccessful siege.'),
    ];
    $this->name = clienttranslate("Szápolya Family");
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Siege of Vienna 1529"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Ottoman Tribute"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = WEST;
  }
}
