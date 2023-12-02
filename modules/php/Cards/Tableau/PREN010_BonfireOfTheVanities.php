<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN010_BonfireOfTheVanities extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN010_BonfireOfTheVanities';
    $this->flavorText = [
      clienttranslate('To denounce clerical corruption, the friar Savonarola publicly burned objects deemed to be occasions of sin. Empowered by a collaboration with the French king, he instituted a new Florentine republic with a Frateschi constitution empowering the artisans and expelling the hated Medici.'),
      clienttranslate('The Borgia pope had him burned as a heretic, but his reformations inspired Luther.')
    ];
    $this->name = clienttranslate('Bonfire of the Vanities');
    $this->prestige = [LAW];
    $this->region = WEST;
  }
}
