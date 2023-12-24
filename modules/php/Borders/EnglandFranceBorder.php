<?php
namespace PaxRenaissance\Borders;

class EnglandFranceBorder extends \PaxRenaissance\Models\Border
{
  public function __construct()
  {
    $this->id = BORDER_ENGLAND_FRANCE;
    $this->name = clienttranslate('England-France Border');
    $this->seaBorder = true;
    $this->adjacentEmpires = [
      ENGLAND,
      FRANCE,
    ];
  }
}
