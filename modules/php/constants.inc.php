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
const ST_PLACE_AGENT = 29;
const ST_RESOLVE_PLACE_TOKEN = 30;
const ST_SELECT_TOKEN = 31;
const ST_BISHOP_DIET_OF_WORMS = 32;
const ST_BISHOP_PACIFICATION = 33;
const ST_ANNOUNCE_ONE_SHOT = 34;
const ST_TRADE_SHIFT_ONE_SHOT = 35;
const ST_APOSTASY_ONE_SHOT = 36;
const ST_RESOLVE_DISCARD_CARD = 37;
const ST_BATTLE_LOCATION = 38;
const ST_BATTLE_RESULT = 39;
const ST_BATTLE_CASUALTIES = 40;
const ST_BATTLE_CHECK_REGIME_CHANGE = 41;
const ST_BATTLE_CHECK_BISHOP_AGENT = 42;
const ST_BATTLE_MAP_CHANGE_RELIGIOUS_WAR = 43;
const ST_REGIME_CHANGE_MOVE_EMPIRE_SQUARE = 50;
const ST_REGIME_CHANGE_EMANCIPATION = 51;
const ST_REGIME_CHANGE_GOLDEN_LIBERTY = 52;

const ST_TABLEAU_OPS_SELECT = 60;
const ST_TABLEAU_OP_BEHEAD = 61;
const ST_TABLEAU_OP_CAMPAIGN = 62;
const ST_TABLEAU_OP_COMMERCE = 63;
const ST_TABLEAU_OP_CORSAIR = 64;
const ST_TABLEAU_OP_INQUISITOR = 65;
const ST_TABLEAU_OP_REPRESS = 66;
const ST_TABLEAU_OP_SIEGE = 67;
const ST_TABLEAU_OP_TAX = 68;
const ST_TABLEAU_OP_TAX_PAY_OR_REPRESS = 69;
const ST_TABLEAU_OP_VOTE = 70;

const ST_CLEANUP = 88;
const ST_RESOLVE_STACK = 90;
const ST_RESOLVE_CHOICE = 91;
const ST_IMPOSSIBLE_MANDATORY_ACTION = 92;
const ST_CONFIRM_TURN = 93;
const ST_CONFIRM_PARTIAL_TURN = 94;

// const ST_CHANGE_ACTIVE_PLAYER = 95;
// const ST_CHANGE_ACTIVE_PLAYER_NAME = 'changeActivePlayer';
const ST_GENERIC_NEXT_PLAYER = 95;

const ST_PATRON_VICTORY = 97;
const ST_DECLARE_VICTORY = 98;
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
const ANNOUNCE_ONE_SHOT = 'ANNOUNCE_ONE_SHOT';
const BATTLE_CASUALTIES = 'BATTLE_CASUALTIES';
const BATTLE_CHECK_BISHOP_AGENT = 'BATTLE_CHECK_BISHOP_AGENT';
const BATTLE_CHECK_REGIME_CHANGE = 'BATTLE_CHECK_REGIME_CHANGE';
const BATTLE_LOCATION = 'BATTLE_LOCATION';
const BATTLE_MAP_CHANGE_RELIGIOUS_WAR = 'BATTLE_MAP_CHANGE_RELIGIOUS_WAR';
const BATTLE_RESULT = 'BATTLE_RESULT';
const BISHOP_DIET_OF_WORMS = 'BISHOP_DIET_OF_WORMS';
const BISHOP_PACIFICATION = 'BISHOP_PACIFICATION';
const DECLARE_VICTORY = 'DECLARE_VICTORY';
const FLIP_VICTORY_CARD = 'FLIP_VICTORY_CARD';
const PATRON_VICTORY = 'PATRON_VICTORY';
const PLACE_AGENT = 'PLACE_AGENT';
const PLAYER_ACTION = 'PLAYER_ACTION';
const PLAY_CARD = 'PLAY_CARD';
const PURCHASE_CARD = 'PURCHASE_CARD';
const REGIME_CHANGE_EMANCIPATION = 'REGIME_CHANGE_EMANCIPATION';
const REGIME_CHANGE_GOLDEN_LIBERTY = 'REGIME_CHANGE_GOLDEN_LIBERTY';
const REGIME_CHANGE_MOVE_EMPIRE = 'REGIME_CHANGE_MOVE_EMPIRE';
const RESOLVE_DISCARD_CARD = 'RESOLVE_DISCARD_CARD';
const RESOLVE_PLACE_TOKEN = 'RESOLVE_PLACE_TOKEN';
const SELL_CARD = 'SELL_CARD';
const SELECT_TOKEN = 'SELECT_TOKEN';
const TABLEAU_OP_BEHEAD = 'TABLEAU_OP_BEHEAD';
const TABLEAU_OP_CAMPAIGN = 'TABLEAU_OP_CAMPAIGN';
const TABLEAU_OP_COMMERCE = 'TABLEAU_OP_COMMERCE';
const TABLEAU_OP_CORSAIR = 'TABLEAU_OP_CORSAIR';
const TABLEAU_OP_INQUISITOR = 'TABLEAU_OP_INQUISITOR';
const TABLEAU_OP_REPRESS = 'TABLEAU_OP_REPRESS';
const TABLEAU_OP_SIEGE = 'TABLEAU_OP_SIEGE';
const TABLEAU_OP_TAX = 'TABLEAU_OP_TAX';
const TABLEAU_OP_TAX_PAY_OR_REPRESS = 'TABLEAU_OP_TAX_PAY_OR_REPRESS';
const TABLEAU_OP_VOTE = 'TABLEAU_OP_VOTE';
const TABLEAU_OPS_SELECT_EAST = 'TABLEAU_OPS_SELECT_EAST';
const TABLEAU_OPS_SELECT_WEST = 'TABLEAU_OPS_SELECT_WEST';
const TRADE_FAIR = 'TRADE_FAIR';
const TRADE_FAIR_PROFIT_DISPERSAL = 'TRADE_FAIR_PROFIT_DISPERSAL';
const TRADE_FAIR_LEVY = 'TRADE_FAIR_LEVY';
// One shots
const APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT = 'APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT';
const APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT = 'APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT';
const APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT = 'APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT';
const CONSPIRACY_ONE_SHOT = 'CONSPIRACY_ONE_SHOT';
const CORONATION_ONE_SHOT = 'CORONATION_ONE_SHOT';
const CRUSADE_ONE_SHOT = 'CRUSADE_ONE_SHOT';
const JIHAD_ONE_SHOT = 'JIHAD_ONE_SHOT';
const PEASANT_REVOLT_ONE_SHOT = 'PEASANT_REVOLT_ONE_SHOT';
const REFORMATION_ONE_SHOT = 'REFORMATION_ONE_SHOT';
const TRADE_SHIFT_NOVGOROD_ONE_SHOT = 'TRADE_SHIFT_NOVGOROD_ONE_SHOT';
const TRADE_SHIFT_RED_SEA_ONE_SHOT = 'TRADE_SHIFT_RED_SEA_ONE_SHOT';
const TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT = 'TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT';
const TRADE_SHIFT_TIMBUKTU_ONE_SHOT = 'TRADE_SHIFT_TIMBUKTU_ONE_SHOT';

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
 * PRESTIGE
 */
const DISCOVERY = 'discovery';
const LAW = 'law';
const PATRON = 'patron';

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
 * Message types
 */
const KILL = 'kill';
const ELIMINATE = 'eliminate';
const RETURN_TO_SUPPLY = 'returnToSupply'; 


/**
 * Cards
 */
// cardinal directions
const WEST = 'west';
const EAST = 'east';
const REGIONS = [
  WEST,
  EAST,
];

// types
const EMPIRE_CARD = 'empireCard';
const TABLEAU_CARD = 'tableauCard';
const VICTORY_CARD = 'victoryCard';

// State victory card
const ACTIVE = 'active';
const INACTIVE = 'inactive';

// Sides for empire cards
const KING = 'king';
const REPUBLIC = 'republic';

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

const EAST_EMPIRES = [
  BYZANTIUM,
  HUNGARY,
  MAMLUK,
  OTTOMAN,

];
const WEST_EMPIRES = [
  ARAGON,
  ENGLAND,
  FRANCE,
  HOLY_ROMAN_EMIRE,
  PAPAL_STATES,
  PORTUGAL,
];

const EMPIRE_SQUARE_IDS = [
  "EmpireSquare_Aragon",
  "EmpireSquare_Byzantium",
  "EmpireSquare_England",
  "EmpireSquare_France",
  "EmpireSquare_HolyRomanEmpire",
  "EmpireSquare_Hungary",
  "EmpireSquare_Mamluk",
  "EmpireSquare_Ottoman",
  "EmpireSquare_PapalStates",
  "EmpireSquare_Portugal",
];

/**
 * Map location types
 */
const CITY = 'city';
const BORDER = 'border';
const CARD = 'card';

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

/**
 * Tableau ops
 */
// Types
const RELIGIOUS = 'religious';
const ECONOMIC = 'economic';
const POLITICAL = 'political';
const MILITARY = 'military';

// Ids
const BEHEAD_OP = 'BEHEAD_OP';
const CAMPAIGN_OP = 'CAMPAIGN_OP';
const COMMERCE_OP_EAST = 'COMMERCE_OP_EAST';
const COMMERCE_OP_WEST = 'COMMERCE_OP_WEST';
const CORSAIR_OP_CATHOLIC = 'CORSAIR_OP_CATHOLIC';
const CORSAIR_OP_ISLAMIC = 'CORSAIR_OP_ISLAMIC';
const CORSAIR_OP_REFORMIST = 'CORSAIR_OP_REFORMIST';
const INQUISITOR_OP_CATHOLIC = 'INQUISITOR_OP_CATHOLIC';
const INQUISITOR_OP_ISLAMIC = 'INQUISITOR_OP_ISLAMIC';
const INQUISITOR_OP_REFORMIST = 'INQUISITOR_OP_REFORMIST';
const REPRESS_OP_KNIGHT = 'REPRESS_OP_KNIGHT';
const REPRESS_OP_PAWN = 'REPRESS_OP_PAWN';
const REPRESS_OP_PAWN_KNIGHT = 'REPRESS_OP_PAWN_KNIGHT';
const REPRESS_OP_PAWN_ROOK = 'REPRESS_OP_PAWN_ROOK';
const REPRESS_OP_PAWN_ROOK_KNIGHT = 'REPRESS_OP_PAWN_ROOK_KNIGHT';
const REPRESS_OP_ROOK = 'REPRESS_OP_ROOK';
const REPRESS_OP_ROOK_KNIGHT = 'REPRESS_OP_ROOK_KNIGHT';
const SIEGE_OP = 'SIEGE_OP';
const TAX_OP = 'TAX_OP';
const VOTE_OP_EAST = 'VOTE_OP_EAST';
const VOTE_OP_WEST = 'VOTE_OP_WEST';
