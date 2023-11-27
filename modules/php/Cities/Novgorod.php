<?php
namespace PaxRenaissance\Cities;

class Novgorod extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = NOVGOROD;
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->emporium = EAST;
    $this->name = clienttranslate('Novgorod');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => ROOK,
        'religion' => REFORMIST,
      ],
      CATHOLIC => [
        'levyIcon' => ROOK,
        'religion' => CATHOLIC,
      ],
      ISLAMIC => [
        'levyIcon' => ROOK,
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
      HOLY_ROMAN_EMIRE,
      BORDER_FRANCE_HOLY_ROMAN_EMPIRE,
      FRANCE,
      BORDER_ENGLAND_FRANCE,
      ENGLAND,
      BORDER_ENGLAND_PORTUGAL,
      PORTUGAL,
      BORDER_ARAGON_PORTUGAL,
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
