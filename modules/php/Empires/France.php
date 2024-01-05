<?php

namespace PaxRenaissance\Empires;

use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Players;

class France extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = FRANCE;
    $this->adjacentEmpires = [
      ARAGON,
      ENGLAND,
      HOLY_ROMAN_EMIRE,
      PAPAL_STATES,
      PORTUGAL,
    ];
    $this->adjacentBySeaBorderEmpires = [
      ENGLAND,
      HOLY_ROMAN_EMIRE,
    ];
    $this->empireSquareId = 'EmpireSquare_France';
    $this->name = clienttranslate('France');
    $this->borders = [
      BORDER_ARAGON_FRANCE,
      BORDER_ENGLAND_FRANCE,
      BORDER_FRANCE_HOLY_ROMAN_EMPIRE,
    ];
    $this->cities = [
      BRUGES,
      LYON,
      PARIS,
    ];
    $this->region = WEST;
  }

  public function getAdjacentEmpires()
  {
    $data = $this->adjacentEmpires;
    if (Players::anyPlayerHasSpecialAbility(SA_PORTUGAL_FRANCE_NOT_ADJACENT)) {
      $data = Utils::filter($data, function ($empireId) {
        return $empireId !== PORTUGAL;
      });
    }
    return array_map(function ($empireId) {
      return Empires::get($empireId);
    }, $data);
  }
}
