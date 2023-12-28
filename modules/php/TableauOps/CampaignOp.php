<?php

namespace PaxRenaissance\TableauOps;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;
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

  public function getOptions($player, $card)
  {
    $empireIds = $card->getAllEmpireIds(false);
    $options = [];

    foreach ($empireIds as $empireId) {
      $empire = Empires::get($empireId);
      $cities = $empire->getCities();
      $cost = count(Utils::filter($cities, function ($city) {
        $token = $city->getToken();
        return $token !== null && $token->getType() === KNIGHT;
      }));
      if ($cost > $player->getFlorins()) {
        continue;
      }

      $adjacentEmpires = $empire->getAdjacentEmpires();
      foreach ($adjacentEmpires as $adjacentEmpire) {
        $empireCard = Cards::get($adjacentEmpire->getEmpireSquareId());
        if ($empireCard->isInPlayerTableau($player->getId())) {
          continue;
        }
        if (isset($options[$adjacentEmpire->getId()])) {
          continue;
        }
        $options[$adjacentEmpire->getId()] = [
          'empire' => $adjacentEmpire,
          'cost' => $cost,
        ];
      }
    }

    return array_values($options);
  }
}
