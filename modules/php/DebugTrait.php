<?php

namespace PaxRenaissance;

use PaxRenaissance\Core\Globals;
use PaxRenaissance\Core\Notifications;


trait DebugTrait
{
  function test()
  {
    Notifications::log('players',Globals::getPlayers());
  }

}
