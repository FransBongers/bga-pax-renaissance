<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Mamluk extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Mamluk';
    $this->empire = MAMLUK;
    $this->nameKing = clienttranslate("Qa'it Bay of the Burji Dynasty");
    $this->nameRepublic = clienttranslate('Karaman Beylik');
    $this->ops = [
      [
        'id' => CAMPAIGN_OP,
        'flavorText' => clienttranslate("Mamluk slaves"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->republicOps = [
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => clienttranslate('Western conspiracy'),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [PATRON];
    $this->startLocation = 'throne_mamluk';
  }
}
