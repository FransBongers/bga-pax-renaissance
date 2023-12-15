<?php

namespace PaxRenaissance\Cards\Victory;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;

class VictoryHoly extends \PaxRenaissance\Models\VictoryCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'VictoryHoly';
    $this->title = [
      ACTIVE => clienttranslate('Holy Victory'),
      INACTIVE => clienttranslate('East-West Schism'),
    ];
    $this->startLocation = 'victory_holy';
  }

  public function canBeDeclaredByPlayer($activePlayer)
  {

    if (!$this->isActive()) {
      return false;
    }
    $supremeReligion = $this->getSupremeReligion();
    if ($supremeReligion === null) {
      return false;
    }

    $players = Players::getAll()->toArray();

    $supremeReligionRanking = [];
    foreach ($players as $player) {

      $supremeReligionPrestige = $player->getPrestige()[$supremeReligion];

      $supremeReligionRanking[] = [
        'playerId' => $player->getId(),
        'supremeReligionPrestige' => $supremeReligionPrestige,
      ];
    }

    usort($supremeReligionRanking, function ($a, $b) {
      return $b['supremeReligionPrestige'] - $a['supremeReligionPrestige'];
    });

    
    $hasMorePrestigeThanEachOpponent = $supremeReligionRanking[0]['playerId'] === $activePlayer->getId() && $supremeReligionRanking[0]['supremeReligionPrestige'] > $supremeReligionRanking[1]['supremeReligionPrestige'];
    return $hasMorePrestigeThanEachOpponent;
  }

  /**
   * A religion is the supreme religion if it has both
   * - More bishops of its color in Tableax or Thrones than both other religions combined
   * - More Tokens of (Knights, Rooks, and Pirates) of its color in play in its Theocracies than both other religions combined. 
   * Count only unrepressed Tokens whose color matches the Theocracy they live in.
   *  
   */
  private function getSupremeReligion()
  {

    /**
     * Bishops in play
     */
    $numberOfBishopsInPlay = [
      CATHOLIC => 0,
      ISLAMIC => 0,
      REFORMIST => 0,
    ];
    $bishopsInPlay = Tokens::getBishopsInPlay();
    // Notifications::log('bishopsInPlay', $bishopsInPlay);

    foreach($bishopsInPlay as $bishop) {
      $religion = $bishop->getSeparator();
      $numberOfBishopsInPlay[$religion] = $numberOfBishopsInPlay[$religion] + 1;
    }

    $numberOfBishopsInPlayRanking = [];
    foreach ($numberOfBishopsInPlay as $religion => $numberOfBishops) {
      $numberOfBishopsInPlayRanking[] = [
        'religion' => $religion,
        'numberOfBishops' => $numberOfBishops
      ];
    }
    usort($numberOfBishopsInPlayRanking, function ($a, $b) {
      return $b['numberOfBishops'] - $a['numberOfBishops'];
    });
    // Notifications::log('numberOfBishopsInPlayRanking', $numberOfBishopsInPlayRanking);

    $supremeReligionBishopsInPlay = null;
    if ($numberOfBishopsInPlayRanking[0]['numberOfBishops'] > $numberOfBishopsInPlayRanking[1]['numberOfBishops'] + $numberOfBishopsInPlayRanking[2]['numberOfBishops']) {
      $supremeReligionBishopsInPlay = $numberOfBishopsInPlayRanking[0]['religion'];
    }
    // Notifications::log('supremeReligionBishopsInPlay', $supremeReligionBishopsInPlay);

    if ($supremeReligionBishopsInPlay === null) {
      return null;
    }

    /**
     * Tokens in theocracies
     */
    $numberOfTokensInTheocracies = [
      CATHOLIC => 0,
      ISLAMIC => 0,
      REFORMIST => 0,
    ];

    $empires = Empires::getAll();
    foreach ($empires as $empire) {
      $empireReligion = $empire->getReligion();
      if ($empireReligion === MEDIEVAL) {
        continue;
      }

      $cities = $empire->getCities();
      foreach ($cities as $city) {
        $token = $city->getToken();
        if ($token !== null && $token->getSeparator() === $empireReligion) {
          $numberOfTokensInTheocracies[$empireReligion] = $numberOfTokensInTheocracies[$empireReligion] + 1;
        }
      }

      $borders = $empire->getBorders();
      foreach ($borders as $border) {
        $token = $border->getToken();
        if ($token !== null && $token->getSeparator() === $empireReligion) {
          $numberOfTokensInTheocracies[$empireReligion] = $numberOfTokensInTheocracies[$empireReligion] + 1;
        }
      }
    }

    $tokensInTheocraciesRanking = [];
    foreach ($numberOfTokensInTheocracies as $religion => $numberOfTokens) {
      $tokensInTheocraciesRanking[] = [
        'religion' => $religion,
        'numberOfTokens' => $numberOfTokens
      ];
    }
    usort($tokensInTheocraciesRanking, function ($a, $b) {
      return $b['numberOfTokens'] - $a['numberOfTokens'];
    });
    // Notifications::log('tokensInTheocraciesRanking', $tokensInTheocraciesRanking);
    $supremeReligionsTokensInTheocracies = null;
    if ($tokensInTheocraciesRanking[0]['numberOfTokens'] > $tokensInTheocraciesRanking[1]['numberOfTokens'] + $tokensInTheocraciesRanking[2]['numberOfTokens']) {
      $supremeReligionsTokensInTheocracies = $tokensInTheocraciesRanking[0]['religion'];
    }

    if ($supremeReligionsTokensInTheocracies !== null && $supremeReligionsTokensInTheocracies === $supremeReligionBishopsInPlay) {
      return $supremeReligionsTokensInTheocracies;
    }
    return null;

  }
}
