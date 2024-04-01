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
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;

class PlaceLevySelectCity extends \PaxRenaissance\Actions\PlaceLevy
{
  public function getState()
  {
    return ST_PLACE_LEVY_SELECT;
  }

  public function argsPlaceLevySelectCity()
  {
    return $this->getPossibleLevies();
  }

  // public function actPlayerAction($cardId, $strength)
  public function actPlaceLevySelectCity($args)
  {
    self::checkAction('actPlaceLevySelectCity');
    $cityId = $args['cityId'];

    $possible = $this->getPossibleLevies();

    if (!isset($possible['possibleLevies'][$cityId])) {
      throw new \feException("Not allowed to place Levy in selected City");
    }

    $this->resolvePlaceLevy($cityId);

    $this->resolveAction($args);
  }

}
