<?php
namespace PaxRenaissance\TableauOps;

class InquisitorOpIslamic extends \PaxRenaissance\TableauOps\InquisitorOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = INQUISITOR_OP_ISLAMIC;
    $this->religion = ISLAMIC;
  }
}
