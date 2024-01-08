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

class CoronationOneShot extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_CORONATION_ONE_SHOT;
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

  public function stCoronationOneShot()
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

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsCoronationOneShot()
  {
    $info = $this->ctx->getInfo();
    $cardId = $info['cardId'];
    $card = Cards::get($cardId);

    $data = [
      'suitors' => OneShots::getSuitorsCoronation(self::getPlayer(), $card),
      'queen' => $card,
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

  public function actCoronationOneShot($args)
  {
    self::checkAction('actCoronationOneShot');

    $queen = Cards::get($this->ctx->getInfo()['cardId']);

    $cardId = $args['cardId'];
    $player = self::getPlayer();
    $suitors = OneShots::getSuitorsCoronation($player, $queen);

    $king = Utils::array_find($suitors, function ($suitor) use ($cardId) {
      return $suitor->getId() === $cardId;
    });

    if ($king === null) {
      throw new \feException("Not allowed to marry to selected King");
    }

    

    // $king->marry($player, $queen);
    // Notifications::coronation($player, $queen, $king);

    $this->ctx->insertAsBrother(Engine::buildTree(Flows::regimeChange($player->getId(), $king->getEmpireId(), CORONATION_ONE_SHOT, ['kingId' => $king->getId(), 'queenId' => $queen->getId()])));


    $this->resolveAction($args);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  // private function getSuitors($queen)
  // {


  //   $suitors = $queen->getSuitors();
  //   $playerId = self::getPlayer()->getId();

  //   $options = [];
  //   foreach ($suitors as $suitor) {
  //     $location = $suitor->getLocation();
  //     if ($suitor->getSide() === REPUBLIC) {
  //       continue;
  //     }

  //     if (Utils::startsWith($location, 'throne') || $location === Locations::tableau($playerId, WEST) || $location === Locations::tableau($playerId, EAST)) {
  //       $options[] = $suitor;
  //     }
  //   }
  //   return $options;
  // }
}
