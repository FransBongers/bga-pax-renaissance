<?php

namespace PaxRenaissance\Empires;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;
use PaxRenaissance\Managers\Cities;
use PaxRenaissance\Managers\Empires;
use PaxRenaissance\Managers\Players;

class PapalStates extends \PaxRenaissance\Models\Empire
{
  public function __construct()
  {
    $this->id = PAPAL_STATES;
    $this->adjacentEmpires = [
      ARAGON,
      FRANCE,
      HOLY_ROMAN_EMIRE,
      HUNGARY,
      OTTOMAN,
    ];
    $this->adjacentBySeaBorderEmpires = [
      ARAGON,
      OTTOMAN,
    ];
    $this->empireSquareId = 'EmpireSquare_PapalStates';
    $this->name = clienttranslate('Papal States');
    $this->borders = [
      BORDER_ARAGON_PAPAL_STATES,
      BORDER_HOLY_ROMAN_EMPIRE_PAPAL_STATES,
      BORDER_OTTOMAN_PAPAL_STATES,
    ];
    $this->cities = [VENICE];
    $this->region = WEST;
  }

  public function getCities($emptyOnly = false)
  {

    if ($this->levyIsGoldKnight() && Players::anyPlayerHasSpecialAbility(SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS)) {
      $this->cities[] = VENICE_2;
    }
    return parent::getCities($emptyOnly);
  }

  public function activateCondottiere()
  {
    if ($this->levyIsGoldKnight() && Players::anyPlayerHasSpecialAbility(SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS)) {
      Notifications::activateAbility(SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS);
    }
  }

  public function changeToTheocracy($religion) {
    $oldReligion = Globals::getEmpireReligions()[PAPAL_STATES];

    parent::changeToTheocracy($religion);
    if (($religion === CATHOLIC || $religion === MEDIEVAL) && ($oldReligion === ISLAMIC || $oldReligion === REFORMIST)) {
      $this->activateCondottiere();
    } else if (($religion === ISLAMIC || $religion === REFORMIST) && ($oldReligion === CATHOLIC || $oldReligion === MEDIEVAL)) {
      $this->deactivateCondottiere();
    }
  }

  public function changeToMedievalState($player) {
    parent::changeToMedievalState($player);
    $this->activateCondottiere();
  }

  public function deactivateCondottiere()
  {
    if ($this->levyIsGoldKnight() && Players::anyPlayerHasSpecialAbility(SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS)) {
      return;
    }

    $veniceToken = Cities::get(VENICE)->getToken();
    $venice2Token = Cities::get(VENICE_2)->getToken();
    if ($venice2Token !== null && $veniceToken !== null) {
      $venice2Token->returnToSupply();
    } else if ($venice2Token !== null && $veniceToken === null) {
      $venice2Token->move(VENICE);
    }

    Notifications::deactivateAbility(SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS);
  }

  private function levyIsGoldKnight()
  {
    $religion = $this->getReligion();
    return $religion === CATHOLIC || $religion === MEDIEVAL;
  }
}
