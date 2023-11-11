<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN001_InquistionPope extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN001_InquistionPope';
    $this->flavorText = [
      clienttranslate('When faced with a heretic, the papacy had two solutions: forced conversion or "auto-da-fé" (public burning).'),
      clienttranslate('Pope Innocent VIII preferred burning. In 1484 he issued a papal bull initiating the German inquisition against witchcraft and magicians.'),
      clienttranslate('He then confirmed Torquemada as the Grand Inquisitor of Spain, and funded a crusade against Waldensian heretics in France.'),
    ];
    $this->name = clienttranslate('Inquistion Pope');
    $this->region = WEST;
  }
}
