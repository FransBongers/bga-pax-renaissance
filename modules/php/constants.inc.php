<?php
require_once 'gameoptions.inc.php';
/**
 * State ids / names
 */

const ST_GAME_SETUP = 1;
const ST_GAME_SETUP_NAME = 'gameSetup';
const ST_CHANGE_ACTIVE_PLAYER = 95;
const ST_CHANGE_ACTIVE_PLAYER_NAME = 'changeActivePlayer';
const ST_END_GAME = 99;
const ST_END_GAME_NAME = 'gameEnd';


/**
 * Log tokens
 */
const LOG_TOKEN_BOLD_TEXT = 'boldText';
const LOG_TOKEN_NEW_LINE = 'newLine';
const LOG_TOKEN_PLAYER_NAME = 'playerName';


/**
 * Dispatch actions
 */

const DISPATCH_TRANSITION = 'dispatchTransition';

/**
 * Player colors
 */
const BLUE = "blue";
const GREEN = "green";
const PURPLE = "purple";
const YELLOW = "yellow";

const PLAYER_COLORS = [
  BLUE,
  GREEN,
  PURPLE,
  YELLOW,
];

/**
 * Religions
 */
const CATHOLIC = "catholic";
const ISLAMIC = "islamic";
const REFORMIST = "reformist";

const RELIGIONS = [
  CATHOLIC,
  ISLAMIC,
  REFORMIST
];

/**
 * Cards
 */
// cardinal directions
const WEST = 'west';
const EAST = 'east';
const CARDINAL_DIRECTIONS = [
  WEST,
  EAST
];

// types
const EMPIRE_CARD = 'empireCard';
const TABLEAU_CARD = 'tableauCard';
const VICTORY_CARD = 'victoryCard';

// Card locations
const DECK_EAST = 'deck_east';
const DECK_WEST = 'deck_west';
const DISCARD = 'discard';
const POOL_EAST = 'pool_' . EAST;
const POOL_WEST = 'pool_' . WEST;

/**
 * cities
 */

const LONDON = 'london';
const BORDEAUX = 'bordeaux';
const BRUGES = 'bruges';
const PARIS = 'paris';
const LYON = 'lyon';
const LUBECK = 'lubeck';
const NURNBERG = 'nurnberg';
const NOVGOROD = 'novgorod';
const VIENNA = 'vienna';
const BUDA = 'buda';
const VARNA = 'varna';
const TANA = 'tana';
const CAFFA = 'caffa';
const TREBIZOND = 'trebizond';
const TOLEDO = 'toledo';
const GRANADA = 'granada';
const SPICE_ISLANDS = 'spiceIslands';
const VALENCIA = 'valencia';
const ALGIERS = 'algiers';
const TIMBUKTU = 'timbuktu';
const VENICE = 'venice';
const CONSTANTINOPLE_1 = 'constantinople1';
const CONSTANTINOPLE_2 = 'constantinople2';
const CONSTANTINOPLE_3 = 'constantinople3';
const MODON = 'modon';
const RHODES = 'rhodes';
const CYPRUS = 'cyprus';
const CAIRO = 'cairo';
const RED_SEA = 'redSea';
