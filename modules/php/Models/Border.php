<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Log;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\ChessPieces;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;


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

  public function placeAgent($token)
  {
    $currentToken = $this->getToken();
    if ($token->getType() === PIRATE && $currentToken !== null) {
      $currentToken->kill();
    }

    $token = $token->move($this->getId());
    Notifications::placeAgent(Players::get(),$token, $this);
  }

  public function isSeaBorder()
  {
    return $this->seaBorder;
  }

  public function getId()
  {
    return $this->id;
  }

  public function getName()
  {
    return $this->name;
  }

  public function getToken()
  {
    return Tokens::getTopOf($this->id);
  }
}
