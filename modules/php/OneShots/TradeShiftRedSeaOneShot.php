<?php
namespace PaxRenaissance\OneShots;

class TradeShiftRedSeaOneShot extends \PaxRenaissance\OneShots\TradeShiftOneShot
{
  public function __construct()
  {
    parent::__construct();
    $this->id = TRADE_SHIFT_RED_SEA_ONE_SHOT;
    $this->name = clienttranslate('Trade Shift Red Sea');
  }
}
