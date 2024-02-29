<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\Flows;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Models\Border;

class BishopDietOfWorms extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_BISHOP_DIET_OF_WORMS;
  }

  // ..######..########....###....########.########
  // .##....##....##......##.##......##....##......
  // .##..........##.....##...##.....##....##......
  // ..######.....##....##.....##....##....######..
  // .......##....##....#########....##....##......
  // .##....##....##....##.....##....##....##......
  // ..######.....##....##.....##....##....########

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function stBishopDietOfWorms()
  {
    $info = $this->ctx->getInfo();
    $player = self::getPlayer();

    $tokenId = $info['tokenId'];

    $token = Tokens::get($tokenId);
    $locationId = $token->getLocation();

    $card = Cards::get($locationId);
    $tokensOnCard = $card->getTokens();

    $bishopsOnCard = [];
    $otherTokensOnCard = [];
    $cardIsSilenced = $card->isSilenced($card->getOwner());

    foreach ($tokensOnCard as $tokenOnCard) {
      if ($tokenOnCard->getType() === BISHOP) {
        $bishopsOnCard[] = $tokenOnCard;
      } else {
        $otherTokensOnCard[] = $tokenOnCard;
      }
    }

    // This should never be more than 2
    if (count($bishopsOnCard) >= 2) {
      foreach ($bishopsOnCard as $bishop) {
        $bishop->returnToSupply(KILL, $player);
      }
      if ($cardIsSilenced) {
        $card->activateAbility();
      }
      $this->resolveAction(['automatic' => true]);
      return;
    }

    // If Diet of worms doesn't trigger there are bishops left on the card
    // Check for other tokens and actions that trigger on silence
    $parent = $this->ctx->getParent();

    if (count($otherTokensOnCard) > 0) {
      $parent->pushChild(new LeafNode([
        'action' => BISHOP_PACIFICATION,
        'playerId' => $this->ctx->getPlayerId(),
        'tokenId' => $tokenId,
      ]));
    }

    $parent->pushChild(new LeafNode([
      'action' => BISHOP_SILENCE_CARD,
      'playerId' => $this->ctx->getPlayerId(),
      'cardId' => $card->getId(),
    ]));

    $this->resolveAction(['automatic' => true]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...


}
