<?php
namespace PaxRenaissance\Cards\Victory;

class VictoryHoly extends \PaxRenaissance\Models\VictoryCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'VictoryHoly';
    $this->titleActive = clienttranslate('Holy Victory');
    $this->titleInactive = clienttranslate('East-West Schism');
    $this->startLocation = 'victory_holy';
  }
}
