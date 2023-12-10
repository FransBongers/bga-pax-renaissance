<?php
namespace PaxRenaissance\TableauOps;

class CommerceOpWest extends \PaxRenaissance\TableauOps\CommerceOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = COMMERCE_OP_WEST;
    $this->region = WEST;
  }
}
