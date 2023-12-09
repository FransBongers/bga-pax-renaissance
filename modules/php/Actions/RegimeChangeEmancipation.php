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
    $parentInfo = $this->ctx->getParent()->getInfo();
    $empireId = $parentInfo['empireId'];

    $data = $this->getTokensToEmancipate($empireId);

    if (count($data['options']) === 0) {
      $this->resolveAction([]);
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
    $parentInfo = $this->ctx->getParent()->getInfo();
    $player = self::getPlayer();

    $empireId = $parentInfo['empireId'];

    $data = $this->getTokensToEmancipate($empireId);


    return $data;
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

  public function actRegimeChangeEmancipation($args)
  {
    self::checkAction('actRegimeChangeEmancipation');
    $tokenId = $args['tokenId'];
    $locationId = $args['locationId'];
    $player = self::getPlayer();

    if ($tokenId === null) {
      Notifications::regimeChangeSkipEmancipation($player);
      $this->resolveAction($args);
      return;
    }

    $parentInfo = $this->ctx->getParent()->getInfo();
    
    $empireId = $parentInfo['empireId'];

    $data = $this->getTokensToEmancipate($empireId);

    if (!isset($data['options'][$tokenId])) {
      throw new \feException("Not allowed to move selected Token");
    }

    $options = $data['options'][$tokenId];
    $location = Utils::array_find($options, function ($option) use ($locationId) {
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

  private function getTokensToEmancipate($empireId)
  {
    $empire = Empires::get($empireId);
    $empireCard = Cards::get($empire->getEmpireSquareId());

    $borders = $empire->getBorders(true);
    $cities = $empire->getCities(true);
    $numberOfEmptyBorders = count($borders);
    $numberOfEmptyCities = count($cities);

    $tokensOnCard = $empireCard->getTokens();

    $options = [];

    foreach($tokensOnCard as $token) {
      if (in_array($token->getType(), [KNIGHT, ROOK]) && $numberOfEmptyCities > 0) {
        $options[$token->getId()] = $cities;
      } else if ($token->getType() === PAWN && $numberOfEmptyBorders > 0) {
        $options[$token->getId()] = $borders;
      }
    }

    return [
      'tokens' => $tokensOnCard,
      'options' => $options,
    ];
  }
}
