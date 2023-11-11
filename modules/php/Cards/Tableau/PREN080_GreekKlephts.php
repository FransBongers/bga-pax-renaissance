<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN080_GreekKlephts extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN080_GreekKlephts';
    $this->flavorText = [
      clienttranslate('Brigands of the Ottoman empire, the klephts were man who were fleeing taxes, debts, or reprisals from Ottoman officials.'),
      clienttranslate('Living in the rugged mountains of Greece and Cyprus, they preyed upon travelers and raided Ottoman caravans. Some became Armatoloi (militia), others continued the fight up to the Greek War of Independence (1821).')
    ];
    $this->name = clienttranslate('Greek Klephts');
    $this->region = EAST;
  }
}
