<?php
namespace PaxRenaissance\Tokens;

use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Players;

class Pawn extends \PaxRenaissance\Models\Token
{
  protected $bank;
  protected $type;

  public function __construct($row)
  {
    parent::__construct($row);

    $exploded = explode('_', $row['id']);
    $this->type = $exploded[0];
    $this->bank = $exploded[1];
  }

  public function jsonSerialize()
  {
    $data = parent::jsonSerialize();
    $data['bank'] = $this->bank;
    $data['type'] = $this->type;
    return $data;
  }

  public function getBank()
  {
    return $this->bank;
  }

  public function getOwner()
  {
    return Utils::filter(Players::getAll()->toArray(), function ($plyr) {
      return $plyr->getBank() === $this->bank;
    })[0];
  }
}
