<?php
namespace PaxRenaissance\Tokens;

class Disk extends \PaxRenaissance\Models\Token
{
  // protected $color;
  protected $type;

  public function __construct($row)
  {
    parent::__construct($row);

    $exploded = explode('_', $row['id']);
    $this->type = $exploded[0];
    // $this->color = $exploded[1];
    $this->separator = $exploded[1];
  }

  public function getColor()
  {
    return $this->separator;
  }

  public function getLogToken()
  {
    return $this->getColor() . '_' . DISK;
  }
}
