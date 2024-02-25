<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN215P_ReformationParliament extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN215P_ReformationParliament';
    $this->ageOfReformationPromo = true;
    $this->agents = [
      [
        'separator' => REFORMIST,
        'type' => BISHOP,
      ],
    ];
    $this->empire = ENGLAND;
    $this->flavorText = [
      clienttranslate('The English Reformation Parliament of 1529-36 passed the major pieces of legislation leading to the Break with Rome and establishment of the Church of England.'),
    ];
    $this->name = clienttranslate("Reformation Parliament");
    $this->oneShot = REFORMATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Crown Annates"),
        'top' => 67,
        'left' => 111,
      ],
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate("Royal Supremacy"),
        'top' => 106,
        'left' => 111,
      ],
    ];
    $this->prestige = [REFORMIST];
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_EMPORIUM_SUBSIDY_2_FLORINS,
        'title' => clienttranslate('LONDON ROYAL EXCHANGE'),
        'text' => [
          'log' => clienttranslate("Your emporium subsidy for all trade fairs is 2 instead of 1 Florins."),
          'args' => [],
        ],
      ]
    ];
  }
}
