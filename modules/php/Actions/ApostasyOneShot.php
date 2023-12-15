<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\Flows;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\OneShots;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Models\Border;

class ApostasyOneShot extends \PaxRenaissance\Models\AtomicAction
{
  protected $apostasyPrestigeMap = [
    APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT => [ISLAMIC, CATHOLIC],
    APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT => [REFORMIST, ISLAMIC],
    APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT => [REFORMIST, CATHOLIC],
  ];

  public function getState()
  {
    return ST_APOSTASY_ONE_SHOT;
  }

  // ..######..########....###....########.########
  // .##....##....##......##.##......##....##......
  // .##..........##.....##...##.....##....##......
  // ..######.....##....##.....##....##....######..
  // .......##....##....#########....##....##......
  // .##....##....##....##.....##....##....##......
  // ..######.....##....##.....##....##....########

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function stApostasyOneShot()
  {
    $info = $this->ctx->getInfo();
    $cardId = $info['cardId'];
    $card = Cards::get($cardId);

    $oneShot = $card->getOneShot();

    $affectedPlayers = $this->getAffectedPlayers($oneShot);

    foreach($affectedPlayers as $playerId => $cardsToDiscard)
    {
      $player = Players::get($playerId);
      Notifications::apostasy($player, $this->apostasyPrestigeMap[$oneShot]);
      foreach($cardsToDiscard as $cardToDiscard) {
        // TODO: check if this can lead to players becoming active -> discard empire cards?
        $cardToDiscard->discard(DISCARD, $player);
      }
    }

    if ($card->getAgents() !== null) {
      $this->ctx->getParent()->pushChild(new LeafNode([
        'action' => PLACE_AGENT,
        'playerId' => $this->ctx->getPlayerId(),
        'agents' => $card->getAgents(),
        'empireId' => $card->getEmpire(),
        'optional' => false,
        'repressCost' => 0, // TODO: check this => do cards with apostasy only have bishops?
      ]));
    }

    $this->resolveAction([]);
  }




  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  public function getAffectedPlayers($oneShot)
  {
    $result = [];
    $prestige = $this->apostasyPrestigeMap[$oneShot];
    foreach(Players::getAll() as $player) {
      $playerPrestige = $player->getPrestige();

      if (!($playerPrestige[$prestige[0]] > 0 && $playerPrestige[$prestige[1]] > 0)) {
        continue;
      }
      
      $tableauCards = $player->getTableauCards();
      $result[$player->getId()] = Utils::filter($tableauCards, function ($card) use ($prestige) {
        return Utils::array_some($card->getPrestige(), function ($cardPrestige) use ($prestige) {
          return in_array($cardPrestige, $prestige);
        });
      });
    }
    return $result;
  }
}
