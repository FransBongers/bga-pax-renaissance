<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN114X_CountsOfCelji extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN114X_CountsOfCelji';
    $this->agents = [
      [
        'separator' => CATHOLIC,
        'type' => ROOK,
      ],
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      clienttranslate('The Celji were the most important noble family of Slovenia (between Austria and Croatia). They were wiped out in a feud with the rival Hunyadi clan over the role of Captain General of Hungary.'),
      clienttranslate('In 1515 a peasant revolt (Windischer Bauernbund) engulfed Slovenia. The 80,000 rebels demanded tax representatives and the reintroduction of the "stara pravada" (i.e. original feudal obligations and trade rights). The rebellion was stopped by Imperial mercenaries.')
    ];
    $this->name = clienttranslate("Counts of Celji");
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN_KNIGHT,
        'flavorText' => clienttranslate("stara pravada"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = EAST;
  }
}
