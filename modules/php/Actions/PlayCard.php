<?php

namespace PaxRenaissance\Actions;


use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
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

    if ($card->getAgents() !== null) {
      $parent = $this->ctx->getParent();
      $parent->pushChild(new LeafNode([
        'action' => PLACE_AGENT,
        'playerId' => $this->ctx->getPlayerId(),
        'agents' => $card->getAgents(),
        'empireId' => $card->getEmpire(),
      ]));
    }

    $this->resolveAction(['cardId' => $cardId]);
  }
}
