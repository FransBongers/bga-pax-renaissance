<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN018_AlmeidaArmada extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN018_AlmeidaArmada';
    $this->flavorText = [
      clienttranslate('The program of the Portuguese admiral Alfonso de Albuquerque was to seize control of all maritime trade routes with the East. In 1513, Albuquerque "The Great" led an armada into the Red Sea and blockaded the Egyptian trade with India.'),
      clienttranslate('In desperation, the Mamluk Sultan made an alliance with his traditional rivals, the Ottomans.')
    ];
    $this->name = clienttranslate('Almeida Armada');
    $this->region = WEST;
  }
}
