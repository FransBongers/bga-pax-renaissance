<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN137X_FaithVsReason extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN137X_FaithVsReason';
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('Michael Servetus, Spanish theologian, polymath scientist, and medical researcher.'),
      clienttranslate('In a cordial letter to the reformist John Calvin, he use logic to promote his ideas of a non-Trinitarian theology. Irritated, Calvin wrote to a friend "if my authority counts for anything, that man will not leave here alive." Servetus was illegally arrested by the Geneva council and burned at the stake as a heretic.'),
    ];
    $this->name = clienttranslate('Faith vs. Reason');
    $this->region = WEST;
  }
}
