<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN009_HouseOfBorgia extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN009_HouseOfBorgia';
    $this->flavorText = [
      clienttranslate('A powerful and ambitious Italian family of diplomats condottieri, politicians, and two popes. One was Alexander VI (above), a corrupt and libertine pop whose reign contributed to the development of the Protestant Reformation.'),
      clienttranslate('The Borgias made enemies of the Medici, the Sforza, Savonarola, and many others. They were also patrons of the arts.')
    ];
    $this->name = clienttranslate("House of Borgia");
    $this->prestige = [PATRON];
    $this->region = WEST;
  }
}
