<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN130X_Cryptography extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN130X_Cryptography';
    $this->empire = PAPAL_STATES;
    $this->flavorText = [
      clienttranslate("Leon Battista Alberti was an Italian Renaissance Man of many talents in art and science."),
      clienttranslate("Among them was cryptography; he invented the polyalphabetic Alberti cipher, enciphered code, and machine-assited encryption using his Cipher Disk. With this technology the Medici developed the best ciphers in the world.")
    ];
    $this->name = clienttranslate('Cryptography');
    $this->prestige = [PATRON];
    $this->region = WEST;
  }
}
