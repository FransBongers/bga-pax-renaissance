<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Hungary extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Hungary';
    $this->empire = HUNGARY;
    $this->nameKing = clienttranslate('Mátyás Corvinus King of Hungary');
    $this->nameRepublic = clienttranslate('Polish-Lithuanian Sejm');
    $this->prestige = [PATRON];
    $this->ops = [
      [
        'id' => CAMPAIGN_OP,
        'flavorText' => clienttranslate("Black Army"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->republicOps = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate("Mielnik Privilege"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => '',
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->startLocation = 'throne_hungary';
  }
}
