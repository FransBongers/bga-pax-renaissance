<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN079_CarlottaLusignanOfCyprus extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN079_CarlottaLusignanOfCyprus';
    $this->flavorText = [
      clienttranslate('Carlotta was crowned queen of the Crusader State of Cyprus at age 14. Her illegitimate half-brother, Zacco, used a force of Mamluks supplied by the Grand Devitdar to seize the throne in 1460.'),
      clienttranslate('Despite military support from Rhodes, Pope Pius II, and Savoy, she was unable to regain her kingdom.')
    ];
    $this->name = clienttranslate('Carlotta Lusignan of Cyprus');
    $this->region = EAST;
  }
}
