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
    $suzerainId = $this->getExtraData('suzerainId');
    return array_merge($data, [
      'empire' => $this->empire,
      'side' => $this->side,
      'type' => $this->type,
      'isVassal' => $suzerainId !== null,
      'sellValue' => $this->getSellValue(),
      'suzerainId' => $suzerainId,
      'queenId' => $this->getExtraData('queenId'),
      'isQueen' => false,
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
  public function getAllEmpireIds($includeRegion = true)
  {
    $result = [$this->empire];
    if ($includeRegion) {
      $result[] = Empires::get($this->empire)->getRegion();
    }
    return $result;
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

  public function getVassals()
  {
    $empireSquares = Cards::getAllEmpireSquares();
    $vassals = Utils::filter($empireSquares, function ($empireSquare) {
      return $empireSquare->getExtraData('suzerainId') === $this->id;
    });
    return $vassals;
  }

  public function isVassal()
  {
    return $this->getExtraData('suzerainId') !== null;
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

  public function discard($messageType = DISCARD, $player = null)
  {
    $player = $player === null ? Players::get() : $player;

    // TODO: handle discarding of queens / vassals
    $vassals = $this->getVassals();

    foreach($vassals as $vassal) {
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

    Cards::insertOnTop($this->getId(), $this->startLocation);
    $this->location = $this->startLocation;

    Notifications::discardCard($player, $this, $this->startLocation, $messageType, $wasVassalTo);
  }

  public function sellRoyalCouple($player, $queen)
  {
    $playerId = $player->getId();

    $kingValue = $this->getSellValue();
    $queenValue = $queen->getSellValue();
    $value = $kingValue + $queenValue;
    Players::incFlorins($playerId, $value);

    Cards::move($queen->getId(), $this->startLocation);
    Cards::move($this->getId(), $this->startLocation);
    $queen = $this->getQueen();
    Notifications::sellRoyalCouple($player, $this, $queen, $value);
    $this->discard(DISCARD, $player);
  }
  // public function sell($player)
  // {
  //   $playerId = $player->getId();

  //   $value = $this->getSellValue();
  //   Players::incFlorins($playerId, $value);

  //   Notifications::sellCard($player, $this, $value);
  //   $this->discard(DISCARD, $player);
  // }

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
    foreach($vassals as $vassal) {
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
      $this->insertInTableau($player,$insertInTableauWithRegion);
    }

    Notifications::flipEmpireCard($player, $this, $formerSuzerain);
  }

  public function getSuzerain()
  {
    $suzerainId = $this->getExtraData('suzerainId');

    if ($suzerainId === null) {
      return null;
    }
    $suzerain = Cards::get($suzerainId);
    // Notifications::log('suzerain', $suzerain);
    return $suzerain;
  }

  public function setQueen($queenCard)
  {
    if ($queenCard === null) {
      $this->setExtraData('queenId', null);
    } else {
      $this->setExtraData('queenId', $queenCard->getId());
    }
  }

  public function getQueen() {
    $queenCardId = $this->getExtraData('queenId');
    if ($queenCardId === null) {
      return null;
    }
    return Cards::get($queenCardId);
  }

  /**
   * suzerain is the empire square, not the empire
   */
  public function resolveRegimeChange($player, $isCampaign, $attackingEmpire = null) {
    // $isInThrone = $this->location === $this->startLocation;
    $playerId = $player->getId();

    $isInOwnTableau = in_array($this->location, [Locations::tableau($playerId, EAST), Locations::tableau($playerId, WEST)]);
    $isInEnemeyTableau = !$isInOwnTableau && Utils::startsWith($this->location, 'tableau_');

    // TODO: handle cards that are a Vassal right now
    if ($isInEnemeyTableau || $isInOwnTableau) {
      $this->discardBishopQueenVassals($player);
    }

    $wasRepublic = $this->side === REPUBLIC;
    $fromSuzerain = $this->getSuzerain();
    $previousOwner = $this->getOwner();
    if ($wasRepublic) {
      $this->side = KING;
      $this->setExtraData('side', KING);
    }

    $from = [
      'suzerain' => $fromSuzerain,
      'wasRepublic' => $wasRepublic,
      'previousOwnerId' => $previousOwner !== null ? $previousOwner->getId() : null,
    ];

    if ($isInOwnTableau) {
      $this->flip($player);
    } else if ($isCampaign) {
      $this->vassalage($player, $attackingEmpire, $from);
    } else {
      $this->moveToTableau($player, $from);
    }
  }

  public function marry($player,$queen)
  {
    if ($this->location === $this->startLocation) {
      $this->moveToTableau($player,[]);
    }
    $this->setQueen($queen);
    $queen->setKing($this);
    Cards::move($queen->getId(), $this->location);
  }

  public function moveToTableau($player, $from)
  {
    $region = Empires::get($this->empire)->getRegion();
    $this->insertInTableau($player, $region);

    Notifications::moveEmpireSquare($player, $this, $from);
  }

  public function vassalage($player, $attackingEmpire, $from)
  {
    $suzerain = $attackingEmpire->isVassal() ? $attackingEmpire->getSuzerain() : $attackingEmpire;

    $suzerainLocation = $suzerain->getLocation();

    $region = explode('_', $suzerainLocation)[1];

    $this->insertInTableau($player,$region);
    $this->setExtraData('suzerainId', $suzerain->getId());

    Notifications::vassalage($player, $this, $suzerain, $from);
  }

  private function insertInTableau($player, $region) {
    if ($region === EAST) {
      $this->location = Locations::tableau($player->getId(), EAST);
      $this->state = Cards::insertOnTop($this->getId(), $this->location);
    } else {
      $this->location = Locations::tableau($player->getId(), WEST);
      $this->state = Cards::insertAtBottom($this->getId(), $this->location);
    }
  }
}
