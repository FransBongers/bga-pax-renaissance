<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN033_SchwarzerHaufen extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN033_SchwarzerHaufen';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => KNIGHT,
      ]
    ];
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('The Frankish "Black Host" under Florian Geyer of the Swabian League was the only heavy cavalry in European history to fight for a peasant revolution.'),
      clienttranslate('Fighting both Protestant and Imperial knights under the motto "Nulla crux, null corona" (Neither cross nor crown), Geyer demanded abolition of all political posts except the Emperor.')
    ];
    $this->name = clienttranslate('Schwarzer Haufen');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate('Reformatio Sigismundi'),
        'top' => 66.5,
        'left' => 111,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Nulla crux, nulla corona'),
        'top' => 105.5,
        'left' => 111,
      ]
    ];
    $this->region = WEST;
  }
}
