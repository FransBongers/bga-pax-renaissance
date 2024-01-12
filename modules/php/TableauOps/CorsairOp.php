<?php

namespace PaxRenaissance\TableauOps;

use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;

class CorsairOp extends \PaxRenaissance\Models\TableauOp
{
  protected $religion;

  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->type = MILITARY;
    $this->name = clienttranslate('Corsair');
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
    return new LeafNode([
      'action' => TABLEAU_OP_CORSAIR,
      'playerId' => $player->getId(),
      'tableauOpId' => $this->id,
      'cardId' => $cardId,
    ]);
  }

  public function getOptions($card)
  {
    $empireIds = $card->getAllEmpireIds(false);

    $options = [];

    foreach ($empireIds as $empireId) {
      $empire = Empires::get($empireId);

      $borders = $empire->getBorders();
      foreach ($borders as $border) {
        // Get pirate in location
        $tokens = $border->getTokens();
        foreach($tokens as $token) {
          if ($token->getType() !== PIRATE || $token->getSeparator() !== $this->religion) {
            continue;
          }

          $destinations = $this->getDestinationBorders($token, $empire);
          if (!isset($options[$token->getId()])) {
            $options[$token->getId()] = [
              'token' => $token,
              'destinations' => $destinations
            ];
          } else {
            foreach ($destinations as $destinationId => $destination) {
              if (!isset($options[$token->getId()]['destinations'][$destinationId])) {
                $options[$token->getId()]['destinations'][$destinationId] = $destination;
              }
            }
          }
        }
        // $options[$token->getId()] = $token;
      }
    }

    return $options;
  }

  /**
   * Valid destinations:
   * - sea borders of same empire or sea borders of adjacent empires (that are connected via sea borders)
   * - cannot move to own border or border with pirate of same colors
   */
  private function getDestinationBorders($token, $empire)
  {
    $tokenLocation = $token->getLocation();
    $tokenReligion = $token->getSeparator();
    // 1. get all borders.

    $empires = array_merge([$empire], $empire->getAdjacentBySeaBorderEmpires());
    $borders = [];
    foreach ($empires as $destinationEmpire) {
      $empireBorders = $destinationEmpire->getBorders();

      foreach ($empireBorders as $destinationBorder) {
        if (
          isset($borders[$destinationBorder->getId()]) ||
          $destinationBorder->getId() === $tokenLocation ||
          !$destinationBorder->isSeaBorder()
        ) {
          continue;
        }
        $tokensOnDestination = $destinationBorder->getTokens();

        // Not a valid destination if there is a pirate of the same religion.
        if (Utils::array_some($tokensOnDestination, function ($tokenOnDestination) use ($tokenReligion) {
          return $tokenOnDestination->getSeparator() === $tokenReligion;
        })) {
          continue;
        }

        $borders[$destinationBorder->getId()] = [
          'border' => $destinationBorder,
          'token' => $this->getTokenThatCanBeKilled($tokensOnDestination),
        ];
      }
    }
    return $borders;
  }

  function getTokenThatCanBeKilled($tokensOnDestination)
  {
    $token = null;
    foreach($tokensOnDestination as $tokenOnDestination) {
      if ($tokenOnDestination->getType() === PAWN && $tokenOnDestination->getOwner()->hasSpecialAbility(SA_CONCESSIONS_CANNOT_BE_KILLED_BY_PIRATES)) {
        continue;
      }
      $token = $tokenOnDestination;
    }
    return $token;
  }
}
