<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN031_SwissRislaufer extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN031_SwissRislaufer';
    $this->agents = [
      [
        'religion' => CATHOLIC,
        'type' => KNIGHT,
      ],
    ];
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('As commanders increasingly sought long-term professionals rather than temporary feudal levies, they often contracted with Swiss Cantons. The cantonal militia system used highly trained regiments, battle-hardened from defending against the Habsburgs.'),
      clienttranslate('The Swiss had a virtual monopoly on the pike- and halbed-armed mercenary service.')
    ];
    $this->name = clienttranslate('Swiss Risläufer');
    $this->region = WEST;
  }
}
