<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN029_HolyLandCrusade extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN029_HolyLandCrusade';
    $this->flavorText = [
      clienttranslate('Six years after the fall of Constantinople, Pope Pius II made an agonized plea for all Christendom to unite in a final crusade to retake the Holy Land.'),
      clienttranslate('Only Vlad the Impaler responded favorably, and the crusaders dissipated when the Medici withdrew their promise to provide transport.')
    ];
    $this->name = clienttranslate('Holy Land Crusade');
    $this->region = WEST;
  }
}
