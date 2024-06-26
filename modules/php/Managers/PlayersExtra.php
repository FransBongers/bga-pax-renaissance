<?php

namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Players;
/*
 * Table to store additional player data
 */

class PlayersExtra extends \PaxRenaissance\Helpers\DB_Manager
{
  protected static $table = 'player_extra';
  protected static $primary = 'player_id';
  protected static function cast($row)
  {
    return $row;
  }

  public static function setupNewGame()
  {
    // Globals::setFirstPlayer($this->getNextPlayerTable()[0]);
    $players = Players::getAll();

    $firstPlayerId = self::getFirstPlayer();
    Globals::setFirstPlayer($firstPlayerId);

    $turnOrder = Players::getTurnOrder($firstPlayerId);

    $florins = 3;
    foreach ($turnOrder as $playerId) {

      self::DB()->insert([
        'player_id' => $playerId,
        'florins' => $florins,
        'bank' => COLOR_BANK_MAP[$players[$playerId]->getColor()],
      ]);
      $florins += 1;
    }

    self::setBankerStats($firstPlayerId);
  }

  private static function setBankerStats($firstPlayerId)
  {
    $players = Players::getAll()->toArray();

    foreach (BANKS as $bank) {
      $inGame = Utils::array_some($players, function ($player) use ($bank) {
        return $player->getBank() === $bank;
      });
      $value = $inGame ? STAT_IN_GAME_YES : STAT_IN_GAME_NO;
      switch ($bank) {
        case FUGGER:
          Stats::setFuggerInGame($value);
          break;
        case MEDICI:
          Stats::setMediciInGame($value);
          break;
        case COEUR:
          Stats::setCoeurInGame($value);
          break;
        case MARCHIONNI:
          Stats::setMarchionniInGame($value);
          break;
        case BERENBERG:
          Stats::setBerenbergInGame($value);
          break;
        case MENDES:
          Stats::setMendesInGame($value);
          break;
      }
    }

    $startingBank = Players::get($firstPlayerId)->getBank();
    switch ($startingBank) {
      case FUGGER:
        Stats::setStartingBanker(STAT_BANKER_FUGGER);
        break;
      case MEDICI:
        Stats::setStartingBanker(STAT_BANKER_MEDICI);
        break;
      case COEUR:
        Stats::setStartingBanker(STAT_BANKER_COEUR);
        break;
      case MARCHIONNI:
        Stats::setStartingBanker(STAT_BANKER_MARCHIONNI);
        break;
      case BERENBERG:
        Stats::setStartingBanker(STAT_BANKER_BERENBERG);
        break;
      case MENDES:
        Stats::setStartingBanker(STAT_BANKER_MENDES);
        break;
    }
  }

  private static function getFirstPlayer()
  {
    $players = Players::getAll();

    $orderPriority = [FUGGER, BERENBERG, MARCHIONNI, MEDICI, MENDES, COEUR];

    foreach ($orderPriority as $bank) {
      $player = self::getPlayerForBank($players, $bank);
      if ($player !== null) {
        return $player->getId();
      }
    }
  }

  private static function getPlayerForBank($players, $bank)
  {
    return Utils::array_find($players->toArray(), function ($player) use ($bank) {
      return COLOR_BANK_MAP[$player->getColor()] === $bank;
    });
  }

  /*
   * get : returns the Player object for the given player ID
   */
  public static function get($playerId = null)
  {
    $playerId = $playerId ?: Players::getActiveId();
    return self::DB()
      ->where($playerId)
      ->getSingle();
  }
}
