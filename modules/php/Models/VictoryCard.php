<?php
namespace PaxRenaissance\Models;

class VictoryCard extends Card
{
  protected $type = VICTORY_CARD;
  protected $id;
  protected $startLocation;
  protected $titleActive;
  protected $titleInactive;
  
  protected $staticAttributes = [
    'startLocation',
    'titleActive',
    'titleInactive',
    'type',
  ];

  public function jsonSerialize()
  {
    $data = parent::jsonSerialize();

    return array_merge($data, [
      'titleActive' => $this->titleActive,
      'titleInactive' => $this->titleInactive,
      'type' => $this->type,
    ]);
  }
}
