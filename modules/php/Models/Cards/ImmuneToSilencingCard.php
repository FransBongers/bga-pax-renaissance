<?php

namespace PaxRenaissance\Models\Cards;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;

class ImmuneToSilencingCard extends \PaxRenaissance\Models\TableauCard
{

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...

  public function discard($messageType = DISCARD, $player = null) {
    $owner = $this->getOwner();
    $wasInTableau = $this->isInTableau();
    parent::discard($messageType, $player);

    if (!$wasInTableau || $owner === null) {
      return;
    }

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
