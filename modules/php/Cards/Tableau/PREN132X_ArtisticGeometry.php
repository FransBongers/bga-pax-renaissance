<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN132X_ArtisticGeometry extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN132X_ArtisticGeometry';
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      clienttranslate("Albrecht Dürer was a German painter, engraver, printmaker, mathematician, and theorist. His high-quality woodcuts established his reputation when he was still in his twenties, and is arguably the greatest astist of the Northern Renaissance."),
      clienttranslate("His vast body of work includes altarpieces, portraits and self-portraits (above), and copper engravings.")
    ];
    $this->name = clienttranslate('Artistic Geometry');
    $this->prestige = [PATRON];
    $this->region = WEST;
  }
}
