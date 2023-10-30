<?php
namespace PaxRenaissance\Cards\Victory;

class VictoryGlobalization extends \PaxRenaissance\Models\VictoryCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'VictoryGlobalization';
    $this->titleActive = clienttranslate('Globalization Victory');
    $this->titleInactive = clienttranslate('The Galley Age');
    $this->startLocation = 'victory_globalization';
  }
}
