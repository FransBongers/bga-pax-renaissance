<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\Tokens;

class PREN168X_ZionistState extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN168X_ZionistState';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ],
    ];
    $this->empire = MAMLUK;
    $this->flavorText = [
      clienttranslate('Gracia Mendes Nasi inherited the Mendes bank, and used its riches and trade networks to establish a Zionist state in Galilee.'),
      clienttranslate('Conversos and other refugees of the Jewish diaspora flocked to this sanctuary, despite the intrigues of the counter-reformation.'),
    ];
    $this->name = clienttranslate("Zionist State");
    $this->oneShot = REFORMATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => INQUISITOR_OP_REFORMIST,
        'flavorText' => clienttranslate("Anti-papal embargo"),
        'top' => 68,
        'left' => 4,
      ],
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => clienttranslate("Black Pepper Trade"),
        'top' => 106.5,
        'left' => 4,
      ],
    ];
    $this->prestige = [REFORMIST];
    $this->region = EAST;
    $this->specialAbilities = [
      [
        'id' => SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS,
        'title' => clienttranslate('SÜLEYMAN PATRONAGE'),
        'text' => [
          'log' => clienttranslate('Green Pirates count both as red Bishops and red units when calculating religious supremacy.'),
          'args' => [],
        ],
      ]
    ];
  }

  public function deactivateAbility()
  {
    Notifications::deactivateAbility(SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS, $this->getAbilityData() );
  }

  public function activateAbility()
  {
    Notifications::activateAbility(SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS, $this->getAbilityData() );
  }

  private function getAbilityData() {
    $pirates = Tokens::getOfTypeInLocation('pirate_islamic','border_');

    $tokenCount = 0;
    
    foreach($pirates as $pirate) {
      $border = Borders::get($pirate->getLocation());
      foreach($border->getAdjacentEmpires() as $empire) {
        if ($empire->getReligion() === REFORMIST) {
          $tokenCount += 1;
        }
      }
    }

    $data = [
      'bishops' => count($pirates),
      'tokens' => $tokenCount,
    ];
    return $data;
  }
}
