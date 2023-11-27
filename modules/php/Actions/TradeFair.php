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

class TradeFair extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_TRADE_FAIR;
  }

  public function stTradeFair()
  {
    // Notifications::log('stPurchaseCard', $this->ctx->getCardId());
    $region = $this->ctx->getInfo()['region'];
    Notifications::log('Trade Fair info', $region);

    $tradeFairs = Market::getTradeFairs();

    if (!isset($tradeFairs[$region])) {
      throw new \feException("Not allowed to start this trade fair");
    }

    $city = $tradeFairs[$region]['city'];

    $tradeRoute = $city->getTradeRoute();
    Notifications::log('tradeRoute', $tradeRoute);

    if ($tradeRoute === null) {
      throw new \feException("Not able to get trade route");
    }
    $player = self::getPlayer();

    Cards::move($tradeFairs[$region]['card']->getId(), DISCARD);
    $florinsFromChina = self::florinsFromChina($region);
    Notifications::tradeFairConvene($player, $region, $florinsFromChina);

    Globals::incRemainingActions(-1);
    self::emporiumSubsidy($player, $region);

    $profits = Market::getMarketFlorins($region, 0);
    if ($profits === 0) {
      Notifications::tradeFairNoVoyage();
    } else {
      self::addSiblings($tradeRoute, $region);
    }


    $this->resolveAction(['region' => $region]);
  }

  // TODO: Bankruptcy variant
  private function emporiumSubsidy($player, $region)
  {
    $player->incFlorins(1);
    Market::incMarketFlorins($region, 0, -1);
    Notifications::tradeFairEmporiumSubsidy($player, $region, 1);
  }

  private function florinsFromChina($region)
  {
    $playerCount = count(Players::getAll());
    $added = $playerCount <= 2 ? 1 : 2;
    Market::incMarketFlorins($region, 0, $added);
    return $added;
  }

  private function addSiblings($tradeRoute, $region)
  {
    $parent = $this->ctx->getParent();
    foreach ($tradeRoute as $location) {
      $action = Utils::startsWith($location, 'border') ? new LeafNode([
        'action' => TRADE_FAIR_PROFIT_DISPERSAL,
        'playerId' => $this->ctx->getPlayerId(),
        'borderId' => $location,
        'tradeFair' => $region,
      ]) : new LeafNode([
        'action' => TRADE_FAIR_LEVY,
        'playerId' => $this->ctx->getPlayerId(),
        'empireId' => $location,

      ]);
      $parent->pushChild($action);
    };
  }
}
