<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN062_BarbarossaBrothers extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN062_BarbarossaBrothers';
    $this->flavorText = [
      clienttranslate('"Silver Arm" Aruj, known as Barbarossa, was one of four seafaring brothers. Sailing from bases in Smyrna, Alexandria, and Djerba island with commissions from the Ottoman and the Mamluk sultans, he raided shipping and ports across the Mediterranean. In 1516 he became Sultan of Algiers by liberating it from Spain.'),
      clienttranslate('Upon his death, his brother Hizir Reis took his place (and his nickname).')
    ];
    $this->name = clienttranslate('Barbarossa Brothers');
    $this->region = EAST;
  }
}
