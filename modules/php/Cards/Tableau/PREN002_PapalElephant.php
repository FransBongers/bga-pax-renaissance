<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN002_PapalElephant extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN002_PapalElephant';
    $this->flavorText = [
      clienttranslate('The P.T. Barnum of Popes, Leo X enjoyed touring his realm on his pet white elephand Hanna, followed by a lavish parade of jesters and performers. A scion of the Medici, he sold indulgences to patronize the arts.'),
      clienttranslate('Luther was scandalized enough to nail theses to a church door. But other than a mild condemnation, Leo hardly cards. "Since God has given us the papacy, let us enjoy it".'),
    ];
    $this->name = clienttranslate('Papal Elephant');
    $this->region = WEST;
  }
}
