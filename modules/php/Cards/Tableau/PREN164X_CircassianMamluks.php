<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN164X_CircassianMamluks extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN164X_CircassianMamluks';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => KNIGHT,
      ],
    ];
    $this->empire = MAMLUK;
    $this->flavorText = [
      clienttranslate('Under the turbulent mamluk (warrios class) system, the army was the holder of the political and economic power and a new Circassian aristocracy formed as mamluk recruitment diversified.'),
      clienttranslate('The illustration shows Vlad making a surprise night raid on the Turkish camp in an unsuccessful bid to assassinate the Sultan.'),
    ];
    $this->name = clienttranslate("Circassian Mamluks");
    $this->oneShot = JIHAD_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Burji family"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = EAST;
  }
}
