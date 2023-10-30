<?php
namespace PaxRenaissance\Models;

class EmpireCard extends Card
{
  protected $type = EMPIRE_CARD;
  protected $id;
  protected $nameKing;
  protected $nameRepublic;
  protected $startLocation;
    
  protected $staticAttributes = [
    'nameKing',
    'nameRepublic',
    'startLocation',
    'type',
  ];
}
