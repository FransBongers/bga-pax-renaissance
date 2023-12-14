<?php

namespace PaxRenaissance\TableauOps;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;


class TaxOp extends \PaxRenaissance\Models\TableauOp
{
  protected $tokenTypes;

  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = TAX_OP;
    $this->type = POLITICAL;
    $this->name = clienttranslate('Tax');
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
          'action' => TABLEAU_OP_TAX,
          'playerId' => $player->getId(),
          'tableauOpId' => $this->id,
          'cardId' => $cardId,
        ]
      ]
    ]);
  }

  public function getOptions($card)
  {
    $empireIds = $card->getAllEmpireIds(false);
    $options = [];

    foreach ($empireIds as $empireId) {
      $empire = Empires::get($empireId);

      $cities = $empire->getCities(true);

      if (count($cities) === 0) {
        continue;
      }

      $borders = $empire->getBorders();
      foreach ($borders as $border) {
        $token = $border->getToken();
        if ($token === null || $token->getType() !== PAWN) {
          continue;
        }

        if (!isset($options[$token->getId()])) {
          $options[$token->getId()] = ['token' => $token, 'empires' => [$empire]];
        } else {
          $options[$token->getId()]['empires'][] = $empire;
        }
      }
    }

    return $options;
  }
}
