<?php

namespace PaxRenaissance\Cards\Tableau;

class PREN058_TheGrim extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN058_TheGrim';
    $this->agents = [
      [
        'religion' => ISLAMIC,
        'type' => BISHOP,
      ]
    ];
    $this->empire = OTTOMAN;
    $this->flavorText = [
      clienttranslate('Selim I "The Grim", whose reign as Ottoman sultan tripled the size of the empire. His conquest of the Mamluk Sultanate allowed him to seize the title of Caliph of Islam, the religious successor to the Islamic prophet, Muhammad.'),
      clienttranslate('Selim had so many of his viziers executed, that "may you be a vizier of Selim\'s" remains an Ottoman curse.')
    ];
    $this->name = clienttranslate('The Grim');
    $this->oneShot = JIHAD_ONE_SHOT;
    $this->ops = [
      [
        'id' => BEHEAD_OP,
        'flavorText' => clienttranslate("Vizier of Selim's"),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => SIEGE_OP,
        'flavorText' => clienttranslate('Janissaries'),
        'top' => 0,
        'left' => 0,
      ],
      [
        'id' => INQUISITOR_OP_ISLAMIC,
        'flavorText' => clienttranslate("Shi'i Alevi holocaust"),
        'top' => 0,
        'left' => 0,
      ]
    ];
    $this->prestige = [ISLAMIC];
    $this->region = EAST;
  }
}
