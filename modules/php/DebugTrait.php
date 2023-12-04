<?php

namespace PaxRenaissance;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
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
    Notifications::log('Token', Borders::get(BORDER_FRANCE_HOLY_ROMAN_EMPIRE)->getToken());
    // Notifications::log('East', Empires::getRegion(EAST));
    // Notifications::log('Religion', $token->getReligion());
    // Notifications::log('Cities', Empires::get(BYZANTIUM)->getReligion());
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
