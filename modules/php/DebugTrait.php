<?php

namespace PaxRenaissance;

use Locale;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
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

  function test()
  {
    $this->debugPlaceToken(PAWN, Players::get(2371052)->getBank(), 'EmpireSquare_Ottoman');
    $this->debugPlaceToken(PAWN, Players::get(2371052)->getBank(), 'EmpireSquare_Hungary');
    $this->debugPlaceToken(PAWN, Players::get(2371053)->getBank(), 'EmpireSquare_Mamluk');
    $this->debugPlaceToken(PAWN, Players::get(2371053)->getBank(), 'EmpireSquare_Byzantium');
    // $this->debugPlaceToken(PAWN, Players::get(2371053)->getBank(), 'EmpireSquare_France');
    // $this->debugPlaceToken(PAWN, Players::get(2371053)->getBank(), 'EmpireSquare_Portugal');
    // $this->debugPlaceToken(PAWN, Players::get(2371053)->getBank(), 'EmpireSquare_HolyRomanEmpire');
    // $this->debugPlaceToken(PAWN, Players::get(2371053)->getBank(), 'EmpireSquare_Aragon');
    // $this->debugPlaceToken(PAWN, Players::get(2371052)->getBank(), 'EmpireSquare_France');
    // $this->debugPlaceToken(PAWN, Players::get(2371052)->getBank(), 'EmpireSquare_Portugal');
    // $this->debugPlaceToken(PAWN, Players::get(2371052)->getBank(), 'EmpireSquare_HolyRomanEmpire');
    // $this->debugPlaceToken(PAWN, Players::get(2371052)->getBank(), 'EmpireSquare_Aragon');
    // $this->debugPlaceToken(KNIGHT, CATHOLIC, 'EmpireSquare_PapalStates');
    // $this->debugPlaceToken(KNIGHT, CATHOLIC, 'EmpireSquare_England');
    // $this->debugPlaceToken(KNIGHT, REFORMIST, 'EmpireSquare_England');
    // Notifications::log('card', Cards::get('EmpireSquare_PapalStates'));
    // $this->debugPlaceCardInTableau('PREN131X_Michelangelo',WEST,2371052);
    // $this->debugPlaceCardInTableau('PREN018_AlmeidaArmada',WEST,2371052);

    // $this->debugPlaceToken(BISHOP, CATHOLIC,'PREN039_FlorentineWool');
    // $this->debugPlaceCardInTableau('EmpireSquare_PapalStates',WEST,2371053);
    // Cards::get('EmpireSquare_PapalStates')->setSide(REPUBLIC);
    // Notifications::log('greenPirates',Cards::get('VictoryHoly')->getSupremeReligion());
    // $this->testHolyVictory();
    // $this->debugPlaceCardInTableau('EmpireSquare_France', WEST, 2371052);
    // $this->debugPlaceToken(PAWN, MEDICI, 'EmpireSquare_France');
    // Empires::get(PAPAL_STATES)->changeToMedievalState(Players::get());
    // Empires::get(PAPAL_STATES)->changeToTheocracy(CATHOLIC);
    // $this->testRenaissanceVictory();
    // $this->debugPlaceCardInMarket('PREN110X_TransylvanianPlot', EAST, 1);
    // $this->debugPlaceCardInMarket('PREN122X_TheLastSigh', EAST, 2);
    // $this->debugPlaceCardInMarket('PREN143X_WolfOfRimini', WEST, 3);
    // Notifications::log('venice2', Empires::get(PAPAL_STATES)->getCities());

    // Notifications::log('hasAbility',Players::get(2371053)->hasSpecialAbility(SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY));
    


    // Notifications::log('index', Engine::getUnresolvedActions([FREE_ACTION])[0]->getIndex());
    // Notifications::log('active', Players::anyPlayerHasSpecialAbility(SA_DECLARE_GLOBALIZATION_COSTS_TWO_ACTIONS));
    // Cards::get('EmpireSquare_Hungary')->setSide(REPUBLIC);
    // Notifications::log('queen', Cards::get('PREN076_SophiaPalaiologina'));
    // $this->fixDb();
    // $this->setExtraData('kingId', $kingCard->getId());
    // Cards::move('PREN048_MaryTheRich', Locations::tableau(2371053, WEST));
    // Cards::get('PREN048_MaryTheRich')->setExtraData('kingId', 'EmpireSquare_Portugal');

    // Notifications::log('tableau',Cards::getAllCardsInTableaux());
    // Cards::move('PREN046_JoannaTheMad', Locations::queens(ARAGON));
    // $card = Cards::get('EmpireSquare_Aragon');
    // $card->setLocation(Locations::tableau(2371053, WEST));

    // Notifications::log('tableauCards east', Players::get()->getTableauCardsForRegion(EAST));
    // Notifications::log('tableauCards west', Players::get()->getTableauCardsForRegion(WEST));
    // Game::get()->gamestate->jumpToState(ST_END_GAME);
    // $this->debugChangeQueen('PREN151X_CatherineOfNavarre');
    // $this->debugChangeQueen('PREN162X_CatherineDeMedici');

    // $this->debugPlaceCardInMarket('PREN062_BarbarossaBrothers');
    // Cards::get('PREN044_IsabellaOfCastille')->discard();
    // Cards::get('EmpireSquare_England')->flip();
    // Notifications::log('king', Cards::get('PREN044_IsabellaOfCastille')->getKing());
    // $this->debugPlaceCardInMarket('PREN044_IsabellaOfCastille');
    // Notifications::log('EmpireSquare_Portugal', Cards::get('EmpireSquare_Portugal'));
    // Notifications::log('globals', Engine::getResolvedActions([PLAYER_ACTION]));

    // Notifications::log('canDeclare', Cards::get('VictoryHoly')->canBeDeclaredByPlayer(Players::get()));

    // AtomicActions::get(PATRON_VICTORY)->stPatronVictory();
    // Notifications::declareVictory(Players::get(),Cards::get('VictoryImperial'));
    // $this->debugMoveCardToTableau('EmpireSquare_France', EAST);

    // Cards::get('EmpireSquare_England')->setExtraData('suzerainId','EmpireSquare_PapalStates');
    // Notifications::log('options', TableauOps::get(BEHEAD_OP)->getOptions(Cards::get('PREN088_CemAntiHostage')));
    // Notifications::log('options', TableauOps::get(INQUISITOR_OP_CATHOLIC)->getOptions());
    // Cards::get('EmpireSquare_Portugal')->setExtraData('suzerain', null);
    // Notifications::log('isNull', Cards::get('EmpireSquare_Aragon')->getExtraData('suzerainId') === null);
    // Notifications::log('owner', Cards::get('EmpireSquare_Aragon')->getSuzerain());
    // Notifications::log('empire squares', Cards::getAllEmpireSquares());
    // Tokens::get('rook_catholic_8')->repress(MAMLUK);
    // Cards::move('PREN083_PospoliteRuszenie', Locations::market(EAST, 1));
    // Cards::get('EmpireSquare_Mamluk')->flip();
    // Notifications::flipEmpireCard(Players::get(), Cards::get('EmpireSquare_Mamluk'));
    // $card = Cards::get('EmpireSquare_England');
    // $card->setExtraData('hello', 'world');
    // $card->setUsed(1);
    // Notifications::log('card', $card);
    // Notifications::log('engine',Engine::getResolvedActions([TABLEAU_OPS_SELECT_EAST]));
    // Notifications::log('Available ops', Cards::get('PREN039_FlorentineWool')->getAvailableOps());
    // Cards::setUsed('PREN039_FlorentineWool',0);
    // $this->debugPlaceToken(BISHOP, REFORMIST, 'PREN039_FlorentineWool');


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
      85521161,
      86301894,
      91053159,
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
