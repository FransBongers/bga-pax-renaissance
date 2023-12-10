<?php
namespace PaxRenaissance\TableauOps;

class RepressOpRook extends \PaxRenaissance\TableauOps\RepressOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = REPRESS_OP_ROOK;
    $this->tokenTypes = [ROOK];
  }
}
