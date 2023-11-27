<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\ChessPieces;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;

class TradeFairLevy extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_TRADE_FAIR_LEVY;
  }

  public function stTradeFairLevy()
  {
    $args = self::getPossibleLevies();
    Notifications::log('args',$args);
    if (count($args['possibleLevies']) === 0) {
      $this->resolveAction([]);
    }
  }

  public function argsTradeFairLevy()
  {
    $player = Players::get();
    $empireId = $this->ctx->getInfo()['empireId'];
    $empire = Empires::get($empireId);
    $cities = $empire->getCities();

    $data = [
      'possibleLevies' => [],
      'empire' => $empire,
    ];


    foreach($cities as $city) {
      $levy = $city->getPossibleLevy();
      if ($levy !== null) {
        $data['possibleLevies'][$city->getId()] = [
          'cityName' => $city->getName(),
          'levy' => $levy
        ];
      }
    }

    return $data;
  }

  // public function actPlayerAction($cardId, $strength)
  public function actTradeFairLevy($args)
  {
    self::checkAction('actTradeFairLevy');
    $cityId = $args['cityId'];

    $possible = self::getPossibleLevies();

    if (!isset($possible['possibleLevies'][$cityId])) {
      throw new \feException("Not allowed to place Levy in selected City");
    }
    $levy = $possible['possibleLevies'][$cityId]['levy'];

    $location = Locations::supply($levy['levyIcon'], $levy['religion']);

    $piece = ChessPieces::getTopOf($location);

    // TODO: check what to do if supply is empty
    if ($piece !== null) {
      ChessPieces::move($piece['id'], $cityId);
      $piece['location'] = $cityId;
      Notifications::tradeFairPlaceLevy(self::getPlayer(),Cities::get($cityId),$piece);
    }

    // $this->ctx->insertAsBrother(new LeafNode([
    //   'action' => PURCHASE_CARD,
    //   'playerId' => $this->ctx->getPlayerId(),
    //   'args' => [
    //     'cardId' => $args['cardId'],
    //   ],
    // ]));

    $this->resolveAction($args);
  }

  private function getPossibleLevies()
  {
    $empireId = $this->ctx->getInfo()['empireId'];
    $empire = Empires::get($empireId);
    $cities = $empire->getCities();

    $data = [
      'possibleLevies' => [],
      'empire' => $empire,
    ];


    foreach($cities as $city) {
      $levy = $city->getPossibleLevy();
      if ($levy !== null) {
        $data['possibleLevies'][$city->getId()] = [
          'cityName' => $city->getName(),
          'levy' => $levy
        ];
      }
    }

    return $data;
  }
}
