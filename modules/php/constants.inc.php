<?php
require_once 'gameoptions.inc.php';
/**
 * Setup
 */
const FUGGER = 'fugger';
const MEDICI = 'medici';
const COEUR = 'coeur';
const MARCHIONNI = 'marchionni';

const COLOR_BANK_MAP = [
  "1084c7" => FUGGER, // blue
  "bddcc6" => MARCHIONNI, // green
  "732473" => COEUR, // purple
  "ffce00" => MEDICI // yellow
];

const BANKS = [
  FUGGER,
  MEDICI,
  COEUR,
  MARCHIONNI,
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
const ST_SELL_CARD = 24;
const ST_FLIP_VICTORY_CARD = 25;
const ST_TRADE_FAIR = 26;
const ST_TRADE_FAIR_PROFIT_DISPERSAL = 27;
const ST_TRADE_FAIR_LEVY = 28;

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
const FLIP_VICTORY_CARD = 'FLIP_VICTORY_CARD';
const PLAYER_ACTION = 'PLAYER_ACTION';
const PURCHASE_CARD = 'PURCHASE_CARD';
const PLAY_CARD = 'PLAY_CARD';
const SELL_CARD = 'SELL_CARD';
const TRADE_FAIR = 'TRADE_FAIR';
const TRADE_FAIR_PROFIT_DISPERSAL = 'TRADE_FAIR_PROFIT_DISPERSAL';
const TRADE_FAIR_LEVY = 'TRADE_FAIR_LEVY';


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
 * Busted disk colors
 */
const BLACK = 'black';
const WHITE = 'white';

/**
 * Chess pieces 
 */
const BISHOP = 'bishop';
const KNIGHT = 'knight';
const PAWN = 'pawn';
const PIRATE = 'pirate';
const ROOK = 'rook';
const DISK = 'disk';


/**
 * Religions
 */
const MEDIEVAL = 'medieval';
const CATHOLIC = "catholic";
const ISLAMIC = "islamic";
const REFORMIST = "reformist";

const RELIGIONS = [
  CATHOLIC,
  ISLAMIC,
  REFORMIST
];

/**
 * PRESTIGE
 */
const DISCOVERY = 'discovery';
const LAW = 'law';
const PATRON = 'patron';


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
// const CONSTANTINOPLE = 'constantinople';
const CONSTANTINOPLE_1 = 'constantinople1';
const CONSTANTINOPLE_2 = 'constantinople2';
const CONSTANTINOPLE_3 = 'constantinople3';
const MODON = 'modon';
const RHODES = 'rhodes';
const CYPRUS = 'cyprus';
const CAIRO = 'cairo';
const RED_SEA = 'redSea';

/**
 * Empires
 */
const ENGLAND = "england";
const FRANCE = "france";
const HOLY_ROMAN_EMIRE = "holyRomanEmpire";
const HUNGARY = "hungary";
const BYZANTIUM = "byzantium";
const PORTUGAL = "portugal";
const ARAGON = "aragon";
const PAPAL_STATES = "papalStates";
const OTTOMAN = "ottoman";
const MAMLUK = "mamluk";

/**
 * Borders
 */
const BORDER_ARAGON_FRANCE = 'border_aragon_france';
const BORDER_ARAGON_PAPAL_STATES = 'border_aragon_papalStates';
const BORDER_ARAGON_PORTUGAL = 'border_aragon_portugal';
const BORDER_BYZANTIUM_HUNGARY = 'border_byzantium_hungary';
const BORDER_BYZANTIUM_MAMLUK = 'border_byzantium_mamluk';
const BORDER_ENGLAND_PORTUGAL = 'border_england_portugal';
const BORDER_ENGLAND_FRANCE = 'border_england_france';
const BORDER_FRANCE_HOLY_ROMAN_EMPIRE = 'border_france_holyRomanEmpire';
const BORDER_HOLY_ROMAN_EMPIRE_HUNGARY = 'border_holyRomanEmpire_hungary';
const BORDER_HOLY_ROMAN_EMPIRE_PAPAL_STATES = 'border_holyRomanEmpire_papalStates';
const BORDER_HUNGARY_OTTOMAN = 'border_hungary_ottoman';
const BORDER_MAMLUK_OTTOMAN = 'border_mamluk_ottoman';
const BORDER_OTTOMAN_PAPAL_STATES = 'border_ottoman_papalStates';

const BORDERS = [
  BORDER_ARAGON_FRANCE,
  BORDER_ARAGON_PAPAL_STATES,
  BORDER_ARAGON_PORTUGAL,
  BORDER_BYZANTIUM_HUNGARY,
  BORDER_BYZANTIUM_MAMLUK,
  BORDER_ENGLAND_PORTUGAL,
  BORDER_ENGLAND_FRANCE,
  BORDER_FRANCE_HOLY_ROMAN_EMPIRE,
  BORDER_HOLY_ROMAN_EMPIRE_HUNGARY,
  BORDER_HOLY_ROMAN_EMPIRE_PAPAL_STATES,
  BORDER_HUNGARY_OTTOMAN,
  BORDER_MAMLUK_OTTOMAN,
  BORDER_OTTOMAN_PAPAL_STATES,
];

const TRADE_ROUTES = [
  TANA => [],
];

const BANK_STARTING_CONCESSION_MAP = [
  COEUR => BORDER_MAMLUK_OTTOMAN,
  FUGGER => BORDER_FRANCE_HOLY_ROMAN_EMPIRE,
  MARCHIONNI => BORDER_ENGLAND_PORTUGAL,
  MEDICI => BORDER_ARAGON_PAPAL_STATES
];
