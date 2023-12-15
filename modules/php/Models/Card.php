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

  // Returns player if in tableau, or null if not in tableau
  public function getOwner()
  {
    if (!Utils::startsWith($this->location, 'tableau_')) {
      return null;
    }
    return Players::get(intval(explode('_', $this->location)[2]));
  }

  public function isInPlayerTableau($player)
  {
    $playerId = $player->getId();
    // TODO: empire squares that are vassels
    return in_array($this->location, [Locations::tableau($playerId, EAST), Locations::tableau($playerId, WEST)]);
  }

  public function isInTableau()
  {
    return Utils::startsWith($this->getLocation(), 'tableau_');
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

  public function isSilenced()
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

  public function discard($messageType = DISCARD, $player)
  {

  }

  public function placeToken($token, $ctx)
  {
    $currentTokens = $this->getTokens();
    if (count($currentTokens) > 0 && $token->getType() === BISHOP) {
      // Apply Diet of worms or pacification rule
      $ctx->insertAsBrother(new LeafNode([
        'action' => BISHOP_DIET_OF_WORMS,
        'playerId' => $ctx->getPlayerId(),
        'tokenId' => $token->getId(),
      ]));
      // $ctx->insertAsBrother(new LeafNode([
      //   'action' => BISHOP_PACIFICATION,
      //   'playerId' => $ctx->getPlayerId(),
      // ]));
    }
    $fromLocationId = $token->getLocation();
    $token = $token->move($this->getId(), false);
    Notifications::placeToken(Players::get(),$token, $fromLocationId, $this);
  }

  public function getTokens()
  {
    return Tokens::getInLocation($this->id)->toArray();
  }

  public function getAvailableOps($player = null)
  {
    $player = $player === null ? Players::get() : $player;
    $available = [];
    foreach($this->getOps() as $cardOp) {
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
