<?php

namespace PaxRenaissance\OneShots;

use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;

class TradeShiftOneShot extends \PaxRenaissance\Models\OneShot
{
  protected $religion;

  public function __construct()
  {
    // parent::__construct();
    // $this->id = MILITARY;
    // $this->name = clienttranslate('Corsair');
  }

  // public function canBePerformed($player, $card)
  // {
  //   $defaultChecks = parent::canBePerformed($player, $card);
  //   if (!$defaultChecks) {
  //     return false;
  //   }

  //   $options = $this->getOptions($card);
  //   return count($options) > 0;
  // }

  // public function getFlow($player, $cardId)
  // {
  //   return new LeafNode([
  //     'action' => TABLEAU_OP_CORSAIR,
  //     'playerId' => $player->getId(),
  //     'tableauOpId' => $this->id,
  //     'cardId' => $cardId,
  //   ]);
  // }

  // public function getOptions($card)
  // {
  //   $empireIds = $card->getAllEmpireIds(false);

  //   $options = [];

  //   foreach ($empireIds as $empireId) {
  //     $empire = Empires::get($empireId);

  //     $borders = $empire->getBorders();
  //     foreach ($borders as $border) {
  //       // Get pirate in location
  //       $token = $border->getToken();
  //       if ($token === null || $token->getType() !== PIRATE || $token->getSeparator() !== $this->religion) {
  //         continue;
  //       }

  //       $destinations = $this->getDestinationBorders($token, $empire);

  //       if (!isset($options[$token->getId()])) {
  //         $options[$token->getId()] = [
  //           'token' => $token,
  //           'destinations' => $destinations
  //         ];
  //       } else {
  //         foreach ($destinations as $destinationId => $destination) {
  //           if (!isset($options[$token->getId()]['destinations'][$destinationId])) {
  //             $options[$token->getId()]['destinations'][$destinationId] = $destination;
  //           }
  //         }
  //       }
   
  //       // $options[$token->getId()] = $token;
  //     }
  //   }

  //   return $options;
  // }

}
