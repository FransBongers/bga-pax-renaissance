<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN081_CrimeanGoths extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN081_CrimeanGoths';
    $this->flavorText = [
      clienttranslate('Several Gothic tribes settled the rugged highlands of Crimea, becoming the longest surviving Gothic culture. They sheltered refugees from the brutal Ottoman takeover of Caffa in 1475.'),
      clienttranslate('To justify his racist ambitions in the Crimea, Adolf Hitler claimed the region was still inhabited by German-speaking Goths, making them native Aryen peoples.')
    ];
    $this->name = clienttranslate('Crimean Goths');
    $this->prestige = [LAW];
    $this->region = EAST;
  }
}
