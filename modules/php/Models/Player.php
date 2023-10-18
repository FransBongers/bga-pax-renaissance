<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Preferences;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Events;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Managers\Players;

/*
 * Player: all utility functions concerning a player
 */

class Player extends \PaxRenaissance\Helpers\DB_Model
{
  protected $table = 'player';
  protected $primary = 'player_id';
  protected $attributes = [
    'id' => ['player_id', 'int'],
    'no' => ['player_no', 'int'],
    'avatar' => 'player_avatar',
    'name' => 'player_name',
    'color' => 'player_color',
    'eliminated' => 'player_eliminated',
    'score' => ['player_score', 'int'],
    'scoreAux' => ['player_score_aux', 'int'],
    'zombie' => 'player_zombie',
    'loyalty' => 'loyalty',
    'rupees' => ['rupees', 'int'],
  ];

  /*
   * Getters
   */
  public function getPref($prefId)
  {
    return Preferences::get($this->id, $prefId);
  }

  public function jsonSerialize($currentPlayerId = null)
  {
    $data = parent::jsonSerialize();

    return $data;
  }

  public function getId()
  {
    return (int) parent::getId();
  }

}
