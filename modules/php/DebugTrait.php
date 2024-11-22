<?php

namespace PaxRenaissance;

use Locale;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
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
use PaxRenaissance\Managers\PlayersExtra;
use PaxRenaissance\Managers\TableauOps;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Models\Border;
use PaxRenaissance\Models\Card;
use PaxRenaissance\Models\Empire;
use PaxRenaissance\Models\Player;
use PaxRenaissance\Models\Token;

trait DebugTrait
{
  function debug_test()
  {
    Notifications::log('options extended',Globals::getExtendedGame());
    Notifications::log('options limited',Globals::getLimitedCardSet());
    Notifications::log('options strawman',Globals::getStrawmanCampaign());

    // $this->debugPlaceToken(KNIGHT, REFORMIST, BRUGES);
    // $this->debugPlaceToken(KNIGHT, REFORMIST, LYON);
    // $this->debugPlaceToken(KNIGHT, REFORMIST, BORDEAUX);
    // $this->debugPlaceToken(KNIGHT, REFORMIST, GRANADA);
    // $this->debugPlaceToken(KNIGHT, REFORMIST, ALGIERS);
    // Cards::move('PREN159X_ConsentOfTheGoverned',DISCARD);
    // Empires::get(PAPAL_STATES)->changeToTheocracy(ISLAMIC);
    // $this->debugPlaceCardInMarket('PREN030_SantaHermandad', WEST, 2);
    // Cards::get('EmpireSquare_Ottoman')->setSide(REPUBLIC);
    // $this->debugPlaceCardInTableau('PREN102X_SahnISemanMadrese', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN137X_FaithVsReason', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN110X_TransylvanianPlot', EAST, 2371052);
    // $this->debugPlaceCardInTableau('PREN129X_OratoryOfDivineLove', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN134X_MiningEngineer', WEST, 2371052);

    // $this->debugPlaceCardInTableau('PREN132X_ArtisticGeometry', WEST, 2371052);
    // $this->debugPlaceCardInTableau('EmpireSquare_HolyRomanEmpire', WEST, 2371052);
    // Cards::move('EmpireSquare_PapalStates', Locations::vassals(HOLY_ROMAN_EMIRE));
    // $this->debugPlaceToken(PAWN, COEUR, BORDER_HOLY_ROMAN_EMPIRE_HUNGARY);

    // $this->debugPlaceCardInTableau('EmpireSquare_PapalStates', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN043_Gutenberg', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN141X_WelserKleinVenedig', WEST, 2371052);
    // Cards::move('EmpireSquare_PapalStates',Locations::vassals(HOLY_ROMAN_EMIRE));
    // $this->debugPlaceCardInTableau('EmpireSquare_Hungary', EAST, 2371055);

    // $this->debugPlaceCardInTableau('EmpireSquare_Portugal', WEST, 2371052);
    // $this->debugPlaceCardInTableau('EmpireSquare_Aragon', WEST, 2371053);
    // $this->debugPlaceCardInTableau('EmpireSquare_PapalStates', WEST, 2371054);
    // $this->debugPlaceCardInTableau('EmpireSquare_Ottoman', EAST, 2371055);

    // foreach(Empires::getAll() as $empire) {
    //   $empire->getEmpireCard()->setSide(REPUBLIC);
    // }
    // Tokens::move('bishop_catholic_3','EmpireSquare_Portugal');
    // Tokens::get('pawn_marchionni_4')->returnToSupply();
    // Tokens::move('pirate_reformist_3',BORDER_MAMLUK_OTTOMAN);
    // $index = 0;
    // $pirateMap = [
    //   0 => CATHOLIC,
    //   1 => ISLAMIC,
    //   2 => REFORMIST,
    // ];
    // foreach(BORDERS as $borderId) {
    //   // $border = Borders::get($borderId);
    //   // $token = $border->getTokens();
    //   // if (count($token) > 0) {
    //   //   continue;
    //   // }
    //   $this->debugPlaceToken(PIRATE, $pirateMap[$index % 3], $borderId);
    //   $index += 1;
    // }
    // $this->debugPlaceToken(PAWN, MARCHIONNI, BORDER_ARAGON_PAPAL_STATES);
    // $this->debugPlaceToken(PAWN, MARCHIONNI, 'EmpireSquare_Aragon');

    // Cards::get('EmpireSquare_Hungary')->setSide(REPUBLIC);
    // Cards::get('EmpireSquare_Ottoman')->setSide(REPUBLIC);
    // $this->debugPlaceToken(PAWN, MEDICI, BORDER_BYZANTIUM_HUNGARY);
    // $this->debugPlaceToken(PIRATE, CATHOLIC, BORDER_ENGLAND_PORTUGAL);
    // $this->debugPlaceCardInTableau('PREN134X_MiningEngineer', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN158X_OrderOfPreachers', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN061_Qizilbash', EAST, 2371052);
    // $this->debugPlaceCardInTableau('PREN118X_GrandMufti', EAST, 2371052);
    // $this->debugPlaceCardInTableau('PREN009_HouseOfBorgia', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN011_AnabaptistReformation', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN010_BonfireOfTheVanities', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN013_GenoeseFleet', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN019_GoldCoastMonopoly', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN021_Conquistadors', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN028_TheBold', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN023_SpanishTercio', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN034_MerchantsOfTheStaple', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN040_SindicatRemenca', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN037_TheHidden', WEST, 2371052);

    // $this->debugPlaceCardInTableau('EmpireSquare_Portugal', WEST, 2371053); // DISCOVERY
    // Cards::get('EmpireSquare_Portugal')->setSide(REPUBLIC);
  }

  function debug_placeCardInMarket($cardId, $region = WEST, $column = 1)
  {
    $card = Cards::getTopOf(Locations::market($region, $column));
    Cards::move($card->getId(), DISCARD);
    Cards::insertOnTop($cardId, Locations::market($region, $column));
  }

  function debugChangeQueen($newQueen)
  {
    $king = Cards::get('EmpireSquare_Portugal');
    $currentQueen = $king->getQueen();
    $currentQueen->setKing(null);
    $king->setQueen(Cards::get($newQueen));
  }

  function debug_placeCardInTableau($cardId, $region = WEST, $playerId = null)
  {
    $playerId = $playerId === null ? Players::get()->getId() : $playerId;
    Cards::move($cardId, Locations::tableau($playerId, $region));
  }

  //debugPlaceToken(pawn, medici, border_aragon_france)
  function debugPlaceToken($type, $separator, $locationId)
  {
    $supply = Locations::supply($type, $separator);

    $token = Tokens::getTopOf($supply);
    if ($token === null) {
      return;
    }
    $fromLocationId = $token->getLocation();
    $token = $token->move($locationId, false);
    Notifications::placeToken(Players::get(), $token, $fromLocationId);
  }

  function debugReturnTokenToSupply($locationId)
  {
    $token = Tokens::getTopOf($locationId);
    $token->returnToSupply();
  }

  function debugActivateVictoryCondition($cardId)
  {
    $card = Cards::get($cardId);
    $card->setActive();
  }


  function debugDiscardCard($cardId)
  {
    $card = Cards::get($cardId);
    $card->discard();
  }

  function debugDiscardTopOfDeck($region, $numberOfCards)
  {
    Cards::pickForLocation(intval($numberOfCards), Locations::deck($region), DISCARD);
  }

  function debugAddCardsToTopOfDeck($region, $numberOfCards)
  {
    $region = trim($region);
    Cards::pickForLocation(intval($numberOfCards), 'pool_' . $region, Locations::deck($region));
  }

  function debugAddCardToHand($cardId, $playerId = null)
  {
    $playerId = $playerId === null ? Players::get()->getId() : $playerId;
    Cards::move($cardId, Locations::hand($playerId));
  }

  function debugMakeVassal($vassalCardId, $suzerainEmpireId)
  {
    Cards::move(trim($vassalCardId), Locations::vassals(trim($suzerainEmpireId)));
  }

  function debugFlipEmpireSquare($cardId)
  {
    $card = Cards::get($cardId);
    $card->flip();
  }

  function debugSetEmpireReligion($empireId, $religion)
  {
    $religions = Globals::getEmpireReligions();
    $religions[trim($empireId)] = trim($religion);
    Globals::setEmpireReligions($religions);
  }

  function engineDisplay()
  {
    Notifications::log('engine', Globals::getEngine());
  }

  function debugIncFlorins($amount, $playerId = null)
  {
    $playerId = $this->debugGetPlayerId($playerId);

    Players::incFlorins($playerId, intval($amount));
  }

  function debugIncFlorinsOnMarketCard($region, $column, $value)
  {
    $value = intval($value);
    Market::incMarketFlorins($region, $column, $value);
  }


  function debugGetPlayerId($playerId = null)
  {
    return $playerId = $playerId === null ? Players::get()->getId() : intval($playerId);
  }

  // public function LoadDebug()
  // {
  //   // These are the id's from the BGAtable I need to debug.
  //   // you can get them by running this query : SELECT JSON_ARRAYAGG(`player_id`) FROM `player`
  //   $ids = [
  //     89403527,
  //     85521161,
  //   ];
  //   // You can also get the ids automatically with $ids = array_map(fn($dbPlayer) => intval($dbPlayer['player_id']), array_values($this->getCollectionFromDb('select player_id from player order by player_no')));

  //   // Id of the first player in BGA Studio
  //   $sid = 2371052;

  //   foreach ($ids as $id) {
  //     // basic tables
  //     self::DbQuery("UPDATE player SET player_id=$sid WHERE player_id = $id");
  //     self::DbQuery("UPDATE global SET global_value=$sid WHERE global_value = $id");
  //     self::DbQuery("UPDATE stats SET stats_player_id=$sid WHERE stats_player_id = $id");
  //     self::DbQuery("UPDATE player_extra SET player_id=$sid WHERE player_id = $id");

  //     // 'other' game specific tables. example:
  //     // tables specific to your schema that use player_ids



  //     // Cards
  //     self::DbQuery("UPDATE `cards` SET `card_location` = 'tableau_west_$sid' WHERE `cards`.`card_location` = 'tableau_west_$id';");
  //     self::DbQuery("UPDATE `cards` SET `card_location` = 'tableau_east_$sid' WHERE `cards`.`card_location` = 'tableau_east_$id';");


  //     /**
  //      * TODO:
  //      * - engine
  //      * - turn order
  //      * - first playuer
  //      */


  //     ++$sid;
  //   }
  // }

  public function loadBugReportSQL(int $reportId, array $studioPlayers): void
  {
    $prodPlayers = $this->getObjectListFromDb("SELECT `player_id` FROM `player`", true);
    $prodCount = count($prodPlayers);
    $studioCount = count($studioPlayers);
    if ($prodCount != $studioCount) {
      throw new BgaVisibleSystemException("Incorrect player count (bug report has $prodCount players, studio table has $studioCount players)");
    }

    // SQL specific to your game
    $sql[] = 'ALTER TABLE `gamelog` ADD `cancel` TINYINT(1) NOT NULL DEFAULT 0;';
    // // For example, reset the current state if it's already game over
    // $sql = [
    //     "UPDATE `global` SET `global_value` = 10 WHERE `global_id` = 1 AND `global_value` = 99"
    // ];


    $map = [];
    foreach ($prodPlayers as $index => $prodId) {
      $studioId = $studioPlayers[$index];
      $map[(int) $prodId] = (int) $studioId;
      // SQL common to all games
      $sql[] = "UPDATE `player` SET `player_id` = $studioId WHERE `player_id` = $prodId";
      $sql[] = "UPDATE `global` SET `global_value` = $studioId WHERE `global_value` = $prodId";
      $sql[] = "UPDATE `stats` SET `stats_player_id` = $studioId WHERE `stats_player_id` = $prodId";
      $sql[] = "UPDATE `player_extra` SET `player_id` = $studioId WHERE `player_id` = $prodId";

      $sql[] = "UPDATE `cards` SET `card_location` = 'tableau_west_$studioId' WHERE `cards`.`card_location` = 'tableau_west_$prodId'";
      $sql[] = "UPDATE `cards` SET `card_location` = 'tableau_east_$studioId' WHERE `cards`.`card_location` = 'tableau_east_$prodId'";

      // // SQL specific to your game

      // $sql[] = "UPDATE `card` SET `card_location_arg` = $studioId WHERE `card_location_arg` = $prodId";
      // $sql[] = "UPDATE `my_table` SET `my_column` = REPLACE(`my_column`, $prodId, $studioId)";
    }
    foreach ($sql as $q) {
      $this->DbQuery($q);
    }

    // Engine
    $engine = Globals::getEngine();
    self::loadDebugUpdateEngine($engine, $map);
    self::loadDebugUpdateCustomTurnOrder($map);
    Globals::setEngine($engine);
    Game::get()->reloadPlayersBasicInfos(); // Is this necessary?

    // Game specific
    $firstPlayerId = Globals::getFirstPlayer();
    Globals::setFirstPlayer($map[$firstPlayerId]);
  }

  static function loadDebugUpdateEngine(&$node, $map)
  {
    if (isset($node['playerId'])) {
      $node['playerId'] = $map[(int) $node['playerId']];
    }

    if (isset($node['children'])) {
      foreach ($node['children'] as &$child) {
        self::loadDebugUpdateEngine($child, $map);
      }
    }
  }

  static function loadDebugUpdateCustomTurnOrder($map)
  {
    $customTurnOrders = Globals::getCustomTurnOrders();
    foreach ($customTurnOrders as $type => $data) {
      foreach ($data['order'] as $index => $playerId) {
        Notifications::log('loadDebugUpdateCustomTurnOrder', [
          'index' => $index,
          'playerId' => $playerId,
        ]);

        // if (isset($map[$playerId])) {
        $customTurnOrders[$type]['order'][$index] = $map[$playerId];
        // }

      }
    }
    Globals::setCustomTurnOrders($customTurnOrders);
  }
}
