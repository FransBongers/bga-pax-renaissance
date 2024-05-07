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

class TableauOpTax extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_TABLEAU_OP_TAX;
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

  public function stTableauOpTax()
  {
  }

  // ....###....########...######....######.
  // ...##.##...##.....##.##....##..##....##
  // ..##...##..##.....##.##........##......
  // .##.....##.########..##...####..######.
  // .#########.##...##...##....##........##
  // .##.....##.##....##..##....##..##....##
  // .##.....##.##.....##..######....######.

  public function argsTableauOpTax()
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

  public function actTableauOpTax($args)
  {
    self::checkAction('actTableauOpTax');

    $info = $this->ctx->getInfo();
    $tableauOpId = $info['tableauOpId'];

    $tableauOp = TableauOps::get($tableauOpId);
    $cardId = $info['cardId'];


    $options = $tableauOp->getOptions(Cards::get($cardId));

    $tokenId = $args['tokenId'];

    if (!isset($options[$tokenId])) {
      throw new \feException("Not allowed to Tax selected Token");
    }

    $empireId = $args['empireId'];
    $empire = Utils::array_find($options[$tokenId]['empires'], function ($optionEmpire) use ($empireId) {
      return $optionEmpire->getId() === $empireId;
    });

    if ($empire === null) {
      throw new \feException("Not allowed to Tax in selected Empire");
    }

    $token = $options[$tokenId]['token'];
    $owner = $token->getOwner();
    $ownerId = $owner->getId();
    $player = self::getPlayer();

    Notifications::tableauOpTax($player, $token, $empire);

    // $this->ctx->getParent()->pushChild(new LeafNode([
    //   'action' => TABLEAU_OP_TAX_FLORINS_CHECK,
    //   // 'playerId' => $player->getId(),
    //   // 'ownerId' => $ownerId,
    //   'playerId' => $ownerId,
    //   'empireId' => $empireId,
    //   'tokenId' => $tokenId,
    // ]));


    // $this->ctx->getParent()->pushChild(Engine::buildTree(Flows::placeLevy($empireId, $ownerId)));

    $this->ctx->getParent()->pushChild(new LeafNode([
      'action' => TABLEAU_OP_TAX_AUTO_CHECK,
      'playerId' => $player->getId(),
      'taxedPlayerId' => $ownerId,
      'empireId' => $empireId,
      'tokenId' => $tokenId,
    ]));

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
