<?php
namespace PaxRenaissance\TableauOps;

class RepressOpPawnKnight extends \PaxRenaissance\TableauOps\RepressOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = REPRESS_OP_PAWN_KNIGHT;
    $this->tokenTypes = [PAWN, KNIGHT];
  }
}
