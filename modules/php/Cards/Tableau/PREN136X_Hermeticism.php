<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Core\Notifications;

class PREN136X_Hermeticism extends \PaxRenaissance\Models\Cards\ImmuneToSilencingCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN136X_Hermeticism';
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('Giovanni Pico della Mirandola, a young genius who believed in syncretism (fundamentally opposed doctrines can be reconciled) and hermeticism (a single true theology exists in all religions).'),
      clienttranslate("His lifelong work tried to reconcile Aristotle's this-world orientation with the other-worldliness of Plato."),
    ];
    $this->name = clienttranslate('Hermeticism');
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
        'title' => clienttranslate('SYNCRETISM:'),
        'text' => [
          'log' => clienttranslate('Your cards are immune to silencing by Bishops.'),
          'args' => [],
        ],
      ]
    ];
  }
}
