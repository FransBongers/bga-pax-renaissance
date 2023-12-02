<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN028_TheBold extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN028_TheBold';
    $this->agents = [
      'number' => 2,
      'religion' => CATHOLIC,
      'type' => KNIGHT,
    ];
    $this->empire = FRANCE;
    $this->flavorText = [
      clienttranslate('Charles the Bold, the ambitious Duke of Burgundy. To ally himself with England against his sworn enemy, Louis XI, he married Margaret of York. He led the Burgundian forces against rebellious Flanders cities, France, the Swiss, and the Empire.'),
      clienttranslate('Hie early death in battle disintegrated the Duchy of Burgundy, sparking 200 years of European wars over its lands.')
    ];
    $this->name = clienttranslate('The Bold');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->region = WEST;
  }
}
