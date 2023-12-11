<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN054_Marechaussee extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN054_Marechaussee';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => ROOK,
      ]
    ];
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate("Organized as a military force during the 100-years War, the maréchaussée was also known as the Marshalcy since its authority derived from the Marshal of France. It was the direct precursor of the French Gendarmerie Nationale."),
    ];
    $this->name = clienttranslate('Maréchaussée');
    $this->oneShot = APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate('Poll and maltoit taxes'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = WEST;
  }
}
