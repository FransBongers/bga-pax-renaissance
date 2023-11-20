<?php
namespace PaxRenaissance\Cards\Tableau;

class COMET4_Regiomontanus extends \PaxRenaissance\Models\CometCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'COMET4_Regiomontanus';
    $this->flavorText = [
      clienttranslate('The astronomer and astrologer Regiomontanus of Nürnberg estimated the size and distance from Earth of this comet using the angle of parallax.')
    ];
    $this->name = clienttranslate('Regiomontanus & the Comet of 1472');
    $this->region = WEST;
  }
}
