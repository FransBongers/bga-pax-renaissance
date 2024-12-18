<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN122X_TheLastSigh extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN122X_TheLastSigh';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => ROOK,
      ],
    ];
    $this->empire = PORTUGAL;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate("The frontier between Islamic Granada and Christian Andalusia was in constant anarchy from raids, since both kingdoms were embroiled in internal succession wars."),
      clienttranslate("When Ferdinand and Isabella gained control of Spain, they invaded and annexed Granada, still engulfed in a struggle between the Nasrid Emir and his Boabdil. The spot where Boabdil last saw his Emirate is called \"the Moor's Last Sigh\""),
    ];
    $this->name = clienttranslate("The Last Sigh");
    $this->oneShot = TRADE_SHIFT_TIMBUKTU_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Castilian tribute"),
        'top' => 66.5,
        'left' => 4.5,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate("Mumhamed XII civil war"),
        'top' => 105.5,
        'left' => 4,
      ],
    ];
    $this->region = EAST;
    $this->specialAbilities = [
      [
        'id' => SA_EAST_AND_WEST_OPS_IN_ONE_ACTION,
        'title' => clienttranslate('LEO AFRICANUS'),
        'text' => [
          'log' => clienttranslate('May do east & west ops in one action.'),
          'args' => [],
        ],
        'abilityAction' => true,
        'top' => 155,
        'left' => 7,
        'height' => 44,
        'width' => 35,
      ]
    ];
  }
}
