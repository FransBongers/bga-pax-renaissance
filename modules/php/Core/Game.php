<?php
namespace PaxRenaissance\Core;
use PaxRenaissance;

/*
 * Game: a wrapper over table object to allow more generic modules
 */
class Game
{
  public static function get()
  {
    return PaxRenaissance::get();
  }
}
