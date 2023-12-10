<?php
namespace PaxRenaissance\TableauOps;

class CorsairOpCatholic extends \PaxRenaissance\TableauOps\CorsairOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = CORSAIR_OP_CATHOLIC;
    $this->religion = CATHOLIC;
  }
}
