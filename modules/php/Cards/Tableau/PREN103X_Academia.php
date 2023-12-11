<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN103X_Academia extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN103X_Academia';
    $this->empire = HUNGARY;
    $this->flavorText = [
      clienttranslate("The Sodalitas Litterarum Vistulana of 1488 was an international society founded in Cracow by Conrad Celtes. It was active in mathematics, astronomy and the natural sciences. Notable members were Albert Brudzewski, Filip Callimachus, and Laurentius Corvinus."),
      clienttranslate("It was modelled after the Roman Academy, whose members were imprisoned by the anti-humanist Pope Paul II.")
    ];
    $this->name = clienttranslate('Academia');
    $this->ops = [
      [
        'id' => VOTE_OP_EAST,
        'flavorText' => clienttranslate("Academic society"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->prestige = [DISCOVERY];
    $this->region = EAST;
  }
}
