<?php

namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\PlayersExtra;

use const PaxRenaissance\OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;
/*
 * Players manager : allows to easily access players ...
 *  a player is an instance of Player class
 */

class Players extends \PaxRenaissance\Helpers\DB_Manager
{
  protected static $table = 'player';
  protected static $primary = 'player_id';
  protected static function cast($row)
  {
    return new \PaxRenaissance\Models\Player($row);
  }

  public static function setupNewGame($players, $options)
  {
    // Globals::setPlayers($players);
    // Create players
    $gameInfos = Game::get()->getGameinfos();
    $colors = Utils::filter($gameInfos['player_colors'], function ($color) {
      if (Globals::getStartingMap() !== OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT) {
        return in_array($color, ["1084c7", "bddcc6", "732473", "ffce00"]);
      }
      return true;
    });
    // $colors = ['191716','bfc0c3'];
    // // $colors = $gameInfos['player_colors'];
    shuffle($colors);
    $query = self::DB()->multipleInsert([
      'player_id',
      'player_color',
      'player_canal',
      'player_name',
      'player_avatar',
      'player_score',
      // 'rupees'
    ]);

    $values = [];
    foreach ($players as $playerId => $player) {
      $color = array_shift($colors);
      $values[] = [$playerId, $color, $player['player_canal'], $player['player_name'], $player['player_avatar'], 0];
    }

    $query->values($values);

    // Game::get()->reattributeColorsBasedOnPreferences($players, $gameInfos['player_colors']);
    Game::get()->reloadPlayersBasicInfos();
    PlayersExtra::setupNewGame();
  }

  public static function anyPlayerHasSpecialAbility($specialAbilityId)
  {
    return Utils::array_some(self::getAll()->toArray(), function ($player) use ($specialAbilityId) {
      return $player->hasSpecialAbility($specialAbilityId);
    });
  }

  public static function getPlayerWithSpecialAbility($specialAbilityId)
  {
    return Utils::array_find(self::getAll()->toArray(), function ($player) use ($specialAbilityId) {
      return $player->hasSpecialAbility($specialAbilityId);
    });
  }

  public static function incFlorins($playerId, $increment)
  {
    $value = intval(PlayersExtra::get($playerId)['florins']) + $increment;
    return PlayersExtra::DB()->update(['florins' => $value], $playerId);
  }

  public static function getActiveId()
  {
    return (int) Game::get()->getActivePlayerId();
  }

  public static function getCurrentId()
  {
    return Game::get()->getCurrentPId();
  }

  public static function getAll()
  {
    $players = self::DB()->get(false);
    return $players;
  }

  /*
   * get : returns the Player object for the given player ID
   */
  public static function get($playerId = null)
  {
    $playerId = $playerId ?: self::getActiveId();
    return self::DB()
      ->where($playerId)
      ->getSingle();
  }

  public static function incScore($playerId, $increment)
  {
    $value = self::get($playerId)->getScore() + $increment;
    return self::DB()->update(['player_score' => $value], $playerId);
  }

  public static function setPlayerScoreAux($playerId, $value)
  {
    return self::DB()->update(['player_score_aux' => $value], $playerId);
  }

  public static function setPlayerScore($playerId, $value)
  {
    return self::DB()->update(['player_score' => $value], $playerId);
  }


  public function getMany($playerIds)
  {
    $players = self::DB()
      ->whereIn($playerIds)
      ->get();
    return $players;
  }

  public static function getActive()
  {
    return self::get();
  }

  public static function getCurrent()
  {
    return self::get(self::getCurrentId());
  }

  public static function getNextId($player)
  {
    $playerId = is_int($player) ? $player : $player->getId();

    $table = Game::get()->getNextPlayerTable();
    return (int) $table[$playerId];
  }

  public function getPrevId($player)
  {
    $playerId = is_int($player) ? $player : $player->getId();

    $table = Game::get()->getPrevPlayerTable();
    $playerId = (int) $table[$playerId];

    return $playerId;
  }

  /*
   * Return the number of players
   */
  public static function count()
  {
    return self::DB()->count();
  }

  /*
   * getUiData : get all ui data of all players
   */
  public static function getUiData($playerId)
  {
    return self::getAll()->map(function ($player) use ($playerId) {
      return $player->jsonSerialize($playerId);
    });
  }

  public static function getPlayerOrder()
  {
    $players = self::getAll()->toArray();
    usort($players, function ($a, $b) {
      return $a->getNo() - $b->getNo();
    });
    $playerOrder = array_map(function ($player) {
      return $player->getId();
    }, $players);
    return $playerOrder;
  }

  /*
   * Get current turn order according to first player variable
   */
  public static function getTurnOrder($firstPlayer = null)
  {
    $firstPlayer = $firstPlayer ?? Globals::getFirstPlayer();
    $order = [];
    $p = $firstPlayer;
    do {
      $order[] = $p;
      $p = self::getNextId($p);
    } while ($p != $firstPlayer);
    return $order;
  }

  /**
   * This activate next player
   */
  public function activeNext()
  {
    $playerId = self::getActiveId();
    $nextPlayer = self::getNextId((int) $playerId);

    Game::get()->gamestate->changeActivePlayer($nextPlayer);
    return $nextPlayer;
  }

  /**
   * This allow to change active player
   */
  public function changeActive($playerId)
  {
    Game::get()->gamestate->changeActivePlayer($playerId);
  }
}
