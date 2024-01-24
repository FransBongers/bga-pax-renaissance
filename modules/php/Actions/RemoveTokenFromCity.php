<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\Flows;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\OneShots;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Models\Border;

/**
 * Use in case a token needs to returned for other reasons than battle
 * Right now used for Age of Reformation promo when Hungary / Ottoman
 * changes and Kviv / Constantinople city is removed
 */
class RemoveTokenFromCity extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_REMOVE_TOKEN_FROM_CITY;
  }

  // ..######..########....###....########.########
  // .##....##....##......##.##......##....##......
  // .##..........##.....##...##.....##....##......
  // ..######.....##....##.....##....##....######..
  // .......##....##....#########....##....##......
  // .##....##....##....##.....##....##....##......
  // ..######.....##....##.....##....##....########

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function stRemoveTokenFromCity()
  {
    $cities = $this->ctx->getInfo()['cities'];
    Notifications::log('stRemoveTokenFromCity', count($cities));
    Notifications::log('cities', $cities);
    if (count($cities) > 1) {
      return;
    }

    $city = Cities::get($cities[0]);
    $token = $city->getToken();
    if ($token !== null) {
      $token->returnToSupply(RETURN_TO_SUPPLY, self::getPlayer());
    }
    $this->resolveAction(['automatic' => true]);
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsRemoveTokenFromCity()
  {
    return [
      'options' => $this->getOptions()
    ];
  }

  //  .########..##..........###....##....##.########.########.
  //  .##.....##.##.........##.##....##..##..##.......##.....##
  //  .##.....##.##........##...##....####...##.......##.....##
  //  .########..##.......##.....##....##....######...########.
  //  .##........##.......#########....##....##.......##...##..
  //  .##........##.......##.....##....##....##.......##....##.
  //  .##........########.##.....##....##....########.##.....##

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function actRemoveTokenFromCity($args)
  {
    self::checkAction('actRemoveTokenFromCity');

    $options = $this->getOptions();
  
    $tokenId = $args['tokenId'];

    if (!isset($options[$tokenId])) {
      throw new \feException("Not allowed to remove Token");
    }

    $token = Tokens::get($tokenId);
    $player = self::getPlayer();
    // Note should alwaus be true at the moment since this state is only used to remove a 
    // Token from constantinople with Age of Reformation promo Golden Liberty
    $isInConstantinople = Utils::startsWith($token->getLocation(), 'constantinople');

    $token->returnToSupply(RETURN_TO_SUPPLY, $player);

    if ($isInConstantinople) {
      Empires::get(OTTOMAN)->moveTokensInConstantinopleLeft($player);
    }

    $this->resolveAction([]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getOptions()
  {
    $cities = $this->ctx->getInfo()['cities'];
    $options = [];
    foreach ($cities as $cityId) {
      $city = Cities::get($cityId);
      $token = $city->getToken();
      if ($token === null) {
        continue;
      }
      $options[$token->getId()] = $city->getName();
    }
    return $options;
  }
}
