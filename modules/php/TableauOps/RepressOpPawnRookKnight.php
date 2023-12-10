<?php
namespace PaxRenaissance\TableauOps;

class RepressOpPawnRookKnight extends \PaxRenaissance\TableauOps\RepressOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = REPRESS_OP_PAWN_ROOK_KNIGHT;
    $this->tokenTypes = [PAWN, ROOK, KNIGHT];
  }
}
