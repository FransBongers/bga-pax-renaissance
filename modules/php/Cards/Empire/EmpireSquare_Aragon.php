<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Aragon extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Aragon';
    $this->empire = ARAGON;
    $this->nameKing = clienttranslate('John the Faithless King of Aragon');
    $this->nameRepublic = clienttranslate('Golden Ambrosian Republic');
    $this->ops = [
      [
        'id' => CAMPAIGN_OP,
        'flavorText' => clienttranslate("Navarrese Civil War"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->republicOps = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate("University of Pavia"),
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
    $this->startLocation = 'throne_aragon';
  }
}
