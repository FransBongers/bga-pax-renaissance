<?php

namespace PaxRenaissance\Cards\Victory;

use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Helpers\Utils;
use PaxRenaissance\Managers\Players;

class VictoryImperial extends \PaxRenaissance\Models\VictoryCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'VictoryImperial';
    $this->title = [
      ACTIVE => clienttranslate('Imperial Victory'),
      INACTIVE => clienttranslate('Age of Feudalism'),
    ];
    $this->startLocation = 'victory_imperial';
    $this->text = [
      [
        'log' => clienttranslate('To win, you must have:'),
        'args' => [],
      ],
      [
        'log' => clienttranslate('At least two more Empire Squares on their King side (whether Suzerains or Vassals) in your Tableau than each opponent.'),
        'args' => [],
      ],
      [
        'log' => clienttranslate('In a 2-player game, you must have at least three more.'),
        'args' => [],
      ],
    ];
    // $this->text = [
    //   [
    //     'log' => clienttranslate('To win, have:'),
    //     'args' => [],
    //   ],
    //   [
    //     'log' => clienttranslate('- 2 or More King Cards (not Republics) than each opponent. In a 2-player game you must have 3+.'),
    //     'args' => []
    //   ],
    // ];
  }

  public function canBeDeclaredByPlayer($activePlayer)
  {
    if (!$this->isActive()) {
      return false;
    }

    if (!$this->playerHasRequiredActions(SA_DECLARE_IMPERIAL_COSTS_TWO_ACTIONS)) {
      return false;
    }

    $players = Players::getAll()->toArray();
    $numberOfPlayers = count($players);
    $requiredDifference = $numberOfPlayers === 2 ? 3 : 2;

    $ranking = array_map(function ($player) {
      $numberOfKings = count(Utils::filter($player->getTableauCards(), function ($cardInTableau) {
        return $cardInTableau->getType() === EMPIRE_CARD && $cardInTableau->getSide() === KING;
      }));
      return [
        'playerId' => $player->getId(),
        'numberOfKings' => $numberOfKings,
      ];
    }, $players);
    usort($ranking, function ($a, $b) {
      return $b['numberOfKings'] - $a['numberOfKings'];
    });
    // Notifications::log('ranking',$ranking);
    return $ranking[0]['playerId'] === $activePlayer->getId() && $ranking[0]['numberOfKings'] - $ranking[1]['numberOfKings'] >= $requiredDifference;
  }
}
