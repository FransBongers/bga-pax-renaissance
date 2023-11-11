<?php
namespace PaxRenaissance\Models;

class TableauCard extends Card
{
  protected $type = TABLEAU_CARD;
  protected $id;
  protected $flavorText = [];
  protected $name;
  protected $region;
  
  protected $staticAttributes = [
    'flavorText',
    'name',
    'region',
    'type',
  ];

  public function jsonSerialize()
  {
    $data = parent::jsonSerialize();
    
    return array_merge($data,[
      'flavorText' => $this->flavorText,
      'name' => $this->name,
      'region' => $this->region,
      'type' => $this->type,
    ]);
  }

  // public function getIcons()
  // {
  //   return array_merge(
  //     array_count_values($this->getCategories()),
  //     array_count_values($this->getContinents()),
  //     $this->getEnclosureRequirements()
  //   );
  // }

  // public function getBuyCost($player)
  // {
  //   $cost = parent::getBuyCost($player);
  //   if ($player->hasPlayedCard('S229_ExpertInSmallAnimals') && $this->isSmall()) {
  //     $cost -= 3;
  //   }
  //   if ($player->hasPlayedCard('S230_ExpertInLargeAnimals') && $this->isLarge()) {
  //     $cost -= 4;
  //   }

  //   return max($cost, 0);
  // }
}
