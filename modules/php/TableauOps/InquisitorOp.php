<?php

namespace PaxRenaissance\TableauOps;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;

class InquisitorOp extends \PaxRenaissance\Models\TableauOp
{
  protected $religion;

  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->type = RELIGIOUS;
    $this->name = clienttranslate('Inquisitor');
  }

  public function canBePerformed($player, $card)
  {
    $defaultChecks = parent::canBePerformed($player, $card);
    if (!$defaultChecks) {
      return false;
    }

    $options = $this->getOptions($card);
    return count($options) > 0;
  }

  public function getFlow($player, $cardId)
  {
    return Engine::buildtree([
      'children' => [
        [
          'action' => TABLEAU_OP_INQUISITOR,
          'playerId' => $player->getId(),
          'tableauOpId' => $this->id,
          'cardId' => $cardId,

        ]
      ]
    ]);
  }

  public function getOptions()
  {
    
    $options = [];

    $tokens = Utils::filter(Tokens::getOfType(BISHOP.'_'.$this->religion), function ($token) {
      return $token->getLocation() !== Locations::supply(BISHOP, $this->religion);
    });

    if (count($tokens) === 0) {
      return $options;
    }
    // $players = Players::getAll();
    $cardsInPlay = array_merge(Cards::getAllCardsInTableaux()->toArray(), Cards::getAllCardsInThrones()->toArray());
    // foreach($players as $player) {
    //   $tableausCards = array_merge($tableausCards, $player->getTableauCards());
    // }
    // $cardsInThrones = Cards::getAllCardsInThrones();

    foreach($tokens as $token) {
      $bishopLocation = $token->getLocation();
      $cardBishopIsOn = Cards::get($bishopLocation);
      $empireIds = $cardBishopIsOn->getAllEmpireIds();
      $destinations = [];

      foreach($cardsInPlay as $card) {
        if (in_array($card->getEmpire(), $empireIds) && $card->getId() !== $bishopLocation && !isset($destinations[$card->getId()])) {
          $destinations[$card->getId()] = $card;
        }
      }

      if ($cardBishopIsOn->isInTableau()) {
        $explodedLocation = explode('_', $cardBishopIsOn->getLocation());
        $playerId = intval($explodedLocation[2]);
        $region = $explodedLocation[1];
        $tableau = Players::get($playerId)->getTableauCardsPerRegion()[$region];
        Notifications::log('tableau',$tableau);


        $cardIndex = Utils::array_find_index($tableau, function ($tableauCard) use ($cardBishopIsOn) {
          return $tableauCard->getId() === $cardBishopIsOn->getId();
        });
        Notifications::log('cardIndex', $cardIndex);
        if ($cardIndex !== count($tableau) - 1) {
          $card = $tableau[$cardIndex + 1];
          $cardId = $card->getId();
          if (!isset($destinations[$cardId])) {
            $destinations[$cardId] = $card;
          }
        }

        if ($cardIndex !== 0) {
          $card = $tableau[$cardIndex - 1];
          $cardId = $card->getId();
          if (!isset($destinations[$cardId])) {
            $destinations[$cardId] = $card;
          }
        }

      }

      $options[$token->getId()] = [
        'token' => $token,
        'destinations' => array_values($destinations),
      ];
    }

    // foreach ($empireIds as $empireId) {
    //   $empire = Empires::get($empireId);

    //   $cities = $empire->getCities();
    //   foreach ($cities as $city) {
    //     $token = $city->getToken();
    //     if ($token !== null && in_array($token->getType(), [ROOK, KNIGHT, PIRATE])) {
    //       $options[$token->getId()] = $token;
    //     }
    //   }

    //   $borders = $empire->getBorders();
    //   foreach ($borders as $border) {
    //     $token = $border->getToken();
    //     if ($token !== null && !isset($options[$token->getId()]) && in_array($token->getType(), [ROOK, KNIGHT, PIRATE])) {
    //       $options[$token->getId()] = $token;
    //     }
    //   }
    // }

    return $options;
  }
}
