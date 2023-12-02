<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN065_MamlukSlaveSoldiers extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN065_MamlukSlaveSoldiers';
    $this->agents = [
      'number' => 1,
      'religion' => ISLAMIC,
      'type' => KNIGHT,
    ];
    $this->empire = MAMLUK;
    $this->flavorText = [
      clienttranslate('Mamluks, the slave-soldiers of Egypt, were mainly Circassian and Georgian captives. Because slaves have no link to any local power structure, they were more loyal soldiers than tribal sheikhs.'),
      clienttranslate('If a commander from a noble family revolted, he could not be punished without causing unrest. This made the classless Mamluk commanders an asset.')
    ];
    $this->name = clienttranslate('Mamluk Slave Soldiers');
    $this->oneShot = JIHAD_ONE_SHOT;
    $this->region = EAST;
  }
}
