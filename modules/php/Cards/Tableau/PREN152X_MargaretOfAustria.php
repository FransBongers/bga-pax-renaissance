<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN152X_MargaretOfAustria extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN152X_MargaretOfAustria';
    $this->flavorText = [
      clienttranslate("This Habsburg princess, betrothed successively to the princes of France, Spain, and Savoy, ruled the Netherlands for 24 years as one of Europe's strongest leaders."),
      clienttranslate('Acting as intermediary between her father Maximilian and her subjects, she negotiated a trade agreements favorable to the Flemish cloth interests and the "Ladies\' Peace of Cambrai".'),
    ];
    $this->name = clienttranslate('Margaret of Austria');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate('Franche-Comté election'),
        'top' => 5,
        'left' => 111,
      ],
    ];
    $this->region = WEST;
    // Queen specific props
    $this->height = 102;
    $this->suitors = [
      ENGLAND,
      PORTUGAL,
      ARAGON,
      FRANCE
    ];
  }
}
