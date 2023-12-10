<?php
namespace PaxRenaissance\TableauOps;

class CorsairOpIslamic extends \PaxRenaissance\TableauOps\CorsairOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = CORSAIR_OP_ISLAMIC;
    $this->religion = ISLAMIC;
  }
}
