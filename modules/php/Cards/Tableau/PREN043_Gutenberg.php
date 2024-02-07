<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Notifications;

class PREN043_Gutenberg extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN043_Gutenberg';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      clienttranslate('Perhaps the greatest societal impact of the printing press was the wide distribution of Laws that could not easily be retracted once printed.'),
      clienttranslate("The first book printed was the Bible, a book of Laws. Churches and rulers prohibited printing without a license, but could not censor the press as easily as they could scribes. The first copyrights appeared in 1518 in England.")
    ];
    $this->name = clienttranslate('Gutenberg');
    $this->ops = [
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Mass production of printed books'),
        'top' => 107,
        'left' => 111,
      ]
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
