<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Engine;
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
    $tableauCards = $this->getTableauCardsPerRegion();
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

  public function getAvailableOps()
  {
    $result = [
      EAST => [],
      WEST => [],
    ];
    $tableauCards = $this->getTableauCardsPerRegion();
    foreach (REGIONS as $region) {
      $regionHasAlreadyBeenResolved = $region === EAST ?
        count(Engine::getResolvedActions([TABLEAU_OPS_SELECT_EAST])) > 0 :
        count(Engine::getResolvedActions([TABLEAU_OPS_SELECT_WEST])) > 0;
      if ($regionHasAlreadyBeenResolved) {
        continue;
      }
      foreach ($tableauCards[$region] as $card) {
        $availableOps = $card->getAvailableOps($this);

        if (count($availableOps) > 0) {
          $result[$region][$card->getId()] = $availableOps;
        }
      }
    }
    return $result;
  }

  public function getBank()
  {
    return PlayersExtra::get($this->getId())['bank'];
  }

  public function getCardsPlayerCanSell()
  {
    $allTableauCards = $this->getTableauCards();
    $tableauCards = [];
    $royalCouples = [];

    foreach ($allTableauCards as $card) {
      if ($card->isQueen()) {
        continue;
      }
      if ($card->getType() === EMPIRE_CARD && $card->getQueen() !== null) {
        $queen = $card->getQueen();
        $royalCouples[] = [
          'king' => $card,
          'queen' => $queen,
        ];
        continue;
      }
      $tableauCards[] = $card;
    }
    // Utils::filter($allTableauCards, function ($card) {

    // });
    // TODO, add old maids.
    return [
      'cards' => array_merge($tableauCards, $this->getHand()),
      'royalCouples' => $royalCouples,
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
    $tableauCards = $this->getTableauCardsPerRegion();
    return array_merge($tableauCards[EAST], $tableauCards[WEST]);
  }

  public function getTableauCardsPerRegion()
  {
    return [
      EAST => Cards::getInLocationOrdered(Locations::tableau($this->getId(), EAST))->toArray(),
      WEST => Cards::getInLocationOrdered(Locations::tableau($this->getId(), WEST))->toArray(),
    ];
  }

  public function getPrestige()
  {
    $result = [
      CATHOLIC => 0,
      ISLAMIC => 0,
      REFORMIST => 0,
      DISCOVERY => 0,
      LAW => 0,
      PATRON => 0,
    ];
    $tableauCards = $this->getTableauCards();
    foreach ($tableauCards as $card) {
      foreach ($card->getPrestige() as $prestige) {
        $result[$prestige] = $result[$prestige] + 1;
      }
    }
    return $result;
  }

  public function getTokensOnTableauCards($tableauCards)
  {
    $cards = array_merge($tableauCards[EAST], $tableauCards[WEST]);
    $tokens = [];
    foreach ($cards as $card) {
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
