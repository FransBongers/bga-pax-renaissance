<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN021_Conquistadors extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN021_Conquistadors';
    $this->agents = [
      'number' => 2,
      'religion' => CATHOLIC,
      'type' => KNIGHT,
    ];
    $this->empire = PORTUGAL;
    $this->flavorText = [
      clienttranslate('In Spanish Cuba in 1519, Hernán Cortés funded an expedition of 500 men to the Mexican mainland.'),
      clienttranslate('There, he successfully pitted some native groups against others, using the local interpreter Malinche. In the Aztec capital, he tool its emperor hostage and plundered its gold. The captured city was renamed Mexico City, later sacked during a native revolt.')
    ];
    $this->name = clienttranslate('Conquistadors');
    $this->oneShot = TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT;
    $this->prestige = [DISCOVERY];
    $this->region = WEST;
  }
}
