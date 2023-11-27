<?php
namespace PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\Players;

/*
 * AbstractNode: a class that represent an abstract Node
 */
class AbstractNode
{
  protected $children = [];
  protected $parent = null;
  protected $info = [];

  /**
   * Info is all data provided when creating the Node. Can consist of:
   * -
   * children contains all child nodes.
   */
  public function __construct($info = [], $children = [])
  {
    $this->info =$info;
    $this->children = $children;

    foreach ($this->children as $child) {
      $child->attach($this);
    }
  }

  /**********************
   *** Tree utilities ***
   **********************/
  public function attach($parent)
  {
    $this->parent = $parent;
  }

  public function replaceAtPos($node, $index)
  {
    $this->children[$index] = $node;
    $node->attach($this);
    return $node;
  }

  /**
   * Returns index of this node in children list of parent
   */
  public function getIndex()
  {
    if ($this->parent == null) {
      return null;
    }

    foreach ($this->parent->getChildren() as $i => $child) {
      if ($child === $this) {
        return $i;
      }
    }
    throw new \BgaVisibleSystemException("Can't find index of a child");
  }

  /**
   * Replace the current node with a different node. For example when changing a 
   * Leaf node to SEQ node.
   */
  public function replace($newNode)
  {
    $index = $this->getIndex();
    if (is_null($index)) {
      throw new \BgaVisibleSystemException('Trying to replace the root');
    }
    return $this->parent->replaceAtPos($newNode, $index);
  }

  // Push node to children
  public function pushChild($child)
  {
    array_push($this->children, $child);
    $child->attach($this);
  }

  /**
   * Insert node right after current node in children list
   */
  public function insertAsBrother($newNode)
  {
    $index = $this->getIndex();
    if (is_null($index)) {
      throw new \BgaVisibleSystemException('Trying to insert a brother of the root');
    }
    // Ensure parent is a seq node
    if (!$this->parent instanceof \PaxRenaissance\Core\Engine\SeqNode) {
      $newParent = new \PaxRenaissance\Core\Engine\SeqNode([], []);
      $newParent = $this->parent->replaceAtPos($newParent, $index);
      $newParent->pushChild($this);
    }

    return $this->parent->insertChildAtPos($newNode, $index);
  }

  public function insertChildAtPos($node, $index)
  {
    array_splice($this->children, $index + 1, 0, [$node]);
    $node->attach($this);
    return $node;
  }

  // Put child at front of children list
  public function unshiftChild($child)
  {
    array_unshift($this->children, $child);
    $child->attach($this);
  }

  public function getParent()
  {
    return $this->parent;
  }

  public function getChildren()
  {
    return $this->children;
  }

  // public function countChilds()
  // {
  //   return count($this->children);
  // }

  public function toArray()
  {
    return array_merge($this->info, [
      'children' => \array_map(function ($child) {
        return $child->toArray();
      }, $this->children),
    ]);
  }


  protected function childrenReduceAnd($callable)
  {
    return \array_reduce(
      $this->children,
      function ($acc, $child) use ($callable) {
        return $acc && $callable($child);
      },
      true
    );
  }

  protected function childrenReduceOr($callable)
  {
    return \array_reduce(
      $this->children,
      function ($acc, $child) use ($callable) {
        return $acc || $callable($child);
      },
      false
    );
  }

  /***********************
   *** Getters (sugar) ***
   ***********************/
  public function getState()
  {
    return $this->info['state'] ?? null;
  }

  public function getPlayerId()
  {
    return $this->info['playerId'] ?? null;
  }

  public function getType()
  {
    return $this->info['type'] ?? NODE_LEAF;
  }

  public function getArgs()
  {
    return $this->info['args'] ?? null;
  }

  public function getCardId()
  {
    return $this->info['cardId'] ?? null;
  }

  public function getInfo()
  {
    return $this->info;
  }

  public function isDoable($player)
  {
    return true;
  }

  public function isResolvingParent()
  {
    return $this->info['resolveParent'] ?? false;
  }

  /***********************
   *** Node resolution ***
   ***********************/
  public function isResolved()
  {
    return isset($this->info['resolved']) && $this->info['resolved'];
  }


  public function getResolutionArgs()
  {
    return $this->info['resolutionArgs'] ?? null;
  }

  public function getNextUnresolved()
  {
    if ($this->isResolved()) {
      return null;
    }
    return $this;
  }

  public function resolve($args)
  {
    $this->info['resolved'] = true;
    $this->info['resolutionArgs'] = $args;
  }

  // Useful for zombie players
  public function clearZombieNodes($playerId)
  {
    foreach ($this->children as $child) {
      $child->clearZombieNodes($playerId);
    }

    if ($this->getPlayerId() == $playerId) {
      $this->resolve(ZOMBIE);
    }
  }

  /********************
   *** Node choices ***
   ********************/
  public function areChildrenOptional()
  {
    return false;
  }

  public function isOptional()
  {
    return $this->info['optional'] ?? $this->parent != null && $this->parent->areChildrenOptional();
  }


  /************************
   *** Action resolution ***
   ************************/
  // Declared here because some action leafs can become SEQ nodes once triggered
  // -> we need to distinguish the action resolution from the node resolution
  public function getAction()
  {
    return $this->info['action'] ?? null;
  }

  public function isActionResolved()
  {
    return $this->info['actionResolved'] ?? false;
  }

  public function getActionResolutionArgs()
  {
    return $this->info['actionResolutionArgs'] ?? null;
  }

  public function resolveAction($args)
  {
    $this->info['actionResolved'] = true;
    $this->info['actionResolutionArgs'] = $args;
    $this->info['optional'] = false;
  }
}
