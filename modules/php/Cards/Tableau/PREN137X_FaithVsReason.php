<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Core\Notifications;

class PREN137X_FaithVsReason extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN137X_FaithVsReason';
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('Michael Servetus, Spanish theologian, polymath scientist, and medical researcher.'),
      clienttranslate('In a cordial letter to the reformist John Calvin, he use logic to promote his ideas of a non-Trinitarian theology. Irritated, Calvin wrote to a friend "if my authority counts for anything, that man will not leave here alive." Servetus was illegally arrested by the Geneva council and burned at the stake as a heretic.'),
    ];
    $this->name = clienttranslate('Faith vs. Reason');
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
        'id' => SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_2,
        'title' => clienttranslate('Cartography'),
        'text' => [
          'log' => clienttranslate('Your ${tkn_prestige} count as Concessions in a Globalization Victory.'),
          'args' => [
            'tkn_prestige' => PATRON,
          ],
        ],
      ]
    ];
  }

  public function activateAbility()
  {
    $owner = $this->getOwner();
    Notifications::activateAbility(SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_2, null, $owner === null ? null : $owner->getId() );
  }

  public function deactivateAbility($owner = null)
  {
    Notifications::deactivateAbility(SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_2, null, $owner === null ? null : $owner->getId() );
  }
}
