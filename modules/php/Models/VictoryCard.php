<?php

namespace PaxRenaissance\Models;

use PaxRenaissance\Core\Engine;
use PaxRenaissance\Managers\Players;

class VictoryCard extends Card
{
  protected $type = VICTORY_CARD;
  protected $id;
  protected $startLocation;
  protected $title;
  protected $text;

  protected $staticAttributes = [
    'startLocation',
    'title',
    'type',
    'text',
  ];

  public function canBeDeclaredByPlayer($player)
  {
    return false;
  }

  public function isActive()
  {
    return $this->getExtraData('active');
  }

  public function setActive()
  {
    return $this->setExtraData('active', true);
  }

  public function getTitle($side = null)
  {
    if ($side !== null) {
      return $this->title[$side];
    }
    if ($this->isActive()) {
      return $this->title[ACTIVE];
    }
    return $this->title[INACTIVE];
  }

  public function jsonSerialize()
  {
    $data = parent::jsonSerialize();

    return array_merge($data, [
      'side' => $this->isActive() ? ACTIVE : INACTIVE,
      ACTIVE => [
        'title' => $this->title[ACTIVE],
      ],
      INACTIVE => [
        'title' => $this->title[INACTIVE],
      ],
      'type' => $this->type,
      'text' => $this->text,
    ]);
  }

  /**
   * Use to check all abilities that increase number of actions needed
   * to declare victory to 2
   */
  public function playerHasRequiredActions($specialAbilityId)
  {
    $abilityIsInPlay = Players::anyPlayerHasSpecialAbility($specialAbilityId);
    if (!$abilityIsInPlay) {
      return true;
    }
    // We need to add DECLARE_VICTORY because when taking the action the PLAYER_ACTION will be marked as resolved.
    if ($abilityIsInPlay && count(Engine::getUnresolvedActions([PLAYER_ACTION, DECLARE_VICTORY])) < 2) {
      return false;
    }

    return true;
  }
}
