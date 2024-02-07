<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN046_JoannaTheMad extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN046_JoannaTheMad';
    $this->flavorText = [
      clienttranslate("Joanna, one of the best educated women in Europe and the heiress of the Kingdoms of Castille and Aragon, a union which evolved into modern Spain."),
      clienttranslate("She married Philip the Handsome, starting the rule of the Habsburgs in Spain. Disturbed by her husband's sudden death, she was confined to a nunnery for the rest of her life. Though legally queen, her father Ferdinand and later her son Charles ruled in her place.")
    ];
    $this->name = clienttranslate('Joanna the Mad');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->ops = [
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Revolt of the Comuneros'),
        'top' => 43,
        'left' => 111,
      ]
    ];
    $this->prestige = [CATHOLIC];
    $this->region = WEST;
    // Queen specific props
    $this->height = 100;
    $this->suitors = [
      PORTUGAL,
      ARAGON,
      HOLY_ROMAN_EMIRE,
    ];
  }
}
