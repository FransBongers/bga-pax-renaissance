<?php
namespace PaxRenaissance\Tokens;

use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Players;

class Pawn extends \PaxRenaissance\Models\Token
{
  // protected $bank;
  protected $type;

  public function __construct($row)
  {
    parent::__construct($row);

    $exploded = explode('_', $row['id']);
    $this->type = $exploded[0];
    // $this->bank = $exploded[1];
    $this->separator = $exploded[1];
  }

  public function getBank()
  {
    return $this->separator;
  }

  public function getOwner()
  {
    return Utils::filter(Players::getAll()->toArray(), function ($plyr) {
      return $plyr->getBank() === $this->separator;
    })[0];
  }

  public function getLogToken()
  {
    return $this->getBank() . '_' . PAWN;
  }

  public function getSupply()
  {
    return Locations::supply($this->getType(),$this->getBank());
  }
}
