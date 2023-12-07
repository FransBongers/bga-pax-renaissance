<?php

namespace PaxRenaissance;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\PlayersExtra;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Models\Border;

trait DebugTrait
{
  function test()
  {
    Notifications::log('tableau', Cards::get('PREN101X_CivilEngineer'));
    // Notifications::log('thrones', Cards::getAllCardsInThrones());
    // Notifications::log('merged', array_merge(Cards::getAllCardsInTableaux(),Cards::getAllCardsInThrones()));
    // $this->debugPlaceToken(PAWN, MEDICI, BORDER_ARAGON_FRANCE);
    // $this->debugPlaceToken(PIRATE, REFORMIST, BORDER_ENGLAND_FRANCE);

    // Notifications::log('Token', Borders::get(BORDER_FRANCE_HOLY_ROMAN_EMPIRE)->getToken());
    // Notifications::log('East', Empires::getRegion(EAST));
    // Notifications::log('Religion', $token->getReligion());
    // Notifications::log('Cities', Empires::get(BYZANTIUM)->getReligion());
  }

  //debugPlaceToken(pawn, medici, border_aragon_france)
  function debugPlaceToken($type, $bankOrReligion, $locationId) {
    $supply = Locations::supply($type, $bankOrReligion);
    
    $token = Tokens::getTopOf($supply);
    Notifications::log('token', $token);

    $fromLocationId = $token->getLocation();
    $token = $token->move($locationId);
    Notifications::placeToken(Players::get(),$token, $fromLocationId);
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
