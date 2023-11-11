<?php

namespace PaxRenaissance;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\ChessPieces;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;


trait DebugTrait
{
  function test()
  {
    Cards::setupCreateMarketDecks(Players::getAll());
    // ChessPieces::createTokens();
    // Notifications::log('card', Cards::get('PREN001_InquistionPope')->getType());
    // Notifications::log('market',Market::getUiData());
    // Notifications::log('players',Globals::getPlayers());
  }

}
