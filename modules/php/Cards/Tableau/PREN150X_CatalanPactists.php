<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN150X_CatalanPactists extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN150X_CatalanPactists';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ],
    ];
    $this->empire = ARAGON;
    $this->flavorText = [
      clienttranslate('Pactism supports a "pact and convention made between his Majesty and the Province". In the "War against John II", Catalan pactists under Joan Dusai won the first skirmish, and had the option to model themselves as an independent republic like Venice, or press for council with the king.'),
      clienttranslate('After a decade of war (1462-1472) the Constitutionalist stronghold in Barcelona surrendered.'),
    ];
    $this->name = clienttranslate('Catalan Pactists');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate('Busca faction'),
        'top' => 66.5,
        'left' => 111,
      ],
    ];
    $this->prestige = [LAW];
    $this->region = WEST;
  }
}
