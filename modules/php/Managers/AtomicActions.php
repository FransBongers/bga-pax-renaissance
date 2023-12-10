<?php

namespace PaxRenaissance\Managers;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;

class AtomicActions
{
  // Mapping of actionId and corresponding class
  static $classes = [
    ANNOUNCE_ONE_SHOT => 'AnnounceOneShot',
    APOSTACY_ISLAMIC_CATHOLIC_ONE_SHOT => 'ApostacyOneShot',
    APOSTACY_REFORMIST_CATHOLIC_ONE_SHOT => 'ApostacyOneShot',
    APOSTACY_REFORMIST_ISLAMIC_ONE_SHOT => 'ApostacyOneShot',
    BATTLE_CASUALTIES => 'BattleCasualties',
    BATTLE_CHECK_BISHOP_AGENT => 'BattleCheckBishopAgent',
    BATTLE_CHECK_REGIME_CHANGE => 'BattleCheckRegimeChange',
    BATTLE_LOCATION => 'BattleLocation',
    BATTLE_MAP_CHANGE_RELIGIOUS_WAR => 'BattleMapChangeReligiousWar',
    BATTLE_RESULT => 'BattleResult',
    BISHOP_DIET_OF_WORMS => 'BishopDietOfWorms',
    BISHOP_PACIFICATION => 'BishopPacification',
    FLIP_VICTORY_CARD => 'FlipVictoryCard',
    PLACE_AGENT => 'PlaceAgent',
    PLAY_CARD => 'PlayCard',
    PLAYER_ACTION => 'PlayerAction',
    PURCHASE_CARD => 'PurchaseCard',
    REGIME_CHANGE_EMANCIPATION => 'RegimeChangeEmancipation',
    REGIME_CHANGE_GOLDEN_LIBERTY => 'RegimeChangeGoldenLiberty',
    REGIME_CHANGE_MOVE_EMPIRE => 'RegimeChangeMoveEmpireSquare',
    RESOLVE_DISCARD_CARD => 'ResolveDiscardCard',
    RESOLVE_PLACE_TOKEN => 'ResolvePlaceToken',
    SELL_CARD => 'SellCard',
    SELECT_TOKEN => 'SelectToken',
    TABLEAU_OP_COMMERCE => 'TableauOpCommerce',
    TABLEAU_OP_REPRESS => 'TableauOpRepress',
    TABLEAU_OPS_SELECT => 'TableauOpsSelect',
    TRADE_FAIR => 'TradeFair',
    TRADE_FAIR_PROFIT_DISPERSAL => 'TradeFairProfitDispersal',
    TRADE_FAIR_LEVY => 'TradeFairLevy',
    TRADE_SHIFT_NOVGOROD_ONE_SHOT => 'TradeShiftOneShot',
    TRADE_SHIFT_RED_SEA_ONE_SHOT => 'TradeShiftOneShot',
    TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT => 'TradeShiftOneShot',
    TRADE_SHIFT_TIMBUKTU_ONE_SHOT => 'TradeShiftOneShot',
  ];

  public static function get($actionId, $ctx = null)
  {
    if (!\array_key_exists($actionId, self::$classes)) {
      // throw new \feException(print_r(debug_print_backtrace()));
      // throw new \feException(print_r(Globals::getEngine()));
      throw new \BgaVisibleSystemException('Trying to get an atomic action not defined in Actions.php : ' . $actionId);
    }
    $name = '\PaxRenaissance\Actions\\' . self::$classes[$actionId];
    return new $name($ctx);
  }

  public static function getActionOfState($stateId, $throwErrorIfNone = true)
  {
    foreach (array_keys(self::$classes) as $actionId) {
      if (self::getState($actionId, null) == $stateId) {
        return $actionId;
      }
    }

    if ($throwErrorIfNone) {
      throw new \BgaVisibleSystemException('Trying to fetch args of a non-declared atomic action in state ' . $stateId);
    } else {
      return null;
    }
  }

  public static function isDoable($actionId, $ctx, $player)
  {
    $res = self::get($actionId, $ctx)->isDoable($player);
    return $res;
  }

  public static function getErrorMessage($actionId)
  {
    $actionId = ucfirst(mb_strtolower($actionId));
    $msg = sprintf(
      Game::get()::translate(
        'Attempting to take an action (%s) that is not possible. Either another card erroneously flagged this action as possible, or this action was possible until another card interfered.'
      ),
      $actionId
    );
    return $msg;
  }

  public static function getState($actionId, $ctx)
  {
    return self::get($actionId, $ctx)->getState();
  }

  public static function getArgs($actionId, $ctx)
  {
    $action = self::get($actionId, $ctx);
    $methodName = 'args' . $action->getClassName();
    $args = \method_exists($action, $methodName) ? $action->$methodName() : [];
    return array_merge($args, ['optionalAction' => $ctx->isOptional()]);
  }

  public static function takeAction($actionId, $actionName, $args, $ctx)
  {
    $player = Players::getActive();
    if (!self::isDoable($actionId, $ctx, $player)) {
      throw new \BgaUserException(self::getErrorMessage($actionId));
    }

    $action = self::get($actionId, $ctx);
    $methodName = $actionName; //'act' . self::$classes[$actionId];
    $action->$methodName($args);
  }

  /**
   * Execute state action
   */
  public static function stAction($actionId, $ctx)
  {
    $action = self::get($actionId, $ctx);
    $methodName = 'st' . $action->getClassName();
    if (\method_exists($action, $methodName)) {
      $action->$methodName();
    }
  }

  /**
   * Executes pass action as defined in atomic action
   */
  public static function pass($actionId, $ctx)
  {
    if (!$ctx->isOptional()) {
      self::error($ctx->toArray());
      throw new \BgaVisibleSystemException('This action is not optional');
    }

    $action = self::get($actionId, $ctx);
    $methodName = 'actPass' . $action->getClassName();
    if (\method_exists($action, $methodName)) {
      $action->$methodName();
    } else {
      Engine::resolve(PASS);
    }

    Engine::proceed();
  }
}
