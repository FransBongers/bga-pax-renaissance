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

use const PaxRenaissance\OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

/**
 * Reconfigure tokens in Constantinople. There are two ways this gets triggered currently
 * 1. After a religious war
 * 2. When using Age of Reformation promo and Golden Liberty changes it to a medieval state
 */
class BattleReconfigureContantinople extends \PaxRenaissance\Models\AtomicAction
{
  private $constantinopleCities = [CONSTANTINOPLE_1, CONSTANTINOPLE_2, CONSTANTINOPLE_3];

  private $religiousWarOneShots = [
    CRUSADE_ONE_SHOT => CATHOLIC,
    JIHAD_ONE_SHOT => ISLAMIC,
    REFORMATION_ONE_SHOT => REFORMIST,
  ];

  public function getState()
  {
    return ST_BATTLE_RECONFIGURE_CONSTANTINOPLE;
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

  public function stBattleReconfigureContantinople()
  {
    $info = $this->ctx->getInfo();
    if (!(isset($info['source']) && $info['source'] == OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT)) {
      $parentInfo = $this->ctx->getParent()->getInfo();
      $source = $parentInfo['source'];

      if (!($parentInfo['battleVictorious'] && isset($this->religiousWarOneShots[$source]))) {
        $this->resolveAction(['automatic' => true]);
        return;
      }

      $empireId = $parentInfo['empireId'];

      if ($empireId !== OTTOMAN) {
        $this->resolveAction(['automatic' => true]);
        return;
      }
    }

    $constantinopleHasTokens = Utils::array_some($this->constantinopleCities, function ($cityId) {
      return Cities::get($cityId)->getToken() !== null;
    });

    if (!$constantinopleHasTokens) {
      $this->resolveAction(['automatic' => true]);
      return;
    }
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsBattleReconfigureContantinople()
  {
    $data = $this->getCurrentConfiguration();
    $data['canPlaceInConstantinople3'] = $this->canPlaceInConstantinople3();
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

  public function actBattleReconfigureContantinople($args)
  {
    self::checkAction('actBattleReconfigureContantinople');

    $this->validateConfig($args);

    $player = self::getPlayer();

    $tokens = [];

    foreach ($this->constantinopleCities as $cityId) {
      if ($args[$cityId] === null) {
        continue;
      }
      $token = Tokens::get($args[$cityId]);
      $token->move($cityId, false);
      $tokens[] = $token;
    }

    Notifications::moveTokensWithinConstantinople($player, $tokens);

    $this->resolveAction([]);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function canPlaceInConstantinople3()
  {
    $info = $this->ctx->getInfo();
    if (isset($info['source']) && $info['source'] == OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT) {
      return false;
    };
    return true;
  }

  private function getCurrentConfiguration()
  {
    $data = [];
    foreach ($this->constantinopleCities as $cityId) {
      $data[$cityId] = Cities::get($cityId)->getToken();
    };

    return $data;
  }

  private function validateConfig($args)
  {
    $current = $this->getCurrentConfiguration();
    $currentTokenIds = [];
    foreach ($current as $cityId => $token) {
      if ($token === null) {
        continue;
      }
      $currentTokenIds[] = $token->getId();
    }

    if (!$this->canPlaceInConstantinople3() && $args[CONSTANTINOPLE_3] !== null) {
      throw new \feException("Not a valid placement for Constantinople");
    }

    $argIds = [];
    foreach ($this->constantinopleCities as $cityId) {
      if ($args[$cityId] === null) {
        continue;
      }
      $argIds[] = $args[$cityId];
    }
    if (count($currentTokenIds) !== count($argIds)) {
      throw new \feException("Number of tokens does not match");
    }

    $hasNonMatchingIds = Utils::array_some($currentTokenIds, function ($tokenId) use ($argIds) {
      return !in_array($tokenId, $argIds);
    });
    if ($hasNonMatchingIds) {
      throw new \feException("Tokens do not match");
    }
  }
}
