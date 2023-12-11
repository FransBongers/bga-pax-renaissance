<?php
namespace PaxRenaissance\Cities;

class RedSea extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = RED_SEA;
    $this->empire = MAMLUK;
    $this->emporium = WEST;
    $this->name = clienttranslate('Red Sea');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => ROOK,
        'separator' => ISLAMIC,
      ],
      CATHOLIC => [
        'levyIcon' => ROOK,
        'separator' => CATHOLIC,
      ],
      ISLAMIC => [
        'levyIcon' => ROOK,
        'separator' => CATHOLIC,
      ],
      REFORMIST => [
        'levyIcon' => KNIGHT,
        'separator' => REFORMIST,
      ],
    ];
  }

  public function getTradeRoute()
  {
    return [
      MAMLUK,
      BORDER_MAMLUK_OTTOMAN,
      OTTOMAN,
      BORDER_OTTOMAN_PAPAL_STATES,
      PAPAL_STATES,
      BORDER_ARAGON_PAPAL_STATES,
      ARAGON,
      BORDER_ARAGON_PORTUGAL,
      PORTUGAL,
      BORDER_ENGLAND_PORTUGAL,
      ENGLAND,
      BORDER_ENGLAND_FRANCE,
      FRANCE,
      BORDER_FRANCE_HOLY_ROMAN_EMPIRE,
      HOLY_ROMAN_EMIRE,
    ];
  }
}
