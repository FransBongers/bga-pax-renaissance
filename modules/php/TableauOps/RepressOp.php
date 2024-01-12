<?php

namespace PaxRenaissance\TableauOps;

use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;

class RepressOp extends \PaxRenaissance\Models\TableauOp
{
  protected $tokenTypes;

  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->type = POLITICAL;
    $this->name = clienttranslate('Repress');
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
      'action' => TABLEAU_OP_REPRESS,
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

      $cities = $empire->getCities();
      foreach ($cities as $city) {
        $token = $city->getToken();
        if ($token !== null && in_array($token->getType(), $this->tokenTypes)) {
          $options[$token->getId()] = $token;
        }
      }

      $borders = $empire->getBorders();
      foreach ($borders as $border) {
        $tokens = $border->getTokens();
        foreach($tokens as $token) {
          if (!isset($options[$token->getId()]) && in_array($token->getType(), $this->tokenTypes)) {
            $options[$token->getId()] = $token;
          }
        }

      }
    }

    return $options;
  }
}
