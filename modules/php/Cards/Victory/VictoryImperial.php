<?php
namespace PaxRenaissance\Cards\Victory;

class VictoryImperial extends \PaxRenaissance\Models\VictoryCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'VictoryImperial';
    $this->titleActive = clienttranslate('Imperial Victory');
    $this->titleInactive = clienttranslate('Age of Feudalism');
    $this->startLocation = 'victory_imperial';
  }
}
