<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\Flows;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\TableauOps;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Models\Border;

class TableauOpSiege extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_TABLEAU_OP_SIEGE;
  }

  // ..######..########....###....########.########
  // .##....##....##......##.##......##....##......
  // .##..........##.....##...##.....##....##......
  // ..######.....##....##.....##....##....######..
  // .......##....##....#########....##....##......
  // .##....##....##....##.....##....##....##......
  // ..######.....##....##.....##....##....########

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function stTableauOpSiege()
  {

  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsTableauOpSiege()
  {
    $info = $this->ctx->getInfo();
    $tableauOpId = $info['tableauOpId'];

    $tableauOp = TableauOps::get($tableauOpId);
    $cardId = $info['cardId']; 

    $data = [
      'tokens' => $tableauOp->getOptions(Cards::get($cardId)),
    ];

    return $data;
  }

  //  .########..##..........###....##....##.########.########.
  //  .##.....##.##.........##.##....##..##..##.......##.....##
  //  .##.....##.##........##...##....####...##.......##.....##
  //  .########..##.......##.....##....##....######...########.
  //  .##........##.......#########....##....##.......##...##..
  //  .##........##.......##.....##....##....##.......##....##.
  //  .##........########.##.....##....##....########.##.....##

  // ....###.....######..########.####..#######..##....##
  // ...##.##...##....##....##.....##..##.....##.###...##
  // ..##...##..##..........##.....##..##.....##.####..##
  // .##.....##.##..........##.....##..##.....##.##.##.##
  // .#########.##..........##.....##..##.....##.##..####
  // .##.....##.##....##....##.....##..##.....##.##...###
  // .##.....##..######.....##....####..#######..##....##

  public function actTableauOpSiege($args)
  {
    self::checkAction('actTableauOpSiege');

    $info = $this->ctx->getInfo();
    $tableauOpId = $info['tableauOpId'];

    $tableauOp = TableauOps::get($tableauOpId);
    $cardId = $info['cardId']; 

    
    $options = $tableauOp->getOptions(Cards::get($cardId));
    
    $tokenId = $args['tokenId'];
    
    if (!isset($options[$tokenId])) {
      throw new \feException("Not allowed to Kill selected Token");
    }

    $player = self::getPlayer();
    // $card = Cards::get($cardId);
    // $empireIds = $card->getAllEmpiresIds(false);
    // // Notifications::log('empires', $)
    // if (count($empireIds) > 1) {
    //   throw new \feException("Multiple empires to select from. Please create a bug report.");
    // }

    $token = Tokens::get($tokenId);
    // $empireId = $empireIds[0];

    $token->returnToSupply(KILL, $player);
    
    $this->resolveAction($args);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

}
