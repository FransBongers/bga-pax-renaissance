<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN136X_Hermeticism extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN136X_Hermeticism';
    $this->empire = WEST;
    $this->flavorText = [
      clienttranslate('Giovanni Pico della Mirandola, a young genius who believed in syncretism (fundamentally opposed doctrines can be reconciled) and hermeticism (a single true theology exists in all religions).'),
      clienttranslate("His lifelong work tried to reconcile Aristotle's this-world orientation with the other-worldliness of Plato."),
    ];
    $this->name = clienttranslate('Hermeticism');
    $this->region = WEST;
  }
}
