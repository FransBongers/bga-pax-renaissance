<?php
namespace PaxRenaissance\Cities;

class Timbuktu extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = TIMBUKTU;
    $this->empire = ARAGON;
    $this->emporium = EAST;
    $this->name = clienttranslate('Timbuktu');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => ROOK,
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
      ARAGON,
      BORDER_ARAGON_PAPAL_STATES,
      PAPAL_STATES,
      BORDER_OTTOMAN_PAPAL_STATES,
      OTTOMAN,
      BORDER_MAMLUK_OTTOMAN,
      MAMLUK
    ];
  }
}
