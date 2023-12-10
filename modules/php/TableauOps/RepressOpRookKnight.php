<?php
namespace PaxRenaissance\TableauOps;

class RepressOpRookKnight extends \PaxRenaissance\TableauOps\RepressOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = REPRESS_OP_ROOK_KNIGHT;
    $this->tokenTypes = [KNIGHT, ROOK];
  }
}
