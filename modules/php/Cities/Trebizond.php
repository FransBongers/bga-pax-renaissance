<?php
namespace PaxRenaissance\Cities;

class Trebizond extends \PaxRenaissance\Models\City
{
  public function __construct()
  {
    $this->id = TREBIZOND;
    $this->empire = BYZANTIUM;
    $this->emporium = WEST;
    $this->name = clienttranslate('Trebizond');
    $this->levy = [
      MEDIEVAL => [
        'levyIcon' => ROOK,
        'separator' => REFORMIST,
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
        'levyIcon' => KNIGHT,
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
