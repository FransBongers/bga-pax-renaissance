<?php

namespace PaxRenaissance\TableauOps;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;

class CampaignOp extends \PaxRenaissance\Models\TableauOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = CAMPAIGN_OP;
    $this->type = MILITARY;
    $this->name = clienttranslate('Campaign');
  }

  public function canBePerformed($player, $card)
  {
    $defaultChecks = parent::canBePerformed($player, $card);
    if (!$defaultChecks) {
      return false;
    }

    $options = $this->getOptions($player, $card);
    return count($options) > 0;
  }

  public function getFlow($player, $cardId)
  {
    return Engine::buildtree([
      'children' => [
        [
          'action' => TABLEAU_OP_CAMPAIGN,
          'playerId' => $player->getId(),
          'tableauOpId' => $this->id,
          'cardId' => $cardId,
        ]
      ]
    ]);
  }

  private function strawmanCampaignAllowed($strawmanCampaignGameOption, $empire, $empireCard, $adjacentEmpire)
  {
    if (!$strawmanCampaignGameOption) {
      return false;
    }
    $adjacentEmpireCard = $adjacentEmpire->getEmpireCard();
    $empireCardLocation = $empireCard->getLocation();
    $adjacentEmpireCardLocation = $adjacentEmpireCard->getLocation();

    // One empire is Suzerain and other empire is Vassal
    if ($adjacentEmpireCardLocation === Locations::vassals($empire->getId()) || $empireCardLocation === Locations::vassals($adjacentEmpire->getId())) {
      return false;
    }

    // Both empires are vassals to the same Suzerain
    if (Utils::startsWith($adjacentEmpireCardLocation, 'vassals_') && $empireCardLocation === $adjacentEmpireCardLocation) {
      return false;
    }

    return true;
  }

  public function getOptions($player, $card)
  {
    $empireId = $card->getEmpireId();
    $options = [];

    $empire = Empires::get($empireId);
    $cities = $empire->getCities();
    $baseCost = count(Utils::filter($cities, function ($city) {
      $token = $city->getToken();
      return $token !== null && $token->getType() === KNIGHT;
    }));
    $playerFlorins = $player->getFlorins();
    if ($baseCost > $playerFlorins) {
      return array_values($options);
    }

    $hasMamlukSpecialAbility = $player->hasSpecialAbility(SA_REPRESSED_TOKENS_COUNTS_AS_KNIGHT_IN_EAST_CAMPAIGN);
    $extraCost = 0;
    if ($hasMamlukSpecialAbility) {
      $extraCost = count(Empires::get(MAMLUK)->getRepressedTokens([KNIGHT, PAWN, ROOK]));
    }

    $strawmanCampaignGameOption = Globals::getStrawmanCampaign();

    $adjacentEmpires = $empire->getAdjacentEmpires();
    foreach ($adjacentEmpires as $adjacentEmpire) {
      $empireCard = Cards::get($adjacentEmpire->getEmpireSquareId());
      if ($empireCard->isInPlayerTableau($player->getId()) && !$this->strawmanCampaignAllowed($strawmanCampaignGameOption, $empire, $card, $adjacentEmpire)) {
        continue;
      }

      $isAffectedByMamlukAbility = $hasMamlukSpecialAbility && in_array($adjacentEmpire->getId(), EAST_EMPIRES);

      if ($isAffectedByMamlukAbility && $baseCost + $extraCost > $playerFlorins) {
        continue;
      }

      $options[$adjacentEmpire->getId()] = [
        'empire' => $adjacentEmpire,
        'cost' => $isAffectedByMamlukAbility ? $baseCost + $extraCost : $baseCost,
      ];
    }

    // Use cost to determine if there are any attackers.
    return Utils::filter(array_values($options), function ($option) {
      return $option['cost'] > 0;
    });
  }
}
