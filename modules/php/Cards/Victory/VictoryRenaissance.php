<?php
namespace PaxRenaissance\Cards\Victory;

class VictoryRenaissance extends \PaxRenaissance\Models\VictoryCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'VictoryRenaissance';
    $this->titleActive = clienttranslate('Renaissance Victory');
    $this->titleInactive = clienttranslate('The Medieval Age');
    $this->startLocation = 'victory_renaissance';
  }
}
