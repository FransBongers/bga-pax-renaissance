<?php

namespace PaxRenaissance\TableauOps;

use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;

class InquisitorOp extends \PaxRenaissance\Models\TableauOp
{
  protected $religion;

  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->type = RELIGIOUS;
    $this->name = clienttranslate('Inquisitor');
  }

  public function canBePerformed($player, $card)
  {
    $defaultChecks = parent::canBePerformed($player, $card);
    if (!$defaultChecks) {
      return false;
    }

    $options = $this->getOptions($card);
    Notifications::log('options',$options);
    return count($options) > 0;
  }

  public function getFlow($player, $cardId)
  {
    return new LeafNode([
      'action' => TABLEAU_OP_INQUISITOR,
      'playerId' => $player->getId(),
      'tableauOpId' => $this->id,
      'cardId' => $cardId,
    ]);
  }

  public function getOptions($card)
  {
    $empireIds = $card->getAllEmpiresIds(false);
    $options = [];

    // foreach ($empireIds as $empireId) {
    //   $empire = Empires::get($empireId);

    //   $cities = $empire->getCities();
    //   foreach ($cities as $city) {
    //     $token = $city->getToken();
    //     if ($token !== null && in_array($token->getType(), [ROOK, KNIGHT, PIRATE])) {
    //       $options[$token->getId()] = $token;
    //     }
    //   }

    //   $borders = $empire->getBorders();
    //   foreach ($borders as $border) {
    //     $token = $border->getToken();
    //     if ($token !== null && !isset($options[$token->getId()]) && in_array($token->getType(), [ROOK, KNIGHT, PIRATE])) {
    //       $options[$token->getId()] = $token;
    //     }
    //   }
    // }

    return $options;
  }
}