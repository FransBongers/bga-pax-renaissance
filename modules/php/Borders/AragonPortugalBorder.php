<?php
namespace PaxRenaissance\Borders;

class AragonPortugalBorder extends \PaxRenaissance\Models\Border
{
  public function __construct()
  {
    $this->id = BORDER_ARAGON_PORTUGAL;
    $this->name = clienttranslate('AragonPortugalBorder');
    $this->seaBorder = true;
  }
}
