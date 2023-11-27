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
        'religion' => ISLAMIC,
      ],
      CATHOLIC => [
        'levyIcon' => ROOK,
        'religion' => CATHOLIC,
      ],
      ISLAMIC => [
        'levyIcon' => KNIGHT,
        'religion' => ISLAMIC,
      ],
      REFORMIST => [
        'levyIcon' => ROOK,
        'religion' => REFORMIST,
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
