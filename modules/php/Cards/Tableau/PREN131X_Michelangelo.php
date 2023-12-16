<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN131X_Michelangelo extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN131X_Michelangelo';
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate("Michelangelo Buonarroti, the greatest of the Renaissance artists, and perhaps the greatest sculptor ever. His art was in the Mannerism style, exaggerating balance and proportion in pursuit of harmonious beauty. Michelangelo was abstemious, reclusive, and devout."),
      clienttranslate("His infamous clashes with his patron Julius II was a clash of Titans, both admitting no compromise and acknowledging no superior.")
    ];
    $this->name = clienttranslate('Michelangelo');
    $this->prestige = [PATRON];
    $this->region = WEST;
  }
}
