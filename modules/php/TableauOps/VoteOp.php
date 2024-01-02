<?php

namespace PaxRenaissance\TableauOps;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;

class VoteOp extends \PaxRenaissance\Models\TableauOp
{
  protected $region;

  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->type = POLITICAL;
    $this->name = clienttranslate('Vote');
  }

  public function canBePerformed($player, $card)
  {
    $defaultChecks = parent::canBePerformed($player, $card);
    if (!$defaultChecks) {
      return false;
    }

    $options = $this->getOptions($player);
    return count($options) > 0;
  }

  public function getFlow($player, $cardId)
  {
    return Engine::buildtree([
      'children' => [
        [
          'action' => TABLEAU_OP_VOTE,
          'playerId' => $player->getId(),
          'tableauOpId' => $this->id,
          'cardId' => $cardId,
        ]
      ]
    ]);
  }

  public function getOptions($player)
  {
    $empireIds = Empires::getRegionIds($this->region);
    $options = [];

    foreach ($empireIds as $empireId) {
      $empire = Empires::get($empireId);

      $empireCard = Cards::get($empire->getEmpireSquareId());

      // 1. Card must be in tableau
      if (!$empireCard->isInTableau()) {
        continue;
      }

      if ($empireCard->isVassal()) {
        continue;
      }

      // 2. Player needs to be able to pay for Repressed Tokens
      $cost = count(Utils::filter($empireCard->getTokens(), function ($token) {
        return in_array($token->getType(), [PAWN, ROOK, KNIGHT]);
      }));
      if ($player->hasSpecialAbility(SA_PATRON_REDUCES_VOTE_OPS_COST)) {
        $patronPrestige = $player->getPrestige(true)[PATRON];
        $cost = $cost - $patronPrestige;
        if ($cost < 0) {
          $cost = 0;
        }
      }

      if ($player->getFlorins() < $cost) {
        continue;
      }

      // 3. Player must have more Concessions than any other player on the Empire's borders
      $borders = $empire->getBorders();
      $concessions = [];
      foreach ($borders as $border) {
        $token = $border->getToken();
        if ($token === null || $token->getType() !== PAWN) {
          continue;
        }
        $owner = $token->getOwner();
        $concessionCount = $owner->hasSpecialAbility(SA_CONCESSIONS_2X_TRADE_FAIRS_VOTES) ? 2 : 1;
        $bank = $token->getSeparator();
        if (isset($concessions[$bank])) {
          $concessions[$bank]['count'] = $concessions[$bank]['count'] + $concessionCount;
        } else {
          $concessions[$bank] = [
            'count' => $concessionCount,
            'bank' => $bank,
          ];
        }
      }
      $concessions = array_values($concessions);

      if (count($concessions) === 0) {
        continue;
      }

      usort($concessions, function ($a, $b) {
        return $b['count'] - $a['count'];
      });

      if (!($player->getBank() === $concessions[0]['bank'] && (count($concessions) === 1 || $concessions[0]['count'] > $concessions[1]['count']))) {
        continue;
      }

      // Add to options
      $options[] = [
        'empire' => $empire,
        'cost' => $cost,
      ];
    }

    return $options;
  }
}
