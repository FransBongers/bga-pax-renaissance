<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN015_HanseaticLeague extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN015_HanseaticLeague';
    $this->flavorText = [
      clienttranslate('The Hansa privateer Paúel Benecke commanded the Peter von Danzig (above), the first large vessel in the Baltic featuring edge-to-edge planking. During the Anglo-Hanseatic War, Benecke defeated the Enlish fleet at Zween in 1468.'),
      clienttranslate('In 1473, he seized a Medici Galleon in the North Sea. The Medici challenged the legality of this in the papal court, but failed to get their cargo returned.')
    ];
    $this->name = clienttranslate('Hanseatic League');
    $this->region = WEST;
  }
}
