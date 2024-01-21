<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\Flows;
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

    $tradeFairs = Market::getTradeFairs();

    if (!isset($tradeFairs[$region])) {
      throw new \feException("Not allowed to start this trade fair");
    }

    $city = $tradeFairs[$region]['city'];

    $tradeRoute = $city->getTradeRoute();

    if ($tradeRoute === null) {
      throw new \feException("Not able to get trade route");
    }
    $player = self::getPlayer();

    Cards::move($tradeFairs[$region]['card']->getId(), DISCARD);
    $florinsFromChina = self::florinsFromChina($region);
    Notifications::tradeFairConvene($player, $region, $florinsFromChina);

    $profits = Market::getMarketFlorins($region, 0);
    $profits = self::emporiumSubsidy($player, $region, $profits);

    
    if ($profits === 0) {
      Notifications::tradeFairNoVoyage();
    } else {
      self::addSiblings($tradeRoute, $region, $city->getId());
    }


    $this->resolveAction(['region' => $region, 'automatic' => true]);
  }

  // TODO: Bankruptcy variant
  private function emporiumSubsidy($player, $region, $profits)
  {
    $maxSubsidy = $player->hasSpecialAbility(SA_EMPORIUM_SUBSIDY_2_FLORINS) ? 2 : 1;
    $subsidy = min($profits, $maxSubsidy);

    $player->incFlorins($subsidy);
    Market::incMarketFlorins($region, 0, -$subsidy);
    Notifications::tradeFairEmporiumSubsidy($player, $region, $subsidy);
    return $profits - $subsidy;
  }

  private function florinsFromChina($region)
  {
    $playerCount = count(Players::getAll());
    $added = $playerCount <= 2 ? 1 : 2;
    Market::incMarketFlorins($region, 0, $added);
    return $added;
  }

  private function addSiblings($tradeRoute, $region, $cityId)
  {
    $parent = $this->ctx->getParent();
    foreach ($tradeRoute as $location) {
      $action = Utils::startsWith($location, 'border') ? new LeafNode([
        'action' => TRADE_FAIR_PROFIT_DISPERSAL,
        'cityId' => $cityId,
        'playerId' => $this->ctx->getPlayerId(),
        'borderId' => $location,
        'tradeFair' => $region,
      ]) : Engine::buildTree(Flows::placeLevy($location, $this->ctx->getPlayerId()));
      $parent->pushChild($action);
    };
  }
}
