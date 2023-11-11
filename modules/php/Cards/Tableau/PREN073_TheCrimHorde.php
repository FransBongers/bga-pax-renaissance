<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN073_TheCrimHorde extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN073_TheCrimHorde';
    $this->flavorText = [
      clienttranslate("In an agreement with the Genoese bankers in Caffa, Khan Haci I Giray of the Crim Horde received a percentage of the slave trade profits. Oberto Squarciafico, treasurer for Genoa at Caffa, invited the Ottomans to intervene in a 1475 dynastic feud among the Khan's sons. He hoped to thus become the next sea-consul of the Black Sea."),
      clienttranslate('Instead, the sultan executed him, deported all the Italians, and made the Khanate into an Ottoman vassal.')
    ];
    $this->name = clienttranslate('The Crim Horde');
    $this->region = EAST;
  }
}
