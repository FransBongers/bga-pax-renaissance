<?php
namespace PaxRenaissance\TableauOps;

class VoteOpWest extends \PaxRenaissance\TableauOps\VoteOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = VOTE_OP_WEST;
    $this->region = WEST;
  }
}
