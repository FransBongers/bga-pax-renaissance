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
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Models\Border;

class RegimeChangeEmancipation extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_REGIME_CHANGE_EMANCIPATION;
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

  public function stRegimeChangeEmancipation()
  {


    $options = $this->getTokensToEmancipate();

    if (count($options) === 0) {
      $this->resolveAction(['automatic' => true]);
    }
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsRegimeChangeEmancipation()
  {
    $options = $this->getTokensToEmancipate();

    return [
      'options' => $options
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

  public function actPassRegimeChangeEmancipation()
  {
    $player = self::getPlayer();
    Notifications::regimeChangeSkipEmancipation($player);
    Engine::resolve(PASS);
  }

  public function actRegimeChangeEmancipation($args)
  {
    self::checkAction('actRegimeChangeEmancipation');
    $tokenId = $args['tokenId'];
    $locationId = $args['locationId'];

    $options = $this->getTokensToEmancipate();

    if (!isset($options[$tokenId])) {
      throw new \feException("Not allowed to move selected Token");
    }

    $locations = $options[$tokenId]['locations'];
    $location = Utils::array_find($locations, function ($option) use ($locationId) {
      return $option->getId() === $locationId;
    });
    if ($location === null) {
      throw new \feException("Not allowed to move Token to selected location");
    }

    Tokens::get($tokenId)->move($location->getId());

    Engine::proceed();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function getTokensToEmancipate()
  {
    $info = $this->ctx->getInfo();

    $empireIds = isset($info['empireIds']) ? $info['empireIds'] : [$this->ctx->getParent()->getInfo()['empireId']];

    $options = [];

    foreach ($empireIds as $empireId) {
      $empire = Empires::get($empireId);
      $empireCard = Cards::get($empire->getEmpireSquareId());

      $borders = $empire->getBorders(true);
      $cities = $empire->getCities(true);
      $numberOfEmptyBorders = count($borders);
      $numberOfEmptyCities = count($cities);

      $tokensOnCard = $empireCard->getTokens();

      foreach ($tokensOnCard as $token) {
        if (in_array($token->getType(), [KNIGHT, ROOK]) && $numberOfEmptyCities > 0) {
          $options[$token->getId()] = [
            'token' => $token,
            'locations' => $cities
          ];
        } else if ($token->getType() === PAWN && $numberOfEmptyBorders > 0) {
          $options[$token->getId()] = [
            'token' => $token,
            'locations' => $borders,
          ];
        }
      }
    }

    return $options;
  }
}
