<?php

namespace PaxRenaissance\Core;

use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Players;

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

  // TODO: check how to handle this in game log
  public static function newUndoableStep($player, $stepId)
  {
    // self::notify($player, 'newUndoableStep', clienttranslate('Undo here'), [
    //   'stepId' => $stepId,
    //   'preserve' => ['stepId'],
    // ]);
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


  public static function refreshHand($player, $hand)
  {
    // foreach ($hand as &$card) {
    //   $card = self::filterCardDatas($card);
    // }
    self::notify($player, 'refreshHand', '', [
      'player' => $player,
      'hand' => $hand,
    ]);
  }

  public static function refreshUI($datas)
  {
    // Keep only the thing that matters
    $fDatas = [
      // Add data here that needs to be refreshed
    ];

    self::notifyAll('refreshUI', '', [
      // 'datas' => $fDatas,
      'datas' => $datas,
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

  public static function apostasy($player, $prestigeMap)
  {
    self::message(clienttranslate('${tkn_playerName} must Discard all cards with ${tkn_prestige_1} or ${tkn_prestige_2}'), [
      'player' => $player,
      'tkn_prestige_1' => $prestigeMap[0],
      'tkn_prestige_2' => $prestigeMap[1],
    ]);
  }

  public static function battle($player, $source, $empire, $attackers, $defenders, $battleVictorious)
  {
    $sourceNameMap = [
      CONSPIRACY_ONE_SHOT => clienttranslate('Conspiracy'),
      CRUSADE_ONE_SHOT => clienttranslate('Crusade'),
      JIHAD_ONE_SHOT => clienttranslate('Jihad'),
      PEASANT_REVOLT_ONE_SHOT => clienttranslate('Peasant revolt'),
      REFORMATION_ONE_SHOT => clienttranslate('Reformation'),
      CAMPAIGN_OP => clienttranslate("Campaign"),
    ];

    $attackersLog = [];
    $attackersArgs = [];

    foreach ($attackers['agents'] as $index => $agent) {
      $type = $agent['type'];
      $separator = $type === PAWN ? $player->getBank() : $agent['separator'];
      $attackersLog[] = '${tkn_mapToken_agent_' . $index . '}';
      $attackersArgs['tkn_mapToken_agent_' . $index] = $separator . '_' . $type;
    }

    foreach ($attackers['tokens'] as $index => $token) {
      $attackersLog[] = '${tkn_mapToken_' . $index . '}';
      $attackersArgs['tkn_mapToken_' . $index] = $token->getSeparator() . '_' . $token->getType();
    }

    $defendersLog = [];
    $defendersArgs = [];

    foreach ($defenders['tokens'] as $index => $token) {
      $defendersLog[] = '${tkn_mapToken_' . $index . '}';
      $defendersArgs['tkn_mapToken_' . $index] = $token->getSeparator() . '_' . $token->getType();
    }

    self::message(clienttranslate('${tkn_boldText_name} in ${tkn_boldText_empire}${tkn_newLine}${tkn_newLine}Attackers: ${attackersLog}${tkn_newLine}Defenders: ${defendersLog}${tkn_newLine}${tkn_newLine}${resultLog}'), [
      'tkn_boldText_name' => $sourceNameMap[$source],
      'tkn_boldText_empire' => $empire->getName(),
      'tkn_newLine' => '<br>',
      'attackersLog' => [
        'log' => implode('', $attackersLog),
        'args' => $attackersArgs
      ],
      'defendersLog' => [
        'log' => implode('', $defendersLog),
        'args' => $defendersArgs
      ],
      'resultLog' => [
        'log' => $battleVictorious ? clienttranslate('The Battle is Victorious') : clienttranslate('The Battle is not Victorious'),
        'args' => []
      ],
      'i18n' => ['tkn_boldText_name'],
    ]);
  }

  public static function battleAttackers($player, $attackers)
  {
    $log = [];
    $args = [];

    foreach ($attackers['agents'] as $index => $agent) {
      $type = $agent['type'];
      $separator = $type === PAWN ? $player->getBank() : $agent['separator'];
      $log[] = '${tkn_mapToken_agent_' . $index . '}';
      $args['tkn_mapToken_agent_' . $index] = $separator . '_' . $type;
    }

    foreach ($attackers['tokens'] as $index => $token) {
      $log[] = '${tkn_mapToken_' . $index . '}';
      $args['tkn_mapToken_' . $index] = $token->getSeparator() . '_' . $token->getType();
    }

    self::message(clienttranslate('Attackers: ${attackersLog}'), [
      'attackersLog' => [
        'log' => implode('', $log),
        'args' => $args
      ],
    ]);
  }

  public static function battleDefenders($defenders)
  {
    $log = [];
    $args = [];

    foreach ($defenders['tokens'] as $index => $token) {
      $log[] = '${tkn_mapToken_' . $index . '}';
      $args['tkn_mapToken_' . $index] = $token->getSeparator() . '_' . $token->getType();
    }

    self::message(clienttranslate('Defenders: ${defendersLog}'), [
      'defendersLog' => [
        'log' => implode('', $log),
        'args' => $args
      ],
    ]);
  }

  public static function battleEliminateAgent($player, $agent)
  {
    $type = $agent['type'];
    $separator = $type === PAWN ? $player->getBank() : $agent['separator'];

    self::message(clienttranslate('${tkn_playerName} eliminates Agent ${tkn_mapToken}'), [
      'player' => $player,
      'tkn_mapToken' => $separator . '_' . $type,
    ]);
  }

  public static function battleEliminateAgents($player, $agents)
  {
    $attackersLog = [];
    $attackersArgs = [];

    foreach ($agents as $index => $agent) {
      $type = $agent['type'];
      $separator = $type === PAWN ? $player->getBank() : $agent['separator'];
      $attackersLog[] = '${tkn_mapToken_agent_' . $index . '}';
      $attackersArgs['tkn_mapToken_agent_' . $index] = $separator . '_' . $type;
    }

    self::message(clienttranslate('Eliminated agents: ${agentsLog}'), [
      'agentsLog' => [
        'log' => implode('', $attackersLog),
        'args' => $attackersArgs,
      ]
    ]);
  }

  public static function battleEliminateAttackers()
  {
    self::message(clienttranslate('All attackers are eliminated'), []);
  }

  public static function battleEliminateDefenders()
  {
    self::message(clienttranslate('All defenders are eliminated'), []);
  }

  public static function battleLocation($player, $empire)
  {
    self::message(clienttranslate('${tkn_playerName} chooses ${tkn_boldText} as location of the Battle'), [
      'player' => $player,
      'tkn_boldText' => $empire->getName(),
    ]);
  }

  public static function changeEmpireToMedievalState($player, $empire)
  {
    self::notifyAll("changeEmpireToMedievalState",  clienttranslate('${tkn_playerName} creates a Medieval ${tkn_boldText_empire_name} state'), [
      'player' => $player,
      'tkn_boldText_empire_name' => $empire->getName(),
      'empire' => $empire,
    ]);
  }

  public static function changeEmpireToTheocracy($empire, $religion)
  {
    self::notifyAll("changeEmpireToTheocracy",  clienttranslate('${tkn_boldText_empire_name} changes into a ${religion} Theocracy'), [
      'tkn_boldText_empire_name' => $empire->getName(),
      'empire' => $empire,
      'religion' => $religion,
    ]);
  }

  public static function chooseNotToKill($player)
  {

    self::notifyAll("chooseNotToKill",  clienttranslate('${tkn_playerName} chooses not to Kill a Token'), [
      'player' => $player,
    ]);
  }

  public static function declareVictory($player,$victoryCard )
  {
    self::notifyAll("declareVictory", clienttranslate('${tkn_playerName} declares ${tkn_boldText}'), [
      'player' => $player,
      'tkn_boldText' => $victoryCard->getTitle(),
    ]);
  }

  public static function discardCard($player, $card, $toLocationId, $messageType = DISCARD)
  {
    $messages = [
      DISCARD => clienttranslate('${tkn_playerName} discards ${tkn_boldText}'),
      KILL => clienttranslate('Assassin: ${tkn_boldText} is Killed'),
    ];

    self::notifyAll("discardCard", $messages[$messageType], [
      'player' => $player,
      'tkn_boldText' => $card->getName(),
      'card' => $card,
      'toLocationId' => $toLocationId,
    ]);
  }

  public static function flipEmpireCard($player, $card,$formerSuzerain)
  {
    $side = $card->getSide();
    self::notifyAll("flipEmpireCard",  clienttranslate('${tkn_playerName} flips ${tkn_cardName} to ${side} side'), [
      'player' => $player,
      'card' => $card,
      'tkn_cardName' => $card->getName($side === REPUBLIC ? KING : REPUBLIC),
      'side' => $side === REPUBLIC ? clienttranslate('Republic') : clienttranslate('King'),
      'formerSuzerain' => $formerSuzerain,
      'i18n' => ['side'],
    ]);
  }

  public static function flipVictoryCard($player, $card)
  {
    self::notifyAll("flipVictoryCard",  clienttranslate('${tkn_playerName} flips ${tkn_cardName}'), [
      'player' => $player,
      'card' => $card,
      'tkn_cardName' => $card->getTitle(),
    ]);
  }

  public static function moveEmpireSquare($player, $empireCard, $from)
  {
    self::notifyAll("moveEmpireSquare", clienttranslate('${tkn_playerName} moves ${tkn_boldText} to their tableau'), [
      'player' => $player,
      'tkn_boldText' => $empireCard->getName(),
      'card' => $empireCard,
      'from' => $from,
    ]);
  }

  public static function moveToken($player, $token, $fromLocation, $toLocation)
  {
    self::notifyAll("moveToken", clienttranslate('${tkn_playerName} moves ${tkn_mapToken} from ${tkn_boldText_from} to ${tkn_boldText_to}'), [
      'player' => $player,
      'tkn_mapToken' => $token->getLogToken(),
      'tkn_boldText_from' => $fromLocation->getName(),
      'tkn_boldText_to' => $toLocation->getName(),
      'token' => $token,
    ]);
  }

  public static function oneShotNotPossible($oneShot)
  {
    self::message(clienttranslate('Not possible to resolve One-shot ${tkn_oneShot}'), [
      'tkn_oneShot' => $oneShot,
    ]);
  }

  public static function oneShotDoesNotOccur($player, $oneShot)
  {
    self::message(clienttranslate('${tkn_playerName} decides One-shot not to occur ${tkn_oneShot}'), [
      'player' => $player,
      'tkn_oneShot' => $oneShot,
    ]);
  }

  public static function oneShotOccurs($player, $oneShot)
  {
    self::message(clienttranslate('${tkn_playerName} decides One-shot to occur ${tkn_oneShot}'), [
      'player' => $player,
      'tkn_oneShot' => $oneShot,
    ]);
  }

  public static function patronVictory()
  {
    self::message(clienttranslate('The market cannot be refreshed. Winner is decided by Patron Victory'));
  }

  public static function placeToken($player, $token, $fromLocationId, $toLocation = null)
  {
    $isPawn = $token->getType() === PAWN;

    self::notifyAll("placeToken",  clienttranslate('${tkn_playerName} places ${tkn_mapToken} on ${tkn_boldText}'), [
      'player' => $player,
      'tkn_mapToken' => $isPawn ? $token->getBank() . '_' . PAWN : $token->getReligion() . '_' . $token->getType(),
      'tkn_boldText' => $toLocation !== null ? $toLocation->getName() : '',
      'token' => $token,
      'fromLocationId' => $fromLocationId,
    ]);
  }


  public static function playCard($player, $card)
  {
    self::notifyAll("playCard",  clienttranslate('${tkn_playerName} plays ${tkn_cardName}'), [
      'player' => $player,
      'card' => $card,
      'tkn_cardName' => $card->getName(),
    ]);
  }

  public static function purchaseCard($player, $card, $placedFlorins, $takenFlorins, $discard = false)
  {
    self::notifyAll("purchaseCard",  clienttranslate('${tkn_playerName} purchases ${tkn_cardName}'), [
      'player' => $player,
      'card' => $card,
      'tkn_cardName' => $card->getName(),
      'placedFlorins' => $placedFlorins,
      'takenFlorins' => $takenFlorins,
      'discard' => $discard,
    ]);
  }

  public static function refreshMarket($player, $cardMoves, $cardDraws)
  {
    self::notifyAll("refreshMarket",  clienttranslate('${tkn_playerName} refreshes the market'), [
      'player' => $player,
      'cardMoves' => $cardMoves,
      'cardDraws' => $cardDraws,
    ]);
  }

  public static function regimeChangeSkipEmancipation($player)
  {
    self::message(clienttranslate('${tkn_playerName} skips moving Repressed Tokens'), [
      'player' => $player,
    ]);
  }

  public static function regimeChangeSkipGoldenLiberty($player, $empire)
  {
    self::message(clienttranslate('${tkn_playerName} does not change ${tkn_boldText} to a Medieval state'), [
      'player' => $player,
      'tkn_boldText' => $empire->getName(),
    ]);
  }

  public static function repressToken($player, $token, $fromLocation, $cost)
  {
    $isPawn = $token->getType() === PAWN;
    self::notifyAll("repressToken",  clienttranslate('${tkn_playerName} represses ${tkn_mapToken} on ${tkn_boldText}'), [
      'player' => $player,
      'tkn_mapToken' => $isPawn ? $token->getBank() . '_' . PAWN : $token->getReligion() . '_' . $token->getType(),
      'tkn_boldText' => $fromLocation->getName(),
      'token' => $token,
      'cost' => $cost,
    ]);
  }

  public static function returnToSupply($player, $token, $fromLocation, $messageType = RETURN_TO_SUPPLY)
  {
    $player = $player === null ? Players::get() : $player;

    // $fromType = $fromLocation->getType();

    $messages = [
      // KILL => $fromType === CITY ? clienttranslate('${tkn_playerName} kills ${tkn_mapToken} in ${tkn_boldText}') : clienttranslate('${tkn_playerName} kills ${tkn_mapToken} on ${tkn_boldText}'),
      // ELIMINATE => $fromType === CITY ? clienttranslate('${tkn_playerName} eliminates ${tkn_mapToken} in ${tkn_boldText}') : clienttranslate('${tkn_playerName} eliminates ${tkn_mapToken} on ${tkn_boldText}'),
      KILL =>  clienttranslate('${tkn_playerName} kills ${tkn_mapToken} on ${tkn_boldText}'),
      ELIMINATE => clienttranslate('${tkn_playerName} eliminates ${tkn_mapToken} on ${tkn_boldText}'),
      RETURN_TO_SUPPLY => clienttranslate('${tkn_playerName} returns ${tkn_mapToken} from ${tkn_boldText} to the supply'),
    ];

    self::notifyAll("returnToSupply", $messages[$messageType], [
      'player' => $player,
      'tkn_mapToken' => $token->getSeparator() . '_' . $token->getType(),
      'tkn_boldText' => $fromLocation->getName(),
      'token' => $token,
      'from' => $fromLocation,
    ]);
  }
  // public static function killToken($player, $token, $fromLocation)
  // {
  //   $isPawn = $token->getType() === PAWN;
  //   self::notifyAll("returnToSupply",  clienttranslate('${tkn_playerName} kills ${tkn_mapToken} on ${tkn_boldText}'), [
  //     'player' => $player,
  //     'tkn_mapToken' => $isPawn ? $token->getBank() . '_' . PAWN : $token->getReligion() . '_' . $token->getType(),
  //     'tkn_boldText' => $fromLocation->getName(),
  //     'from' => $fromLocation,
  //     'token' => $token,
  //   ]);
  // }

  public static function sellCard($player, $card, $value)
  {
    self::notifyAll("sellCard",  clienttranslate('${tkn_playerName} sells ${tkn_cardName} for ${value} ${tkn_florin}'), [
      'player' => $player,
      'card' => $card,
      'value' => $value,
      'tkn_cardName' => $card->getName(),
      'tkn_florin' => clienttranslate('Florin(s)'),
    ]);
  }

  public static function tableauOpBehead($player, $card)
  {
    self::message(clienttranslate('${tkn_playerName} beheads ${tkn_cardName}'), [
      'player' => $player,
      'tkn_cardName' => $card->getName(),
    ]);
  }

  public static function tableauOpCampaign($player, $empire, $cost)
  {
    $message = $cost > 0 ?
      clienttranslate('${tkn_playerName} pays ${amount} ${tkn_florin} to China to campaign against ${tkn_boldText}') :
      clienttranslate('${tkn_playerName} campaigns against ${tkn_boldText}');

    self::notifyAll("payFlorinsToChina", $message, [
      'player' => $player,
      'amount' => $cost,
      'tkn_florin' => clienttranslate("Florin(s)"),
      'tkn_boldText' => $empire->getName(),
    ]);
  }


  public static function tableauOpCommerce($player, $card)
  {
    $cardName = in_array($card->getLocation(), [Locations::market(WEST, 0), Locations::market(EAST, 0)]) ? clienttranslate('trade fair card') : $card->getName();

    self::notifyAll("tableauOpCommerce", clienttranslate('${tkn_playerName} takes 1 ${tkn_florin} from ${tkn_cardName}'), [
      'player' => $player,
      'tkn_florin' => clienttranslate("Florin(s)"),
      'tkn_cardName' => $cardName,
      'card' => $card,
    ]);
  }

  public static function tableauOpSelected($player, $tableauOp, $card)
  {
    self::message(clienttranslate('${tkn_playerName} performs ${tkn_boldText} Op with ${tkn_cardName} ${tkn_tableauOp}'), [
      'player' => $player,
      'tkn_tableauOp' => $tableauOp->getId(),
      'tkn_boldText' => $tableauOp->getName(),
      'tkn_cardName' => $card->getName(),
    ]);
  }

  public static function tableauOpSkip($player)
  {
    self::message(clienttranslate('${tkn_playerName} skips further Ops'), [
      'player' => $player,
    ]);
  }

  public static function tableauOpTax($player, $token, $empire)
  {
    self::message(clienttranslate('${tkn_playerName} Taxes ${tkn_mapToken} in ${tkn_boldText}'), [
      'player' => $player,
      'tkn_mapToken' => $token->getSeparator() . '_' . $token->getType(),
      'tkn_boldText' => $empire->getName(),
    ]);
  }


  public static function tableauOpTaxNoFlorins($player)
  {
    self::message(clienttranslate('${tkn_playerName} cannot pay Tax'), [
      'player' => $player,
    ]);
  }

  public static function tableauOpTaxPay($player)
  {
    self::notifyAll("tableauOpTaxPay", clienttranslate('${tkn_playerName} pays 1 ${tkn_florin} to China'), [
      'player' => $player,
      'tkn_florin' => clienttranslate("Florin(s)"),
    ]);
  }

  public static function tableauOpVote($player, $empire, $cost)
  {
    $message = $cost > 0 ?
      clienttranslate('${tkn_playerName} pays ${amount} ${tkn_florin} to China to vote in ${tkn_boldText}') :
      clienttranslate('${tkn_playerName} votes in ${tkn_boldText}');

    self::notifyAll("payFlorinsToChina", $message, [
      'player' => $player,
      'amount' => $cost,
      'tkn_florin' => clienttranslate("Florin(s)"),
      'tkn_boldText' => $empire->getName(),
    ]);
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

  public static function tradeFairProfitDispersalPirates($region)
  {
    $message = clienttranslate('Pirates take 1 ${tkn_florin} out of profits');

    self::notifyAll("tradeFairProfitDispersalPirates", $message, [
      'tkn_florin' => clienttranslate("Florin(s)"),
      'region' => $region,
    ]);
  }

  public static function tradeFairProfitDispersalPlayer($player, $region)
  {
    $message = clienttranslate('${tkn_playerName} takes 1 ${tkn_florin} out of profits');

    self::notifyAll("tradeFairProfitDispersalPlayer", $message, [
      'player' => $player,
      'tkn_florin' => clienttranslate("Florin(s)"),
      'region' => $region,
    ]);
  }


  public static function tradeFairNoVoyage()
  {
    self::message(clienttranslate('No profits left. The voyage does not start'), []);
  }

  
  public static function vassalage($player, $empireCard, $suzerain, $from)
  {
    self::notifyAll("vassalage", clienttranslate('${tkn_boldText_vassal} becomes a Vassal to ${tkn_boldText_vassal_suzerain}'), [
      'player' => $player,
      'tkn_boldText_vassal' => $empireCard->getName(),
      'tkn_boldText_vassal_suzerain' => $suzerain->getName(),
      'vassal' => $empireCard,
      'suzerain' => $suzerain,
      'from' => $from,
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
