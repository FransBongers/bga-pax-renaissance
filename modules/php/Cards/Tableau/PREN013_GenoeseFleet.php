<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN013_GenoeseFleet extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN013_GenoeseFleet';
    $this->agents = [
      [
        'religion' => CATHOLIC,
        'type' => PIRATE,
      ]
    ];
    $this->empire = ARAGON;
    $this->flavorText = [
      clienttranslate('The condottiero Andrea Doria worked for the pope, various Italian princes, France, and the Emperor.'),
      clienttranslate('In his native Genoa, he expelled the French and reestablished the republic under 28 noble clans.'),
      clienttranslate('As imperial admiral of the Genoese fleet reporting to Charles V, he waged war on the Turks and Barbary pirates.')
    ];
    $this->name = clienttranslate('Genoese Fleet');
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate('Commerce raid'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => CORSAIR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Imperial Navy'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = WEST;
  }
}
