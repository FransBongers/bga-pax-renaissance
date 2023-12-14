<?php

namespace PaxRenaissance\TableauOps;

use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;

class BeheadOp extends \PaxRenaissance\Models\TableauOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = BEHEAD_OP;
    $this->type = POLITICAL;
    $this->name = clienttranslate('Behead');
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
      'action' => TABLEAU_OP_BEHEAD,
      'playerId' => $player->getId(),
      'tableauOpId' => $this->id,
      'cardId' => $cardId,
    ]);
  }

  public function getOptions($card)
  {
    $empireIds = $card->getAllEmpireIds();
    $options = [];

    $players = Players::getAll();

    foreach ($players as $player) {
      $tableauCards = $player->getTableauCards();
      foreach ($tableauCards as $tableauCard) {
        if ($tableauCard->getId() === $card->getId()) {
          continue;
        }
        if (in_array($tableauCard->getEmpire(), $empireIds)) {
          $options[] = $tableauCard;
        }
      }
    }
    return $options;
  }
}
