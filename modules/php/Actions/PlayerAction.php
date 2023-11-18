<?php
namespace PaxRenaissance\Actions;
// use PaxRenaissance\Managers\Meeples;
use PaxRenaissance\Managers\Market;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\ActionCards;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Engine\LeafNode;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Utils;

class PlayerAction extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_PLAYER_ACTION;
  }

  public function getDescription()
  {
    return clienttranslate('Choose an action');
  }

  public function isOptional()
  {
    return true;// $this->isMultiplier();
  }


  // public function isMultiplier()
  // {
  //   return $this->getCtxArg('multiplier') ?? false;
  // }

  public function argsPlayerAction()
  {
    $player = Players::get();
    
    // Return possible actions
    $data = [
      'remainingActions' => Globals::getRemainingActions(),
      'cardsPlayerCanPurchase' => Market::getCardsPlayerCanPurchase($player),
      // 'cards' => $cards
      //   ->map(function ($card) use ($player, $forcedStrength, $canGainXToken) {
      //     // Forced strength = 0 => must take a xtoken again
      //     if ($forcedStrength === 0) {
      //       return [0];
      //     }

      //     // Otherwise, cannot take xtoken if a forcedStrength is given
      //     $strengths = $card->getPlayableStrengths($player);
      //     if ($player->countXTokens() < 5 && is_null($forcedStrength) && $canGainXToken) {
      //       $strengths[0] = 0; // Force 0 = gain X Token
      //     }
      //     return $strengths;
      //   })
      //   ->filter(function ($card) {
      //     return !empty($card);
      //   }),
      // 'strengths' => $cards->map(function ($card) {
      //   return $card->getCurrentStrength();
      // }),
      // 'xtokens' => $player->countXTokens(),
    ];

    // if (!is_null($forcedCardId)) {
    //   $card = ActionCards::getSingle($forcedCardId);
    //   $data['descSuffix'] = 'action';
    //   $data['type'] = $card->getType();
    //   $data['i18n'][] = 'type';
    // } elseif ($isHypnosis) {
    //   $data['descSuffix'] = 'hypnosis';
    //   $data['pId'] = $this->getCtxArg('hypnosisPId');
    // }

    // $data['xtoken'] = $player->countXTokens();
    // $data['canGainXToken'] = $canGainXToken;
    return $data;
  }

  // public function actPlayerAction($cardId, $strength)
  public function actPlayerAction($args)
  {
    self::checkAction('actPlayerAction');
    Notifications::log('actPlayerAction',$args);
    Notifications::log('parent', $this->ctx->getParent()->toArray());


    $this->ctx->getParent()->pushChild(new LeafNode([
      'action' => PURCHASE_CARD,
      'pId' => $this->ctx->getPId(),
      'args' => [
        'cardId' => $args['cardId'],
      ],
    ]));
    Notifications::log('parent after', $this->ctx->getParent()->toArray());
    // self::checkAction('actChooseActionCard');
    // $player = Players::getActive();

    // Perform actions insert any child flows

    $this->resolveAction($args);
  }
}
