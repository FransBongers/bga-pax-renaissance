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

    

    if ($token->getType() === PIRATE) {
      Market::incMarketFlorins($region, 0, -1);
      Notifications::tradeFairProfitDispersalPirates($region);
    } else if ($token->getType() === PAWN) {

      $player = $token->getOwner();
      $amount = $this->getAmount($player, $region);
      Market::incMarketFlorins($region, 0, -$amount);
      $player->incFlorins($amount);
      Notifications::tradeFairProfitDispersalPlayer($player, $region, $amount);
    }

    if (Market::getMarketFlorins($region, 0) === 0) {
      $this->ctx->getParent()->resolve(['borderId' => $borderId]);
    }
    $this->resolveAction(['borderId' => $borderId]);
  }

  private function getAmount($player, $region) {
    $availableFlorins = Market::getMarketFlorins($region, 0);
    $cityId = $this->ctx->getInfo()['cityId'];

    $concessionCount = 1;
    if ($player->hasSpecialAbility(SA_CONCESSIONS_2X_TRADE_FAIRS_VOTES)) {
      $concessionCount = $concessionCount * 2;
    } 
    if ($cityId === SPICE_ISLANDS && $player->hasSpecialAbility(SA_CONCESSIONS_2X_SPICE_ISLANDS_TRADE_FAIRS_1)) {
      $concessionCount = $concessionCount * 2;
    }
    if ($cityId === SPICE_ISLANDS && $player->hasSpecialAbility(SA_CONCESSIONS_2X_SPICE_ISLANDS_TRADE_FAIRS_2)) {
      $concessionCount = $concessionCount * 2;
    }
    return min ($availableFlorins, $concessionCount);
  }
}
