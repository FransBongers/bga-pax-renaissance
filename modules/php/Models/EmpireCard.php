<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Preferences;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\AtomicActions;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Events;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\PlayersExtra;

class EmpireCard extends Card
{
  protected $type = EMPIRE_CARD;
  protected $id;
  protected $empire;
  protected $nameKing;
  protected $nameRepublic;
  protected $prestige = [];
  protected $startLocation;

  protected $staticAttributes = [
    'empire',
    'nameKing',
    'nameRepublic',
    'startLocation',
    'type',
  ];

  public function jsonSerialize()
  {
    $data = parent::jsonSerialize();

    return array_merge($data, [
      'empire' => $this->empire,
      'type' => $this->type,
      'nameKing' => $this->nameKing,
      'nameRepublic' => $this->nameRepublic,
      'prestige' => $this->prestige,
    ]);
  }

  public function getEmpire()
  {
    return $this->empire;
  }

  public function getName()
  {
    // TODO: return correct based on side that is face up
    return $this->nameKing;
  }

  public function getPrestige()
  {
    return $this->prestige;
  }

  // ....###.....######..########.####..#######..##....##..######.
  // ...##.##...##....##....##.....##..##.....##.###...##.##....##
  // ..##...##..##..........##.....##..##.....##.####..##.##......
  // .##.....##.##..........##.....##..##.....##.##.##.##..######.
  // .#########.##..........##.....##..##.....##.##..####.......##
  // .##.....##.##....##....##.....##..##.....##.##...###.##....##
  // .##.....##..######.....##....####..#######..##....##..######.

  public function discard($player = null)
  {
    $player = $player === null ? Players::get() : $player;

    // TODO: handle discarding of queens / vassals

    Cards::insertOnTop($this->getId(), $this->startLocation);
    $this->location = $this->startLocation;
    Notifications::discardCard($player, $this, $this->startLocation);
  }
}
