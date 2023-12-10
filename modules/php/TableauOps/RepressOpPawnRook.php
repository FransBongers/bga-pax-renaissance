<?php
namespace PaxRenaissance\TableauOps;

class RepressOpPawnRook extends \PaxRenaissance\TableauOps\RepressOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = REPRESS_OP_PAWN_ROOK;
    $this->tokenTypes = [PAWN, ROOK];
  }
}
