<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN106X_PrussianLeagueNavy extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN106X_PrussianLeagueNavy';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => PIRATE,
      ]
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      clienttranslate("The City of Danzig, recalling the Danzig massacre by the Teutonic Order and suffering high taxation, hired Polish privateers in 1461. Vincent Stolle, Matthew Kolmener, and Jacob Vochs used szniks (light merchant ships carrying 50 arquebusers and crossbowmen) that were highly successful in the 13-Years War."),
      clienttranslate("They pirated not only Teutonic galleys, but also Hansa ships from Lübeck, who had been bribed with favorable Teutonic trading rights.")
    ];
    $this->name = clienttranslate('Prussian League Navy');
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate("Anti-Hansa raid"),
        'top' => 67,
        'left' => 4,
      ],
      [
        'id' => CORSAIR_OP_CATHOLIC,
        'flavorText' => clienttranslate('Battle of Vistula Lagoon'),
        'top' => 106,
        'left' => 4,
      ],
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => clienttranslate('Danzig grain'),
        'top' => 150,
        'left' => 4,
      ]
    ];
    $this->prestige = [];
    $this->region = EAST;
  }
}
