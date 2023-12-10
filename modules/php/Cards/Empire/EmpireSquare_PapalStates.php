<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_PapalStates extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_PapalStates';
    $this->empire = PAPAL_STATES;
    $this->nameKing = clienttranslate('Pope Julius II');
    $this->nameRepublic = clienttranslate('Florentine Signoria');
    $this->prestige = [CATHOLIC, PATRON];
    $this->ops = [
      [
        'id' => CAMPAIGN_OP,
        'flavorText' => clienttranslate("Holy League"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->republicOps = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate("Balance of Power"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => '',
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->startLocation = 'throne_papalStates';
  }
}
