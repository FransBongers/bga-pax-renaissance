<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
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
    $player = $this->getOwner();

    $king = $this->getKing();

    $tokens = $this->getTokens();
    foreach ($tokens as $token) {
      $token->returnToSupply(RETURN_TO_SUPPLY, $player, true);
    }

    Cards::insertOnTop($this->getId(), DISCARD);
    $this->location = DISCARD;

    Notifications::discardQueen($player, $this, $king);
  }

  public function oldMaid($player)
  {
    Cards::insertOnTop($this->getId(), Locations::oldMaids($player->getId()));
    Notifications::oldMaid($player, $this);
  }

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...

  public function isSilenced()
  {
    $king = $this->getKing();
    $tokens = $this->getTokens();
    if ($king !== null) {
      $tokens = array_merge($tokens, $king->getTokens());
    }
    $hasBishop = Utils::array_some($tokens, function ($token) {
      return $token->getType() === BISHOP;
    });
    return $hasBishop;
  }

  public function isOldMaid()
  {
    return Utils::startsWith($this->location, 'oldMaids_');
  }

  public function isQueen()
  {
    return true;
  }

  public function getEmpireId()
  {
    $king = $this->getKing();
    if ($king === null) {
      return null;
    }
    return $king->getEmpireId();
  }

  public function getSuitors()
  {
    return array_map(function ($empireId) {
      return Empires::get($empireId)->getEmpireCard();
    }, $this->suitors);
  }

  // Returns player if in tableau, or null if not in tableau
  public function getOwner()
  {
    if (Utils::startsWith($this->location, 'tableau_') || Utils::startsWith($this->location, 'oldMaids_')) {
      return Players::get(intval(explode('_', $this->location)[2]));
    }
    if (Utils::startsWith($this->location, 'queens_')) {
      return $this->getKing()->getOwner();
    }
    return null;
  }


  public function getKing()
  {
    if (!Utils::startsWith($this->location, 'queens_')) {
      return null;
    }
    $empireId = explode('_', $this->location)[1];
    return Empires::get($empireId)->getEmpireCard();
  }

  // public function setKing($kingCard)
  // {
  //   if ($kingCard === null) {
  //     $this->setExtraData('kingId', null);
  //   } else {
  //     $this->setExtraData('kingId', $kingCard->getId());
  //   }
  // }

  public function jsonSerialize()
  {
    $data = parent::jsonSerialize();

    return array_merge($data, [
      'height' => $this->height,
      'suitors' => $this->suitors,
      'hasKing' => $this->getKing() !== null,
    ]);
  }
}
