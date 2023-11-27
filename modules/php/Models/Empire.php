<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\ChessPieces;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Helpers\Log;
use PaxRenaissance\Helpers\Utils;


class Empire implements \JsonSerializable
{
  protected $id;
  protected $name;
  protected $cities;


  protected $attributes = [
    'id' => ['id', 'str'],
    'name' => ['name', 'str'],
    'cities' => ['cities', 'obj'],
  ];

  public function getCities()
  {
    return array_map(function ($cityId) {
      return Cities::get($cityId);
    },$this->cities);
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
