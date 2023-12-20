<?php

namespace PaxRenaissance;

use Locale;
use PaxRenaissance\Core\Engine;
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
  function test()
  {
    // $this->debugPlaceCardInMarket('PREN088_CemAntiHostage');
    Notifications::log('EmpireSquare_Portugal', Cards::get('EmpireSquare_Portugal'));
    // Notifications::log('globals', Engine::getResolvedActions([PLAYER_ACTION]));

    // Notifications::log('canDeclare', Cards::get('VictoryHoly')->canBeDeclaredByPlayer(Players::get()));

    // AtomicActions::get(PATRON_VICTORY)->stPatronVictory();
    // Notifications::declareVictory(Players::get(),Cards::get('VictoryImperial'));
    // $this->debugMoveCardToTableau('EmpireSquare_France', EAST);

    // Cards::get('EmpireSquare_England')->setExtraData('suzerainId','EmpireSquare_PapalStates');
    // Notifications::log('options', TableauOps::get(INQUISITOR_OP_REFORMIST)->getOptions());
    // Notifications::log('options', TableauOps::get(INQUISITOR_OP_ISLAMIC)->getOptions());
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

  function debugMoveCardToTableau($cardId, $region = WEST, $playerId = null)
  {
    $playerId = $playerId === null ? Players::get()->getId() : $playerId;
    Cards::move($cardId, Locations::tableau($playerId, $region));
  }

  //debugPlaceToken(pawn, medici, border_aragon_france)
  function debugPlaceToken($type, $separator, $locationId)
  {
    $supply = Locations::supply($type, $separator);

    $token = Tokens::getTopOf($supply);
    Notifications::log('token', $token);

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
}
