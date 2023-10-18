<?php

namespace PaxRenaissance\Helpers;

use PaxRenaissance\Core\Globals;

abstract class Utils extends \APP_DbObject
{


  public static function die($args = null)
  {
    if (is_null($args)) {
      throw new \BgaVisibleSystemException(implode('<br>', self::$logmsg));
    }
    throw new \BgaVisibleSystemException(json_encode($args));
  }

  // ....###....########..########.....###....##....##
  // ...##.##...##.....##.##.....##...##.##....##..##.
  // ..##...##..##.....##.##.....##..##...##....####..
  // .##.....##.########..########..##.....##....##...
  // .#########.##...##...##...##...#########....##...
  // .##.....##.##....##..##....##..##.....##....##...
  // .##.....##.##.....##.##.....##.##.....##....##...

  public static function array_is_list(array $arr)
  {
    if ($arr === []) {
      return true;
    }
    return array_keys($arr) === range(0, count($arr) - 1);
  }

  public static function filter($data, $filter)
  {
    return array_values(array_filter($data, $filter));
  }


  public static function diff(&$data, $arr)
  {
    $data = array_values(array_diff($data, $arr));
  }

  public static function shuffle_assoc(&$array)
  {
    $keys = array_keys($array);
    shuffle($keys);

    foreach ($keys as $key) {
      $new[$key] = $array[$key];
    }

    $array = $new;
    return true;
  }

  public static function array_find(array $array, callable $fn)
  {
    foreach ($array as $value) {
      if ($fn($value)) {
        return $value;
      }
    }
    return null;
  }

  public static function array_find_index(array $array, callable $fn)
  {
    foreach ($array as $index => $value) {
      if ($fn($value)) {
        return $index;
      }
    }
    return null;
  }

  public static function array_some(array $array, callable $fn)
  {
    foreach ($array as $value) {
      if ($fn($value)) {
        return true;
      }
    }
    return false;
  }

  public static function array_every(array $array, callable $fn)
  {
    foreach ($array as $value) {
      if (!$fn($value)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check is string starts with a specific substring. Returns boolean
   */
  public static function startsWith($string, $startString)
  {
    $len = strlen($startString);
    return (substr($string, 0, $len) === $startString);
  }


  // .##.....##.########.##.......########..########.########...######.
  // .##.....##.##.......##.......##.....##.##.......##.....##.##....##
  // .##.....##.##.......##.......##.....##.##.......##.....##.##......
  // .#########.######...##.......########..######...########...######.
  // .##.....##.##.......##.......##........##.......##...##.........##
  // .##.....##.##.......##.......##........##.......##....##..##....##
  // .##.....##.########.########.##........########.##.....##..######.

  // .##.....##....###....##.......####.########.....###....########.####..#######..##....##
  // .##.....##...##.##...##........##..##.....##...##.##......##.....##..##.....##.###...##
  // .##.....##..##...##..##........##..##.....##..##...##.....##.....##..##.....##.####..##
  // .##.....##.##.....##.##........##..##.....##.##.....##....##.....##..##.....##.##.##.##
  // ..##...##..#########.##........##..##.....##.#########....##.....##..##.....##.##..####
  // ...##.##...##.....##.##........##..##.....##.##.....##....##.....##..##.....##.##...###
  // ....###....##.....##.########.####.########..##.....##....##....####..#######..##....##

  public static function validateJSonAlphaNum($value, $argName = 'unknown')
  {
    if (is_array($value)) {
      foreach ($value as $key => $v) {
        Utils::validateJSonAlphaNum($key, $argName);
        Utils::validateJSonAlphaNum($v, $argName);
      }
      return true;
    }
    if (is_int($value)) {
      return true;
    }
    $bValid = preg_match("/^[_0-9a-zA-Z- ]*$/", $value) === 1;
    if (!$bValid) {
      throw new BgaSystemException("Bad value for: $argName", true, true, FEX_bad_input_argument);
    }
    return true;
  }
}
