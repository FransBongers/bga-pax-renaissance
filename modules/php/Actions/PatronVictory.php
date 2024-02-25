<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\Flows;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Log;
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

class PatronVictory extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_PATRON_VICTORY;
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

  public function stPatronVictory()
  {
    $players = Players::getAll()->toArray();

    $scores = [];

    foreach ($players as $player) {
      $patronPrestige = $player->getPrestige(true)[PATRON];
      $florins = $player->getFlorins();
      $auxScore = $patronPrestige * 100 + $florins;
      $playerId = $player->getId();
      Players::setPlayerScoreAux($playerId, $auxScore);
      $scores[] = [
        'bank' => $player->getBank(),
        'playerId' => $playerId,
        'score' => $auxScore,
      ];
    }

    Notifications::patronVictory();
    Stats::setVictoryType(STAT_VICTORY_TYPE_PATRON);
    Log::clearUndoableStepNotifications(true);

    usort($scores, function ($a, $b) {
      return $b['score'] - $a['score'];
    });

    $turnOrders = Globals::getCustomTurnOrders();
    $order = $turnOrders['default']['order'];

    if ($scores[0]['score'] > $scores[1]['score']) {
      switch ($scores[0]['bank']) {
        case FUGGER:
          Stats::setVictoryBanker(STAT_BANKER_FUGGER);
          break;
        case MEDICI:
          Stats::setVictoryBanker(STAT_BANKER_MEDICI);
          break;
        case COEUR:
          Stats::setVictoryBanker(STAT_BANKER_COEUR);
          break;
        case MARCHIONNI:
          Stats::setVictoryBanker(STAT_BANKER_MARCHIONNI);
          break;
        case BERENBERG:
          Stats::setVictoryBanker(STAT_BANKER_BERENBERG);
          break;
        case MENDES:
          Stats::setVictoryBanker(STAT_BANKER_MENDES);
          break;
      }
      $winnerId = $scores[0];
      $placeInTurnOrder = 1 + Utils::array_find_index($order, function ($playerId) use ($winnerId) {
        return $playerId === $winnerId;
      });
      Stats::setTurnOrderWinner($placeInTurnOrder);
    } else {
      Stats::setVictoryBanker(STAT_BANKER_NO_BANK);
      Stats::setTurnOrderWinner(0);
    }



    $winnerId = $player->getId();


    Game::get()->gamestate->jumpToState(ST_END_GAME);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...







}
