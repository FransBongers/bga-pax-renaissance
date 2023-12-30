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

class TableauOp implements \JsonSerializable
{
  protected $id;
  protected $name;
  protected $type;
  protected $flavorText = '';
  protected $top = 0;
  protected $left = 0;

  public function __construct($cardOp = null)
  {
    if ($cardOp === null) {
      return;
    }
    $this->flavorText = $cardOp['flavorText'];
    $this->top = $cardOp['top'];
    $this->left = $cardOp['left'];
  }

  protected $attributes = [
    'id' => ['id', 'str'],
    'name' => ['name', 'str'],
    'type' => ['type', 'str'],
    'top' => ['top', 'int'],
    'left' => ['top', 'int'],
    'flavorText' => ['flavorText', 'str'],
  ];


  public function getId()
  {
    return $this->id;
  }

  public function getName()
  {
    return $this->name;
  }

  public function getType()
  {
    return $this->type;
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

  //   /**
  //  * Player needs to be able to perform at least one operation.
  //  * To be able to perform an Op:
  //  * - Cards needs not to be used yet
  //  * - Card should not be silenced (unless Inquisitor op?)
  //  * - Op specific requirements
  //  */
  public function canBePerformed($player, $card) {
    if ($card->getUsed() === 1) {
      return false;
    }
    if ($this->type !== RELIGIOUS && $card->isSilenced($player)) {
      return false;
    }
    return true;
  }
}
