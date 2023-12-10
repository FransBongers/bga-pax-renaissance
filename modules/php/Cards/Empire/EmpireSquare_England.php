<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_England extends \PaxRenaissance\Models\EmpireCard
{

  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_England';
    $this->empire = ENGLAND;
    $this->nameKing = clienttranslate('King Edward IV House of York');
    $this->nameRepublic = clienttranslate('English Parliament');
    $this->ops = [
      [
        'id' => CAMPAIGN_OP,
        'flavorText' => clienttranslate("War of the Roses"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->republicOps = [
      [
        'id' => VOTE_OP_WEST,
        'flavorText' => clienttranslate("House of Commons"),
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
    $this->startLocation = 'throne_england';
  }
}
