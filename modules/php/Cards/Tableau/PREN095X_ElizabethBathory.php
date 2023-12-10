<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN095X_ElizabethBathory extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN095X_ElizabethBathory';
    $this->flavorText = [
      clienttranslate("This infamous Hungarian countess from the Báthory noble dynasty is in the Guiness World Records as the female mass murderer with the highest body count. The testimony of over 300 witnessed validated claims of many hundreds of young women victims, some of whom were discovered tortured and horribly mutilated in Csejte Castle."),
      clienttranslate("The family, who ruled Transylvania, bargained for house arrest in lieu of a scandalous trial.")
    ];
    $this->name = clienttranslate('Elizabeth Báthory');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate("Conscription Long War"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = EAST;
  }
}
