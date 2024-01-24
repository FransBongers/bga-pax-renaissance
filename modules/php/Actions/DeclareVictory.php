<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Game;
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

class DeclareVictory extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_DECLARE_VICTORY;
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

  public function stDeclareVictory()
  {
    $info = $this->ctx->getInfo();
    $cardId = $info['cardId'];
    $player = self::getPlayer();
    $victoryCard = Cards::get($cardId);

    if (!$victoryCard->canBeDeclaredByPlayer($player)) {
      throw new \feException("This victory cannot be declared by player");
    }

    Notifications::declareVictory($player, $victoryCard);
    Players::setPlayerScore($player->getId(), 1);

    switch ($victoryCard->getId()) {
      case 'VictoryAgeOfByzantine':
        Stats::setVictoryType(STAT_VICTORY_TYPE_AGE_OF_BYZANTINE);
        break;
      case 'VictoryGlobalization':
        Stats::setVictoryType(STAT_VICTORY_TYPE_GLOBALIZATION);
        break;
      case 'VictoryImperial':
        Stats::setVictoryType(STAT_VICTORY_TYPE_IMPERIAL);
        break;
      case 'VictoryRenaissance':
        Stats::setVictoryType(STAT_VICTORY_TYPE_RENAISSANCE);
        break;
      case 'VictoryHoly':
        $supremeReligion = $victoryCard->getSupremeReligion();
        switch ($supremeReligion) {
          case CATHOLIC:
            Stats::setVictoryType(STAT_VICTORY_TYPE_HOLY_CATHOLIC);
            break;
          case ISLAMIC:
            Stats::setVictoryType(STAT_VICTORY_TYPE_HOLY_ISLAMIC);
            break;
          case REFORMIST:
            Stats::setVictoryType(STAT_VICTORY_TYPE_HOLY_REFORMIST);
            break;
        }
        break;
    }

    $bank = $player->getBank();
    switch ($bank) {
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
    }

    $turnOrders = Globals::getCustomTurnOrders();

    $order = $turnOrders['default']['order'];

    $winnerId = $player->getId();
    $placeInTurnOrder = 1+ Utils::array_find_index($order, function ($playerId) use ($winnerId) {
      return $playerId === $winnerId;
    });
    Stats::setTurnOrderWinner($placeInTurnOrder);


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
