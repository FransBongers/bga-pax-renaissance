<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;

class TableauCard extends Card
{
  protected $type = TABLEAU_CARD;
  protected $id;
  protected $flavorText = [];
  protected $name;
  protected $region;

  protected $staticAttributes = [
    'flavorText',
    'name',
    'region',
    'type',
  ];

  public function jsonSerialize()
  {
    $data = parent::jsonSerialize();

    return array_merge($data, [
      'flavorText' => $this->flavorText,
      'name' => $this->name,
      'region' => $this->region,
      'type' => $this->type,
    ]);
  }

  // ....###.....######..########.####..#######..##....##..######.
  // ...##.##...##....##....##.....##..##.....##.###...##.##....##
  // ..##...##..##..........##.....##..##.....##.####..##.##......
  // .##.....##.##..........##.....##..##.....##.##.##.##..######.
  // .#########.##..........##.....##..##.....##.##..####.......##
  // .##.....##.##....##....##.....##..##.....##.##...###.##....##
  // .##.....##..######.....##....####..#######..##....##..######.Ì

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

  public function sell($player)
  {
    $playerId = $player->getId();

    $value = $this->getSellValue();
    Players::incFlorins($playerId, $value);

    Cards::move($this->getId(), DISCARD);

    Notifications::sellCard($player, $this, $value);
  }

  // .##.....##.########.####.##.......####.########.##....##
  // .##.....##....##.....##..##........##.....##.....##..##.
  // .##.....##....##.....##..##........##.....##......####..
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // .##.....##....##.....##..##........##.....##.......##...
  // ..#######.....##....####.########.####....##.......##...

  public function isCometCard()
  {
    return false;
  }

  public function getPurchaseCost()
  {
    $location = $this->getLocation();
    $column = intval(explode('_', $location)[2]);
    return $column;
  }

  public function getSellValue()
  {
    return 2;
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
