<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN043_Gutenberg extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN043_Gutenberg';
    $this->agents = [
      [
        'separator' => null,
        'type' => PAWN,
      ]
    ];
    $this->empire = HOLY_ROMAN_EMIRE;
    $this->flavorText = [
      clienttranslate('Perhaps the greatest societal impact of the printing press was the wide distribution of Laws that could not easily be retracted once printed.'),
      clienttranslate("The first book printed was the Bible, a book of Laws. Churches and rulers prohibited printing without a license, but could not censor the press as easily as they could scribes. The first copyrights appeared in 1518 in England.")
    ];
    $this->name = clienttranslate('Gutenberg');
    $this->ops = [
      [
        'id' => COMMERCE_OP_WEST,
        'flavorText' => clienttranslate('Mass production of printed books'),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [LAW];
    $this->region = WEST;
  }
}
