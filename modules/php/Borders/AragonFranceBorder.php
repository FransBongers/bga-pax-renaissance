<?php
namespace PaxRenaissance\Borders;

class AragonFranceBorder extends \PaxRenaissance\Models\Border
{
  public function __construct()
  {
    $this->id = BORDER_ARAGON_FRANCE;
    $this->name = clienttranslate('Aragon-France border');
    $this->adjacentEmpires = [
      ARAGON,
      FRANCE,
    ];
  }
}
