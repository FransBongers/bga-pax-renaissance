<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN020_ArumerZwarteHoop extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN020_ArumerZwarteHoop';
    $this->agents = [
      'number' => 1,
      'religion' => ISLAMIC,
      'type' => PIRATE,
    ];
    $this->empire = FRANCE;
    $this->flavorText = [
      clienttranslate('When the Black Band (imperial troops) conquered free Frisia, they raped and killed the wife of Pier Gerlofs Donia. This man, known as "Grutte Pier" (Great Pier) because of this superhuman size and strength, led peasant guerillas on a rampage from 1515-20.'),
      clienttranslate('His pirate band in the Zuider Zee, the Arumer Zwarte Hoop, sank 28 imperial ships in the Dutch fleet.'),
    ];
    $this->name = clienttranslate('Arumer Zwarte Hoop');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->region = WEST;
  }
}
