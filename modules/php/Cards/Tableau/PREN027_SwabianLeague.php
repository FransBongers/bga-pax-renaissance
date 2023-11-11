<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN027_SwabianLeague extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN027_SwabianLeague';
    $this->flavorText = [
      clienttranslate('The Schwäbischer Bund was an alliance of Imperial Estates - free Imperial cities, prelates, principalities and knights. It was funded by the Archbishop of Mainz, whose conciliar views of the Reich often put him at odds with the emperor.'),
      clienttranslate("The League's Landsknechte fought expansionist Bavarian duked, Kempton and Swiss peasants rebelling against feudal duties (1491,1499), and the Bundschuh Uprising of 1524-1525. The League was disbanded by the Reformation.")
    ];
    $this->name = clienttranslate('Swabian League');
    $this->region = WEST;
  }
}
