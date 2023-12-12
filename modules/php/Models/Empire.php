<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Helpers\Log;
use PaxRenaissance\Helpers\Utils;


class Empire implements \JsonSerializable
{
  protected $id;
  protected $adjacentEmpires;
  protected $adjacentBySeaBorderEmpires;
  protected $empireSquareId;
  protected $borders;
  protected $cities;
  protected $name;
  protected $region;


  protected $attributes = [
    'id' => ['id', 'str'],
    'adjacentEmpires' => ['adjacentEmpires', 'obj'],
    'empireSquareId' => ['id', 'str'],
    'name' => ['name', 'str'],
    'borders' => ['borders', 'obj'],
    'cities' => ['cities', 'obj'],
    'region' => ['region', 'str'],
  ];

  public function changeToTheocracy($religion) {
    $religions = Globals::getEmpireReligions();
    if ($religions[$this->id] !== $religion) {
      $religions[$this->id] = $religion;
      Globals::setEmpireReligions($religions);
      Notifications::changeEmpireToTheocracy($this, $religion);
    }
  }

  public function changeToMedievalState($player) {
    $religions = Globals::getEmpireReligions();
    if ($religions[$this->id] !== MEDIEVAL) {
      $religions[$this->id] = MEDIEVAL;
      Globals::setEmpireReligions($religions);
      Notifications::changeEmpireToMedievalState($player, $this);
    }
  }

  public function getAdjacentEmpires()
  {
    return array_map(function ($empireId) {
      return Empires::get($empireId);
    }, $this->adjacentEmpires);
  }

  public function getAdjacentBySeaBorderEmpires()
  {
    return array_map(function ($empireId) {
      return Empires::get($empireId);
    }, $this->adjacentBySeaBorderEmpires);
  }

  public function getBorders($emptyOnly = false)
  {
    $borders = array_map(function ($borderId) {
      return Borders::get($borderId);
    }, $this->borders);
    if ($emptyOnly) {
      return Utils::filter($borders, function ($border) {
        return $border->getToken() === null;
      });
    }
    return $borders;
  }

  public function getCities($emptyOnly = false)
  {
    $cities = array_map(function ($cityId) {
      return Cities::get($cityId);
    }, $this->cities);
    if ($emptyOnly) {
      return Utils::filter($cities, function ($city) {
        return $city->getToken() === null;
      });
    }
    return $cities;
  }

  public function getEmpireSquareId()
  {
    return $this->empireSquareId;
  }

  public function getId()
  {
    return $this->id;
  }

  public function getName()
  {
    return $this->name;
  }

  public function getRegion()
  {
    return $this->region;
  }

  public function getReligion()
  {
    $religions = Globals::getEmpireReligions();
    return $religions[$this->id];
  }

  public function getTokensInAdjacentEmpires($typeFilter = null, $separatorFilter = null)
  {
    $adjacentEmpires = $this->getAdjacentEmpires();

    $result = [];
    foreach ($adjacentEmpires as $empire) {
      $tokensInEmpire = $empire->getTokensInCities($typeFilter, $separatorFilter);
      $result = array_merge($result, $tokensInEmpire);
    }

    return $result;
  }

  public function getTokensInCities($typeFilter = null, $separatorFilter = null)
  {
    $cities = $this->getCities();
    $tokens = [];
    foreach ($cities as $city) {
      $token = $city->getToken();
      if ($token === null) {
        continue;
      }
      if ($typeFilter !== null && !in_array($token->getType(), $typeFilter)) {
        continue;
      }
      if ($separatorFilter !== null && !in_array($token->getSeparator(), $separatorFilter)) {
        continue;
      }
      $tokens[] = $token;
    }
    return $tokens;
  }

  public function getTokensOnBorders($typeFilter = null, $separatorFilter = null)
  {
    $borders = $this->getBorders();
    $tokens = [];
    foreach ($borders as $border) {
      $token = $border->getToken();
      if ($token === null) {
        continue;
      }
      if ($typeFilter !== null && !in_array($token->getType(), $typeFilter)) {
        continue;
      }
      if ($separatorFilter !== null && !in_array($token->getSeparator(), $separatorFilter)) {
        continue;
      }
      $tokens[] = $token;
    }
    return $tokens;
  }

  public function getRepressedTokens($typeFilter = null, $separatorFilter = null)
  {
    $repressedTokens = Tokens::getInLocation($this->getEmpireSquareId())->toArray();

    return Utils::filter($repressedTokens, function ($token) use ($typeFilter, $separatorFilter) {
      if ($typeFilter !== null && !in_array($token->getType(), $typeFilter)) {
        return false;
      }
      if ($separatorFilter !== null && !in_array($token->getSeparator(), $separatorFilter)) {
        return false;
      }
      return true;
    });
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
    $data['religion'] = self::getReligion();
    return $data;
  }
}
