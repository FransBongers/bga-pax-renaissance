<?php
namespace PaxRenaissance\Actions;


use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Players;

class PlayCard extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_PLAY_CARD;
  }

  public function isDoable($player)
  {
    return true;
  }


  public function stPlayCard()
  {
    $cardId = $this->ctx->getCardId();
    $player = self::getPlayer();

    $card = Cards::get($cardId);
    Notifications::log('played card', $card);
    if ($card === null || $card->getLocation() !== Locations::hand($player->getId())) {
      throw new \feException("Not allowed to purchase card");
    }
    Globals::incRemainingActions(-1);
    
    $card->play($player);
    
    $this->resolveAction(['cardId' => $cardId]);
  }
}
