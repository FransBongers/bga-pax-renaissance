<?php

namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
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

    $firstPlayer = self::getFirstPlayer();
    Globals::setFirstPlayer($firstPlayer);

    $turnOrder = Players::getTurnOrder($firstPlayer);
    
    $florins = 3;
    foreach($turnOrder as $playerId) {
      
      self::DB()->insert([
        'player_id' => $playerId,
        'florins' => $florins,
        'bank' => COLOR_BANK_MAP[$players[$playerId]->getColor()],
      ]);
      $florins += 1;
    }

    // if (!$dbUpgrade) {
    //   self::setupTokens($playerId);
    // }
  }

  private static function getFirstPlayer() {
    $players = Players::getAll();

    // $fuggerPlayer = Utils::array_find($players->toArray(), function ($player) {
    //   return COLOR_BANK_MAP[$player->getColor()]=== FUGGER;
    // });
    $fuggerPlayer = self::getPlayerForBank($players, FUGGER);
    if ($fuggerPlayer !== null) {
      return $fuggerPlayer->getId();
    }
    $firstPlayerVariant = Globals::getFirstPlayerVariant();
    if (!$firstPlayerVariant) {
      return Game::get()->getNextPlayerTable()[0];
    }
    $marchionniPlayer = self::getPlayerForBank($players, MARCHIONNI);
    if ($marchionniPlayer !== null) {
      return $marchionniPlayer->getId();
    } else {
      return self::getPlayerForBank($players, MEDICI)->getId();
    }
  }

  private static function getPlayerForBank($players, $bank) {
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
