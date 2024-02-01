<?php
namespace PaxRenaissance\Cards\Victory;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Players;

class VictoryRenaissance extends \PaxRenaissance\Models\VictoryCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'VictoryRenaissance';
    $this->title = [
      ACTIVE =>clienttranslate('Renaissance Victory'),
      INACTIVE => clienttranslate('The Medieval Age'),
    ];
    $this->startLocation = 'victory_renaissance';
    $this->text = [
      [
        'log' => clienttranslate('To win, you must have:'),
        'args' => [],
      ],
      [
        'log' => clienttranslate('(1) More Republics than each opponent.'),
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
        'log' => clienttranslate('(2) At least two more ${tkn_prestige} than each opponent.'),
        'args' => [
          'tkn_prestige' => LAW,
        ]
      ],
    ];
    // $this->text = [
    //   [
    //     'log' => clienttranslate('To win, have:'),
    //     'args' => [],
    //   ],
    //   [
    //     'log' => clienttranslate('- More Republics, AND.'),
    //     'args' => []
    //   ],
    //   [
    //     'log' => clienttranslate('- 2+ More ${tkn_prestige} than each opponent.'),
    //     'args' => [
    //       'tkn_prestige' => LAW,
    //     ],
    //   ],
    // ];
  }

  public function canBeDeclaredByPlayer($activePlayer)
  {
    if (!$this->isActive()) {
      return false;
    }
    $players = Players::getAll()->toArray();
    
    $requiredDifference = 2;

    $republicRanking = $this->getNumberOfRepublicsPerPlayer($players);
    $lawPrestigeRanking = $this->getLawPrestigePerPlayer($players);


    usort($republicRanking, function ($a, $b) {
      return $b['numberOfRepublics'] - $a['numberOfRepublics'];
    });
    usort($lawPrestigeRanking, function ($a, $b) {
      return $b['lawPrestige'] - $a['lawPrestige'];
    });

    $hasAtLeastTwoMoreLawPrestigeThanEachOpponent = $lawPrestigeRanking[0]['playerId'] === $activePlayer->getId() && $lawPrestigeRanking[0]['lawPrestige'] - $lawPrestigeRanking[1]['lawPrestige'] >= $requiredDifference;
    $hasMoreRepublicsThanEachOpponent = $republicRanking[0]['playerId'] === $activePlayer->getId() && $republicRanking[0]['numberOfRepublics'] > $republicRanking[1]['numberOfRepublics'];
    return $hasAtLeastTwoMoreLawPrestigeThanEachOpponent && $hasMoreRepublicsThanEachOpponent;
  }

  public function getLawPrestigePerPlayer($players)
  {
    $lawPrestigeRanking = [];

    foreach ($players as $player) {
      $lawPrestige = $player->getPrestige(true)[LAW];

      if ($player->hasSpecialAbility(SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_1)) {
        $patronPrestige = $player->getPrestige()[PATRON];
        $lawPrestige += $patronPrestige;
      }
      if ($player->hasSpecialAbility(SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_2)) {
        $patronPrestige = $player->getPrestige()[PATRON];
        $lawPrestige += $patronPrestige;
      }
      if ($player->hasSpecialAbility(SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_3)) {
        $patronPrestige = $player->getPrestige()[PATRON];
        $lawPrestige += $patronPrestige;
      }

      $lawPrestigeRanking[] = [
        'playerId' => $player->getId(),
        'lawPrestige' => $lawPrestige,
      ];
    }

    return $lawPrestigeRanking;
  }

  public function getNumberOfRepublicsPerPlayer($players)
  {
    $republicRanking = [];

    foreach ($players as $player) {
      $numberOfRepublics = count(Utils::filter($player->getTableauCards(), function ($cardInTableau) {
        return $cardInTableau->getType() === EMPIRE_CARD && $cardInTableau->getSide() === REPUBLIC;
      }));

      if ($player->hasSpecialAbility(SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_1)) {
        $numberOfRepublics += 1;
      }
      if ($player->hasSpecialAbility(SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_2)) {
        $numberOfRepublics += 1;
      }
      
      $republicRanking[] = [
        'playerId' => $player->getId(),
        'numberOfRepublics' => $numberOfRepublics,
      ];
    }

    return $republicRanking;
  }
}
