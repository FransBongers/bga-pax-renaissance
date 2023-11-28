<?php
namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;

class Token extends \PaxRenaissance\Helpers\DB_Model
{
  protected $location;
  protected $type;

  protected $table = 'tokens';
  protected $primary = 'token_id';
  protected $attributes = [
    'id' => 'id',
    'location' => 'location',
    'state' => ['state', 'int'],
  ];

  public function move($location) {
    Tokens::move($this->getId(), $location);
    $this->location = $location;
    return $this;
  }

  public function getType()
  {
    return $this->type;
  }

  // public function getUiData()
  // {
  //   // Notifications::log('getUiData card model', []);
  //   return $this->jsonSerialize(); // Static datas are already in js file
  // }
}
