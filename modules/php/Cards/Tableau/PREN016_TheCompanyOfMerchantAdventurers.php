<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN016_TheCompanyOfMerchantAdventurers extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN016_TheCompanyOfMerchantAdventurers';
    $this->agents = [
      [
        'religion' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = ENGLAND;
    $this->flavorText = [
      clienttranslate('In 1496, Henry VII of England issued letters of patent to Caboto and Sons, authorizing them to sail in search of the westward sea route to Asia.'),
      clienttranslate('Despite a papal bull barring the expedition, on his second attempt Giovanni Caboto (John Cabot, above) landed in Canada, the first European to do so since the Vikings.')
    ];
    $this->name = clienttranslate('The Company of Merchant Adventurers');
    $this->oneShot = TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT;
    $this->prestige = [DISCOVERY];
    $this->region = WEST;
  }
}
