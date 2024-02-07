<?php

namespace PaxRenaissance\Cards\Empire;

use PaxRenaissance\Core\Notifications;

class EmpireSquare_England extends \PaxRenaissance\Models\EmpireCard
{

  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'EmpireSquare_England';
    $this->empire = ENGLAND;
    $this->flavorText = [
      KING => [
        clienttranslate('In the War of the Roses, Edward IV led the House of York to demolish the House of Lancaster. Never defeated on the field of battle, he restored law and order to England.')
      ],
      REPUBLIC => [
        clienttranslate('Since the Magna Carta, the Parliament became a forum to approve taxes. Laws needed consent of the House of Lords (nobled & senior clergy), the House of Commons (knights & burgesses), and the sovereign.')
      ],
    ];
    $this->name = [
      KING => clienttranslate('King Edward IV House of York'),
      REPUBLIC => clienttranslate('English Parliament'),
    ];
    $this->ops = [
      KING => [
        [
          'id' => CAMPAIGN_OP,
          'flavorText' => clienttranslate("War of the Roses"),
          'top' => 64.5,
          'left' => 111,
        ]
      ],
      REPUBLIC => [
        [
          'id' => VOTE_OP_WEST,
          'flavorText' => clienttranslate("House of Commons"),
          'top' => 64,
          'left' => 110.5,
        ],
        [
          'id' => COMMERCE_OP_WEST,
          'flavorText' => '',
          'top' => 103,
          'left' => 110.5,
        ],
      ]
    ];
    $this->prestige = [
      KING => [],
      REPUBLIC => [LAW]
    ];
    $this->startLocation = 'throne_england';
    $this->side = $this->getExtraData('side');
  }
}
