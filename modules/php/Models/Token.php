<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;

class Token extends \PaxRenaissance\Helpers\DB_Model
{
  protected $location;
  protected $type;
  protected $separator;

  protected $table = 'tokens';
  protected $primary = 'token_id';
  protected $attributes = [
    'id' => 'id',
    'location' => 'location',
    'state' => ['state', 'int'],
  ];

  protected $staticAttributes = [
    'separator',
    'type',
  ];

  public function jsonSerialize()
  {
    $data = parent::jsonSerialize();
    $data['separator'] = $this->separator;
    $data['type'] = $this->type;
    return $data;
  }

  public function move($location, $notify = true)
  {
    $fromLocationId = $this->getLocation();
    Tokens::move($this->getId(), $location);
    $this->location = $location;

    if ($notify) {
      Notifications::moveToken(Players::get(), $this, $this->getLocationInstance($fromLocationId), $this->getLocationInstance($location));
    }

    return $this;
  }

  public function getSeparator()
  {
    return $this->separator;
  }

  public function getType()
  {
    return $this->type;
  }

  public function kill()
  {
    $oldLocation = $this->getLocationInstance();
    $this->move($this->getSupply(), false);
    Notifications::killToken(Players::get(), $this, $oldLocation);
  }

  public function repress($empireId, $cost = 1)
  {
    $oldLocation = $this->getLocationInstance();
    Notifications::log('oldLocation', $oldLocation);

    $this->move(Empires::get($empireId)->getEmpireSquareId(), false);
    $player = Players::get();
    if ($cost > 0) {
      $player->incFlorins(-$cost); // TODO depends on why token is repressed
    }
    Notifications::repressToken($player, $this, $oldLocation, $cost);
  }

  public function returnToSupply($player = null, $notify = true)
  {
    $fromLocation = $this->getLocationInstance();
    $this->move(Locations::supply($this->type, $this->separator), false);
    
    if ($notify) {
      Notifications::returnToSupply($player, $this, $fromLocation);
    }
  }

  public function getLocationInstance($locationId = null)
  {
    $locationId = $locationId === null ? $this->getLocation() : $locationId;
    if (Utils::startsWith($locationId, 'border')) {
      return Borders::get($locationId);
    } else if (Utils::startsWith($locationId, 'PREN') || Utils::startsWith($locationId, 'EmpireSquare')) {
      return Cards::get($locationId);
    } else {
      return Cities::get($locationId);
    }
  }

  // public function getUiData()
  // {
  //   // Notifications::log('getUiData card model', []);
  //   return $this->jsonSerialize(); // Static datas are already in js file
  // }
}
