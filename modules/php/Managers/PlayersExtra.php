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

    $fuggerPlayer = Utils::array_find($players->toArray(), function ($player) {
      return COLOR__BANK_MAP[$player->getColor()]=== FUGGER;
    });

    $firstPlayer = $fuggerPlayer !== null ? $fuggerPlayer->getId() : Game::get()->getNextPlayerTable()[0];
    Globals::setFirstPlayer($firstPlayer);

    $turnOrder = Players::getTurnOrder($firstPlayer);
    
    $florins = 3;
    foreach($turnOrder as $playerId) {
      
      self::DB()->insert([
        'player_id' => $playerId,
        'florins' => $florins,
        'bank' => COLOR__BANK_MAP[$players[$playerId]->getColor()],
      ]);
      $florins += 1;
    }

    // if (!$dbUpgrade) {
    //   self::setupTokens($playerId);
    // }
  }

  /*
   * get : returns the Player object for the given player ID
   */
  public static function get($pId = null)
  {
    $pId = $pId ?: Players::getActiveId();
    return self::DB()
      ->where($pId)
      ->getSingle();
  }
}
