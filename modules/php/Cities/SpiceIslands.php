<?php
namespace PaxRenaissance\Cities;

class SpiceIslands extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = SPICE_ISLANDS;
    $this->empire = PORTUGAL;
    $this->emporium = WEST;
    $this->name = clienttranslate('Spice Islands');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => ROOK,
        'separator' => CATHOLIC,
      ],
      CATHOLIC => [
        'levyIcon' => ROOK,
        'separator' => CATHOLIC,
      ],
      ISLAMIC => [
        'levyIcon' => ROOK,
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
