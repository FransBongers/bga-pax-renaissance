<?php

namespace PaxRenaissance\TableauOps;

use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Market;

class CommerceOp extends \PaxRenaissance\Models\TableauOp
{
  protected $region;

  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->type = ECONOMIC;
    $this->name = clienttranslate('Commerce');
  }

  public function canBePerformed($player, $card)
  {
    $defaultChecks = parent::canBePerformed($player, $card);
    if (!$defaultChecks) {
      return false;
    }

    $options = $this->getOptions();
    return count($options) > 0;
  }

  public function getFlow($player, $cardId)
  {
    return new LeafNode([
      'action' => TABLEAU_OP_COMMERCE,
      'playerId' => $player->getId(),
      'tableauOpId' => $this->id,
      'cardId' => $cardId,
    ]);
  }

  public function getOptions()
  {
    $marketCards = Market::getCards();
    $florins = Market::getFlorins();
    Notifications::log('florins', $florins);
    return Utils::filter($marketCards, function ($card) use ($florins) {
      return $card->getRegion() === $this->region && $florins[$card->getLocation().'_florins'] > 0;
    });
  }
}
