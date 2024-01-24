<?php

namespace PaxRenaissance\Empires;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\Cities;

use const PaxRenaissance\OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT;

class Ottoman extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = OTTOMAN;
    $this->adjacentEmpires = [
      BYZANTIUM,
      HOLY_ROMAN_EMIRE,
      HUNGARY,
      MAMLUK,
      PAPAL_STATES,
    ];
    $this->adjacentBySeaBorderEmpires = [
      HUNGARY,
      MAMLUK,
      PAPAL_STATES,
    ];
    $this->empireSquareId = 'EmpireSquare_Ottoman';
    $this->name = clienttranslate('Ottoman');
    $this->borders = [
      BORDER_HUNGARY_OTTOMAN,
      BORDER_MAMLUK_OTTOMAN,
      BORDER_OTTOMAN_PAPAL_STATES,
    ];
    $this->cities = [CONSTANTINOPLE_1, CONSTANTINOPLE_2, CONSTANTINOPLE_3, MODON, RHODES];
    $this->region = EAST;
  }

  public function getCities($emptyOnly = false)
  {
    if (Globals::getStartingMap() === OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT && $this->getReligion() === MEDIEVAL) {
      $this->cities = [CONSTANTINOPLE_1, CONSTANTINOPLE_2, MODON, RHODES];
    }
    return parent::getCities($emptyOnly);
  }

  public function changeToMedievalState($player)
  {
    parent::changeToMedievalState($player);
    if (Globals::getStartingMap() !== OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT) {
      return;
    }
    $tokensInConstantinople = $this->getTokensInConstantinople();
    $count = count($tokensInConstantinople);
    if ($count === 0) {
      return;
    }
    $currentNode = Engine::getNextUnresolved();
    $currentNode->insertAsBrother(new LeafNode([
      'action' => BATTLE_RECONFIGURE_CONSTANTINOPLE,
      'playerId' => $player->getId(),
      'optional' => true,
      'source' => OPTION_STARTING_MAP_AGE_OF_REFORMATION_PROMO_VARIANT
    ]));
    if ($count === 3) {
      $currentNode->insertAsBrother(new LeafNode([
        'action' => REMOVE_TOKEN_FROM_CITY,
        'playerId' => $player->getId(),
        'cities' => [CONSTANTINOPLE_1, CONSTANTINOPLE_2, CONSTANTINOPLE_3],
      ]));
    } else {
      $this->moveTokensInConstantinopleLeft($player);
    }
  }

  public function getTokensInConstantinople() 
  {
    // TODO: replace by direct db query?
    $tokensInConstantinople = [];
    foreach ([CONSTANTINOPLE_1, CONSTANTINOPLE_2, CONSTANTINOPLE_3] as $cityId) {
      $token = Cities::get($cityId)->getToken();
      if ($token !== null) {
        $tokensInConstantinople[] = $token;
      }
    }
    return $tokensInConstantinople;
  }

  public function moveTokensInConstantinopleLeft($player)
  {
    $tokens = $this->getTokensInConstantinople();
    $cities = [CONSTANTINOPLE_1, CONSTANTINOPLE_2];
    $movedTokens = [];
    foreach($cities as $cityId) {
      $tokenInCity = Cities::get($cityId)->getToken();
      if ($tokenInCity !== null || count($tokens) === 0) {
        continue;
      }
      $token = array_shift($tokens);
      $token->move($cityId, false);
      $movedTokens[] = $token;
    }
    Notifications::moveTokensWithinConstantinople($player, $movedTokens);
  }
}
