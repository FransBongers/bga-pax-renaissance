<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Core\Notifications;

class PREN159X_ConsentOfTheGoverned extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN159X_ConsentOfTheGoverned';
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate("A government's legitimacy and moral right to use state power is only justified when consented to by the people over which that political power is exercised."),
      clienttranslate("This Enlightenment principle contradicted the divine right of kings, and was first promoted by Nicholas of Cusa, a German humanist."),
    ];
    $this->name = clienttranslate('Consent of the Governed');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->prestige = [LAW];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_3,
        'title' => clienttranslate('GERMAN HUMANISM'),
        'text' => [
          'log' => clienttranslate('Your ${tkn_prestige_patron} counts as ${tkn_prestige_law} for Renaissance Victory.'),
          'args' => [
            'tkn_prestige_patron' => PATRON,
            'tkn_prestige_law' => LAW,
          ],
        ],
      ]
    ];
  }

  public function activateAbility()
  {
    $owner = $this->getOwner();
    Notifications::activateAbility(SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_3, null, $owner === null ? null : $owner->getId() );
  }

  public function deactivateAbility()
  {
    $owner = $this->getOwner();
    Notifications::deactivateAbility(SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_3, null, $owner === null ? null : $owner->getId() );
  }
}
