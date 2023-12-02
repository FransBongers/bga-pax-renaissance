<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN059_Safavids extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN059_Safavids';
    $this->flavorText = [
      clienttranslate("Shah Ismāil I founded the Safavid dynasty in 1501. This united Iran, previously Sunni, under the Twelver school of Shi'a Islam, marking the beginning of modern Persian history."),
      clienttranslate("By 1511 pro-Shi'a uprisings erupted in the neighboring Ottoman Empire, a Sunni dynasty, and the Turkish Sultan responded by conquering Safavid Iran.")
    ];
    $this->name = clienttranslate('Safavids');
    $this->prestige = [ISLAMIC];
    $this->region = EAST;
  }
}
