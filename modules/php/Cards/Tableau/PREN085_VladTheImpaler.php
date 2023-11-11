<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN085_VladTheImpaler extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN085_VladTheImpaler';
    $this->flavorText = [
      clienttranslate('Vlad III of the House of Dracul, Prince of Wallachia, was a member of the Order of the Dragons.'),
      clienttranslate("Dracula led the Romanians to initial victories against the Ottoman incursions, impaling his victims in a forest of stakes. Many appalled Boyars (nobles) defected to the Ottoman side, led by Vlad's hated brother Radu."),
      clienttranslate('Vlad was betrayed and imprisoned in 1462.')
    ];
    $this->name = clienttranslate('Vlad the Impaler');
    $this->region = EAST;
  }
}
