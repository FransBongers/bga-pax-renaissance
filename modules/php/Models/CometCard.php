<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;

class CometCard extends TableauCard
{
  public function purchase($player, $ctx = null)
  {
    $playerId = $player->getId();

    $cost = $this->getPurchaseCost();

    $placedFlorins = Market::payPurchaseCost($this);
    $floringsOnCard = Market::takeFlorinsOnCard($this);

    Players::incFlorins($playerId, $floringsOnCard - $cost);

    Cards::move($this->getId(), DISCARD);

    Notifications::purchaseCard($player, $this, $placedFlorins, $floringsOnCard, true);

    if ($ctx !== null) {
      $ctx->insertAsBrother(new LeafNode([
        'action' => FLIP_VICTORY_CARD,
        'playerId' => $ctx->getPlayerId(),
      ]));
    }
  }

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...

  public function isCometCard()
  {
    return true;
  }
}
