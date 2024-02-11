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
  function testGlobalizationVictory()
  {
    $this->debugPlaceCardInTableau('PREN102X_SahnISemanMadrese', EAST, 2371052); // Ability / Discovery
    $this->debugPlaceCardInTableau('PREN009_HouseOfBorgia', WEST, 2371052); // PATRON
    // $this->debugPlaceCardInTableau('PREN100X_UnifiedChristendom', WEST, 2371053); // PATRON
    $this->debugPlaceCardInTableau('EmpireSquare_Portugal', WEST, 2371053); // DISCOVERY
    $this->debugPlaceCardInTableau('PREN105X_FrancoOttomanNavy', EAST, 2371053); // DISCOVERY
    $this->debugPlaceToken(PAWN, Players::get(2371053)->getBank(), BORDER_ARAGON_PORTUGAL);
    $this->debugPlaceToken(PAWN, Players::get(2371053)->getBank(), BORDER_OTTOMAN_PAPAL_STATES);

    Cards::get('VictoryGlobalization')->setActive();
  }

  function testRenaissanceVictory()
  {
    $this->debugPlaceCardInTableau('PREN103X_Academia', EAST, 2371053); // Republic
    $this->debugPlaceCardInTableau('PREN037_TheHidden', WEST, 2371052); // LAW
    $this->debugPlaceCardInTableau('PREN010_BonfireOfTheVanities', WEST, 2371052); // LAW
    $this->debugPlaceCardInTableau('EmpireSquare_France', WEST, 2371052);
    Cards::get('EmpireSquare_France')->setSide(REPUBLIC);
    Cards::get('VictoryRenaissance')->setActive();
  }

  function testHolyVictory()
  {
    $this->debugPlaceToken(PIRATE, ISLAMIC, BORDER_HUNGARY_OTTOMAN);
    // Cards::get('VictoryHoly')->setActive();
  }

  function fillSeaBorders()
  {
    $this->debugPlaceToken(PAWN, Players::get(2371053)->getBank(), BORDER_ENGLAND_FRANCE);
    // $this->debugPlaceToken(PAWN, Players::get(2371053)->getBank(), BORDER_FRANCE_HOLY_ROMAN_EMPIRE);
    $this->debugPlaceToken(PAWN, Players::get(2371053)->getBank(), BORDER_ENGLAND_PORTUGAL);
    $this->debugPlaceToken(PAWN, Players::get(2371053)->getBank(), BORDER_ARAGON_PORTUGAL);
    // $this->debugPlaceToken(PAWN, Players::get(2371052)->getBank(), BORDER_ARAGON_PAPAL_STATES);
    $this->debugPlaceToken(PAWN, Players::get(2371052)->getBank(), BORDER_OTTOMAN_PAPAL_STATES);
    $this->debugPlaceToken(PAWN, Players::get(2371052)->getBank(), BORDER_MAMLUK_OTTOMAN);
    $this->debugPlaceToken(PAWN, Players::get(2371052)->getBank(), BORDER_HUNGARY_OTTOMAN);
    $this->debugPlaceToken(PAWN, Players::get(2371052)->getBank(), BORDER_BYZANTIUM_HUNGARY);

    $this->debugPlaceToken(PIRATE, ISLAMIC, BORDER_ENGLAND_FRANCE);
    $this->debugPlaceToken(PIRATE, ISLAMIC, BORDER_FRANCE_HOLY_ROMAN_EMPIRE);
    $this->debugPlaceToken(PIRATE, ISLAMIC, BORDER_ENGLAND_PORTUGAL);
    $this->debugPlaceToken(PIRATE, ISLAMIC, BORDER_ARAGON_PORTUGAL);
    $this->debugPlaceToken(PIRATE, CATHOLIC, BORDER_ARAGON_PAPAL_STATES);
    $this->debugPlaceToken(PIRATE, CATHOLIC, BORDER_OTTOMAN_PAPAL_STATES);
    $this->debugPlaceToken(PIRATE, CATHOLIC, BORDER_MAMLUK_OTTOMAN);
    $this->debugPlaceToken(PIRATE, CATHOLIC, BORDER_HUNGARY_OTTOMAN);
    $this->debugPlaceToken(PIRATE, CATHOLIC, BORDER_BYZANTIUM_HUNGARY);
  }

  function debugAgeOfReformationCards()
  {
    Notifications::log('adding reformation cards', []);
    $this->debugPlaceCardInMarket('PREN208P_Sarmatism', EAST, 4);
    $this->debugPlaceCardInMarket('PREN209P_BureauOfBarbarians', EAST, 3);
    $this->debugPlaceCardInMarket('PREN210P_KaysarIRum', EAST, 2);
    $this->debugPlaceCardInMarket('PREN211P_UskokPirates', EAST, 1);
    $this->debugPlaceCardInMarket('PREN212P_SzapolyaFamily', WEST, 5);
    $this->debugPlaceCardInMarket('PREN213P_NetherlandsInquisition', WEST, 4);
    $this->debugPlaceCardInMarket('PREN214P_Huguenots', WEST, 3);
    $this->debugPlaceCardInMarket('PREN215P_ReformationParliament', WEST, 2);
    $this->debugPlaceCardInMarket('PREN216P_MargaretOfParma', WEST, 1);
  }

  function test()
  {
    // $this->debugPlaceToken(ROOK, REFORMIST, 'EmpireSquare_HolyRomanEmpire');
    $this->debugPlaceCardInTableau('EmpireSquare_HolyRomanEmpire', WEST, 2371052); // Republic
    // Cards::get('EmpireSquare_HolyRomanEmpire')->setSide(REPUBLIC);
    // $this->debugPlaceCardInTableau('PREN134X_MiningEngineer', WEST, 2371052); // Republic
    // $this->debugPlaceCardInTableau('PREN161X_Enclosure', WEST, 2371052); // Republic
    
    // $this->debugPlaceCardInTableau('PREN130X_Cryptography', EAST, 2371053); // Republic
    // $this->debugPlaceToken(PAWN, Players::get(2371053)->getBank(), BORDER_HUNGARY_OTTOMAN);
    // $this->debugPlaceToken(PAWN, Players::get(2371053)->getBank(), BORDER_BYZANTIUM_HUNGARY);
    // $this->debugPlaceToken(BISHOP, ISLAMIC, 'PREN117X_DespinaKhatun');
    // Cards::move("EmpireSquare_Hungary",'vassals_'.HOLY_ROMAN_EMIRE);
    // Cards::move("EmpireSquare_Aragon",'vassals_'.HOLY_ROMAN_EMIRE);
    // $this->debugPlaceCardInTableau('PREN067_Janissaries', EAST, 2371053);
    

    // $this->debugPlaceToken(KNIGHT, CATHOLIC, BORDEAUX);
    // $this->debugPlaceCardInTableau('PREN081_CrimeanGoths', EAST, 2371053);
    // Cards::get('EmpireSquare_England')->setSide(KING);
    // $squares = Cards::getAllEmpireSquares();
    // foreach($squares as $square) {
    //   $square->setSide(REPUBLIC);
    // }
    // Empires::get(PAPAL_STATES)->changeToTheocracy(REFORMIST);
    // $this->debugPlaceCardInTableau('EmpireSquare_Ottoman', EAST, 2371052);

    // $this->debugPlaceToken(PAWN, Players::get(2371052)->getBank(), "EmpireSquare_Hungary");
    // Notifications::log('Cards', Cards::get('PREN162X_CatherineDeMedici')->getStaticData());
    // Cards::get('PREN168X_ZionistState')->activateAbility();

    // Tokens::move('knight_islamic_1',Locations::supply(KNIGHT,ISLAMIC));
    // Tokens::move('knight_islamic_6',Locations::supply(KNIGHT,ISLAMIC));
    // Tokens::move('rook_islamic_1',Locations::supply(ROOK,ISLAMIC));
    // Empires::get(HUNGARY)->changeToTheocracy(ISLAMIC);

    // $this->debugPlaceToken(KNIGHT, REFORMIST, CONSTANTINOPLE_3);
    // $this->debugPlaceToken(ROOK, REFORMIST, MODON);
    // $this->debugPlaceToken(PAWN, COEUR, BORDER_HUNGARY_OTTOMAN);
    // $this->debugPlaceToken(PAWN, COEUR, BORDER_OTTOMAN_PAPAL_STATES);
    // $this->debugPlaceToken(PIRATE, ISLAMIC, BORDER_FRANCE_HOLY_ROMAN_EMPIRE);
    // Tokens::move('pawn_fugger_10',BORDER_ARAGON_FRANCE);
    // Cards::get('VictoryAgeOfByzantine')->setActive();
    // Notifications::log('test',Cards::get('VictoryAgeOfByzantine')->canBeDeclaredByPlayer(Players::get()));
    // Empires::get(PAPAL_STATES)->changeToTheocracy(ISLAMIC);
    // Cards::get('EmpireSquare_Portugal')->setSide(REPUBLIC);
    // $this->debugPlaceCardInTableau('EmpireSquare_PapalStates', EAST, 2371052);
    // Empires::get(OTTOMAN)->changeToTheocracy(ISLAMIC);
    // Tokens::move('rook_reformist_4',CONSTANTINOPLE_3);
    // $this->debugPlaceToken(KNIGHT, ISLAMIC, CONSTANTINOPLE_1);

    // Notifications::log('getTokensInConstantinople',Empires::get(OTTOMAN)->getTokensInConstantinople());
    // $this->debugPlaceToken(KNIGHT, ISLAMIC, KVIV);
    // Tokens::move('knight_catholic_8',Locations::supply(KNIGHT,CATHOLIC));
    // Tokens::move('knight_reformist_2',Locations::supply(KNIGHT,REFORMIST));
    // $this->debugAgeOfReformationCards();
    // Notifications::log('card',Cards::get('PREN208P_Sarmatism'));
    // Cards::get('EmpireSquare_Mamluk')->setSide(REPUBLIC);
    // Cards::move('PREN078_SittIHatunOfDulkadir','queens_byzantium');
    // $this->debugPlaceCardInTableau('PREN059_Safavids', EAST, 2371053);
    // $this->debugPlaceCardInTableau('PREN008_Jesuits', WEST, 2371053);


    // $this->debugPlaceToken(ROOK,REFORMIST,PARIS);
    // $this->debugPlaceCardInMarket('COMET1_Copernicus');


    // return Utils::filter($marketCards, function ($card) use ($florins) {
    //   return explode('_',$card->getLocation())[1] === $this->region && $florins[$card->getLocation().'_florins'] > 0;
    // });

    // Tokens::get('pirate_islamic_2')->returnToSupply(KILL);
    // $this->debugPlaceToken(PIRATE, CATHOLIC, BORDER_FRANCE_HOLY_ROMAN_EMPIRE);
    // TableauOps::get(CORSAIR_OP_REFORMIST)->getOptions(Cards::get('PREN142X_KalmarUnion'));
    // Notifications::log('florins', Market::getFlorins());
    // Notifications::log('tableauCards',Cards::get('EmpireSquare_HolyRomanEmpire')->getQueens());



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

    $fromLocationId = $token->getLocation();
    $token = $token->move($locationId, false);
    Notifications::placeToken(Players::get(), $token, $fromLocationId);
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
