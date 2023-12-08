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
use PaxRenaissance\Managers\AtomicActions;
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Models\Border;

class AnnounceOneShot extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_ANNOUNCE_ONE_SHOT;
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

  public function stAnnounceOneShot()
  {
    $info = $this->ctx->getInfo();
    $cardId = $info['cardId'];

    $card = Cards::get($cardId);
    $oneShot = $card->getOneShot();

    $canOccur = $this->canOneShotOccur($oneShot);

    if ($canOccur) {
      return;
    }

    Notifications::oneShotNotPossible($oneShot);

    if ($card->getAgents() !== null) {
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => PLACE_AGENT,
        'playerId' => $this->ctx->getPlayerId(),
        'agents' => $card->getAgents(),
        'empireId' => $card->getEmpire(),
        'optional' => true,
        'repressCost' => 1,
      ]));
    }

    $this->resolveAction([]);
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsAnnounceOneShot()
  {

    $info = $this->ctx->getInfo();
    $cardId = $info['cardId'];

    $card = Cards::get($cardId);
    $oneShot = $card->getOneShot();

    $data = [
      'oneShot' => $oneShot,
    ];

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

  public function actAnnounceOneShot($args)
  {
    self::checkAction('actAnnounceOneShot');


    $oneShotOccurs = $args['occurs'];
    Notifications::log('actAnnounceOneShot', $oneShotOccurs);

    $info = $this->ctx->getInfo();
    $cardId = $info['cardId'];
    $card = Cards::get($cardId);
    $oneShot = $card->getOneShot();
    $player = self::getPlayer();

    if ($oneShotOccurs) {
      Notifications::oneShotOccurs($player, $oneShot);
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => $oneShot,
        'playerId' => $this->ctx->getPlayerId(),
        'cardId' => $cardId,
      ]));
    } else if ($card->getAgents() !== null) {
      Notifications::oneShotDoesNotOccur($player, $oneShot);
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => PLACE_AGENT,
        'playerId' => $this->ctx->getPlayerId(),
        'agents' => $card->getAgents(),
        'empireId' => $card->getEmpire(),
        'optional' => true,
      ]));
    }

    $this->resolveAction($args);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function canOneShotOccur($oneShot)
  {
    switch ($oneShot) {
      case APOSTACY_ISLAMIC_CATHOLIC_ONE_SHOT:
      case APOSTACY_REFORMIST_ISLAMIC_ONE_SHOT:
      case APOSTACY_REFORMIST_CATHOLIC_ONE_SHOT:
        return true;
      case TRADE_SHIFT_NOVGOROD_ONE_SHOT:
      case TRADE_SHIFT_RED_SEA_ONE_SHOT:
      case TRADE_SHIFT_TIMBUKTU_ONE_SHOT:
        return $this->tradeShiftCanOccur($oneShot);
        break;
      case TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT:
        return $this->tradeShiftCanOccur($oneShot) && $this->tradeShiftSpiceIslandHasPrestige();
        break;
      default:
        return false;
    }
  }

  private function tradeShiftCanOccur($oneShot)
  {
    $locationMap = [
      TRADE_SHIFT_NOVGOROD_ONE_SHOT => NOVGOROD,
      TRADE_SHIFT_RED_SEA_ONE_SHOT => RED_SEA,
      TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT => SPICE_ISLANDS,
      TRADE_SHIFT_TIMBUKTU_ONE_SHOT => TIMBUKTU,
    ];

    $cityId = $locationMap[$oneShot];
    $city = Cities::get($cityId);

    $token = $city->getToken();
    if ($token !== null && Utils::startsWith($token->getId(), DISK)) {
      return true;
    } else {
      return false;
    }
  }

  private function tradeShiftSpiceIslandHasPrestige()
  {
    $player = self::getPlayer();
    $playerPrestige = $player->getPrestige();
    $info = $this->ctx->getInfo();
    $cardId = $info['cardId'];
    $card = Cards::get($cardId);

    $cardPrestige = $card->getPrestige();
    $discoveryPrestigeOnCard = count(Utils::filter($cardPrestige, function ($cp) {
      return $cp === DISCOVERY;
    }));

    return $playerPrestige[DISCOVERY] - $discoveryPrestigeOnCard >= 1;
  }
}
