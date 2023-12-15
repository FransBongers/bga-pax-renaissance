<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Log;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;


class Border implements \JsonSerializable
{
  protected $id;
  protected $name;
  protected $seaBorder = false;
  protected $type = BORDER;
  
  protected $attributes = [
    'id' => ['id', 'str'],
    'name' => ['name', 'str'],
    'seaBorder' => ['seaBorder', 'bool'],
    'type' => ['type', 'str'],
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

  public function placeToken($token, $empireId, $repressCost)
  {
    $currentToken = $this->getToken();
    // Notifications::log('currentToken',$currentToken);
    if ($currentToken !== null && $token->getType() === PIRATE) {
      $currentToken->returnToSupply(KILL);
    } else if ($currentToken !== null && $token->getType() === PAWN) {
      $currentToken->repress($empireId, $repressCost);
    }

    $fromLocationId = $token->getLocation();
    $token = $token->move($this->getId(), false);
    Notifications::placeToken(Players::get(),$token, $fromLocationId, $this);
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

  public function getType()
  {
    return $this->type;
  }
}
