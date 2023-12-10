<?php
namespace PaxRenaissance\TableauOps;

class CorsairOpReformist extends \PaxRenaissance\TableauOps\CorsairOp
{
  public function __construct($cardOp = null)
  {
    parent::__construct($cardOp);
    $this->id = CORSAIR_OP_REFORMIST;
    $this->religion = REFORMIST;
  }
}
