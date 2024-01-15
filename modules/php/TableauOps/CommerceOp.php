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
    return count($options['cards']) + count($options['spaces']) > 0;
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
    $cards = [];
    $spaces = [];

    foreach ($florins as $location => $amount) {
      if ($amount === 0) {
        continue;
      }
      $exploded = explode('_', $location);

      if ($exploded[1] !== $this->region) {
        continue;
      }

      unset($exploded[3]);
      $cardLocation = implode('_', $exploded);

      // Florin can either be on a card or on empty trade fair space
      $card = Utils::array_find($marketCards, function ($card) use ($cardLocation) {
        return $card->getLocation() === $cardLocation;
      });
      if ($card !== null) {
        $cards[] = $card;
      } else {
        $spaces[] = $cardLocation;
      }
    }

    return [
      'cards' => $cards,
      'spaces' => $spaces,
    ];
  }
}
