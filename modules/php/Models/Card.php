<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\TableauOps;
use PaxRenaissance\Managers\Tokens;
use PgSql\Lob;

class Card extends \PaxRenaissance\Helpers\DB_Model
{
  protected $id;
  protected $table = 'cards';
  protected $primary = 'card_id';
  protected $location;
  protected $ops = [];
  protected $state;

  protected $attributes = [
    'id' => ['card_id', 'int'],
    'location' => 'card_location',
    'ops' => ['ops', 'obj'],
    'state' => ['card_state', 'int'],
    'used' => ['used', 'int'],
    'extraData' => ['extra_data', 'obj'],
  ];

  public function getUiData()
  {
    // Notifications::log('getUiData card model', []);
    return $this->jsonSerialize(); // Static datas are already in js file
  }

  public function getOps()
  {
    // TODO: find out why this is null if not set on card level
    return $this->ops === null ? [] : $this->ops;
  }

  public function getSellValue($player = null)
  {
    return 2;
  }

  // Returns player if in tableau, or null if not in tableau
  public function getOwner()
  {
    if (Utils::startsWith($this->location, 'tableau_')) {
      return Players::get(intval(explode('_', $this->location)[2]));
    }
    return null;
  }

  public function insertAtBottom($location)
  {
    Cards::insertAtBottom($this->getId(), $location);
    $this->location = $location;
  }

  public function isInPlayerTableau($playerId)
  {
    // TODO: empire squares that are vassels
    if (in_array($this->location, [Locations::tableau($playerId, EAST), Locations::tableau($playerId, WEST)])) {
      return true;
    }
    if (($this->isVassal() || $this->isQueen()) && $this->getOwner()->getId() === $playerId) {
      return true;
    }

    return false;
  }

  public function isInTableau()
  {
    return Utils::startsWith($this->getLocation(), 'tableau_') || Utils::startsWith($this->getLocation(), 'vassals_') || Utils::startsWith($this->getLocation(), 'queens_');
  }

  public function getVassals()
  {
    return [];
  }

  public function getSuzerain()
  {
    return null;
  }

  public function isVassal()
  {
    return false;
  }

  public function isSuzerain()
  {
    return false;
  }

  /**
   * Note, does not check if card is silenced
   */
  public function hasSpecialAbility($specialAbilityId)
  {
    return Utils::array_some($this->getSpecialAbilities(), function ($specialAbility) use ($specialAbilityId) {
      return $specialAbility['id'] === $specialAbilityId;
    });
  }

  public function isSilenced($player)
  {
    // Need for the card itself to prevent infininte loop
    if ($this->hasSpecialAbility(SA_IMMUNE_TO_SILENCING)) {
      return false;
    }

    if ($player->hasSpecialAbility(SA_IMMUNE_TO_SILENCING)) {
      return false;
    }

    $tokens = $this->getTokens();
    $hasBishop = Utils::array_some($tokens, function ($token) {
      return $token->getType() === BISHOP;
    });
    return $hasBishop;
  }

  public function isQueen()
  {
    return false;
  }

  public function hasBishop()
  {
    $tokens = $this->getTokens();
    $hasBishop = Utils::array_some($tokens, function ($token) {
      return $token->getType() === BISHOP;
    });
    return $hasBishop;
  }

  public function setState($state = 1)
  {
    Cards::setState($this->getId(), $state);
  }

  public function setUsed($value = 1)
  {
    Cards::setUsed($this->getId(), $value);
  }

  public function discard($messageType = DISCARD, $player = null)
  {
    $this->deactivateAbility();
  }

  public function placeToken($token, $ctx)
  {
    if ($token->getType() === BISHOP) {
      // Apply Diet of worms, diet of worms will trigger pacification / silencing
      $ctx->insertAsBrother(new LeafNode([
        'action' => BISHOP_DIET_OF_WORMS,
        'playerId' => $ctx->getPlayerId(),
        'tokenId' => $token->getId(),
      ]));
    }
    $fromLocationId = $token->getLocation();
    $token = $token->move($this->getId(), false);
    Notifications::placeToken(Players::get(), $token, $fromLocationId, $this);
  }

  public function sell()
  {
    $this->discard();
  }

  /**
   * Function called when bishop is placed on the card / 
   * is moved on the card. Replace with deactivate ability?
   */
  public function silence()
  {
    $this->deactivateAbility();
  }

  /**
   * Called when card is silenced, discarded, sold
   * other moments when ability is deactivated
   */
  public function deactivateAbility()
  {
  }

  /**
   * Called when card is put in tableau, a bishop is moved from
   * the card
   */
  public function activateAbility()
  {
  }

  public function getSpecialAbilities()
  {
    return [];
  }

  public function getTokens()
  {
    return Tokens::getInLocation($this->id)->toArray();
  }

  public function getAvailableOps($player = null)
  {
    $player = $player === null ? Players::get() : $player;
    $available = [];
    foreach ($this->getOps() as $cardOp) {
      $tableauOp = TableauOps::get($cardOp['id'], $cardOp);
      if ($tableauOp->canBePerformed($player, $this)) {
        $available[] = $tableauOp;
      }
    }
    // Utils::filter(, function ($op) use ($player) {
    //   return 
    // });
    return $available;
  }
}
