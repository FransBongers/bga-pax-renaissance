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
  function test()
  {
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
    $this->debugPlaceCardInTableau('EmpireSquare_HolyRomanEmpire', WEST, 2371052);
    Cards::move('EmpireSquare_PapalStates', Locations::vassals(HOLY_ROMAN_EMIRE));
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

  function debugPlaceCardInMarket($cardId, $region = WEST, $column = 1)
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

  function debugPlaceCardInTableau($cardId, $region = WEST, $playerId = null)
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

  public function LoadDebug()
  {
    // These are the id's from the BGAtable I need to debug.
    // you can get them by running this query : SELECT JSON_ARRAYAGG(`player_id`) FROM `player`
    $ids = [
      89403527,
      85521161,
    ];
    // You can also get the ids automatically with $ids = array_map(fn($dbPlayer) => intval($dbPlayer['player_id']), array_values($this->getCollectionFromDb('select player_id from player order by player_no')));

    // Id of the first player in BGA Studio
    $sid = 2371052;

    foreach ($ids as $id) {
      // basic tables
      self::DbQuery("UPDATE player SET player_id=$sid WHERE player_id = $id");
      self::DbQuery("UPDATE global SET global_value=$sid WHERE global_value = $id");
      self::DbQuery("UPDATE stats SET stats_player_id=$sid WHERE stats_player_id = $id");
      self::DbQuery("UPDATE player_extra SET player_id=$sid WHERE player_id = $id");

      // 'other' game specific tables. example:
      // tables specific to your schema that use player_ids



      // Cards
      self::DbQuery("UPDATE `cards` SET `card_location` = 'tableau_west_$sid' WHERE `cards`.`card_location` = 'tableau_west_$id';");
      self::DbQuery("UPDATE `cards` SET `card_location` = 'tableau_east_$sid' WHERE `cards`.`card_location` = 'tableau_east_$id';");


      /**
       * TODO:
       * - engine
       * - turn order
       * - first playuer
       */


      ++$sid;
    }
  }
}
