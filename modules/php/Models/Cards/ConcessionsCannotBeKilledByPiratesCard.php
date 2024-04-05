<?php

namespace PaxRenaissance\Models\Cards;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;

class ConcessionsCannotBeKilledByPiratesCard extends \PaxRenaissance\Models\TableauCard
{

  public function deactivateAbility($owner = null)
  {
    foreach(SEA_BORDERS as $borderId) {
      $border = Borders::get($borderId);
      $tokens = $border->getTokens();
      if (count($tokens) < 2) {
        continue;
      }
      // This should always be true if there are 2 tokens on a border
      $hasPirate = Utils::array_some($tokens, function ($token) {
        return $token->getType() === PIRATE;
      });
      if (!$hasPirate) {
        continue;
      }
      foreach($tokens as $token) {
        if ($token->getType() === PAWN && !$token->getOwner()->hasSpecialAbility(SA_CONCESSIONS_CANNOT_BE_KILLED_BY_PIRATES)) {
          $token->returnToSupply(KILL);
        }
      }
    }
  }

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...


}
