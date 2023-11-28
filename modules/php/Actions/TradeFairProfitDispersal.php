<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;

class TradeFairProfitDispersal extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_TRADE_FAIR_PROFIT_DISPERSAL;
  }

  public function stTradeFairProfitDispersal()
  {
    $borderId = $this->ctx->getInfo()['borderId'];
    $region = $this->ctx->getInfo()['tradeFair'];

    $token = Tokens::getTopOf($borderId);

    if ($token === null) {
      $this->resolveAction(['borderId' => $borderId]);
      return;
    }
    $tokenId = $token->getId();

    Market::incMarketFlorins($region, 0, -1);

    if ($token->getType() === PIRATE) {
      Notifications::tradeFairProfitDispersalPirates($region);
    } else if ($token->getType() === PAWN) {
      $player = $token->getOwner();
      $player->incFlorins(1);
      Notifications::tradeFairProfitDispersalPlayer($player, $region);
    }

    if (Market::getMarketFlorins($region, 0) === 0) {
      $this->ctx->getParent()->resolve(['borderId' => $borderId]);
    }
    $this->resolveAction(['borderId' => $borderId]);
  }
}
