<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;

class PREN147X_WilliamCaxton extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN147X_WilliamCaxton';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ],
    ];
    $this->empire = ENGLAND;
    $this->flavorText = [
      clienttranslate("The merchant William Caxton introduced the printing press into England (Westminster, 1476). The first book printed and retailed was an edition of Chaucer's Canterbury Tales."),
      clienttranslate('Caxton is credited with standardizing the regional dialects of English through printing.'),
    ];
    $this->name = clienttranslate('William Caxton');
    $this->ops = [
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Worshipful Company of Mercers'),
        'top' => 66.5,
        'left' => 111,
      ],
    ];
    $this->prestige = [LAW];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_UNLIMITED_HAND_SIZE,
        'title' => clienttranslate('PRINTING PRESS:'),
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
