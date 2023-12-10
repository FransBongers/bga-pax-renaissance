<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN088_CemAntiHostage extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN088_CemAntiHostage';
    $this->agents = [
      [
        'religion' => ISLAMIC,
        'type' => ROOK,
      ],
      [
        'religion' => ISLAMIC,
        'type' => ROOK,
      ]
    ];
    $this->empire = OTTOMAN;
    $this->flavorText = [
      clienttranslate("Upon the death of Sultan Mehmed, his sons Bayezid and Cem fought for this throne. Cem lost, and tried to escape to Egypt. Instaed he made landfall at Rhodes, and asked for protection from the Knights."),
      clienttranslate("Money exchanged hands, but not for the hostage's release. Cem retained popular support for the sultanage and was a serious threat to Sultan Bayezid, who paid the Knights a huge annual sum to keep his brother captive.")
    ];
    $this->name = clienttranslate('Cem Anti-Hostage');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->region = EAST;
  }
}