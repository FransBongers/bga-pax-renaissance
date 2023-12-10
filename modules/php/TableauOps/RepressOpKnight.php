<?php
namespace PaxRenaissance\TableauOps;

class RepressOpKnight extends \PaxRenaissance\TableauOps\RepressOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = REPRESS_OP_KNIGHT;
    $this->tokenTypes = [KNIGHT];
  }
}
