<?php
namespace PaxRenaissance\Cards\Tableau;

class PREN019_GoldCoastMonopoly extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN019_GoldCoastMonopoly';
    $this->agents = [
      'number' => 1,
      'religion' => null,
      'type' => PAWN,
    ];
    $this->empire = PORTUGAL;
    $this->flavorText = [
      clienttranslate('In 1469 the king of Portugal granted Fernão Gomes a royal monopoly of trade in gold and guinea pepper (a pepper substitute).'),
      clienttranslate("In return, Gomes was to pay 300,000 reais/year, plus explore 100 leagues of the coast of Africa each year for five years. Thus one tenth the world's gold supply fell into his hands.")
    ];
    $this->name = clienttranslate('Gold Coast Monopoly');
    $this->oneShot = TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT;
    $this->region = WEST;
  }
}
