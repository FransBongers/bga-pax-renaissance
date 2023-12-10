<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN039_FlorentineWool extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN039_FlorentineWool';
    $this->agents = [
      [
        'religion' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = PAPAL_STATES;
    $this->flavorText = [
      clienttranslate('The syndics of this wool guild ensured that quality standards were met and contracts were honored for all the looms throughout Florence. Production shifted from Garbo cloths exported to the Near East to the ligher rascias, suitable for the European luxury market. The market flourished during the peaceful Medici Era.'),
      clienttranslate('After 1494 however, a dispute between Milan and Naples turned Italy into a battleground between the Holy Roman Empire and France.')
    ];
    $this->name = clienttranslate('Florentine Wool');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Arte Della Lana guild'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = WEST;
  }
}
