<?php
namespace PaxRenaissance\Tokens;

class Disk extends \PaxRenaissance\Models\Token
{
  protected $color;
  protected $type;

  public function __construct($row)
  {
    parent::__construct($row);

    $exploded = explode('_', $row['id']);
    $this->type = $exploded[0];
    $this->color = $exploded[1];
  }

  public function jsonSerialize()
  {
    $data = parent::jsonSerialize();
    $data['color'] = $this->color;
    $data['type'] = $this->type;
    return $data;
  }

  public function getColor()
  {
    return $this->color;
  }

  public function getLogToken()
  {
    return $this->getColor() . '_' . DISK;
  }
}
