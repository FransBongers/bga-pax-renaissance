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

class AbilityAction implements \JsonSerializable
{
  protected $id;
  protected $title;
  protected $top = 0;
  protected $left = 0;
  protected $height = 0;
  protected $width = 0;
  protected $freeAction = false;

  public function __construct($cardAbility = null)
  {
    if ($cardAbility === null) {
      return;
    }
    $this->title = $cardAbility['title'];
    $this->top = $cardAbility['top'];
    $this->left = $cardAbility['left'];
    $this->height = $cardAbility['height'];
    $this->width = $cardAbility['width'];
  }

  protected $attributes = [
    'id' => ['id', 'str'],
    'title' => ['name', 'str'],
    'top' => ['top', 'int'],
    'left' => ['left', 'int'],
    'height' => ['height', 'int'],
    'width' => ['width', 'int'],
    'freeAction' => ['freeAction', 'bool'],
  ];


  public function getId()
  {
    return $this->id;
  }

  public function getFlow($player, $cardId)
  {
    return [];
  }

  public function getTitle()
  {
    return $this->title;
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

  /**
   * Player needs to be able to perform at least one operation.
   * To be able to perform an AbilityAction:
   * - Action should not have been used yet
   * - Action can be performed
   */
  public function canBePerformed($player = null, $card = null)
  {
    return false;
  }

  public function isFreeAction()
  {
    return $this->freeAction;
  }
}
