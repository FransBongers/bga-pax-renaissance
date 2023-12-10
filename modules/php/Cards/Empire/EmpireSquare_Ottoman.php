<?php
namespace PaxRenaissance\Cards\Empire;

class EmpireSquare_Ottoman extends \PaxRenaissance\Models\EmpireCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_Ottoman';
    $this->empire = OTTOMAN;
    $this->nameKing = clienttranslate('Sultan Mehmed II the Conqueror');
    $this->nameRepublic = clienttranslate('Ottoman Millet System');
    $this->ops = [
      [
        'id' => CAMPAIGN_OP,
        'flavorText' => clienttranslate("Conquest of East Europe"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->republicOps = [
      [
        'id' => COMMERCE_OP_EAST,
        'flavorText' => clienttranslate('Tolerate dhimmis'),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [ISLAMIC];
    $this->startLocation = 'throne_ottoman';
  }
}
