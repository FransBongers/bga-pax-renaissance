<?php

namespace PaxRenaissance;

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


trait DebugTrait
{
  function test()
  {
    Cards::get('EmpireSquare_England')->setExtraData('suzerainId','EmpireSquare_PapalStates');
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
    
    // Notifications::log('Available ops', Cards::get('PREN040_SindicatRemenca')->getAvailableOps());

    // $this->debugPlaceToken(KNIGHT, REFORMIST, CONSTANTINOPLE_1);
    // $this->debugPlaceToken(PIRATE, ISLAMIC, BORDER_ARAGON_PAPAL_STATES);
    // $this->debugPlaceToken(KNIGHT, REFORMIST, MODON);
    // $this->debugPlaceToken(ROOK, REFORMIST, Empires::get(MAMLUK)->getEmpireSquareId());
    // $this->debugPlaceToken(ROOK, CATHOLIC, Empires::get(MAMLUK)->getEmpireSquareId());
    // $this->debugPlaceToken(PAWN, MARCHIONNI, Empires::get(MAMLUK)->getEmpireSquareId());
    // Notifications::log('cardType', Cards::get('EmpireSquare_France')->getType());
    // Notifications::log('attackers', AtomicActions::get(BATTLE_RESULT)->getAttackers(Players::get(), BYZANTIUM, JIHAD_ONE_SHOT, ['cardId' => 'PREN059_Safavids']));
    // Notifications::log('defenders', AtomicActions::get(BATTLE_RESULT)->getDefenders(BYZANTIUM, JIHAD_ONE_SHOT, ['cardId' => 'PREN059_Safavids']));


    // $this->debugPlaceToken(BISHOP, REFORMIST, 'EmpireSquare_Byzantium');
    // $this->debugPlaceToken(ROOK, REFORMIST, 'EmpireSquare_Byzantium');
    // $this->debugPlaceToken(PAWN, FUGGER, 'EmpireSquare_Byzantium');
    // $this->debugPlaceToken(PAWN, MEDICI, 'EmpireSquare_Byzantium');
    // $this->debugPlaceToken(PIRATE, CATHOLIC, BORDER_BYZANTIUM_HUNGARY);
    // $this->debugPlaceToken(PAWN, MEDICI, BORDER_BYZANTIUM_MAMLUK);

    // Cards::insertAtBottom('EmpireSquare_PapalStates', Locations::tableau(2371053, WEST));
    // Notifications::log('tableau', Cards::get('PREN101X_CivilEngineer'));
    // Notifications::log('thrones', Cards::getAllCardsInThrones());
    // Notifications::log('merged', array_merge(Cards::getAllCardsInTableaux(),Cards::getAllCardsInThrones()));
    // $this->debugPlaceToken(BISHOP, REFORMIST, 'EmpireSquare_PapalStates');
    // $this->debugPlaceToken(PIRATE, REFORMIST, BORDER_ENGLAND_FRANCE);

    // Notifications::log('Token', Borders::get(BORDER_FRANCE_HOLY_ROMAN_EMPIRE)->getToken());
    // Notifications::log('East', Empires::getRegion(EAST));
    // Notifications::log('Religion', $token->getReligion());
    // Notifications::log('Cities', Empires::get(BYZANTIUM)->getReligion());
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
