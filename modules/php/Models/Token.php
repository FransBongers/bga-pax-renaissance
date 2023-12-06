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

  protected $table = 'tokens';
  protected $primary = 'token_id';
  protected $attributes = [
    'id' => 'id',
    'location' => 'location',
    'state' => ['state', 'int'],
  ];

  public function move($location)
  {
    Tokens::move($this->getId(), $location);
    $this->location = $location;
    return $this;
  }

  public function getType()
  {
    return $this->type;
  }

  public function kill()
  {
    $oldLocation = $this->getLocation();
    $this->move($this->getSupply());
    Notifications::killToken(Players::get(), $this, $oldLocation);
  }

  public function repress($empireId)
  {
    $oldLocation = $this->getLocation();
    // TODO: move to empire card
    $this->move(Empires::get($empireId)->getEmpireSquareId());
    $player = Players::get();
    $player->incFlorins(-1); // TODO depends on why token is repressed
    Notifications::repressToken($player, $this, $oldLocation, 1);
  }

  public function getLocation()
  {
    $locationId = $this->getLocationId();
    if (Utils::startsWith($locationId, 'border')) {
      Borders::get($locationId);
    } else if (Utils::startsWith($locationId, 'PREN') || Utils::startsWith($locationId, 'EmpireSquare')) {
      return Cards::get($locationId);
    } else {
      return Cities::get($locationId);
    }
  }

  public function getLocationId()
  {
    return $this->location;
  }

  // public function getUiData()
  // {
  //   // Notifications::log('getUiData card model', []);
  //   return $this->jsonSerialize(); // Static datas are already in js file
  // }
}
