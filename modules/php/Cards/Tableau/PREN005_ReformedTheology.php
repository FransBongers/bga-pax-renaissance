<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN005_ReformedTheology extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN005_ReformedTheology';
    $this->flavorText = [
      clienttranslate('Huldrych Zwingli, a leader of the Swiss Reformation, clashed with Lutherans and Anabaptists.'),
      clienttranslate('His alliance of Reformed Swiss cantons warred with the cantons that remained Catholic, and Zwingli was killed in battle in 1531.')
    ];
    $this->name = clienttranslate('Reformed Theology');
    $this->prestige = [REFORMIST];
    $this->region = WEST;
  }
}
