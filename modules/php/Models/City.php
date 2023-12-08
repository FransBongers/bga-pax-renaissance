<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Log;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;

class City implements \JsonSerializable
{
  protected $id;
  protected $capital = false;
  protected $empire;
  protected $emporium = null;
  protected $levy;
  protected $name;
  


  protected $attributes = [
    'id' => ['id', 'str'],
    'capital' => ['capital', 'bool'],
    'name' => ['name', 'str'],
    'empire' => ['empire', 'str'],
    'levy' => ['levy', 'obj'],
    'emporium' => ['emporium', 'str'],
    // 'empire'
  ];

  public function canStartTradeFair()
  {
    if ($this->emporium === null) {
      return false;
    }
    $token = Tokens::getTopOf($this->id);
    if ($token !== null && $token->getType() === DISK) {
      return false;
    }
    return true;
  }

  public function getEmpire()
  {
    return $this->empire;
  }

  public function getEmporium()
  {
    return $this->emporium;
  }

  public function getId()
  {
    return $this->id;
  }

  public function getName()
  {
    return $this->name;
  }

  public function getPossibleLevy()
  {
    $token = Tokens::getTopOf($this->id);
    if ($token !== null) {
      return null;
    }

    $religion = Empires::get($this->empire)->getReligion();

    return $this->levy[$religion];
  }

  public function getToken()
  {
    return Tokens::getTopOf($this->id);
  }

  public function getTradeRoute()
  {
    return null;
  }

  public function placeToken($token, $repressCost = 1)
  {
    $currentToken = $this->getToken();
    if ($currentToken !== null) {
      $currentToken->repress($this->empire, $repressCost);
    }
    $fromLocationId = $token->getLocation();
    $token = $token->move($this->getId(), false);
    Notifications::placeToken(Players::get(),$token, $fromLocationId, $this);
  }

  /**
   * Return an array of attributes
   */
  public function jsonSerialize()
  {
    $data = [];
    foreach ($this->attributes as $attribute => $field) {
      $data[$attribute] = $this->$attribute;
    }

    return $data;
  }
}
