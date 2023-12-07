<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN090_DukeOfAthens extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN090_DukeOfAthens';
    $this->agents = [
      [
        'religion' => REFORMIST,
        'type' => ROOK,
      ]
    ];
    $this->empire = OTTOMAN;
    $this->flavorText = [
      clienttranslate('The Acciaioli dynasty of Florence controlled the crusader state of Athens and aided the Medici against the rival Albizzi faction. When the Ottomans under Mehmed invaded, the last Duke of Athens, Francesco II Acciaioli, first held out in the Acropolis and then became a vassal (and lover) of Mehmed.'),
      clienttranslate("In 1460 the duke was humanely executed because of an alleged plot to reinstate him.")
    ];
    $this->name = clienttranslate('Duke of Athens');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->region = EAST;
  }
}
