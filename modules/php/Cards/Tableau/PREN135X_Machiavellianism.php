<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN135X_Machiavellianism extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN135X_Machiavellianism';
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('Niccolò Machiavelli, a long-time bureaucrat in the Republic of Florence, lost his job in 1512 with the return of the Medici. Incensed, he wrote "The Prince" a collection of maxims about a new type of politician who uses all means for achieving his ends, embracing pragmatism at the expense of principles.'),
      clienttranslate("It was banned by the papal Index Librorum Prohibitorum."),
    ];
    $this->name = clienttranslate('Machiavellianism');
    $this->region = WEST;
    $this->specialAbilities = [
      [
        'id' => SA_SELL_AND_PERFORM_ONE_SHOT,
        'title' => clienttranslate('PRAGMATIC TREACHERY:'),
        'text' => [
          'log' => clienttranslate('If you sell a card additionally may perform its civil war, crusade or apostasy One-shot (including adding its Agents).'),
          'args' => [],
        ],
      ]
    ];
  }
}
