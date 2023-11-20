<?php
namespace PaxRenaissance\Core\Engine;

use PaxRenaissance\Core\Engine;
/*
 * SeqNode: a class that represent a sequence of actions
 */
class SeqNode extends AbstractNode
{
  public function __construct($info = [], $children = [])
  {
    parent::__construct($info, $children);
    $this->info['type'] = NODE_SEQ;
  }


  /**
   * An SEQ node is resolved either when marked as resolved or when all children are resolved already
   *  => if the node was actually an action node and is not resolved fully yet => go back to him
   */
  public function isResolved()
  {
    return parent::isResolved() ||
      $this->childrenReduceAnd(function ($child) {
        return $child->isResolved();
      });
  }

  /**
   * Just return the first unresolved children, unless the node itself is optional
   */
  public function getNextUnresolved()
  {
    if ($this->isResolved()) {
      return null;
    }

    // if ($this->isOptional()) {
    //   return $this;
    // }

    foreach ($this->children as $child) {
      if (!$child->isResolved()) {
        return $child->getNextUnresolved();
      }
    }
  }
}
