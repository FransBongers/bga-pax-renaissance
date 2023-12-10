<?php
namespace PaxRenaissance\TableauOps;

class CommerceOpEast extends \PaxRenaissance\TableauOps\CommerceOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = COMMERCE_OP_EAST;
    $this->region = EAST;
  }
}
