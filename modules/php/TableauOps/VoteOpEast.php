<?php
namespace PaxRenaissance\TableauOps;

class VoteOpEast extends \PaxRenaissance\TableauOps\VoteOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = VOTE_OP_EAST;
    $this->region = EAST;
  }
}
