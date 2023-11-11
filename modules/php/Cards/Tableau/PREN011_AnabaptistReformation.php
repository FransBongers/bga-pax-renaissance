<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN011_AnabaptistReformation extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN011_AnabaptistReformation';
    $this->flavorText = [
      clienttranslate('The Anabaptists, so called because they rebaptized adult believers, are a radical wing of the Protestant Reformation. They include the Mennonites, followers of the Dutch priest Menno Simons.'),
      clienttranslate('The painting commemorates an Anabaptist marty, who while escaping from prison, stopped to save the life of a pursuer, and so was recaptured and burned at the stake.')
    ];
    $this->name = clienttranslate('Anabaptist Reformation');
    $this->region = WEST;
  }
}
