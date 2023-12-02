<?php
namespace PaxRenaissance\Borders;

class EnglandPortugalBorder extends \PaxRenaissance\Models\Border
{
  public function __construct()
  {
    $this->id = BORDER_ENGLAND_PORTUGAL;
    $this->name = clienttranslate('EnglandPortugalBorder');
    $this->seaBorder = true;
  }
}
