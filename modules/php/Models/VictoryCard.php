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
}
