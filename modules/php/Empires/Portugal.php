<?php
namespace PaxRenaissance\Empires;

use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Players;

class Portugal extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = PORTUGAL;
    $this->adjacentEmpires = [
      ARAGON,
      ENGLAND,
      FRANCE,
    ];
    $this->adjacentBySeaBorderEmpires = [
      ARAGON,
      ENGLAND,
    ];
    $this->empireSquareId = 'EmpireSquare_Portugal';
    $this->name = clienttranslate('Portugal');
    $this->borders = [
      BORDER_ARAGON_PORTUGAL,
      BORDER_ENGLAND_PORTUGAL,
    ];
    $this->cities = [
      GRANADA,
      TOLEDO,
      SPICE_ISLANDS
    ];
    $this->region = WEST;
  }

  public function getAdjacentEmpires()
  {
    $data = $this->adjacentEmpires;
    if (Players::anyPlayerHasSpecialAbility(SA_PORTUGAL_FRANCE_NOT_ADJACENT)) {
      $data = Utils::filter($data, function ($empireId) {
        return $empireId !== FRANCE;
      });
    }
    return array_map(function ($empireId) {
      return Empires::get($empireId);
    }, $data);
  }
}
