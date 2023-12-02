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
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;

class PlaceAgents extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_PLACE_AGENTS;
  }

  public function stPlaceAgents()
  {
    // $args = self::getPossibleLevies();
    // if (count($args['possibleLevies']) === 0) {
    //   $this->resolveAction([]);
    // } else if (count($args['possibleLevies']) === 1) {
    //   $this->actTradeFairLevy([
    //     'cityId' => array_keys($args['possibleLevies'])[0]
    //   ]);
    // }
  }

  public function argsPlaceAgents()
  {
    // $player = Players::get();
    // $empireId = $this->ctx->getInfo()['empireId'];
    // $empire = Empires::get($empireId);
    // $cities = $empire->getCities();
    
    $info = $this->ctx->getInfo();
    $empireId = $info['empire'];
    $agents = $info['agents'];

    // $borders = ->getBorders();

    $data = [
      'locations' => $this->getPirateLocations([Empires::get($empireId)]),
      // 'info' => ,
      // 'possibleLevies' => [],
      // 'empire' => $empire,
    ];


    // foreach($cities as $city) {
    //   $levy = $city->getPossibleLevy();
    //   if ($levy !== null) {
    //     $data['possibleLevies'][$city->getId()] = [
    //       'cityName' => $city->getName(),
    //       'levy' => $levy
    //     ];
    //   }
    // }

    return $data;
  }

  // public function actPlayerAction($cardId, $strength)
  public function actPlaceAgents($args)
  {
    self::checkAction('actPlaceAgents');
    // $cityId = $args['cityId'];

    // $possible = self::getPossibleLevies();

    // if (!isset($possible['possibleLevies'][$cityId])) {
    //   throw new \feException("Not allowed to place Levy in selected City");
    // }
    // $levy = $possible['possibleLevies'][$cityId]['levy'];

    // $location = Locations::supply($levy['levyIcon'], $levy['religion']);

    // $token = Tokens::getTopOf($location);

    // // TODO: check what to do if supply is empty
    // if ($token !== null) {
    //   $token = $token->move($cityId);
    //   // Tokens::move($piece['id'], $cityId);
    //   // $piece['location'] = $cityId;
    //   Notifications::tradeFairPlaceLevy(self::getPlayer(),Cities::get($cityId),$token);
    // }

    // // $this->ctx->insertAsBrother(new LeafNode([
    // //   'action' => PURCHASE_CARD,
    // //   'playerId' => $this->ctx->getPlayerId(),
    // //   'args' => [
    // //     'cardId' => $args['cardId'],
    // //   ],
    // // ]));

    // $this->resolveAction($args);
  }

  private function getEmpires() {

  }

  private function getPirateLocations($empires) {
    $locations = [];
    foreach($empires as $empire) {
      $borders = $empire->getBorders();
      $seaBorders = Utils::filter($borders, function ($border) {
        return $border->isSeaBorder();
      });
      $locations = array_merge($locations, $seaBorders);
    }
    return $locations;
  }
}
