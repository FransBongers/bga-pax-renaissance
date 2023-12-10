<?php
namespace PaxRenaissance\TableauOps;

class InquisitorOpCatholic extends \PaxRenaissance\TableauOps\InquisitorOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = INQUISITOR_OP_CATHOLIC;
    $this->religion = CATHOLIC;
  }
}
