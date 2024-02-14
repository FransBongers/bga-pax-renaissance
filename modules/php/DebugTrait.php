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
    $this->debugPlaceToken(PAWN, MEDICI, BORDER_ENGLAND_FRANCE);
    // $this->debugPlaceToken(PIRATE, CATHOLIC, BORDER_ENGLAND_PORTUGAL);
    // $this->debugPlaceCardInTableau('PREN134X_MiningEngineer', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN158X_OrderOfPreachers', WEST, 2371052);
    // $this->debugPlaceCardInTableau('PREN061_Qizilbash', EAST, 2371052);
    // $this->debugPlaceCardInTableau('PREN118X_GrandMufti', EAST, 2371052);
    
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
