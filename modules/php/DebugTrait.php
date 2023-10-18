<?php

namespace PaxRenaissance;

use PaxRenaissance\Core\Notifications;


trait DebugTrait
{
  function test()
  {
    Notifications::log('test',[]);
  }

}
