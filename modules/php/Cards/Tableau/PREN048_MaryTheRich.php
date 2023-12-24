<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN048_MaryTheRich extends \PaxRenaissance\Models\QueenCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN048_MaryTheRich';
    $this->flavorText = [
      clienttranslate("Mary of Burgundy, the only child of Charles the Bold and heiress to the very rich Burgundian domains in France and the Low Countries. King Louis XI the Spider demanded that she marry his son Charles, by force of arms if necessary."),
      clienttranslate("She instead married a Habsburg, Archduke Maximilian of Austria, initiating 200 years of Franco-Habsburg wars over Burgundy. Mary was coerced into granting the Great Privilege to Flemish cites.")
    ];
    $this->name = clienttranslate('Mary the Rich');
    $this->oneShot = CORONATION_ONE_SHOT;
    $this->prestige = [LAW];
    $this->region = WEST;
    // Queen specific props
    $this->height = 95;
    $this->suitors = [
      FRANCE,
      ENGLAND,
      PORTUGAL,
      HOLY_ROMAN_EMIRE,
    ];
  }
}
