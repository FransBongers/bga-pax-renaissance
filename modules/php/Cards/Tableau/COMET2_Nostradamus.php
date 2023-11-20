<?php
namespace PaxRenaissance\Cards\Tableau;

class COMET2_Nostradamus extends \PaxRenaissance\Models\CometCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'COMET2_Nostradamus';
    $this->flavorText = [
      clienttranslate('The first edition of the book "Les Propheties" appeared in 1555. Written by Nostradamus, a French apothecary noted for his anti-plague "rose pill", it was not condemned since the Inquisition targeted only magic, not prophecy or astrology. Queen Catherine de\' Medici appointed Nostradamus as court astrologer and physician.')
    ];
    $this->name = clienttranslate('Astrology of Nostradamus');
    $this->region = EAST;
  }
}
