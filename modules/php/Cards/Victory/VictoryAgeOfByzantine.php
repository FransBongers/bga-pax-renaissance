<?php

namespace PaxRenaissance\Cards\Victory;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Players;

class VictoryAgeOfByzantine extends \PaxRenaissance\Models\VictoryCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'VictoryAgeOfByzantine';
    $this->title = [
      ACTIVE => clienttranslate('Age of Byzantine Victory'),
      INACTIVE => clienttranslate('Byzantine Decline'),
    ];
    $this->startLocation = 'victory_ageOfByzantine';
    $this->text = [
      [
        'log' => clienttranslate('To win, you must have:'),
        'args' => [],
      ],
      [
        'log' => clienttranslate('(1) More Empire Squares on their King side (whether Suzerains or Vassals) in your Tableau than eash opponent.'),
        'args' => [],
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
        'log' => clienttranslate('(2) More Prestige of the Religion with the most Theocracies in your Tableau than each opponent.'),
        'args' => []
      ],

    ];
  }

  public function canBeDeclaredByPlayer($activePlayer)
  {
    if (!$this->isActive()) {
      return false;
    }

    $religionWithMostTheocracies = $this->getReligionWithMostTheocracies();

    if ($religionWithMostTheocracies === null) {
      return false;
    }
    $players = Players::getAll()->toArray();

    if (!$this->playerHasMostKingCards($players, $activePlayer)) {
      return false;
    }

    return $this->playerHasMostPrestige($players, $activePlayer, $religionWithMostTheocracies);
  }

  private function playerHasMostPrestige($players, $activePlayer, $religion)
  {
    $prestigeRanking = [];
    foreach ($players as $player) {
      $prestige = $player->getPrestige(true)[$religion];

      $prestigeRanking[] = [
        'playerId' => $player->getId(),
        'prestige' => $prestige,
      ];
    }

    usort($prestigeRanking, function ($a, $b) {
      return $b['prestige'] - $a['prestige'];
    });

    return $prestigeRanking[0]['playerId'] === $activePlayer->getId() && $prestigeRanking[0]['prestige'] > $prestigeRanking[1]['prestige'];
  }

  private function getReligionWithMostTheocracies()
  {
    $religions = Globals::getEmpireReligions();
    $theocracies = [
      CATHOLIC => [
        'id' => CATHOLIC,
        'count' => 0,
      ],
      ISLAMIC => [
        'id' => ISLAMIC,
        'count' => 0,
      ],
      REFORMIST => [
        'id' => REFORMIST,
        'count' => 0,
      ],
    ];
    foreach ($religions as $empireId => $religion) {
      if ($religion === MEDIEVAL) {
        continue;
      }
      $theocracies[$religion]['count'] = $theocracies[$religion]['count'] + 1;
    }
    $ranking = array_values($theocracies);
    usort($ranking, function ($a, $b) {
      return $b['count'] - $a['count'];
    });
    return $ranking[0]['count'] > $ranking[1]['count'] ? $ranking[0]['id'] : null;
  }

  private function playerHasMostKingCards($players, $activePlayer)
  {
    $requiredDifference = 1;

    $kingRanking = array_map(function ($player) {
      $numberOfKings = count(Utils::filter($player->getTableauCards(), function ($cardInTableau) {
        return $cardInTableau->getType() === EMPIRE_CARD && $cardInTableau->getSide() === KING;
      }));
      return [
        'playerId' => $player->getId(),
        'numberOfKings' => $numberOfKings,
      ];
    }, $players);
    usort($kingRanking, function ($a, $b) {
      return $b['numberOfKings'] - $a['numberOfKings'];
    });

    return $kingRanking[0]['playerId'] === $activePlayer->getId() && $kingRanking[0]['numberOfKings'] - $kingRanking[1]['numberOfKings'] >= $requiredDifference;
  }
}
