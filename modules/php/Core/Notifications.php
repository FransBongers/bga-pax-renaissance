<?php

namespace PaxRenaissance\Core;

class Notifications
{
  /*************************
   **** GENERIC METHODS ****
   *************************/
  protected static function notifyAll($name, $msg, $data)
  {
    self::updateArgs($data);
    Game::get()->notifyAllPlayers($name, $msg, $data);
  }

  protected static function notify($player, $name, $msg, $data)
  {
    $playerId = is_int($player) ? $player : $player->getId();
    self::updateArgs($data);
    Game::get()->notifyPlayer($playerId, $name, $msg, $data);
  }

  public static function message($txt, $args = [])
  {
    self::notifyAll('message', $txt, $args);
  }

  public static function messageTo($player, $txt, $args = [])
  {
    $playerId = is_int($player) ? $player : $player->getId();
    self::notify($playerId, 'message', $txt, $args);
  }

  public static function newUndoableStep($player, $stepId)
  {
    self::notify($player, 'newUndoableStep', clienttranslate('Undo here'), [
      'stepId' => $stepId,
      'preserve' => ['stepId'],
    ]);
  }

  public static function clearTurn($player, $notifIds)
  {
    self::notifyAll('clearTurn', clienttranslate('${tkn_playerName} restarts his turn'), [
      'player' => $player,
      'notifIds' => $notifIds,
    ]);
  }


  // public static function refreshInterface($data)
  // {
  //   self::notifyAll('refreshInterface', '', $data);
  // }

  // public static function smallRefreshInterface($data)
  // {
  //   self::notifyAll('smallRefreshInterface', '', $data);
  // }

  // public static function smallRefreshHand($player)
  // {
  //   $playerDatas = $player->jsonSerialize($player->getId());
  //   if (Globals::getOpenHands()) {
  //     self::notifyAll('smallRefreshHand', '', [
  //       'playerId' => $player->getId(),
  //       'hand' => $playerDatas['hand'],
  //     ]);
  //   } else {
  //     self::notify($player, 'smallRefreshHand', '', [
  //       'playerId' => $player->getId(),
  //       'hand' => $playerDatas['hand'],
  //     ]);
  //   }
  // }

  public static function refreshUI($datas)
  {
    // Keep only the thing that matters
    $fDatas = [
      // Add data here that needs to be refreshed
    ];

    self::notifyAll('refreshUI', '', [
      'datas' => $fDatas,
    ]);
  }

  public static function log($message, $data)
  {
    // Keep only the thing that matters
    $fDatas = [
      // Add data here that needs to be refreshed
    ];

    self::notifyAll('log', '', [
      'message' => $message,
      'data' => $data,
    ]);
  }

  /*************************
   **** GAME METHODS ****
   *************************/

  public static function flipVictoryCard($player, $card)
  {
    self::notifyAll("flipVictoryCard",  clienttranslate('${tkn_playerName} flips ${tkn_cardName}'), array(
      'player' => $player,
      'card' => $card,
      'tkn_cardName' => $card->getTitleActive(),
    ));
  }

  public static function purchaseCard($player, $card, $placedFlorins, $takenFlorins, $discard = false)
  {
    self::notifyAll("purchaseCard",  clienttranslate('${tkn_playerName} purchases ${tkn_cardName}'), array(
      'player' => $player,
      'card' => $card,
      'tkn_cardName' => $card->getName(),
      'placedFlorins' => $placedFlorins,
      'takenFlorins' => $takenFlorins,
      'discard' => $discard,
    ));
  }

  public static function refreshMarket($player, $cardMoves, $cardDraws)
  {
    self::notifyAll("refreshMarket",  clienttranslate('${tkn_playerName} refreshes the market'), array(
      'player' => $player,
      'cardMoves' => $cardMoves,
      'cardDraws' => $cardDraws,
    ));
  }

  public static function sellCard($player, $card, $value)
  {
    self::notifyAll("sellCard",  clienttranslate('${tkn_playerName} sells ${tkn_cardName} for ${value} ${tkn_florin}'), array(
      'player' => $player,
      'card' => $card,
      'value' => $value,
      'tkn_cardName' => $card->getName(),
      'tkn_florin' => clienttranslate('Florin(s)'),
    ));
  }

  public static function tradeFairConvene($player, $region, $florinsFromChina)
  {
    $message = [
      EAST => clienttranslate('${tkn_playerName} convenes an East trade fair ${florinsFromChinaLog}'),
      WEST => clienttranslate('${tkn_playerName} convenes a West trade fair ${florinsFromChinaLog}')
    ];

    self::notifyAll("tradeFairConvene", $message[$region], [
      'player' => $player,
      'region' => $region,
      'florinsFromChina' => $florinsFromChina,
      'florinsFromChinaLog' => [
        'log' => clienttranslate('and adds ${amount} ${tkn_florin} from China to the profits'),
        'args' => [
          'amount' => $florinsFromChina,
          'tkn_playerName' => $player->getName(),
          'tkn_florin' => clienttranslate("Florin(s)"),
        ]
      ],
    ]);
  }

  public static function tradeFairEmporiumSubsidy($player, $region, $amount)
  {
    $message = clienttranslate('Emporium Subsidy: ${tkn_playerName} receives ${amount} ${tkn_florin} out of profits');
      
    self::notifyAll("tradeFairEmporiumSubsidy", $message, [
      'player' => $player,
      'amount' => $amount,
      'region' => $region,
      'tkn_florin' => clienttranslate("Florin(s)"),
    ]);
  }

  public static function tradeFairProfits($player, $region)
  {
    $message = [
      EAST => clienttranslate('${tkn_playerName} convenes an East trade fair'),
      WEST => clienttranslate('${tkn_playerName} convenes a West trade fair')
    ];

    self::notifyAll("tradeFairStart", $message[$region], [
      'player' => $player,
    ]);
  }

  public static function tradeFairProfitDispersalPirates($region) {
    $message = clienttranslate('Pirates take 1 ${tkn_florin} out of profits');
      
    self::notifyAll("tradeFairProfitDispersalPirates", $message, [
      'tkn_florin' => clienttranslate("Florin(s)"),
      'region' => $region,
    ]);
  }

  public static function tradeFairProfitDispersalPlayer($player, $region) {
    $message = clienttranslate('${tkn_playerName} takes 1 ${tkn_florin} out of profits');
      
    self::notifyAll("tradeFairProfitDispersalPlayer", $message, [
      'player' => $player,
      'tkn_florin' => clienttranslate("Florin(s)"),
      'region' => $region,
    ]);
  }
  

  public static function tradeFairNoVoyage()
  {
    self::message(clienttranslate('No profits left. The voyage does not start'),[]);
  }

  public static function tradeFairPlaceLevy($player, $city, $chessPiece)
  {
    $message = clienttranslate('${tkn_playerName} places ${tkn_chessPiece} on ${cityName}');
    // $chessPieceExploded = explode('_' );
    
    self::notifyAll("tradeFairPlaceLevy", $message, [
      'player' => $player,
      'cityId' => $city->getId(),
      'cityName' => $city->getName(),
      'chessPiece' => $chessPiece,
      // 'tkn_chessPiece' => 
      'i18n' => ['cityName'],
    ]);
  }

  /*********************
   **** UPDATE ARGS ****
   *********************/
  /*
   * Automatically adds some standard field about player and/or card
   */
  protected static function updateArgs(&$args)
  {
    if (isset($args['player'])) {
      $args['player_name'] = $args['player']->getName();
      $args['tkn_playerName'] = $args['player']->getName();
      $args['playerId'] = $args['player']->getId();
      unset($args['player']);
    }
  }
}
