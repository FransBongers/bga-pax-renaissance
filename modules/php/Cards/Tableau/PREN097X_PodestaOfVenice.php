<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN097X_PodestaOfVenice extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN097X_PodestaOfVenice';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = MAMLUK;
    $this->flavorText = [
      clienttranslate("Bartolomeo Minio represented everything good about Venetian governorship in the stato da mar (colonies) of Morea, Corfu, Cyprus, and Crete."),
      clienttranslate('As commander of the trade fleet he built forts and fought (and was captured by) pirates. As proveditor over the stratioti taken from Greece for the Ferrara war, he established relations with rebellious armatolos and Ottoman governors. He arranged for relief after crop failures.')
    ];
    $this->name = clienttranslate('Podestà of Venice');
    $this->region = WEST;
  }
}
