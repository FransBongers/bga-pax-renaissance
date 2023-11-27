<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\ChessPieces;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;

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
    Notifications::log('Trade Fair border', $borderId);

    $piece = ChessPieces::getTopOf($borderId);

    if ($piece === null) {
      $this->resolveAction(['borderId' => $borderId]);
      return;
    }
    $pieceId = $piece['id'];

    Market::incMarketFlorins($region, 0, -1);

    if (Utils::startsWith($piece['id'], 'pirate')) {
      Notifications::tradeFairProfitDispersalPirates($region);
    } else if (Utils::startsWith($pieceId, 'pawn')) {
      $bank = explode('_', $pieceId)[1];
      $player = Utils::filter(Players::getAll()->toArray(), function ($plyr) use ($bank) {
        return $plyr->getBank() === $bank;
      })[0];
      $player->incFlorins(1);
      Notifications::tradeFairProfitDispersalPlayer($player, $region);
    }

    if (Market::getMarketFlorins($region, 0) === 0) {
      $this->ctx->getParent()->resolve(['borderId' => $borderId]);
    }
    $this->resolveAction(['borderId' => $borderId]);
  }
}
