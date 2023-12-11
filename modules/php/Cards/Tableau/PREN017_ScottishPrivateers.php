<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN017_ScottishPrivateers extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN017_ScottishPrivateers';
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => PIRATE,
      ]
    ];
    $this->empire = ENGLAND;
    $this->flavorText = [
      clienttranslate('The Scottish letter of reprisal was issued to victims of piracy, authorizing them to forcibly seize ships of the offending nation, even in peacetime, until justice was served.'),
      clienttranslate('In this way, the Barton family was at war with Portugal from 1470 to 1563, subcontracting an entire fleet of privateers under their letter of reprisal.')
    ];
    $this->name = clienttranslate('Scottish Privateers');
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate('Commerce raid'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => CORSAIR_OP_REFORMIST,
        'flavorText' => clienttranslate('Yellow Carvel'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->region = WEST;
  }
}
