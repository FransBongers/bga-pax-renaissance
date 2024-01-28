<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;

class TableauCard extends Card
{
  protected $type = TABLEAU_CARD;
  protected $id;
  protected $agents = null;
  protected $empire;
  protected $flavorText = [];
  protected $name;
  protected $oneShot = null;
  protected $prestige = [];
  protected $region;
  protected $specialAbilities = [];
  protected $ageOfReformationPromo = false;

  public function __construct($row)
  {
    parent::__construct($row);
  }

  protected $staticAttributes = [
    'id',
    'agents',
    'empire',
    'flavorText',
    'name',
    'oneShot',
    'ops',
    'prestige',
    'region',
    'type',
    'specialAbilities',
  ];

  public function jsonSerialize()
  {
    $data = parent::jsonSerialize();

    return array_merge($data, [
      'agents' => $this->agents,
      'empire' => $this->empire,
      'flavorText' => $this->flavorText,
      'name' => $this->name,
      'oneShot' => $this->oneShot,
      'prestige' => $this->prestige,
      'region' => $this->region,
      'type' => $this->type,
      'sellValue' => $this->getSellValue(),
      'specialAbilities' => $this->specialAbilities,
      'isQueen' => $this->isQueen(),
    ]);
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
      $this->discard(DISCARD, $this->getOwner());
  }

  public function discard($messageType = DISCARD, $player = null)
  {
    $player = $player === null ? Players::get() : $player;
    $tokens = $this->getTokens();
    foreach ($tokens as $token) {
      $token->returnToSupply(RETURN_TO_SUPPLY, $player, true);
    }
    $adjustPrestige = $this->isInTableau();
    $fromLocationId = $this->location;
    Cards::insertOnTop($this->getId(), DISCARD);
    $this->location = DISCARD;
    Notifications::discardCard($fromLocationId, $adjustPrestige,$player, $this, DISCARD, $messageType);
    $this->deactivateAbility();
  }

  public function purchase($player, $ctx = null)
  {
    $playerId = $player->getId();

    $cost = $this->getPurchaseCost();

    $placedFlorins = Market::payPurchaseCost($this);
    $floringsOnCard = Market::takeFlorinsOnCard($this);

    Players::incFlorins($playerId, $floringsOnCard - $cost);

    Cards::move($this->getId(), Locations::hand($playerId));

    Notifications::purchaseCard($player, $this, $placedFlorins, $floringsOnCard);
  }

  public function play($player)
  {
    if ($this->region === EAST) {
      $this->location = Locations::tableau($player->getId(), EAST);
      $this->state = Cards::insertOnTop($this->getId(), $this->location);
    } else {
      $this->location = Locations::tableau($player->getId(), WEST);
      $this->state = Cards::insertOnTop($this->getId(), $this->location);
    }

    Notifications::playCard($player, $this);
    $this->activateAbility();
  }

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...

  public function isAgeOfReformpationPromo()
  {
    return $this->ageOfReformationPromo;
  }


  public function isCometCard()
  {
    return false;
  }

  public function getAgents()
  {
    return $this->agents;
  }

    /**
   * Returns array of empires that are valid for this cards actions
   * ie, the empire of the card or all western / eastern empires if empire is east or west
   */
  public function getAllEmpireIds($includeRegion = true)
  {
    $empireId = $this->isQueen() ? $this->getKing()->getEmpire() : $this->empire;
    $empireIdIsRegion = in_array($empireId, REGIONS);
    $validEmpireIds = $empireIdIsRegion && !$includeRegion ? [] : [$empireId];
    if ($empireIdIsRegion) {
      $validEmpireIds = array_merge($validEmpireIds, Empires::getRegionIds($empireId));
    } else if ($includeRegion) {
      $validEmpireIds[] = Empires::get($empireId)->getRegion();
    }
    return $validEmpireIds;
  }

  public function getOneShot()
  {
    return $this->oneShot;
  }

  public function getEmpireId()
  {
    return $this->empire;
  }

  public function getPrestige()
  {
    return $this->prestige;
  }

  public function getPurchaseCost()
  {
    $location = $this->getLocation();
    $column = intval(explode('_', $location)[2]);
    return $column;
  }

  public function getSpecialAbilities()
  {
    return $this->specialAbilities;
  }


  // public function getIcons()
  // {
  //   return array_merge(
  //     array_count_values($this->getCategories()),
  //     array_count_values($this->getContinents()),
  //     $this->getEnclosureRequirements()
  //   );
  // }
}
