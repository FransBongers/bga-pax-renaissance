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
        $token = $border->getToken();
        if ($token === null || $token->getType() !== PIRATE || $token->getSeparator() !== $this->religion) {
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
    // Notifications::log('empires', $empires);
    $borders = [];
    foreach ($empires as $destinationEmpire) {
      $empireBorders = $destinationEmpire->getBorders();
      // foreach($empireBorders as $destinationBorder) {
      //   if (!isset($borders[$destinationBorder->getId()])) {

      //   }
      // }

      foreach ($empireBorders as $destinationBorder) {
        if (
          isset($borders[$destinationBorder->getId()]) ||
          $destinationBorder->getId() === $tokenLocation ||
          !$destinationBorder->isSeaBorder()
        ) {
          continue;
        }
        $tokenOnDestination = $destinationBorder->getToken();
        if ($tokenOnDestination !== null && $tokenOnDestination->getSeparator() === $tokenReligion) {
          continue;
        }
        $borders[$destinationBorder->getId()] = [
          'border' => $destinationBorder,
          'token' => $tokenOnDestination,
        ];
      }
    }
    return $borders;
  }
}
