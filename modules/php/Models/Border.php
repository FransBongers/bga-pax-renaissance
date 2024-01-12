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


class Border implements \JsonSerializable
{
  protected $id;
  protected $name;
  protected $seaBorder = false;
  protected $type = BORDER;
  protected $adjacentEmpires = [];

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
    $currentTokens = $this->getTokens();
    if (count($currentTokens) > 0 && $token->getType() === PIRATE) {
      foreach ($currentTokens as $currentToken) {
        if ($currentToken->getType() === PAWN && $currentToken->getOwner()->hasSpecialAbility(SA_CONCESSIONS_CANNOT_BE_KILLED_BY_PIRATES)) {
          continue;
        }
        $currentToken->returnToSupply(KILL);
      }
    } else if (count($currentTokens) > 0 && $token->getType() === PAWN) {
      foreach ($currentTokens as $currentToken) {
        $currentToken->repress($empireId, $repressCost);
      }
    }

    $fromLocationId = $token->getLocation();
    $token = $token->move($this->getId(), false);
    Notifications::placeToken(Players::get(), $token, $fromLocationId, $this);
  }

  public function isSeaBorder()
  {
    return $this->seaBorder;
  }

  public function getAdjacentEmpires()
  {
    return array_map(function ($empireId) {
      return Empires::get($empireId);
    }, $this->adjacentEmpires);
  }

  public function getId()
  {
    return $this->id;
  }

  public function getName()
  {
    return $this->name;
  }

  public function getTokens()
  {
    return Tokens::getInLocationOrdered($this->id)->toArray();
  }

  public function getType()
  {
    return $this->type;
  }
}
