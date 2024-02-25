<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN095X_ElizabethBathory extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN095X_ElizabethBathory';
    $this->flavorText = [
      clienttranslate("This infamous Hungarian countess from the Báthory noble dynasty is in the Guiness World Records as the female mass murderer with the highest body count. The testimony of over 300 witnesses validated claims of many hundreds of young women victims, some of whom were discovered tortured and horribly mutilated in Csejte Castle."),
      clienttranslate("The family, who ruled Transylvania, bargained for house arrest in lieu of a scandalous trial.")
    ];
    $this->name = clienttranslate('Elizabeth Báthory');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => REPRESS_OP_PAWN,
        'flavorText' => clienttranslate("Conscription Long War"),
        'top' => 6.5,
        'left' => 4,
      ],
    ];
    $this->region = EAST;
    // Queen specific props
    $this->height = 118;
    $this->suitors = [
      BYZANTIUM,
      HUNGARY,
      HOLY_ROMAN_EMIRE,
    ];
    $this->specialAbilities = [
      [
        'id' => SA_DISCARD_TO_LAUNCH_PEASANT_REVOLT,
        'title' => clienttranslate('POPULAR REPRISALS'),
        'text' => [
          'log' => clienttranslate('As an action, Discard this card to launch a peasant revolt in her Empire.'),
          'args' => [],
        ],
        'abilityAction' => true,
        'top' => 0,
        'left' => 0,
        'height' => 0,
        'width' => 0,
      ]
    ];
  }
}
