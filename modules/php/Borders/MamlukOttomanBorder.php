<?php
namespace PaxRenaissance\Borders;

class MamlukOttomanBorder extends \PaxRenaissance\Models\Border
{
  public function __construct()
  {
    $this->id = BORDER_MAMLUK_OTTOMAN;
    $this->name = clienttranslate('Mamluk-Ottoman Border');
    $this->seaBorder = true;
  }
}
