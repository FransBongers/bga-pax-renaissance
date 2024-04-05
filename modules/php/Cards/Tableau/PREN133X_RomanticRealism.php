<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Core\Notifications;

class PREN133X_RomanticRealism extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN133X_RomanticRealism';
    $this->empire = PAPAL_STATES;
    $this->flavorText = [
      clienttranslate("Donatello, arguably the greatest of the Renaissance sculptors, created fiercely independent interpretations of republican ideals with great impact."),
      clienttranslate("His Judith and the Holofernes, made for Cosimo de' Medici, symbolized the victory of the weak over the strong in a just cause. When placed in Florence Piazza after the Medici downfall in 1490, it stirred a public outcry.")
    ];
    $this->name = clienttranslate('Romantic Realism');
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_2,
        'title' => clienttranslate('REPUBLICAN IDEALS'),
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
    Notifications::activateAbility(SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_2, null, $owner === null ? null : $owner->getId() );
  }

  public function deactivateAbility($owner = null)
  {
    Notifications::deactivateAbility(SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_2, null, $owner === null ? null : $owner->getId() );
  }
}
