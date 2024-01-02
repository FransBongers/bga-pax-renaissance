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
  }

  public function canBeDeclaredByPlayer($activePlayer)
  {
    if (!$this->isActive()) {
      return false;
    }
    $players = Players::getAll()->toArray();
    
    $requiredDifference = 2;

    $republicRanking = [];
    $lawPrestigeRanking = [];
    foreach ($players as $player) {
      $numberOfRepublics = count(Utils::filter($player->getTableauCards(), function ($cardInTableau) {
        return $cardInTableau->getType() === EMPIRE_CARD && $cardInTableau->getSide() === REPUBLIC;
      }));

      if ($player->hasSpecialAbility(SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_1)) {
        $numberOfRepublics += 1;
      }
      if ($player->getId() === $activePlayer->getId() && $player->hasSpecialAbility(SA_CARD_COUNTS_AS_REPUBLIC_FOR_YOUR_RENAISSANCE_VICTORY_1)) {
        $numberOfRepublics += 1;
      }
      
      $lawPrestige = $player->getPrestige(true)[LAW];

      $republicRanking[] = [
        'playerId' => $player->getId(),
        'numberOfRepublics' => $numberOfRepublics,
      ];
      $lawPrestigeRanking[] = [
        'playerId' => $player->getId(),
        'lawPrestige' => $lawPrestige,
      ];
    }

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
}
