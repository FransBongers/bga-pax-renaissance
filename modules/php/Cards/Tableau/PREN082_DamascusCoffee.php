<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN082_DamascusCoffee extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN082_DamascusCoffee';
    $this->agents = [
      'number' => 1,
      'religion' => ISLAMIC,
      'type' => ROOK,
    ];
    $this->empire = MAMLUK;
    $this->flavorText = [
      clienttranslate('Janbirdi al-Ghazali, Viceroy in the Mamluk Sultanate, defected to the invading Ottomans and was rewarded with the governorship of Damascus by Selim.'),
      clienttranslate("He subjugated the local Turkmen nomads and collected tolls from the pilgrims. Trying to restore Mamluk rule, he declared himself independent ruler of Damascus, but was beheaded by Süleyman's armies in 1521.")
    ];
    $this->name = clienttranslate('Damascus Coffee');
    $this->oneShot = CONSPIRACY_ONE_SHOT;
    $this->region = EAST;
  }
}
