<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN083_PospoliteRuszenie extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN083_PospoliteRuszenie';
    $this->agents = [
      [
        'religion' => CATHOLIC,
        'type' => ROOK,
      ]
    ];
    $this->empire = HUNGARY;
    $this->flavorText = [
      clienttranslate('Pospolite ruszenie units were militia formed from the szlachta (Polish nobility). Operating during the "Golden Liberty", a period when royal powers were kept in check by the Sejm (Parliament), they were eventually outclassed by professional forces.')
    ];
    $this->name = clienttranslate('Pospolite Ruszenie');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->prestige = [LAW];
    $this->region = EAST;
  }
}
