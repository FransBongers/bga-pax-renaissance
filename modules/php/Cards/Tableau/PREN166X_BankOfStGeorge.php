<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN166X_BankOfStGeorge extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN166X_BankOfStGeorge';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ],
    ];
    $this->empire = BYZANTIUM;
    $this->flavorText = [
      clienttranslate('In 1453, the Republic of Genoa sold its Crimean possessions to the private Bank of St. George. The Jewish Ghisolfi family contined to manage Matrega on behald of the Bank.'),
      clienttranslate('Through such intermediaries as Khozi Kokos, they maintained relations with the rulers of Muscovy and other Russian principalities.'),
    ];
    $this->name = clienttranslate("Bank of St. George");
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->ops = [
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate("Sea Consul Jacques Doria"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = EAST;
    $this->specialAbilities = [
      [
        'id' => SA_PATRON_REDUCES_VOTE_OPS_COST,
        'title' => clienttranslate('JEWISH BANKERS:'),
        'text' => [
          'log' => clienttranslate('Each of your ${tkn_prestige} reduce the cost to run vote ops by 1.'),
          'args' => [
            'tkn_prestige' => PATRON,
          ],
        ],
      ]
    ];
  }
}
