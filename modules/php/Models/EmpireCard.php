<?php
namespace PaxRenaissance\Models;

class EmpireCard extends Card
{
  protected $type = EMPIRE_CARD;
  protected $id;
  protected $empire;
  protected $nameKing;
  protected $nameRepublic;
  protected $startLocation;
    
  protected $staticAttributes = [
    'empire',
    'nameKing',
    'nameRepublic',
    'startLocation',
    'type',
  ];

  public function jsonSerialize()
  {
    $data = parent::jsonSerialize();

    return array_merge($data, [
      'empire' => $this->empire,
      'type' => $this->type,
      'nameKing' => $this->nameKing,
      'nameRepublic' => $this->nameRepublic,
    ]);
  }

  public function getEmpire()
  {
    return $this->empire;
  }

  public function getName()
  {
    // TODO: return correct based on side that is face up
    return $this->nameKing;
  }
}
