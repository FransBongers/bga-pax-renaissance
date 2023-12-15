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

    $tokens = Utils::filter(Tokens::getOfType(BISHOP . '_' . $this->religion), function ($token) {
      return $token->getLocation() !== Locations::supply(BISHOP, $this->religion);
    });

    if (count($tokens) === 0) {
      return $options;
    }

    $cardsInPlay = array_merge(Cards::getAllCardsInTableaux()->toArray(), Cards::getAllCardsInThrones()->toArray());

    foreach ($tokens as $token) {
      $bishopLocation = $token->getLocation();
      $cardBishopIsOn = Cards::get($bishopLocation);
      $empireIds = $cardBishopIsOn->getAllEmpireIds();
      $destinations = [];

      foreach ($cardsInPlay as $card) {
        if (in_array($card->getEmpire(), $empireIds) && $card->getId() !== $bishopLocation && !isset($destinations[$card->getId()])) {
          $destinations[$card->getId()] = $card;
        }
      }

      $destinationsInTableau = $this->getDestinationsInTableau($cardBishopIsOn);

      foreach ($destinationsInTableau as $card) {
        
        $cardId = $card->getId();

        if (isset($destinations[$cardId]) || ($card->getId() === $cardBishopIsOn->getId())) {
          continue;
        }
        $destinations[$cardId] = $card;
      }

      $options[$token->getId()] = [
        'token' => $token,
        'destinations' => array_values($destinations),
      ];
    }
    return $options;
  }

  /**
   * If in tableau
   * - may move to any vassal / suzerain if on vassal or suzerain
   */
  private function getDestinationsInTableau($cardBishopIsOn)
  {
    // return [];
    if (!$cardBishopIsOn->isInTableau()) {
      return [];
    }
    $tableauDestinations = [];

    $explodedLocation = explode('_', $cardBishopIsOn->getLocation());
    $playerIdTableau = intval($explodedLocation[2]);
    $region = $explodedLocation[1];

    // Get all card in tableau and filter out Vassals so we get correct order in tableau
    $tableau = Utils::filter(Players::get($playerIdTableau)->getTableauCardsPerRegion()[$region], function ($cardInTableau) {
      return $cardInTableau->getType() === TABLEAU_CARD || !$cardInTableau->isVassal();
    });

    // Use suzerain index to determine position in tableau if card is vassal
    $cardToUseForIndex = $cardBishopIsOn->isVassal() ? $cardBishopIsOn->getSuzerain() : $cardBishopIsOn;

    $cardIndex = Utils::array_find_index($tableau, function ($tableauCard) use ($cardToUseForIndex) {
      return $tableauCard->getId() === $cardToUseForIndex->getId();
    });

    // Add card to left (including vassals / suzerain)
    if ($cardIndex !== count($tableau) - 1) {
      $tableauDestinations = array_merge($tableauDestinations, $this->getOptionsForCard($tableau, $cardIndex + 1));
    }

    // Add card to right (including vassals / suzerain)
    if ($cardIndex !== 0) {
      $tableauDestinations = array_merge($tableauDestinations, $this->getOptionsForCard($tableau, $cardIndex - 1));
    }

    // If vassal / suzerain add all options
    if ($cardBishopIsOn->getType() === TABLEAU_CARD) {
      return $tableauDestinations;
    }


    if ($cardBishopIsOn->isVassal()) {
      $suzerain = $cardBishopIsOn->getSuzerain();
      $vassals = $suzerain->getVassals();
      $tableauDestinations[] = $suzerain;
      $tableauDestinations = array_merge($tableauDestinations, $vassals);
    } else if ($cardBishopIsOn->isSuzerain()) {
      $tableauDestinations = array_merge($tableauDestinations, $cardBishopIsOn->getVassals());
    }
    return $tableauDestinations;
  }

  private function getOptionsForCard($tableau, $index)
  {
    $options = [];
    $card = $tableau[$index];
    $options[] = $card;
    if ($card->getType() === TABLEAU_CARD) {
      return $options;
    }
    $vassals = $card->getVassals();
    $options = array_merge($options, $vassals);
    return $options;
  }
}
