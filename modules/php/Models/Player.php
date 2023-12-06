<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Preferences;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\AtomicActions;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Events;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\PlayersExtra;

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
    $isCurrentPlayer = intval($currentPlayerId) == $this->getId();
    $extra = PlayersExtra::get($this->getId());
    $hand = $this->getHand();
    $tableauCards = $this->getTableauCards();
    // return $data;
    return array_merge($data, [
      'bank' => $extra['bank'],
      'florins' => intval($extra['florins']),
      'hand' => [
        'cards' => $isCurrentPlayer ? $hand : [],
        'counts' => [
          EAST => count(Utils::filter($hand, function ($card) {
            return $card->getRegion() === EAST;
          })),
          WEST => count(Utils::filter($hand, function ($card) {
            return $card->getRegion() === WEST;
          })),
        ]
      ],
      'tableau' => [
        'cards' => $tableauCards,
        'tokens' => $this->getTokensOnTableauCards($tableauCards)
      ],
    ]);
  }

  public function getId()
  {
    return (int) parent::getId();
  }

  public function getBank()
  {
    return PlayersExtra::get($this->getId())['bank'];
  }

  public function getCardsPlayerCanSell()
  {
    return [
      'hand' => $this->getHand()
    ];
  }

  public function getFlorins()
  {
    return intval(PlayersExtra::get($this->getId())['florins']);
  }

  public function incFlorins($increment)
  {
    Players::incFlorins($this->getId(), $increment);
  }

  public function getHand()
  {
    return Cards::getInLocation(Locations::hand($this->getId()))->toArray();
  }

  public function getTableauCards()
  {
    return [
      EAST => Cards::getInLocation(Locations::tableau($this->getId(), EAST))->toArray(),
      WEST => Cards::getInLocation(Locations::tableau($this->getId(), WEST))->toArray(),
    ];
  }

  public function getTokensOnTableauCards($tableauCards)
  {
    $cards = array_merge($tableauCards[EAST], $tableauCards[WEST]);
    $tokens = [];
    foreach($cards as $card) {
      $tokensOnCard = Tokens::getInLocation($card->getId())->toArray();
      $tokens = array_merge($tokens, $tokensOnCard);
    }
    return $tokens;
  }

  public function canTakeAction($action, $ctx)
  {
    return AtomicActions::isDoable($action, $ctx, $this);
  }

  public function isAtHandLimit()
  {
    return count($this->getHand()) === 2;
  }
}
