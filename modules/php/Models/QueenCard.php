<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;

class QueenCard extends TableauCard
{
  protected $suitors = [];
  protected $height = 0;

  // ....###.....######..########.####..#######..##....##..######.
  // ...##.##...##....##....##.....##..##.....##.###...##.##....##
  // ..##...##..##..........##.....##..##.....##.####..##.##......
  // .##.....##.##..........##.....##..##.....##.##.##.##..######.
  // .#########.##..........##.....##..##.....##.##..####.......##
  // .##.....##.##....##....##.....##..##.....##.##...###.##....##
  // .##.....##..######.....##....####..#######..##....##..######.


  public function discard($messageType = DISCARD, $player = null)
  {
    $player = $player === null ? Players::get() : $player;

    Cards::insertOnTop($this->getId(), DISCARD);
    $this->location = DISCARD;

    $king = $this->getKing();
    $this->setKing(null);
    if ($king !== null) {
      $king->setQueen(null);
    }
    
    Notifications::discardCard($player, $this, DISCARD, DISCARD, null, $king);
  }

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...

  public function isQueen()
  {
    return true;
  }

  public function getSuitors()
  {
    return array_map(function ($empireId) {
      return Empires::get($empireId)->getEmpireCard();
    }, $this->suitors);
  }

  public function getKing()
  {
    $kingCardId = $this->getExtraData('kingId');
    if ($kingCardId === null) {
      return null;
    }
    return Cards::get($kingCardId);
  }

  public function setKing($kingCard)
  {
    if ($kingCard === null) {
      $this->setExtraData('kingId', null);
    } else {
      $this->setExtraData('kingId', $kingCard->getId());
    }
  }

  public function jsonSerialize()
  {
    $data = parent::jsonSerialize();

    return array_merge($data, [
      'height' => $this->height,
      'suitors' => $this->suitors,
    ]);
  }
}
