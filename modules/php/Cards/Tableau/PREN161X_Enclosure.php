<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Managers\Players;

class PREN161X_Enclosure extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN161X_Enclosure';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ],
    ];
    $this->empire = ENGLAND;
    $this->flavorText = [
      clienttranslate("By buying the ground rights of common lands to attain exclusive rights of use, a farmer was free to adopt better farming practices and expand profit-making opportunities."),
      clienttranslate("The increase of crop yields and labor productivity in fenced private lands created a surplus of labor."),
    ];
    $this->name = clienttranslate("Enclosure");
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('British Agricultural Revolution'),
        'top' => 66.5,
        'left' => 111,
      ],
    ];
    $this->prestige = [LAW];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_SELL_AND_EMANCIPATE_ALL_REPRESSED_TOKENS_IN_THE_WEST,
        'title' => clienttranslate('ENDING SUBSISTENCE FARMING'),
        'text' => [
          'log' => clienttranslate('If you sell this card, may emancipate any or all repressed Tokens in The West.'),
          'args' => [],
        ],
      ]
    ];
  }

  public function sell()
  {
    if ($this->isInTableau() && !$this->isSilenced($this->getOwner())) {
      $owner = $this->getOwner();
      Engine::getNextUnresolved()->insertAsBrother(new LeafNode([
        'action' => REGIME_CHANGE_EMANCIPATION,
        'empireIds' => WEST_EMPIRES,
        'optional' => true,
        'playerId' => $owner->getId(),
      ]));
    }
    parent::sell();
  }
}
