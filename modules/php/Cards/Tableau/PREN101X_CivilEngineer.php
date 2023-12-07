<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN101X_CivilEngineer extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN101X_CivilEngineer';
    $this->empire = EAST;
    $this->flavorText = [
      clienttranslate("Mimar Sinan, the chief Ottoman architect and civil engineer for sultans Süleyman the Magnificent, Selim II, and Murad III. His training as an army engineer led him to approach architecture from an empirical rather than theoretical point of view."),
      clienttranslate("Until his death at age 100, he built more than 300 major bridges, aqueducts, and mosques. His apprentices designed the Sultan Ahmed Mosque in Istanbul, Stari Most in Mostar, and the Taj Mahal in the Mughal Empire.")
    ];
    $this->name = clienttranslate('Civil Engineer');
    $this->prestige = [PATRON];
    $this->region = EAST;
  }
}
