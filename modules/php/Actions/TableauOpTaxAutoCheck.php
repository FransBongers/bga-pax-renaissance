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

class TableauOpTaxAutoCheck extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_TABLEAU_OP_TAX_AUTO_CHECK;
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

  public function stTableauOpTaxAutoCheck()
  {

    $info = $this->ctx->getInfo();

    $ownerId = $info['taxedPlayerId'];
    $empireId = $info['empireId'];
    $tokenId = $info['tokenId'];

    // Three things to check
    // 1. Can owner pay for the tax
    $owner = Players::get($ownerId);
    if ($owner->getFlorins() > 0) {
      $this->resolveNormalFlow($ownerId, $empireId, $tokenId);
      $this->resolveAction(['automatic' => true]);
      return;
    }

    // 2. Is there only one Levy to place or are there multiple options
    $empire = Empires::get($empireId);
    $cities = $empire->getCities();

    $possibleLevies = [];
    foreach ($cities as $city) {
      $levy = $city->getPossibleLevy();
      if ($levy !== null) {
        $possibleLevies[] = [
          'city' => $city,
          'levy' => $levy
        ];
      }
    }
    if (count($possibleLevies) > 1) {
      $this->resolveNormalFlow($ownerId, $empireId, $tokenId);
      $this->resolveAction(['automatic' => true]);
      return;
    }

    $levy = $possibleLevies[0]['levy'];
    // Levy
    // 'levyIcon' => KNIGHT,
    // 'separator' => CATHOLIC,
    

    // 3. Is a Token available or does it need to be selected from the map?
    $supply = Locations::supply($levy['levyIcon'], $levy['separator']);
    $token = Tokens::getTopOf($supply);

    if ($token === null) {
      $this->resolveNormalFlow($ownerId, $empireId, $tokenId);
      $this->resolveAction(['automatic' => true]);
      return;
    }

    // Resolve automatically
    $city = $possibleLevies[0]['city'];
    $this->resolveRepress($owner, $tokenId, $empireId);
    $city->placeToken($token, 0, $owner);

    $this->resolveAction(['automatic' => true]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function resolveNormalFlow($ownerId, $empireId, $tokenId)
  {
    $this->ctx->getParent()->pushChild(new LeafNode([
      'action' => TABLEAU_OP_TAX_FLORINS_CHECK,
      'playerId' => $ownerId,
      'empireId' => $empireId,
      'tokenId' => $tokenId,
    ]));


    $this->ctx->getParent()->pushChild(Engine::buildTree(Flows::placeLevy($empireId, $ownerId)));
  }

  private function resolveRepress($owner, $tokenId, $empireId)
  {
    Tokens::get($tokenId)->repress($empireId, 0, $owner);
  }
}
