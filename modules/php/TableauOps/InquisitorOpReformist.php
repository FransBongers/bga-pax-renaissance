<?php
namespace PaxRenaissance\TableauOps;

class InquisitorOpReformist extends \PaxRenaissance\TableauOps\InquisitorOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = INQUISITOR_OP_REFORMIST;
    $this->religion = REFORMIST;
  }
}
