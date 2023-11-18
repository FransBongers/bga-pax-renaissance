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

  // public function replaceAtPos($node, $index)
  // {
  //   $this->childs[$index] = $node;
  //   $node->attach($this);
  //   return $node;
  // }

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

  public function replace($newNode)
  {
    $index = $this->getIndex();
    if (is_null($index)) {
      throw new \BgaVisibleSystemException('Trying to replace the root');
    }
    return $this->parent->replaceAtPos($newNode, $index);
  }

  public function pushChild($child)
  {
    array_push($this->children, $child);
    $child->attach($this);
  }

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

  /**
   * The description of the node is the sequence of description of its children, separated by a separator
   */
  public function getDescription()
  {
    $i = 0;
    $desc = [];
    $args = [];

    if (isset($this->info['customDescription'])) {
      return $this->info['customDescription'];
    }

    foreach ($this->children as $child) {
      $name = 'action' . $i++;
      $tmp = $child->getDescription();
      if ($tmp != '') {
        $args[$name] = $tmp;
        $args['i18n'][] = $name;

        if ($child->forceConfirmation()) {
          $tmp = [
            'log' => clienttranslate('Allow ${player_name} to take a triggered action'),
            'args' => [
              'player_name' => Players::get($child->getPId())->getName(),
            ],
          ];
        }
        $args[$name] = $tmp;
        $args['i18n'][] = $name;
        $desc[] = '${' . $name . '}';
      }
    }

    return [
      'log' => \implode($this->getDescriptionSeparator(), $desc),
      'args' => $args,
    ];
  }

  public function getDescriptionSeparator()
  {
    return '';
  }

  /***********************
   *** Getters (sugar) ***
   ***********************/
  public function getState()
  {
    return $this->info['state'] ?? null;
  }

  public function getPId()
  {
    return $this->info['pId'] ?? null;
  }

  public function getType()
  {
    return $this->info['type'] ?? NODE_LEAF;
  }

  public function getFlag()
  {
    return $this->info['flag'] ?? null;
  }

  public function getArgs()
  {
    return $this->info['args'] ?? null;
  }

  public function getCardId()
  {
    return $this->info['cardId'] ?? null;
  }

  public function getSource()
  {
    return $this->info['source'] ?? null;
  }

  public function getSourceId()
  {
    return $this->info['sourceId'] ?? null;
  }

  public function isDoable($player)
  {
    return true;
  }

  // public function getUndoableMandatoryNode($player)
  // {
  //   if (!$this->isResolved() && !$this->isDoable($player) && ($this->isMandatory() || !$this->isOptional())) {
  //     return $this;
  //   }
  //   return null;
  // }

  // public function forceConfirmation()
  // {
  //   return $this->info['forceConfirmation'] ?? false;
  // }

  public function isReUsable()
  {
    return $this->info['reusable'] ?? false;
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

    if (!isset($this->info['choice']) || $this->children[$this->info['choice']]->isResolved()) {
      return $this;
    } else {
      return $this->children[$this->info['choice']]->getNextUnresolved();
    }
  }

  public function resolve($args)
  {
    $this->info['resolved'] = true;
    $this->info['resolutionArgs'] = $args;
  }

  // Useful for zombie players
  public function clearZombieNodes($pId)
  {
    foreach ($this->children as $child) {
      $child->clearZombieNodes($pId);
    }

    if ($this->getPId() == $pId) {
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

  // public function isAutomatic($player = null)
  // {
  //   $choices = $this->getChoices($player);
  //   return count($choices) < 2;
  // }

  // // Allow for automatic resolution in parallel node
  // public function isIndependent($player = null)
  // {
  //   return $this->isAutomatic($player) &&
  //     $this->childsReduceAnd(function ($child) use ($player) {
  //       return $child->isIndependent($player);
  //     });
  // }

  public function getChoices($player = null, $displayAllChoices = false)
  {
    Notifications::log('getChoices',$player->getId());
    $choice = null;
    $choices = [];
    $children = $this->getType() == NODE_SEQ && !empty($this->children) ? [0 => $this->children[0]] : $this->children;
    Notifications::log('children', ['children' => $children, 'type' => $this->getType()]);

    foreach ($children as $id => $child) {
      Notifications::log('child', $id);
      if (!$child->isResolved() && ($displayAllChoices || $child->isDoable($player))) {
        $choice = [
          'id' => $id,
          'args' => $child->getArgs(),
        ];
        $choices[$id] = $choice;
      }
    }

    if ($this->isOptional()) {
      if (count($choices) != 1 || !$choice['optionalAction'] || $choice['automaticAction']) {
        $choices[PASS] = [
          'id' => PASS,
          'description' => clienttranslate('Pass'),
          'irreversibleAction' => false,
          'args' => [],
        ];
      }
    }

    return $choices;
  }

  public function choose($childIndex, $auto = false)
  {
    $this->info['choice'] = $childIndex;
    $child = $this->children[$this->info['choice']];
    if (!$auto && !($child instanceof \PaxRenaissance\Core\Engine\LeafNode)) {
      $child->enforceMandatory();
    }
  }

  public function unchoose()
  {
    unset($this->info['choice']);
  }

  /************************
   ***** Reversibility *****
   ************************/
  public function isIrreversible($player = null)
  {
    return false;
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

  // // TODO : remove;
  // public function unresolveAction()
  // {
  //   unset($this->infos['actionResolved']);
  //   unset($this->infos['actionResolutionArgs']);
  //   unset($this->infos['optional']);
  // }

  // // Useful for scholar
  // public function getResolvedActions($types)
  // {
  //   $actions = [];
  //   if (in_array($this->getAction(), $types) && $this->isActionResolved()) {
  //     $actions[] = $this;
  //   }
  //   foreach ($this->childs as $child) {
  //     $actions = array_merge($actions, $child->getResolvedActions($types));
  //   }
  //   return $actions;
  // }

  // // Useful for Potter Ceramics
  // public function getNextSibling()
  // {
  //   $id = $this->getIndex();
  //   $childs = $this->getParent()->getChilds();
  //   return $childs[$id + 1];
  // }

  // public function enforceMandatory()
  // {
  //   $this->infos['mandatory'] = true;
  // }

  // public function isMandatory()
  // {
  //   return $this->infos['mandatory'] ?? false;
  // }
}
