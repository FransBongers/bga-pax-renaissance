<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\ChessPieces;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Helpers\Log;
use PaxRenaissance\Helpers\Utils;


class Empire implements \JsonSerializable
{
  protected $id;
  protected $empireSquareId;
  protected $borders;
  protected $cities;
  protected $name;
  protected $region;


  protected $attributes = [
    'id' => ['id', 'str'],
    'empireSquareId' => ['id', 'str'],
    'name' => ['name', 'str'],
    'borders' => ['borders', 'obj'],
    'cities' => ['cities', 'obj'],
    'region' => ['region', 'str'],
  ];


  public function getBorders()
  {
    return array_map(function ($borderId) {
      return Borders::get($borderId);
    }, $this->borders);
  }

  public function getCities()
  {
    return array_map(function ($cityId) {
      return Cities::get($cityId);
    }, $this->cities);
  }

  public function getEmpireSquareId()
  {
    return $this->empireSquareId;
  }

  public function getId()
  {
    return $this->id;
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
