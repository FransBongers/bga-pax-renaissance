<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN138X_Reichskrone extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN138X_Reichskrone';
    $this->flavorText = [
      clienttranslate('The "King of the Romans" was chosen by the electors of the German electoral college. He became Holy Roman Emperor only when crowned by the Pope.'),
      clienttranslate('Bribery was rampant. Charles the Bold offered a bribe of 10,000 florins and court positions to attain the "Crown of the Romans". In the 1519 contest, Charles V eventually outbid his rival Francis to become emperor.'),
    ];
    $this->name = clienttranslate('Reichskrone');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate("Bribing electors"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_SELL_FOR_4,
        'title' => clienttranslate('RANSOM:'),
        'text' => [
          'log' => clienttranslate('Sell this card for 4 instead of 2 Florins.'),
          'args' => [],
        ],
      ]
    ];
    // Queen specific props
    $this->height = 121;
    $this->suitors = [
      HOLY_ROMAN_EMIRE,
    ];
  }

  public function getSellValue()
  {
    if ($this->isInTableau() && !$this->isSilenced()) {
      return 4;
    }
    return 2;
  }
}
