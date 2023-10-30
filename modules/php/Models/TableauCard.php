<?php
namespace PaxRenaissance\Models;

class TableauCard extends Card
{
  // protected $type = \CARD_ANIMAL;
  protected $id;
  protected $name;
  protected $region;
  protected $type;

  protected $staticAttributes = [
    'name',
    'region',
    'type',
  ];


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
