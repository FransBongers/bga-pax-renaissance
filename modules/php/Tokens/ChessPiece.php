<?php

namespace PaxRenaissance\Tokens;

use PaxRenaissance\Helpers\Locations;

class ChessPiece extends \PaxRenaissance\Models\Token
{
  protected $religion;
  protected $type;

  public function __construct($row)
  {
    parent::__construct($row);

    $exploded = explode('_', $row['id']);
    $this->type = $exploded[0];
    $this->religion = $exploded[1];
    $this->separator = $exploded[1];
  }

  public function getLogToken()
  {
    return $this->getReligion() . '_' . $this->getType();
  }

  public function getReligion()
  {
    return $this->religion;
  }

  public function getSupply()
  {
    return Locations::supply($this->getType(), $this->getReligion());
  }
}
