<?php

namespace PaxRenaissance;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\ChessPieces;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\PlayersExtra;


trait DebugTrait
{
  function test()
  {
    Market::refresh(Players::get());
    // Notifications::log('extra', Players::getUiData(Players::getCurrentId()));
    // Players::getActive()->
    // Notifications::log('args',$this->argsResolveChoice());
    // Cards::setupCreateMarketDecks(Players::getAll());
    // ChessPieces::createTokens();
    // Notifications::log('card', Cards::get('PREN001_InquistionPope')->getType());
    // Notifications::log('market',Market::getUiData());
    // Notifications::log('players',Globals::getPlayers());
  }

  function engineDisplay()
  {
    Notifications::log('engine', Globals::getEngine());
  }

  function debugIncFlorins($amount, $playerId = null) {
    $playerId = $this->debugGetPlayerId($playerId);
    
    Players::incFlorins($playerId, intval($amount));
  }


  function debugGetPlayerId($playerId = null) {
    return $playerId = $playerId === null ? Players::get()->getId() : intval($playerId);
  }
}
