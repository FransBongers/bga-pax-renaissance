<?php
namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Game;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;

class Card extends \PaxRenaissance\Helpers\DB_Model
{
  protected $id;
  protected $table = 'cards';
  protected $primary = 'card_id';
  protected $location;
  protected $state;

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
}
