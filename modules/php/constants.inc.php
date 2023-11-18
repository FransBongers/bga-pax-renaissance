<?php
require_once 'gameoptions.inc.php';
/**
 * Setup
 */
const FUGGER = 'fugger';
const MEDICI = 'medici';
const COEUR = 'coeur';
const MARCHIONNI = 'marchionni';

const COLOR__BANK_MAP = [
  "1084c7" => FUGGER,
  "bddcc6" => MARCHIONNI,
  "732473" => COEUR,
  "ffce00" => MEDICI
];


/**
 * State ids / names
 */

const ST_GAME_SETUP = 1;
const ST_GAME_SETUP_NAME = 'gameSetup';

const ST_BEFORE_START_OF_TURN = 6;
const ST_TURNACTION = 7;

const ST_PLAYER_ACTION = 21;
const ST_PURCHASE_CARD = 22;
const ST_PLAY_CARD = 23;

const ST_CLEANUP = 88;
const ST_RESOLVE_STACK = 90;
const ST_RESOLVE_CHOICE = 91;
const ST_IMPOSSIBLE_MANDATORY_ACTION = 92;
const ST_CONFIRM_TURN = 93;
const ST_CONFIRM_PARTIAL_TURN = 94;

// const ST_CHANGE_ACTIVE_PLAYER = 95;
// const ST_CHANGE_ACTIVE_PLAYER_NAME = 'changeActivePlayer';
const ST_GENERIC_NEXT_PLAYER = 97;
const ST_END_GAME = 99;
const ST_END_GAME_NAME = 'gameEnd';

/**
 * STATS
 */

const STAT_TURN = 12;

/*
 * ENGINE
 */
const NODE_SEQ = 'seq';
const NODE_OR = 'or';
const NODE_XOR = 'xor';
const NODE_PARALLEL = 'parallel';
const NODE_LEAF = 'leaf';

const ZOMBIE = 98;
const PASS = 99;

const AFTER_FINISHING_ACTION = 'afterFinishing';

/**
 * ATOMIC ACTIONS
 */
const PLAYER_ACTION = 'PLAYER_ACTION';
const PURCHASE_CARD = 'PURCHASE_CARD';
const PLAY_CARD = 'PLAY_CARD';


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
