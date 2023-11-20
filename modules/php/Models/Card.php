<?php
namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Players;

class Card extends \PaxRenaissance\Helpers\DB_Model
{
  protected $table = 'cards';
  protected $primary = 'card_id';
  protected $attributes = [
    'id' => ['card_id', 'int'],
    'location' => 'card_location',
    'state' => ['card_state', 'int'],
    'used' => ['used', 'int'],
  ];

  public function getUiData()
  {
    // Notifications::log('getUiData card model', []);
    return $this->jsonSerialize(); // Static datas are already in js file
  }

  public function setState($state = 1)
  {
    Cards::setState($this->getId(), $state);
  }

  public function setUsed($value = 1)
  {
    Cards::setUsed($this->getId(), $value);
  }
}
