<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN012_KnightsHospitaller extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN012_KnightsHospitaller';
    $this->agents = [
      'number' => 1,
      'religion' => CATHOLIC,
      'type' => PIRATE,
    ];
    $this->empire = OTTOMAN;
    $this->flavorText = [
      clienttranslate("Grand Master Pierre d'Aubusson of the Knights Hospitaller entrenched in the Island of Rhodes. His powerful and implacable navy routinely sank Barbary pirates and Turkish supply ships."),
      clienttranslate("In 1480 his forces barely repulsed a massive siege by Mehmed the Conqueror, during which d'Aubusson was wounded thrice. His reward was a cardinal's hat and papal independence.")
    ];
    $this->name = clienttranslate('Knights Hospitaller');
    $this->oneShot = APOSTACY_ISLAMIC_CATHOLIC_ONE_SHOT;
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
  }
}
