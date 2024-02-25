<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;

class PREN042_HochstetterBank extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN042_HochstetterBank';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      clienttranslate('The German banks were free of the church usury prohibitions against interest, and gradually adopted Italian bookkeeping innovations.'),
      clienttranslate("The Höchstetter clan in the 1520's urged the populace to save, even if on a modest scale of a few florins, which led to a million florins annually in interest, rivaling the Fuggers and Welsers. They used their fortune to dominate the refining of silver from Tyrol.")
    ];
    $this->name = clienttranslate('Höchstetter Bank');
    $this->ops = [
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Tyrolean Schwaz silver miners'),
        'top' => 66.5,
        'left' => 111,
      ]
    ];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_UNLIMITED_HAND_SIZE,
        'title' => clienttranslate('STADTWECHSEL (LETTERS OF CREDIT)'),
        'text' => [
          'log' => clienttranslate('Your Hand size is unlimited'),
          'args' => [],
        ],
      ]
    ];
  }

  public function silence()
  {
    $owner = $this->getOwner();
    // If player is not over default hand limit no need to trigger discard state and possibly change active player
    if (count($owner->getHand()) <= 2) {
      return;
    }
    // Check if owner has unlimited hand size abilities that are not silenced
    if ($owner->hasSpecialAbility(SA_UNLIMITED_HAND_SIZE)) {
      return;
    }
    Engine::getNextUnresolved()->insertAsBrother(new LeafNode([
      'action' => DISCARD_DOWN_TO_HAND_LIMT,
      'playerId' => $owner->getId(),
    ]));
  }
}
