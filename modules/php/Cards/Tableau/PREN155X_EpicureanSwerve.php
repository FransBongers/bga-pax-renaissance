<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;

class PREN155X_EpicureanSwerve extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN155X_EpicureanSwerve';
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('The rediscovery of a book abouth the Greek philosopher Epicurus popularized the axiom that everything is a "swerve" of forces between eternal atoms. This the source of the earth, life, and free will. We are not special, the universe is not created for us, and we should morally pursue pleasure not pain.'),
      clienttranslate('The pope burned everything he could, but too late: Italy begun its own serve into modernity.'),
    ];
    $this->name = clienttranslate('Epicurean Swerve');
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
        'id' => SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_2,
        'title' => clienttranslate('On the Nature of Things'),
        'text' => [
          'log' => clienttranslate('This card counts as a Republic for a Renaissance Victory.'),
          'args' => [],
        ],
      ],
      [
        'id' => SA_IMMUNE_TO_APOSTASY,
        'title' => clienttranslate('RELIGION AS DELUSIONAL'),
        'text' => [
          'log' => clienttranslate('You are immune to apostasy.'),
          'args' => [],
        ],
      ]
    ];
  }

  public function activateAbility()
  {
    $owner = $this->getOwner();
    Notifications::activateAbility(SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_2, null, $owner === null ? null : $owner->getId() );
  }

  public function deactivateAbility($owner = null, $fromLocationId = null)
  {
    if ($fromLocationId !== null && Utils::startsWith($fromLocationId, 'hand')) {
      return;
    }

    Notifications::deactivateAbility(SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_2, null, $owner === null ? null : $owner->getId() );
  }
}
