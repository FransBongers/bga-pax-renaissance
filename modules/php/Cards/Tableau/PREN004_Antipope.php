<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN004_Antipope extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN004_Antipope';
    $this->flavorText = [
      clienttranslate('The Conciliar Movement held that supreme authority in the Church resided with an Ecumenical council instead of the pope. One such council, the Counsil of Basel, declated the pope a heretic  and elected an antipope, Felix V.'),
      clienttranslate('The pope responded by forming a union with the Byzantine Orthodox Church, and Felix was forced by France to abdicate in 1449.')
    ];
    $this->name = clienttranslate('Antipope');
    $this->prestige = [REFORMIST];
    $this->region = WEST;
  }
}
