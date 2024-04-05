<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Core\Notifications;

class PREN103X_Academia extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN103X_Academia';
    $this->empire = HUNGARY;
    $this->flavorText = [
      clienttranslate("The Sodalitas Litterarum Vistulana of 1488 was an international society founded in Cracow by Conrad Celtes. It was active in mathematics, astronomy and the natural sciences. Notable members were Albert Brudzewski, Filip Callimachus, and Laurentius Corvinus."),
      clienttranslate("It was modelled after the Roman Academy, whose members were imprisoned by the anti-humanist Pope Paul II.")
    ];
    $this->name = clienttranslate('Academia');
    $this->ops = [
      [
        'id' => VOTE_OP_EAST,
        'flavorText' => clienttranslate("Academic society"),
        'top' => 66.5,
        'left' => 4,
      ],
    ];
    $this->prestige = [DISCOVERY];
    $this->region = EAST;
    $this->specialAbilities = [
      [
        'id' => SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_1,
        'title' => clienttranslate('SECULAR UNIVERSITY'),
        'text' => [
          'log' => clienttranslate('This card counts as a Republic for a Renaissance Victory.'),
          'args' => [],
        ],
      ]
    ];
  }

  public function activateAbility()
  {
    $owner = $this->getOwner();
    Notifications::activateAbility(SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_1, null, $owner === null ? null : $owner->getId() );
  }

  public function deactivateAbility($owner = null)
  {
    Notifications::deactivateAbility(SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_1, null, $owner === null ? null : $owner->getId() );
  }
}
