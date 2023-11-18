<?php
namespace PaxRenaissance\Actions;
// use PaxRenaissance\Managers\Meeples;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\ActionCards;
use PaxRenaissance\Core\Engine;
use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Stats;
use PaxRenaissance\Helpers\Utils;

class PlayCard extends \PaxRenaissance\Models\AtomicAction
{
  public function getState()
  {
    return ST_PLAY_CARD;
  }

  public function getDescription()
  {
    return clienttranslate('Choose an action');
  }

  public function isOptional()
  {
    return true;// $this->isMultiplier();
  }

  public function isDoable($player)
  {
    return true;
  }


  public function argsPlayCard()
  {
    // $player = Players::getActive();
    // $isHypnosis = $this->isHypnosis();
    // $forcedCardId = $this->getCtxArg('cardId');
    // $forcedStrength = $this->getCtxArg('strength');
    // $canGainXToken = $this->getCtxArg('canGainXToken') ?? true;

    // What action cards are we talking about
    // if ($isHypnosis) {
    //   $cards = ActionCards::getMany($this->getCtxArg('hypnosisCards'));
    // } elseif (!is_null($forcedCardId)) {
    //   // This case is used for Multiplier and animal effect Action
    //   $cards = ActionCards::getMany([$forcedCardId]);
    // } else {
    //   $cards = $player->getActionCards();
    // }

    // Return possible actions
    $data = [
      'cardsToPlay' => [],
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

  public function actPlayCard($cardId, $strength)
  {
    self::checkAction('actChooseActionCard');
    $player = Players::getActive();

    // Perform actions insert any child flows


    // $args = $this->argsChooseActionCard();
    // $isHypnosis = $this->isHypnosis();

    // if (!isset($args['cards'][$cardId])) {
    //   throw new \BgaVisibleSystemException('Card action not doable. Should not happen');
    // }
    // if (!array_key_exists($strength, $args['cards'][$cardId])) {
    //   throw new \BgaVisibleSystemException('You cannot play that card at that strength. Should not happen');
    // }

    // // Activate the card
    // $card = ActionCards::get($cardId);
    // $card->setStatus(1);
    // if ($isHypnosis) {
    //   Globals::setEffectHypnosis($cardId);
    // }
    // Globals::setVenomTriggered(true);

    // // if Strength = 0, gain XToken
    // if ($strength == 0) {
    //   // TODO: if multiplier must take XToken again if previously used
    //   $meeples = [];
    //   if ($player->countXTokens() >= 5) {
    //     throw new \BgaVisibleSystemException('You cannot earn more Xtoken. Should not happen');
    //   }
    //   $player->incXToken(1);
    //   Stats::incXTokenGainedInsteadOfAction($player, 1);
    // }
    // // Otherwise, pay tokens if Needed
    // else {
    //   $tokens = $args['cards'][$cardId][$strength];
    //   if ($tokens > 0) {
    //     $player->payXToken($tokens, true, clienttranslate('increasing card strength'));
    //   }

    //   // Notify
    //   Notifications::chooseCard($player, $card, $strength, $tokens);

    //   // Do action
    //   $flow = $card->getTaggedFlow($player, $strength);
    //   $this->insertAsChild($flow);

    //   $methodName = 'incAction' . $card->getName();
    //   Stats::$methodName($player);
    // }

    // // VENOM : if the card has a Venom token, tag it as used (for cleanup purpose)
    // if (!$isHypnosis && count($card->getMeeplesOnIt(VENOM)) > 0) {
    //   Globals::setUsedVenom(true);
    // }

    // // USE MULTIPLIER
    // if ($this->isMultiplier()) {
    //   $meepleId = $this->getCtxArg('meepleId');
    //   $meeple = Meeples::destroy($meepleId);
    //   Notifications::useMultiplier($player, $meeple);
    //   $this->resolveAction(['card' => $cardId, 'strength' => $strength]);
    //   return;
    // }

    // // DUPLICATE ACTION IF THERE ARE MULTIPLIERS
    // $multipliers = $card->getMeeplesOnIt(MULTIPLIER, ACTIVE);
    // if (!$isHypnosis && $multipliers->count() > 0) {
    //   foreach ($multipliers as $meeple) {
    //     $this->insertAsChild([
    //       'action' => CHOOSE_ACTION_CARD,
    //       'pId' => $player->getId(),
    //       'args' => ['cardId' => $card->getId(), 'strength' => $strength, 'multiplier' => true, 'meepleId' => $meeple['id']],
    //     ]);
    //   }
    // }

    // // Insert cleanup actionName
    // $this->insertAsChild([
    //   'action' => \CLEANUP,
    //   'pId' => $player->getId(),
    //   'args' => ['card' => $cardId, 'hypnosis' => $isHypnosis],
    // ]);
    $this->resolveAction(['card' => $cardId, 'strength' => $strength]);
  }
}
