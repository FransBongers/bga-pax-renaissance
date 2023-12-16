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
  }
}
