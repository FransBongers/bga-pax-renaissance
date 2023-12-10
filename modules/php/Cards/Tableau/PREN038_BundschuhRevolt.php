<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN038_BundschuhRevolt extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN038_BundschuhRevolt';
    $this->agents = [
      [
        'religion' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      clienttranslate('In the German uprisings in the Tauber Valley (1476), Alsace (1493), Bruchsal (1502), Lehen (1513), and upper Rhine (1517), the peasants displayed a shoe (Bundschuh = tied shoe) on their flaf - symbolizing the rising and advance of their class.'),
      clienttranslate('They sought relief from arbitrary justice and taxes, costly ecclesiastic privileges and debts, serfdom, and prohibitions on hunting and fishing.')
    ];
    $this->name = clienttranslate('Bundschuh Revolt');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->region = WEST;
  }
}