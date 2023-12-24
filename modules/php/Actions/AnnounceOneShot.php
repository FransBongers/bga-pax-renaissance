<?php

namespace PaxRenaissance\Actions;

use Locale;
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
  private $battleOneShots = [CONSPIRACY_ONE_SHOT, PEASANT_REVOLT_ONE_SHOT, JIHAD_ONE_SHOT, CRUSADE_ONE_SHOT, REFORMATION_ONE_SHOT];

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

    $canOccur = $this->canOneShotOccur($oneShot, $card);

    if ($canOccur) {
      return;
    }

    Notifications::oneShotNotPossible($oneShot);

    if ($oneShot === CORONATION_ONE_SHOT) {
      $card->oldMaid(self::getPlayer());
    }

    if ($card->getAgents() !== null) {
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => PLACE_AGENT,
        'playerId' => $this->ctx->getPlayerId(),
        'agents' => $card->getAgents(),
        'empireId' => $card->getEmpireId(),
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

    $info = $this->ctx->getInfo();
    $cardId = $info['cardId'];
    $card = Cards::get($cardId);
    $oneShot = $card->getOneShot();
    $player = self::getPlayer();



    if ($oneShotOccurs) {
      $this->oneShotOccurs($player, $cardId, $oneShot);
    } else {
      $this->oneShotDoesNotOccur($player, $card, $oneShot);
    }

    $this->resolveAction($args);
  }

  private function oneShotOccurs($player, $cardId, $oneShot)
  {
    if (in_array($oneShot, $this->battleOneShots)) {
      Notifications::oneShotOccurs($player, $oneShot);
      $this->ctx->insertAsBrother(Engine::buildTree(Flows::battle($player->getId(), $oneShot, [
        'cardId' => $cardId
      ])));
    } else {
      Notifications::oneShotOccurs($player, $oneShot);
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => $oneShot,
        'playerId' => $this->ctx->getPlayerId(),
        'cardId' => $cardId,
      ]));
    }
  }

  private function oneShotDoesNotOccur($player, $card, $oneShot)
  {
    Notifications::oneShotDoesNotOccur($player, $oneShot);
    if ($card->getAgents() !== null) {
      $this->ctx->insertAsBrother(new LeafNode([
        'action' => PLACE_AGENT,
        'playerId' => $this->ctx->getPlayerId(),
        'agents' => $card->getAgents(),
        'empireId' => $card->getEmpireId(),
        'optional' => true,
      ]));
    }

    if ($oneShot === CORONATION_ONE_SHOT) {
      $card->oldMaid($player);
    }
  }
  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function canOneShotOccur($oneShot, $card)
  {
    switch ($oneShot) {
      case APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT:
      case APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT:
      case APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT:
      case CONSPIRACY_ONE_SHOT:
      case PEASANT_REVOLT_ONE_SHOT:
        return true;
      case CORONATION_ONE_SHOT:
        return $this->coronationCanOccur($card);
      case CRUSADE_ONE_SHOT:
        return $this->religiousWarCanOccur($card, [ISLAMIC, REFORMIST]);
      case JIHAD_ONE_SHOT:
        return $this->religiousWarCanOccur($card, [CATHOLIC, REFORMIST]);
      case REFORMATION_ONE_SHOT:
        return $this->religiousWarCanOccur($card, [CATHOLIC, ISLAMIC]);
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

  private function coronationCanOccur($card)
  {
    $suitors = $card->getSuitors();
    $playerId = self::getPlayer()->getId();
    return Utils::array_some($suitors, function ($empireCard) use ($playerId) {
      if ($empireCard->getSide() === REPUBLIC) {
        return false;
      }
      $location = $empireCard->getLocation();
      return Utils::startsWith($location, 'throne') || $location === Locations::tableau($playerId, WEST) || $location === Locations::tableau($playerId, EAST);
    });
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

  private function religiousWarCanOccur($card, $opposingReligions)
  {
    $empiresIds = $card->getAllEmpireIds(false);

    return Utils::array_some($empiresIds, function ($empireId) use ($opposingReligions) {
      $empire = Empires::get($empireId);

      return count($empire->getTokensInCities([KNIGHT, ROOK], $opposingReligions)) + count($empire->getTokensOnBorders([PIRATE], $opposingReligions)) > 0;
    });
  }
}
