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


class Border implements \JsonSerializable
{
  protected $id;
  protected $name;
  protected $seaBorder = false;
  
  protected $attributes = [
    'id' => ['id', 'str'],
    'name' => ['name', 'str'],
    'seaBorder' => ['seaBorder', 'bool'],
  ];



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

  public function isSeaBorder()
  {
    return $this->seaBorder;
  }
}
