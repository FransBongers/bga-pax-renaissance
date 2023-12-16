<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN134X_MiningEngineer extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN134X_MiningEngineer';
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate("Georgius Agricola, scholar, chemist, and mining engineer."),
      clienttranslate("His lavishly illustrated masterpiece, De re metallica, recorded Saxon mining technology, the best in the world."),
      clienttranslate("A staunch Catholic, he suffered persecution by the Lutherans of Chemnitz."),
    ];
    $this->name = clienttranslate('Mining Engineer');
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
  }
}
