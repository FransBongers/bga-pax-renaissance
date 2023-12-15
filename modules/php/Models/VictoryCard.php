<?php

namespace PaxRenaissance\Models;

class VictoryCard extends Card
{
  protected $type = VICTORY_CARD;
  protected $id;
  protected $startLocation;
  protected $title;

  protected $staticAttributes = [
    'startLocation',
    'title',
    'type',
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
    ]);
  }
}
