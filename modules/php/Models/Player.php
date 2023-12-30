<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Preferences;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\AbilityActions;
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
    $tableauCards = [
      EAST => $this->getTableauCardsForRegion(EAST),
      WEST => $this->getTableauCardsForRegion(WEST),
    ];
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
      'oldMaids' => $this->getOldMaids(),
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

  public function getAbilityActions()
  {
    $abilityActions = [];
    $tableauCards = $this->getTableauCards();

    foreach ($tableauCards as $card) {
      $specialAbilities = $card->getSpecialAbilities();

      foreach($specialAbilities as $ability) {
        if (!isset($ability['abilityAction']) || !$ability['abilityAction']) {
          continue;
        }
        $abilityAction = AbilityActions::get($ability['id'], $ability);
        if ($abilityAction->canBePerformed($this, $card)) {
          $abilityActions[$card->getId()] = $abilityAction;
        }
      }
    }

    return $abilityActions;
  }

  public function getAvailableOps()
  {
    $result = [
      EAST => [],
      WEST => [],
    ];
    $tableauCards = [
      EAST => $this->getTableauCardsForRegion(EAST),
      WEST => $this->getTableauCardsForRegion(WEST),
    ];
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
      if ($card->getType() === EMPIRE_CARD && count($card->getQueens()) > 0) {
        $queens = $card->getQueens();
        $royalCouples[] = [
          'king' => $card,
          'queens' => $queens,
        ];
        continue;
      }
      $tableauCards[] = $card;
    }
    // Utils::filter($allTableauCards, function ($card) {

    // });
    // TODO, add old maids.
    return [
      'cards' => array_merge($tableauCards, $this->getHand(), $this->getOldMaids()),
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

  public function getOldMaids()
  {
    return Cards::getInLocationOrdered(Locations::oldMaids($this->getId()))->toArray();
  }

  public function getTableauCards()
  {
    return array_merge($this->getTableauCardsForRegion(EAST), $this->getTableauCardsForRegion(WEST));
  }

  public function getTableauCardsForRegion($region)
  {
    $tableauCards = Cards::getInLocationOrdered(Locations::tableau($this->getId(), $region))->toArray();
    $queensAndVassals = [];
    foreach ($tableauCards as $card) {
      if ($card->getType() !== EMPIRE_CARD) {
        continue;
      }
      $queensAndVassals = array_merge($queensAndVassals, $card->getQueens(), $card->getVassals());
    }
    return array_merge($tableauCards, $queensAndVassals);
  }

  public function getPrestige($victoryCalculation = false)
  {
    $result = [
      CATHOLIC => 0,
      ISLAMIC => 0,
      REFORMIST => 0,
      DISCOVERY => 0,
      LAW => 0,
      PATRON => 0,
    ];
    $cards = $this->getTableauCards();
    if ($victoryCalculation) {
      $cards = array_merge($cards, $this->getOldMaids());
    }
    foreach ($cards as $card) {
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

  /**
   * Player has special ability if there is a card in his tableau with ability
   * and the card is not silenced
   */
  public function hasSpecialAbility($specialAbilityId)
  {
    $tableauCards = $this->getTableauCards();
    return Utils::array_some($tableauCards, function ($card) use ($specialAbilityId) {
      $hasSpecialAbility = $card->hasSpecialAbility($specialAbilityId);
      if (!$hasSpecialAbility) {
        return false;
      }

      return !$card->isSilenced($this);
    });
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
