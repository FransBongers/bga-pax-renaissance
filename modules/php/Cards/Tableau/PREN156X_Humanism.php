<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN156X_Humanism extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN156X_Humanism';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => BISHOP,
      ],
    ];
    $this->empire = FRANCE;
    $this->flavorText = [
      clienttranslate('The embodiment of the humanist philosophy was Desiderius Erasmus, a humanist, Catholic priest, teacher, and theologian of the Dutch Renaissance. While critical of abuses of the Catholic Church, he continued to recognise Papal authority.'),
      clienttranslate("His middle way called for traditional faith, piety and grace, rejecting Luther's emphasis on faith alone. He also held to the Catholic doctrine of free will, rejecting predestination."),
    ];
    $this->name = clienttranslate('Humanism');
    $this->prestige = [PATRON];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_DECLARE_HOLY_COSTS_TWO_ACTIONS,
        'title' => '',
        'text' => [
          'log' => clienttranslate('Declaring Holy Victory costs 2 actions (all players).'),
          'args' => [],
        ],
        'allPlayers' => true,
      ],
      [
        'id' => SA_IMMUNE_TO_SILENCING,
        'title' => clienttranslate('COLLEGIUM TRINIGUE:'),
        'text' => [
          'log' => clienttranslate('Your cards are immune to silencing by Bishops.'),
          'args' => [],
        ],
      ]
    ];
  }

  public function discard($messageType = DISCARD, $player = null) {
    $owner = $this->getOwner();
    parent::discard($messageType, $player);

    // Check if owner has other cards with the ability
    if ($owner->hasSpecialAbility(SA_IMMUNE_TO_SILENCING)) {
      return;
    }
    // Trigger silence for all other owners cards with bishops
    $tableauCards = $owner->getTableauCards();
    foreach($tableauCards as $card) {
      if ($card->hasBishop()) {
        $card->silence();
      }
    }
  }
}
