<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN034_MerchantsOfTheStaple extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN034_MerchantsOfTheStaple';
    $this->agents = [
      [
        'religion' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = ENGLAND;
    $this->flavorText = [
      clienttranslate('Rebel leader Jack Cade (seated) issued a manifesto of grievances against Henry VI and led a peasant mob that occupied London in 1450. The king escaped, but the Lord High Treasurer (left) and other royal favorites were beheaded.'),
      clienttranslate('The occupiers dispersed after official pardons and promises to honor the manifesto were issued (revoked shortly after the rebellion ended).')
    ];
    $this->name = clienttranslate('Merchants of the Staple');
    $this->oneShot = PEASANT_REVOLT_ONE_SHOT;
    $this->region = WEST;
  }
}
