<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;

class PREN130X_Cryptography extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN130X_Cryptography';
    $this->empire = PAPAL_STATES;
    $this->expansionCard = true;
    $this->flavorText = [
      clienttranslate("Leon Battista Alberti was an Italian Renaissance Man of many talents in art and science."),
      clienttranslate("Among them was cryptography; he invented the polyalphabetic Alberti cipher, enciphered code, and machine-assisted encryption using his Cipher Disk. With this technology the Medici developed the best ciphers in the world.")
    ];
    $this->name = clienttranslate('Cryptography');
    $this->prestige = [PATRON];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_SELL_AND_PERFORM_PURPLE_OP_FROM_OPPONENT,
        'title' => clienttranslate('MEDICI CIPHERS BROKEN'),
        'text' => [
          'log' => clienttranslate("If you sell this card, may do an additional purple Op from an opponent's Tableau, exactly as if his card was in your Tableau."),
          'args' => [],
        ],
      ]
    ];
  }

  public function sell()
  {
    if ($this->isInTableau()) {
      $owner = $this->getOwner();
      Engine::getNextUnresolved()->insertAsBrother(new LeafNode([
        'action' => ABILITY_OPPONENTS_PUPRLE_OP,
        'optional' => true,
        'playerId' => $owner->getId(),
      ]));
    }
    parent::sell();
  }
}
