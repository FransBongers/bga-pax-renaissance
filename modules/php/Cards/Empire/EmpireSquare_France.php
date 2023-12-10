<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_France extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_France';
    $this->empire = FRANCE;
    $this->nameKing = clienttranslate('Louis XI the Spider House of Valois');
    $this->nameRepublic = clienttranslate('States-General of Burgundy');
    $this->ops = [
      [
        'id' => CAMPAIGN_OP,
        'flavorText' => clienttranslate("Centralized state"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->republicOps = [
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Great Privilege'),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->startLocation = 'throne_france';
  }
}
