<?php

namespace PaxRenaissance\Actions;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\Flows;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Locations;
use PaxRenaissance\Helpers\OneShots;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Borders;
use PaxRenaissance\Managers\Cards;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;
use PaxRenaissance\Models\Border;
use PaxRenaissance\Models\Player;

class BattleResult extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_BATTLE_RESULT;
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

  public function stBattleResult()
  {
    $parentInfo = $this->ctx->getParent()->getInfo();

    $source = $parentInfo['source'];
    $data = $parentInfo['data'];
    $empireId = $parentInfo['empireId'];
    $player = self::getPlayer();

    $attackers = $this->getAttackers($player, $empireId, $source, $data);
    $defenders = $this->getDefenders($empireId, $source);

    $numberAttackers = count($attackers['tokens']) + count($attackers['agents']);
    $numberDefenders = count($defenders['tokens']);
    $battleVictorious = $numberAttackers > $numberDefenders;

    Notifications::battle($player, $source, Empires::get($empireId), $attackers, $defenders, $battleVictorious);

    $parent = $this->ctx->getParent();

    $parent->updateInfo('numberOfAttackers', $numberAttackers);
    $parent->updateInfo('numberOfDefenders', $numberDefenders);
    $parent->updateInfo('battleVictorious', $battleVictorious);


    $parent->updateInfo('attackers', [
      'agents' => $attackers['agents'],
      'tokens' => array_map(function ($token) {
        return $token->getId();
      }, $attackers['tokens'])
    ]);
    $parent->updateInfo('defenders', [
      'tokens' => array_map(function ($token) {
        return $token->getId();
      }, $defenders['tokens'])
    ]);

    $this->resolveInitialCasualties();

    $this->resolveAction([]);
  }

  private function resolveInitialCasualties()
  {
    $parent = $this->ctx->getParent();
    $parentInfo = $parent->getInfo();

    $attackers = $parentInfo['attackers'];
    $defenders = $parentInfo['defenders'];

    $numberAttackers = $parentInfo['numberOfAttackers'];
    $numberDefenders = $parentInfo['numberOfDefenders'];
    $battleVictorious = $parentInfo['battleVictorious'];

    $player = self::getPlayer();

    if ($battleVictorious) {
      // eliminate all defenders
      Notifications::battleEliminateDefenders();
      $this->eliminateTokens($player, $defenders['tokens']);
    } else if ($numberAttackers === $numberDefenders) {
      Notifications::battleEliminateAttackers();
      if (count($attackers['agents']) > 0) {
        Notifications::battleEliminateAgents($player, $attackers['agents']);
      }
      $this->eliminateTokens($player, $attackers['tokens']);
      // eliminate everything
      Notifications::battleEliminateDefenders();
      $this->eliminateTokens($player, $defenders['tokens']);
      // $this->resolveAction([]);
      $parent->updateInfo('numberToEliminate', 0);
      $parent->updateInfo('agentsToEliminate', []);
      $parent->updateInfo('tokensToEliminate', []);
      return;
    } else {
      // eliminate all attackers
      Notifications::battleEliminateAttackers();
      if (count($attackers['agents']) > 0) {
        Notifications::battleEliminateAgents($player, $attackers['agents']);
      }
      $this->eliminateTokens($player, $attackers['tokens']);
    }

    $parent->updateInfo('numberToEliminate', min($numberAttackers, $numberDefenders));
    $parent->updateInfo('agentsToEliminate', $battleVictorious ? $attackers['agents'] : []);
    $parent->updateInfo('tokensToEliminate', $battleVictorious ? $attackers['tokens'] : $defenders['tokens']);

    // $this->ctx->insertAsBrother(new LeafNode(
    //   [
    //     'action' => BATTLE_CASUALTIES,
    //     'playerId' => $player->getId(),
    //     'numberToEliminate' => min($numberAttackers, $numberDefenders),
    //     'agentsToEliminate' => 
    //     'tokensToEliminate' => ,
    //   ]
    // ));


    // $this->ctx->updateInfo('numberToEliminate', abs($numberAttackers - $numberDefenders));
    // $this->ctx->updateInfo('agentsToEliminate', $battleVictorious ? $attackers['agents'] : []);
    // $this->ctx->updateInfo('tokensToEliminate', $battleVictorious ? $attackers['tokens'] : $defenders['tokens']);
    // $this->ctx->updateInfo('defaultCasualtiesResolved', true);
  }


  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private function eliminateTokens($player, $tokenIds)
  {
    foreach ($tokenIds as $tokenId) {
      Tokens::get($tokenId)->returnToSupply(ELIMINATE, $player, true);
    }
  }

  public function getAttackers($player, $empireId, $source, $data)
  {
    $empire = Empires::get($empireId);

    switch ($source) {
      case CAMPAIGN_OP:
        $extraAttackers = [];
        if (in_array($empireId, EAST_EMPIRES) && $player->hasSpecialAbility(SA_REPRESSED_TOKENS_COUNTS_AS_KNIGHT_IN_EAST_CAMPAIGN)) {
          $extraAttackers = Empires::get(MAMLUK)->getRepressedTokens([KNIGHT, PAWN, ROOK]);
        };
        return [
          'agents' => [],
          'tokens' => array_merge($extraAttackers,
            Empires::get($data['attackingEmpireId'])->getTokensInCities([KNIGHT]),
          ),
        ];
      case CONSPIRACY_ONE_SHOT:
        return [
          'agents' => $this->getAgents($data['cardId'], [ROOK, KNIGHT, PIRATE, PAWN]),
          'tokens' => array_merge(
            $empire->getRepressedTokens([ROOK, KNIGHT]),
            $empire->getTokensOnBorders([PIRATE]),
          ),
        ];
      case CRUSADE_ONE_SHOT:
        $typeInAdjacentEmpires = [KNIGHT];
        if ($player->hasSpecialAbility(SA_IN_CRUSADE_COUNT_ROOKS_AS_KNIGHTS)) {
          $typeInAdjacentEmpires[] = ROOK;
        }
        return [
          'agents' => $this->getAgents($data['cardId'], [ROOK, KNIGHT, PIRATE]),
          'tokens' => array_merge(
            $empire->getTokensOnBorders([PIRATE], [CATHOLIC]),
            $empire->getTokensInCities([KNIGHT, ROOK], [CATHOLIC]),
            $empire->getTokensInAdjacentEmpires($typeInAdjacentEmpires, [CATHOLIC]),
          ),
        ];
      case JIHAD_ONE_SHOT:
        return [
          'agents' => $this->getAgents($data['cardId'], [ROOK, KNIGHT, PIRATE]),
          'tokens' => array_merge(
            $empire->getTokensOnBorders([PIRATE], [ISLAMIC]),
            $empire->getTokensInCities([KNIGHT, ROOK], [ISLAMIC]),
            $empire->getTokensInAdjacentEmpires([KNIGHT], [ISLAMIC]),
          ),
        ];
      case PEASANT_REVOLT_ONE_SHOT:
        return [
          'agents' => $this->getAgents($data['cardId'], [ROOK, KNIGHT, PIRATE, PAWN]),
          'tokens' => array_merge(
            $empire->getRepressedTokens([PAWN]),
            $empire->getTokensOnBorders([PIRATE]),
            $empire->getTokensOnBorders([PAWN], [$player->getBank()])
          ),
        ];
      case REFORMATION_ONE_SHOT:
        return [
          'agents' => $this->getAgents($data['cardId'], [ROOK, KNIGHT, PIRATE]),
          'tokens' => array_merge(
            $empire->getTokensOnBorders([PIRATE], [REFORMIST]),
            $empire->getTokensInCities([KNIGHT, ROOK], [REFORMIST]),
            $empire->getTokensInAdjacentEmpires([KNIGHT], [REFORMIST]),
          ),
        ];
      default:
        return [];
    }
  }

  public function getDefenders($empireId, $source)
  {
    $empire = Empires::get($empireId);

    switch ($source) {
      case CAMPAIGN_OP:
        return [
          'tokens' => array_merge(
            $empire->getTokensInCities([KNIGHT, ROOK]),
          ),
        ];
      case CONSPIRACY_ONE_SHOT:
        return [
          'tokens' => array_merge(
            $empire->getTokensInCities([KNIGHT, ROOK])
          ),
        ];
      case CRUSADE_ONE_SHOT:
        return [
          'tokens' => array_merge(
            $empire->getTokensOnBorders([PIRATE], [ISLAMIC, REFORMIST]),
            $empire->getTokensInCities([KNIGHT, ROOK], [ISLAMIC, REFORMIST]),
          ),
        ];
      case JIHAD_ONE_SHOT:
        return [
          'tokens' => array_merge(
            $empire->getTokensOnBorders([PIRATE], [CATHOLIC, REFORMIST]),
            $empire->getTokensInCities([KNIGHT, ROOK], [CATHOLIC, REFORMIST]),
          ),
        ];
      case PEASANT_REVOLT_ONE_SHOT:
        return [
          'tokens' => array_merge(
            $empire->getTokensInCities([KNIGHT, ROOK])
          ),
        ];
      case REFORMATION_ONE_SHOT:
        return [
          'tokens' => array_merge(
            $empire->getTokensOnBorders([PIRATE], [CATHOLIC, ISLAMIC]),
            $empire->getTokensInCities([KNIGHT, ROOK], [CATHOLIC, ISLAMIC]),
          ),
        ];
      default:
        return [];
    }
  }


  public function getAgents($cardId, $typeFilter = null, $separatorFilter = null)
  {
    $agents = Cards::get($cardId)->getAgents();

    return Utils::filter($agents, function ($agent) use ($typeFilter, $separatorFilter) {
      if ($typeFilter !== null && !in_array($agent['type'], $typeFilter)) {
        return false;
      }
      if ($separatorFilter !== null && !in_array($agent['separator'], $separatorFilter)) {
        return false;
      }
      return true;
    });
  }
}
