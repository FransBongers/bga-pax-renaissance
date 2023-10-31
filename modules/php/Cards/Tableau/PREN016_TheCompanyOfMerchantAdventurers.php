<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN016_TheCompanyOfMerchantAdventurers extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN016_TheCompanyOfMerchantAdventurers';
    $this->name = clienttranslate('The Company of Merchant Adventurers');
    $this->region = WEST;
  }
}
