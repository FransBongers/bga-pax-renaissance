<?php
require_once 'gameoptions.inc.php';
/**
 * Setup
 */
const FUGGER = 'fugger';
const MEDICI = 'medici';
const COEUR = 'coeur';
const MARCHIONNI = 'marchionni';
const BERENBERG = 'berenberg';
const MENDES = 'mendes';

const COLOR_BANK_MAP = [
  "1084c7" => FUGGER, // blue
  "bddcc6" => MARCHIONNI, // green
  "732473" => COEUR, // purple
  "ffce00" => MEDICI, // yellow
  "191716" => BERENBERG, // black
  "bfc0c3" => MENDES
];

const BANKS = [
  FUGGER,
  MEDICI,
  COEUR,
  MARCHIONNI,
  BERENBERG,
  MENDES,
];

/**
 * Stats
 */
// Player
const STAT_PLAYER_TURN_COUNT = 10;
const STAT_ACTION_PURCHASE_CARD = 11;
const STAT_ACTION_PLAY_CARD = 12;
const STAT_ACTION_SELL = 13;
const STAT_ACTION_TRADE_FAIR_EAST = 14;
const STAT_ACTION_TRADE_FAIR_WEST = 15;
const STAT_ACTION_TABLEAU_OPS_EAST = 16;
const STAT_ACTION_TABLEAU_OPS_WEST = 17;
const STAT_ACTION_PASS = 18;
const STAT_OP_INQUISITOR = 19;
const STAT_OP_COMMERCE = 20;
const STAT_OP_BEHEAD = 21;
const STAT_OP_TAX = 22;
const STAT_OP_REPRESS = 23;
const STAT_OP_VOTE = 24;
const STAT_OP_CORSAIR = 25;
const STAT_OP_SIEGE = 26;
const STAT_OP_CAMPAIGN = 27;


// Table
const STAT_TURN_COUNT = 29;
const STAT_VICTORY_TYPE = 30;
const STAT_VICTORY_TYPE_PATRON = 0;
const STAT_VICTORY_TYPE_GLOBALIZATION = 1;
const STAT_VICTORY_TYPE_IMPERIAL = 2;
const STAT_VICTORY_TYPE_RENAISSANCE = 3;
const STAT_VICTORY_TYPE_HOLY_CATHOLIC = 4;
const STAT_VICTORY_TYPE_HOLY_ISLAMIC = 5;
const STAT_VICTORY_TYPE_HOLY_REFORMIST = 6;
const STAT_VICTORY_TYPE_AGE_OF_BYZANTINE = 7;
const STAT_VICTORY_BANKER = 31;
const STAT_BANKER_NO_BANK = 0;
const STAT_BANKER_FUGGER = 1;
const STAT_BANKER_MEDICI = 2;
const STAT_BANKER_COEUR = 3;
const STAT_BANKER_MARCHIONNI = 4;
const STAT_BANKER_BERENBERG = 5;
const STAT_BANKER_MENDES = 6;
const STAT_FUGGER_IN_GAME = 32;
const STAT_MEDICI_IN_GAME = 33;
const STAT_COEUR_IN_GAME = 34;
const STAT_MARCHIONNI_IN_GAME = 35;
const STAT_BERENBERG_IN_GAME = 38;
const STAT_MENDES_IN_GAME = 39;
const STAT_IN_GAME_NO = 0;
const STAT_IN_GAME_YES = 1;
const STAT_STARTING_BANKER = 36;
const STAT_TURN_ORDER_WINNER = 37;
// NOTE: continue with 40

/**
 * State ids / names
 */

const ST_GAME_SETUP = 1;
const ST_GAME_SETUP_NAME = 'gameSetup';

const ST_BEFORE_START_OF_TURN = 6;
const ST_TURNACTION = 7;

const ST_FREE_ACTION = 20;
const ST_PLAYER_ACTION = 21;
const ST_PURCHASE_CARD = 22;
const ST_PLAY_CARD = 23;
const ST_SELL_CARD = 24;
const ST_FLIP_VICTORY_CARD = 25;
const ST_TRADE_FAIR = 26;
const ST_TRADE_FAIR_PROFIT_DISPERSAL = 27;
// const ST_TRADE_FAIR_LEVY = 28; // TODO remove
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
const ST_BATTLE_RECONFIGURE_CONSTANTINOPLE = 44;
const ST_REGIME_CHANGE_MOVE_EMPIRE_SQUARE = 50;
const ST_REGIME_CHANGE_EMANCIPATION = 51;
const ST_REGIME_CHANGE_GOLDEN_LIBERTY = 52;
const ST_CORONATION_ONE_SHOT = 53;

const ST_BISHOP_SILENCE_CARD = 54;
const ST_DISCARD_DOWN_TO_HAND_LIMT = 55;
const ST_BATTLE_PLACE_ATTACKERS = 56;

const ST_TABLEAU_OPS_SELECT = 60;
const ST_TABLEAU_OP_BEHEAD = 61;
const ST_TABLEAU_OP_CAMPAIGN = 62;
const ST_TABLEAU_OP_COMMERCE = 63;
const ST_TABLEAU_OP_CORSAIR = 64;
const ST_TABLEAU_OP_INQUISITOR = 65;
const ST_TABLEAU_OP_REPRESS = 66;
const ST_TABLEAU_OP_SIEGE = 67;
const ST_TABLEAU_OP_TAX = 68;
const ST_TABLEAU_OP_TAX_FLORINS_CHECK = 69;
const ST_TABLEAU_OP_TAX_PAY_OR_REPRESS = 70;
const ST_TABLEAU_OP_VOTE = 71;
const ST_PLACE_LEVY_AUTO_CHECK = 72;
const ST_PLACE_LEVY_SELECT = 73;

const ST_ABILITY_ACTION_USE = 110;
const ST_ABILITY_ACTION_SELECT_TRADE_FAIR = 111;
const ST_ABILITY_ACTION_LAUNCH_PEASANT_REVOLT = 112;
const ST_ABILITY_ACTION_SELECT_APOSTASY = 113;
const ST_ABILITY_OPPONENTS_PURPLE_OP = 114;

const ST_REMOVE_TOKEN_FROM_CITY = 115;

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
const ABILITY_ACTION_USE = 'ABILITY_ACTION_USE';
const ABILITY_ACTION_LAUNCH_PEASANT_REVOLT = 'ABILITY_ACTION_LAUNCH_PEASANT_REVOLT';
const ABILITY_ACTION_SELECT_APOSTASY = 'ABILITY_ACTION_SELECT_APOSTASY';
const ABILITY_ACTION_SELECT_TRADE_FAIR = 'ABILITY_ACTION_SELECT_TRADE_FAIR';
const ABILITY_OPPONENTS_PUPRLE_OP = 'ABILITY_OPPONENTS_PUPRLE_OP';
const ANNOUNCE_ONE_SHOT = 'ANNOUNCE_ONE_SHOT';
const BATTLE_CASUALTIES = 'BATTLE_CASUALTIES';
const BATTLE_CHECK_BISHOP_AGENT = 'BATTLE_CHECK_BISHOP_AGENT';
const BATTLE_CHECK_REGIME_CHANGE = 'BATTLE_CHECK_REGIME_CHANGE';
const BATTLE_LOCATION = 'BATTLE_LOCATION';
const BATTLE_MAP_CHANGE_RELIGIOUS_WAR = 'BATTLE_MAP_CHANGE_RELIGIOUS_WAR';
const BATTLE_PLACE_ATTACKERS = 'BATTLE_PLACE_ATTACKERS';
const BATTLE_RECONFIGURE_CONSTANTINOPLE = 'BATTLE_RECONFIGURE_CONSTANTINOPLE';
const REMOVE_TOKEN_FROM_CITY = 'REMOVE_TOKEN_FROM_CITY';
const BATTLE_RESULT = 'BATTLE_RESULT';
const BISHOP_DIET_OF_WORMS = 'BISHOP_DIET_OF_WORMS';
const BISHOP_PACIFICATION = 'BISHOP_PACIFICATION';
const BISHOP_SILENCE_CARD = 'BISHOP_SILENCE_CARD';
const DECLARE_VICTORY = 'DECLARE_VICTORY';
const DISCARD_DOWN_TO_HAND_LIMT = 'DISCARD_DOWN_TO_HAND_LIMT';
const FLIP_VICTORY_CARD = 'FLIP_VICTORY_CARD';
const FREE_ACTION = 'FREE_ACTION';
const PATRON_VICTORY = 'PATRON_VICTORY';
const PLACE_AGENT = 'PLACE_AGENT';
const PLACE_LEVY_AUTO_CHECK = 'PLACE_LEVY_AUTO_CHECK';
const PLACE_LEVY_SELECT_CITY = 'PLACE_LEVY_SELECT_CITY';
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
const TABLEAU_OP_TAX_FLORINS_CHECK = 'TABLEAU_OP_TAX_FLORINS_CHECK';
const TABLEAU_OP_TAX_PAY_OR_REPRESS = 'TABLEAU_OP_TAX_PAY_OR_REPRESS';
const TABLEAU_OP_VOTE = 'TABLEAU_OP_VOTE';
const TABLEAU_OPS_SELECT_EAST = 'TABLEAU_OPS_SELECT_EAST';
const TABLEAU_OPS_SELECT_WEST = 'TABLEAU_OPS_SELECT_WEST';
const TABLEAU_OPS_SELECT_EAST_AND_WEST = 'TABLEAU_OPS_SELECT_EAST_AND_WEST';
const TRADE_FAIR = 'TRADE_FAIR';
const TRADE_FAIR_PROFIT_DISPERSAL = 'TRADE_FAIR_PROFIT_DISPERSAL';
// const TRADE_FAIR_LEVY = 'TRADE_FAIR_LEVY'; // TODO remove
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
 * Source: constants used in Engine
 */
const REGIME_CHANGE_CONCESSION = 'REGIME_CHANGE_CONCESSION';

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
const EAST_AND_WEST = 'eastAndWest';
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
const KVIV = 'kviv';
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
const VENICE_2 = "venice2";
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
 * Origin and destination types used in regime changes
 */
const EMPIRE_SQUARE_DESTINATION_KING = 'king';
const EMPIRE_SQUARE_DESTINATION_VASSAL = 'vassal';
const EMPIRE_SQUARE_ORIGIN_TABLEAU = 'tableau';
const EMPIRE_SQUARE_ORIGIN_THRONE = 'throne';

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

const SEA_BORDERS = [
  BORDER_ARAGON_PAPAL_STATES,
  BORDER_ARAGON_PORTUGAL,
  BORDER_BYZANTIUM_HUNGARY,
  BORDER_ENGLAND_PORTUGAL,
  BORDER_ENGLAND_FRANCE,
  BORDER_FRANCE_HOLY_ROMAN_EMPIRE,
  BORDER_HUNGARY_OTTOMAN,
  BORDER_MAMLUK_OTTOMAN,
  BORDER_OTTOMAN_PAPAL_STATES,
];

const TRADE_ROUTES = [
  TANA => [],
];

const BANK_STARTING_CONCESSION_MAP = [
  BERENBERG => BORDER_ENGLAND_FRANCE,
  COEUR => BORDER_MAMLUK_OTTOMAN,
  FUGGER => BORDER_FRANCE_HOLY_ROMAN_EMPIRE,
  MARCHIONNI => BORDER_ENGLAND_PORTUGAL,
  MEDICI => BORDER_ARAGON_PAPAL_STATES,
  MENDES => BORDER_HUNGARY_OTTOMAN,
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


/**
 * Special Abilities
 */

const SA_BEHEAD_EAST_CARD_WITH_BISHOP_ONLY = 'SA_BEHEAD_EAST_CARD_WITH_BISHOP_ONLY';
const SA_BEHEAD_EAST_CARD_WITH_ISLAMIC_REFORMIST_BISHOP_ONLY = 'SA_BEHEAD_EAST_CARD_WITH_ISLAMIC_REFORMIST_BISHOP_ONLY';
const SA_BEHEAD_WEST_CARD_WITH_CATHOLIC_REFORMIST_BISHOP_ONLY = 'SA_BEHEAD_WEST_CARD_WITH_CATHOLIC_REFORMIST_BISHOP_ONLY';
const SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_1 = 'SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_1';
const SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_2 = 'SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_2';
const SA_CONCESSIONS_2X_SPICE_ISLANDS_TRADE_FAIRS_1 = 'SA_CONCESSIONS_2X_SPICE_ISLANDS_TRADE_FAIRS_1';
const SA_CONCESSIONS_2X_SPICE_ISLANDS_TRADE_FAIRS_2 = 'SA_CONCESSIONS_2X_SPICE_ISLANDS_TRADE_FAIRS_2';
const SA_CONCESSIONS_2X_TRADE_FAIRS_VOTES = 'SA_CONCESSIONS_2X_TRADE_FAIRS_VOTES';
const SA_CONCESSIONS_CANNOT_BE_KILLED_BY_PIRATES = 'SA_CONCESSIONS_CANNOT_BE_KILLED_BY_PIRATES';
const SA_CORONATION_CAN_CLAIM_MARRIED_KINGS = 'SA_CORONATION_CAN_CLAIM_MARRIED_KINGS';
const SA_DECLARE_GLOBALIZATION_COSTS_TWO_ACTIONS = 'SA_DECLARE_GLOBALIZATION_COSTS_TWO_ACTIONS';
const SA_DECLARE_HOLY_COSTS_TWO_ACTIONS = 'SA_DECLARE_HOLY_COSTS_TWO_ACTIONS';
const SA_DECLARE_IMPERIAL_COSTS_TWO_ACTIONS = 'SA_DECLARE_IMPERIAL_COSTS_TWO_ACTIONS';
const SA_DISCARD_TO_LAUNCH_PEASANT_REVOLT = 'SA_DISCARD_TO_LAUNCH_PEASANT_REVOLT';
const SA_EAST_AND_WEST_OPS_IN_ONE_ACTION = 'SA_EAST_AND_WEST_OPS_IN_ONE_ACTION';
const SA_EMPORIUM_SUBSIDY_2_FLORINS = 'SA_EMPORIUM_SUBSIDY_2_FLORINS';
const SA_FREE_EASTERN_OPS = 'SA_FREE_EASTERN_OPS';
const SA_FREE_WESTERN_OPS = 'SA_FREE_WESTERN_OPS';
const SA_FREE_TRADE_FAIR = 'SA_FREE_TRADE_FAIR';
const SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS = 'SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS';
const SA_IMMUNE_TO_APOSTASY = 'SA_IMMUNE_TO_APOSTASY';
const SA_IMMUNE_TO_SILENCING = 'SA_IMMUNE_TO_SILENCING';
const SA_IN_CRUSADE_COUNT_ROOKS_AS_KNIGHTS = 'SA_IN_CRUSADE_COUNT_ROOKS_AS_KNIGHTS';
const SA_PERFORM_APOSTASY_AS_AN_ACTION = 'SA_PERFORM_APOSTASY_AS_AN_ACTION';
const SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY = 'SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY';
const SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY = 'SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY';
const SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY = 'SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY';
const SA_PATRON_REDUCES_VOTE_OPS_COST = 'SA_PATRON_REDUCES_VOTE_OPS_COST';
const SA_PORTUGAL_FRANCE_NOT_ADJACENT = 'SA_PORTUGAL_FRANCE_NOT_ADJACENT';
const SA_REPRESSED_TOKENS_COUNTS_AS_KNIGHT_IN_EAST_CAMPAIGN = 'SA_REPRESSED_TOKENS_COUNTS_AS_KNIGHT_IN_EAST_CAMPAIGN';
const SA_SELL_AND_EMANCIPATE_ALL_REPRESSED_TOKENS_IN_THE_WEST = 'SA_SELL_AND_EMANCIPATE_ALL_REPRESSED_TOKENS_IN_THE_WEST';
const SA_SELL_AND_PERFORM_ONE_SHOT = 'SA_SELL_AND_PERFORM_ONE_SHOT';
const SA_SELL_AND_PERFORM_PURPLE_OP_FROM_OPPONENT = 'SA_SELL_AND_PERFORM_PURPLE_OP_FROM_OPPONENT';
const SA_SELL_FOR_4 = 'SA_SELL_FOR_4';
const SA_UNLIMITED_HAND_SIZE = 'SA_UNLIMITED_HAND_SIZE';
const SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS = 'SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS';

const APOSTASY_PRESTIGE_MAP = [
  APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT => [ISLAMIC, CATHOLIC],
  APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT => [REFORMIST, ISLAMIC],
  APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT => [REFORMIST, CATHOLIC],
];