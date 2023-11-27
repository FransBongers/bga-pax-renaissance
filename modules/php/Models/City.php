<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Log;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\ChessPieces;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Players;

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
    $piece = ChessPieces::getTopOf($this->id);
    if ($piece !== null && Utils::startsWith($piece['id'], 'disk')) {
      return false;
    }
    return true;
  }

  public function getEmpire()
  {
    return Empires::get($this->empire);
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
    $chessPiece = ChessPieces::getTopOf($this->id);
    if ($chessPiece !== null) {
      return null;
    }

    $religion = self::getEmpire()->getReligion();

    return $this->levy[$religion];
  }

  public function getTradeRoute()
  {
    return null;
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
