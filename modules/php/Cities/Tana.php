<?php
namespace PaxRenaissance\Cities;

class Tana extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = TANA;
    $this->capital = true;
    $this->empire = BYZANTIUM;
    $this->emporium = EAST;
    $this->name = clienttranslate('TANA');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => KNIGHT,
        'separator' => ISLAMIC,
      ],
      CATHOLIC => [
        'levyIcon' => ROOK,
        'separator' => CATHOLIC,
      ],
      ISLAMIC => [
        'levyIcon' => KNIGHT,
        'separator' => ISLAMIC,
      ],
      REFORMIST => [
        'levyIcon' => ROOK,
        'separator' => REFORMIST,
      ],
    ];
  }

  public function getTradeRoute()
  {
    return [
      BYZANTIUM,
      BORDER_BYZANTIUM_HUNGARY,
      HUNGARY,
      BORDER_HUNGARY_OTTOMAN,
      OTTOMAN,
      BORDER_MAMLUK_OTTOMAN,
      MAMLUK,
    ];
  }
}
