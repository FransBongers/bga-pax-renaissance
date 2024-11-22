<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN131X_Michelangelo extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN131X_Michelangelo';
    $this->empire = WEST;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate("Michelangelo Buonarroti, the greatest of the Renaissance artists, and perhaps the greatest sculptor ever. His art was in the Mannerism style, exaggerating balance and proportion in pursuit of harmonious beauty. Michelangelo was abstemious, reclusive, and devout."),
      clienttranslate("His infamous clashes with his patron Julius II was a clash of Titans, both admitting no compromise and acknowledging no superior.")
    ];
    $this->name = clienttranslate('Michelangelo');
    $this->prestige = [PATRON];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_CONCESSIONS_2X_TRADE_FAIRS_VOTES,
        'title' => clienttranslate("PATRON'S RENOWN"),
        'text' => [
          'log' => clienttranslate("Your Concessions count 2x during trade fairs and votes."),
          'args' => [],
        ],
      ]
    ];
  }
}
