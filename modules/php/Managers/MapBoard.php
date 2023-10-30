<?php

namespace PaxRenaissance\Managers;

use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Managers\Cards;

class MapBoard
{


  public static function getUiData()
  {
    return Cards::getSelectQuery()->where('card_location', 'LIKE', 'empire%')->get()->ui();
  }
}