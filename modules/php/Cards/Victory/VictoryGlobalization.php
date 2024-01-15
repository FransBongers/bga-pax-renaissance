<?php

namespace PaxRenaissance\Cards\Victory;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Players;
use PaxRenaissance\Managers\Tokens;

class VictoryGlobalization extends \PaxRenaissance\Models\VictoryCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'VictoryGlobalization';
    $this->title = [
      ACTIVE => clienttranslate('Globalization Victory'),
      INACTIVE => clienttranslate('The Galley Age'),
    ];
    $this->startLocation = 'victory_globalization';
    $this->text = [
      [
        'log' => clienttranslate('To win, you must have:'),
        'args' => [],
      ],
      [
        'log' => clienttranslate('(1) More ${tkn_prestige} in your Tableau than each opponent.'),
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
        'log' => clienttranslate('(2) At least two more Concessions than each opponent.'),
        'args' => []
      ],
    ];
  }

  public function canBeDeclaredByPlayer($activePlayer)
  {
    if (!$this->isActive()) {
      return false;
    }

    if (!$this->playerHasRequiredActions(SA_DECLARE_GLOBALIZATION_COSTS_TWO_ACTIONS)) {
      return false;
    }

    $players = Players::getAll()->toArray();
    $concessions = Tokens::getConcessions();

    $requiredDifference = 2;

    $concessionRanking = [];
    $discoveryPrestigeRanking = [];
    foreach ($players as $player) {
      $numberOfConcessions = count(Utils::filter($concessions, function ($concession) use ($player) {
        return $concession->getOwner()->getId() === $player->getId();
      }));

      if ($player->hasSpecialAbility(SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY)) {
        $patronPrestige = $player->getPrestige()[PATRON];
        $numberOfConcessions += $patronPrestige;
      }

      $discoveryPrestige = $player->getPrestige(true)[DISCOVERY];

      $concessionRanking[] = [
        'playerId' => $player->getId(),
        'numberOfConcessions' => $numberOfConcessions,
      ];
      $discoveryPrestigeRanking[] = [
        'playerId' => $player->getId(),
        'discoveryPrestige' => $discoveryPrestige,
      ];
    }

    usort($concessionRanking, function ($a, $b) {
      return $b['numberOfConcessions'] - $a['numberOfConcessions'];
    });
    usort($discoveryPrestigeRanking, function ($a, $b) {
      return $b['discoveryPrestige'] - $a['discoveryPrestige'];
    });

    $hasAtLeastTwoMoreConcessionsThanEachOpponent = $concessionRanking[0]['playerId'] === $activePlayer->getId() && $concessionRanking[0]['numberOfConcessions'] - $concessionRanking[1]['numberOfConcessions'] >= $requiredDifference;
    $hasMoreDiscoveryPrestigeThanEachOpponent = $discoveryPrestigeRanking[0]['playerId'] === $activePlayer->getId() && $discoveryPrestigeRanking[0]['discoveryPrestige'] > $discoveryPrestigeRanking[1]['discoveryPrestige'];
    return $hasAtLeastTwoMoreConcessionsThanEachOpponent && $hasMoreDiscoveryPrestigeThanEachOpponent;
  }
}
