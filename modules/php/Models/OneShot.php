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

class OneShot implements \JsonSerializable
{
  protected $id;
  protected $name;

  // public function __construct()
  // {
  //   if ($cardOp === null) {
  //     return;
  //   }
  //   $this->flavorText = $cardOp['flavorText'];
  //   $this->top = $cardOp['top'];
  //   $this->top = $cardOp['left'];
  // }

  protected $attributes = [
    'id' => ['id', 'str'],
    'name' => ['name', 'str'],
  ];


  public function getId()
  {
    return $this->id;
  }

  public function getName()
  {
    return $this->name;
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
