<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN025_TeutonicKnights extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN025_TeutonicKnights';
    $this->flavorText = [
      clienttranslate('The Prussian Confederation, a coalition of Prussian cities and local nobility, sought independence from the oppressive Teutonic Knights.'),
      clienttranslate("They asked the Jagiellon king of Poland to annex Prussia, so they could share the privileges of Poland's golden liberty. They eventually prevailed against the knights and imperial troops under Grand Master Ludwig von Erlichshausen.")
    ];
    $this->name = clienttranslate('Teutonic Knights');
    $this->region = WEST;
  }
}
