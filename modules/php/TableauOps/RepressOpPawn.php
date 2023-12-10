<?php
namespace PaxRenaissance\TableauOps;

class RepressOpPawn extends \PaxRenaissance\TableauOps\RepressOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = REPRESS_OP_PAWN;
    $this->tokenTypes = [PAWN];
  }
}
