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
use PaxRenaissance\Managers\TableauOps;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Models\Border;

/**
 * Note: not an action in itself.
 * It is extended from other actions in the place levy flow
 */
class PlaceLevy extends \PaxRenaissance\Models\AtomicAction
{
  public function getPossibleLevies()
  {
    $parentInfo = $this->ctx->getParent()->getInfo();
    $empireId = $parentInfo['empireId'];

    $empire = Empires::get($empireId);
    $cities = $empire->getCities();

    $data = [
      'possibleLevies' => [],
      'empire' => $empire,
    ];


    foreach ($cities as $city) {
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


  public function resolvePlaceLevy($cityId)
  {
    $city = Cities::get($cityId);

    $levy = $city->getPossibleLevy();

    if ($levy !== null) {
      $player = self::getPlayer();
      $supply = Locations::supply($levy['levyIcon'], $levy['separator']);

      Engine::insertAsChild(Flows::placeToken($player->getId(), $supply, $cityId, CITY), $this->ctx);
    }
  }
}
