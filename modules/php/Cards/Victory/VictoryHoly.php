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
    $this->text = [
      [
        'log' => clienttranslate('To win, you must have:'),
        'args' => [],
      ],
      [
        'log' => clienttranslate('More Prestige of the Supreme religion in your Tableau than each opponent.'),
        'args' => [
          'tkn_prestige' => DISCOVERY,
        ],
      ],
      [
        'log' => clienttranslate('${tkn_newLine}'),
        'args' => [
          'tkn_newLine' => '<br>'
        ]
      ],
      [
        'log' => clienttranslate('A Religion achieves supremacy if it has both:'),
        'args' => []
      ],
      [
        'log' => clienttranslate('(1) More Bishop Tokens of its color in Tableaux or Thrones than both other religions combined.'),
        'args' => [
          'tkn_prestige' => LAW,
        ]
      ],
      [
        'log' => clienttranslate('${tkn_newLine}'),
        'args' => [
          'tkn_newLine' => '<br>'
        ]
      ],
      [
        'log' => clienttranslate('<b>and</b>'),
        'args' => []
      ],
      [
        'log' => clienttranslate('${tkn_newLine}'),
        'args' => [
          'tkn_newLine' => '<br>'
        ]
      ],
      [
        'log' => clienttranslate('(2) More Tokens of its color in play in its Theocracies then the combined number of Tokens both other religions have of their color in their respective Theocracies.'),
        'args' => []
      ],
    ];
    // $this->text = [
    //   [
    //     'log' => clienttranslate('To win, have:'),
    //     'args' => [],
    //   ],
    //   [
    //     'log' => clienttranslate('more Prestige in the supreme religion than each opponent.'),
    //     'args' => [],
    //   ],
    //   [
    //     'log' => clienttranslate('Supreme Religion ='),
    //     'args' => [],
    //   ],
    //   [
    //     'log' => clienttranslate('- more Bishops of its color, AND'),
    //     'args' => []
    //   ],
    //   [
    //     'log' => clienttranslate('- more Tokens of its color on Theocracies,'),
    //     'args' => []
    //   ],
    //   [
    //     'log' => clienttranslate('than both other religions combined.'),
    //     'args' => []
    //   ],
    // ];
  }

  public function canBeDeclaredByPlayer($activePlayer)
  {
    if (!$this->isActive()) {
      return false;
    }

    if (!$this->playerHasRequiredActions(SA_DECLARE_HOLY_COSTS_TWO_ACTIONS)) {
      return false;
    }

    $supremeReligion = $this->getSupremeReligion();
    if ($supremeReligion === null) {
      return false;
    }

    $players = Players::getAll()->toArray();

    $supremeReligionRanking = [];
    foreach ($players as $player) {

      $supremeReligionPrestige = $player->getPrestige(true)[$supremeReligion];

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

  public function getSupremeReligionCounts()
  {
    $greenPiratesReformist = Players::anyPlayerHasSpecialAbility(SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS);
    return [
      'bishops' => $this->getNumberOfBishopsInPlay($greenPiratesReformist),
      'tokens' => $this->getNumberOfTokensInTheocracies($greenPiratesReformist),
    ];
  }

  /**
   * A religion is the supreme religion if it has both
   * - More bishops of its color in Tableax or Thrones than both other religions combined
   * - More Tokens of (Knights, Rooks, and Pirates) of its color in play in its Theocracies than both other religions combined. 
   * Count only unrepressed Tokens whose color matches the Theocracy they live in.
   *  
   */
  public function getSupremeReligion()
  {

    $greenPiratesReformist = Players::anyPlayerHasSpecialAbility(SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS);

    // /**
    //  * Bishops in play
    //  */
    $numberOfBishopsInPlay = $this->getNumberOfBishopsInPlay($greenPiratesReformist);

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

    $supremeReligionBishopsInPlay = null;
    if ($numberOfBishopsInPlayRanking[0]['numberOfBishops'] > $numberOfBishopsInPlayRanking[1]['numberOfBishops'] + $numberOfBishopsInPlayRanking[2]['numberOfBishops']) {
      $supremeReligionBishopsInPlay = $numberOfBishopsInPlayRanking[0]['religion'];
    }

    if ($supremeReligionBishopsInPlay === null) {
      return null;
    }

    // /**
    //  * Tokens in theocracies
    //  */

    $numberOfTokensInTheocracies = $this->getNumberOfTokensInTheocracies($greenPiratesReformist);

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

    $supremeReligionsTokensInTheocracies = null;
    if ($tokensInTheocraciesRanking[0]['numberOfTokens'] > $tokensInTheocraciesRanking[1]['numberOfTokens'] + $tokensInTheocraciesRanking[2]['numberOfTokens']) {
      $supremeReligionsTokensInTheocracies = $tokensInTheocraciesRanking[0]['religion'];
    }

    if ($supremeReligionsTokensInTheocracies !== null && $supremeReligionsTokensInTheocracies === $supremeReligionBishopsInPlay) {
      return $supremeReligionsTokensInTheocracies;
    }
    return null;
  }

  private function getNumberOfBishopsInPlay($greenPiratesReformist)
  {
    // $greenPiratesReformist = Players::anyPlayerHasSpecialAbility(SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS);

    /**
     * Bishops in play
     */
    $numberOfBishopsInPlay = [
      CATHOLIC => 0,
      ISLAMIC => 0,
      REFORMIST => 0,
    ];
    $bishopsInPlay = Tokens::getBishopsInPlay();

    foreach ($bishopsInPlay as $bishop) {
      $religion = $bishop->getSeparator();
      $numberOfBishopsInPlay[$religion] = $numberOfBishopsInPlay[$religion] + 1;
    }

    if ($greenPiratesReformist) {
      $greenPirates = Tokens::getOfTypeInLocation('pirate_islamic_', 'border_');
      $numberOfBishopsInPlay[REFORMIST] = $numberOfBishopsInPlay[REFORMIST] + count($greenPirates);
    }

    $playerCountsPatronAsGreenBishops = Players::getPlayerWithSpecialAbility(SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY);
    if ($playerCountsPatronAsGreenBishops !== null) {
      $patronPrestige = $playerCountsPatronAsGreenBishops->getPrestige()[PATRON];
      $numberOfBishopsInPlay[ISLAMIC] = $numberOfBishopsInPlay[ISLAMIC] + $patronPrestige;
    }

    return $numberOfBishopsInPlay;

    // return $numberOfBishopsInPlayRanking;
  }

  private function getNumberOfTokensInTheocracies($greenPiratesReformist)
  {
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
        $tokens = $border->getTokens();

        foreach ($tokens as $token) {
          if ($token->getSeparator() === $empireReligion) {
            $numberOfTokensInTheocracies[$empireReligion] = $numberOfTokensInTheocracies[$empireReligion] + 1;
          }
          if ($greenPiratesReformist && $empireReligion === REFORMIST && $token->getSeparator() === ISLAMIC) {
            $numberOfTokensInTheocracies[$empireReligion] = $numberOfTokensInTheocracies[$empireReligion] + 1;
          }
        }
      }
    }
    return $numberOfTokensInTheocracies;
  }
}
