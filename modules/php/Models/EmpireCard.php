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
    $owner = $this->getOwner();
    return array_merge($data, [
      'empire' => $this->empire,
      'side' => $this->side,
      'type' => $this->type,
      'isVassal' => $this->isVassal(),
      'sellValue' => $this->getSellValue(),
      'suzerainId' => $this->isVassal() ? $this->getSuzerain()->getId() : null,
      'queens' => $this->getQueens(),
      'isQueen' => false,
      'owningBank' => $owner !== null ? $owner->getBank() : null,
      KING => [
        'agents' => $this->agents[KING],
        'name' => $this->name[KING],
        'flavorText' => $this->flavorText[KING],
        'ops' => $this->ops[KING],
        'prestige' => $this->prestige[KING],
      ],
      REPUBLIC => [
        'agents' => $this->agents[REPUBLIC],
        'name' => $this->name[REPUBLIC],
        'flavorText' => $this->flavorText[REPUBLIC],
        'ops' => $this->ops[REPUBLIC],
        'prestige' => $this->prestige[REPUBLIC],
      ]
    ]);
  }

  /**
   * Returns array of empires that are valid for this cards actions
   * ie, the empire of the card or all western / eastern empires if empire is east or west
   */
  public function getAllEmpireIds($includeRegion = true)
  {
    $result = [$this->empire];
    if ($includeRegion) {
      $result[] = Empires::get($this->empire)->getRegion();
    }
    return $result;
  }

  public function getEmpireId()
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

  // Returns player if in tableau, or null if not in tableau
  public function getOwner()
  {
    if (Utils::startsWith($this->location, 'tableau_')) {
      return Players::get(intval(explode('_', $this->location)[2]));
    }
    if (Utils::startsWith($this->location, 'vassals_')) {
      return $this->getSuzerain()->getOwner();
    }
    return null;
  }

  public function getPrestige()
  {
    return $this->prestige[$this->side];
  }

  public function getRegion()
  {
    return Empires::get($this->getEmpireId())->getRegion();
  }

  public function getSide()
  {
    return $this->side;
  }

  public function setSide($side)
  {
    $this->side = $side;
    $this->setExtraData('side', $this->side);
  }

  public function getSuzerain()
  {
    if (!Utils::startsWith($this->location, 'vassals_')) {
      return null;
    }
    $empireId = explode('_', $this->location)[1];
    return Empires::get($empireId)->getEmpireCard();
  }

  public function getThrone()
  {
    return $this->startLocation;
  }

  public function getVassals()
  {
    return Cards::getInLocationOrdered(Locations::vassals($this->getEmpireId()))->toArray();
  }

  public function isVassal()
  {
    return Utils::startsWith($this->location, 'vassals_');
  }

  public function isSuzerain()
  {
    return count($this->getVassals()) > 0;
  }

  // ....###.....######..########.####..#######..##....##..######.
  // ...##.##...##....##....##.....##..##.....##.###...##.##....##
  // ..##...##..##..........##.....##..##.....##.####..##.##......
  // .##.....##.##..........##.....##..##.....##.##.##.##..######.
  // .#########.##..........##.....##..##.....##.##..####.......##
  // .##.....##.##....##....##.....##..##.....##.##...###.##....##
  // .##.....##..######.....##....####..#######..##....##..######.

  public function behead()
  {
    $this->discardQueens();

    $this->returnToThrone();
  }

  public function discardQueens()
  {
    $player = $this->getOwner();

    $queens = $this->getQueens();
    foreach ($queens as $queen) {
      $queen->discard(DISCARD, $player);
    }
  }

  public function discard($messageType = DISCARD, $player = null)
  {
    $player = $player === null ? Players::get() : $player;

    $adjustPrestige = $this->isInTableau();
    // TODO: handle discarding of queens / vassals
    $vassals = $this->getVassals();

    foreach ($vassals as $vassal) {
      $vassal->discard(DISCARD, $player);
    }

    $wasVassalTo = $this->getSuzerain();
    if ($wasVassalTo !== null) {
      $this->setExtraData('suzerainId', null);
    }

    $queen = $this->getQueen();
    if ($queen !== null) {
      Cards::move($queen->getId(), $this->startLocation);
    }
    $fromLocationId = $this->location;
    Cards::insertOnTop($this->getId(), $this->startLocation);
    $this->location = $this->startLocation;

    Notifications::discardCard($fromLocationId, $adjustPrestige, $player, $this, $this->startLocation, $messageType, $wasVassalTo);
  }

  public function isInThrone()
  {
    return $this->location === $this->startLocation;
  }

  public function returnToThrone()
  {
    $suzerain = null;
    if ($this->isVassal()) {
      $suzerain = $this->getSuzerain();
    }

    $vassals = $this->getVassals();
    foreach ($vassals as $vassal) {
      $vassal->returnToThrone();
    }

    $owner = $this->getOwner();
    $fromSide = $this->getSide();
    if ($fromSide === REPUBLIC) {
      $this->setSide(KING);
    }
    Cards::move($this->getId(), $this->startLocation);
    $this->location = $this->startLocation;

    Notifications::returnToThrone($owner, $this, $fromSide, $suzerain);
    $this->deactivateAbility();
    $queens = $this->getQueens();
    foreach($queens as $queen) {
      $queen->deactivateAbility();
    }
  }


  public function sell()
  {
    $this->returnToThrone();
  }

  public function discardBishopQueenVassals($player)
  {
    $tokens = $this->getTokens();
    // Note should never be more than 1 bishop
    foreach ($tokens as $token) {
      if ($token->getType() !== BISHOP) {
        continue;
      }
      $token->returnToSupply(RETURN_TO_SUPPLY, $player);
    }

    // Discard vassals
    $vassals = $this->getVassals();
    foreach ($vassals as $vassal) {
      $vassal->discard(DISCARD, $player);
    }

    $queen = $this->getQueen();
    if ($queen !== null) {
      $queen->discard(DISCARD, $player);
    }
  }

  public function flip($player = null)
  {
    $player = $player === null ? Players::get() : $player;

    $this->side = $this->getExtraData('side') === KING ? REPUBLIC : KING;
    $this->setExtraData('side', $this->side);

    $formerSuzerain = null;
    // Republic was a vassal king. We need to move it to tableau?
    if ($this->side === REPUBLIC && $this->isVassal()) {
      $formerSuzerain = $this->getSuzerain();
      $insertInTableauWithRegion = Empires::get($this->empire)->getRegion();

      $this->insertInTableau($player, $insertInTableauWithRegion);
    }

    Notifications::flipEmpireCard($player, $this, $formerSuzerain);
  }



  public function setQueen($queenCard)
  {
    if ($queenCard === null) {
      $this->setExtraData('queenId', null);
    } else {
      $this->setExtraData('queenId', $queenCard->getId());
    }
  }

  public function getQueens()
  {
    return Cards::getInLocationOrdered(Locations::queens($this->getEmpireId()))->toArray();
  }

  public function insertInTableau($player, $region)
  {
    if ($region === EAST) {
      $this->location = Locations::tableau($player->getId(), EAST);
      $this->state = Cards::insertOnTop($this->getId(), $this->location);
    } else {
      $this->location = Locations::tableau($player->getId(), WEST);
      $this->state = Cards::insertAtBottom($this->getId(), $this->location);
    }
  }

  public function isSilenced($player)
  {
    if ($player->hasSpecialAbility(SA_IMMUNE_TO_SILENCING)) {
      return false;
    }

    $queens = $this->getQueens();
    $tokens = $this->getTokens();
    foreach ($queens as $queen) {
      $tokens = array_merge($tokens, $queen->getTokens());
    }
    $hasBishop = Utils::array_some($tokens, function ($token) {
      return $token->getType() === BISHOP;
    });
    return $hasBishop;
  }
}
