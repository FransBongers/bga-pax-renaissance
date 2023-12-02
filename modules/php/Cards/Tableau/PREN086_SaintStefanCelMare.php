<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN086_SaintStefanCelMare extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN086_SaintStefanCelMare';
    $this->flavorText = [
      clienttranslate('Stefan cel Mare, king of Moldavia, is a saint in the Orthodoc Church.'),
      clienttranslate('Attending a wedding, he survived an assassination by this brother-in-law that killed his father the king. As king, he stopped Mehmed the Conqueror from overrunning the Ukraine at Vaslui, and also skillfullu defended Moldavia agains Poland and Hungary.'),
      clienttranslate('In 1503 he became an Ottoman vassal.')
    ];
    $this->name = clienttranslate('Saint Stefan cel Mare');
    $this->prestige = [REFORMIST];
    $this->region = EAST;
  }
}
