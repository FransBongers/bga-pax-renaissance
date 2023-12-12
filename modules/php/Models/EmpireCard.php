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
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Events;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\PlayersExtra;

class EmpireCard extends Card
{
  protected $type = EMPIRE_CARD;
  protected $id;
  protected $agents = [
    KING => [
      'separator' => null,
      'type' => PAWN,
    ],
    REPUBLIC => [
      'separator' => null,
      'type' => PAWN,
    ]
  ];
  protected $empire;
  protected $name;
  protected $prestige = [
    KING => [],
    REPUBLIC => [],
  ];
  protected $flavorText;
  protected $startLocation;
  protected $ops;
  protected $side;

  protected $staticAttributes = [
    'empire',
    'name',
    'name',
    'startLocation',
    'type',
  ];

  public function jsonSerialize()
  {
    $data = parent::jsonSerialize();

    return array_merge($data, [
      'side' => $this->side,
      'type' => $this->type,
      KING => [
        'agents' => $this->agents[KING],
        'name' => $this->name[KING],
        'ops' => $this->ops[KING],
        'prestige' => $this->prestige[KING],
      ],
      REPUBLIC => [
        'agents' => $this->agents[REPUBLIC],
        'name' => $this->name[REPUBLIC],
        'ops' => $this->ops[REPUBLIC],
        'prestige' => $this->prestige[REPUBLIC],
      ]
    ]);
  }

  /**
   * Returns array of empires that are valid for this cards actions
   * ie, the empire of the card or all western / eastern empires if empire is east or west
   */
  public function getAllEmpiresIds($includeRegion = true)
  {
    return [$this->empire];
  }

  public function getEmpire()
  {
    return $this->empire;
  }

  public function getName($side  = null)
  {
    if ($side !== null) {
      return $this->name[$side];  
    }
    return $this->name[$this->side];
  }

  public function getOps()
  {
    // TODO: find out why this is null if not set on card level
    return $this->ops[$this->side];
  }

  public function getPrestige()
  {
    return $this->prestige[$this->side];
  }

  public function getSide()
  {
    return $this->side;
  }

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

    // TODO: handle discarding of queens / vassals

    Cards::insertOnTop($this->getId(), $this->startLocation);
    $this->location = $this->startLocation;
    Notifications::discardCard($player, $this, $this->startLocation, $messageType);
  }

  public function flip($player = null)
  {
    $player = $player === null ? Players::get() : $player;

    $this->side = $this->getExtraData('side') === KING ? REPUBLIC : KING;
    $this->setExtraData('side',$this->side);
    Notifications::flipEmpireCard($player, $this);
  }

  public function moveToTableau($player)
  {
    $region = Empires::get($this->empire)->getRegion();
    if ($region === EAST) {
      $this->location = Locations::tableau($player->getId(), EAST);
      $this->state = Cards::insertOnTop($this->getId(), $this->location);
    } else {
      $this->location = Locations::tableau($player->getId(), WEST);
      $this->state = Cards::insertAtBottom($this->getId(), $this->location);
    }

    Notifications::moveEmpireSquare($player, $this);
  }
}
