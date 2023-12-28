const MIN_PLAY_AREA_WIDTH = 1516;

/**
 * Client states
 */
const CLIENT_DECLARE_VICTORY_STATE = "clientDeclareVictoryState";
const CLIENT_SELL_CARD_STATE = "clientSellCardState";
const CLIENT_START_TRADE_FAIR_STATE = "clientStartTradeFairState";

/**
 * Player colors
 */

const BLUE = "blue";
const GREEN = "green";
const PURPLE = "purple";
const YELLOW = "yellow";

const COLOR_MAP = {
  "1084c7": BLUE,
  bddcc6: GREEN,
  "732473": PURPLE,
  ffce00: YELLOW,
};

const COLORS_WITH_SHADOW = [GREEN, YELLOW];

/**
 * Class names
 */
const DISABLED = "disabled";
const PR_NONE = "pr_none";
const PR_SELECTABLE = "pr_selectable";
const PR_SELECTED = "pr_selected";

/**
 * Card locations
 */
const DISCARD = "discard";

/**
 * Banks
 */
const FUGGER = "fugger";
const MEDICI = "medici";
const COEUR = "coeur";
const MARCHIONNI = "marchionni";

/**
 * Regions
 */
const WEST = "west";
const EAST = "east";

const REGIONS: ("east" | "west")[] = [WEST, EAST];

// Card types
const EMPIRE_CARD = "empireCard";
const TABLEAU_CARD = "tableauCard";
const VICTORY_CARD = "victoryCard";

// Sides for empire cards
const KING = "king";
const REPUBLIC = "republic";
const VASSAL = 'vassal';

// State victory card
const ACTIVE = "active";
const INACTIVE = "inactive";

/**
 * Chess pieces
 */
const BISHOP = "bishop";
const DISK = "disk"; // for busted disks
const KNIGHT = "knight";
const PAWN = "pawn";
const PIRATE = "pirate";
const ROOK = "rook";

/**
 * Religions
 */
const MEDIEVAL = "medieval";
const CATHOLIC = "catholic";
const ISLAMIC = "islamic";
const REFORMIST = "reformist";

const RELIGIONS = [CATHOLIC, ISLAMIC, REFORMIST];

/**
 * PRESTIGE
 */
const DISCOVERY = "discovery";
const LAW = "law";
const PATRON = "patron";

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

const EMPIRES = [
  ARAGON,
  BYZANTIUM,
  ENGLAND,
  FRANCE,
  HOLY_ROMAN_EMIRE,
  HUNGARY,
  MAMLUK,
  OTTOMAN,
  PAPAL_STATES,
  PORTUGAL,
];

const EMPIRE_NAME_MAP = {
  [EAST]: "The East", // TODO: Check if this is marked for translation somewhere
  [WEST]: "The West", // TODO: Check if this is marked for translation somewhere
  [ARAGON]: "Aragon",
  [BYZANTIUM]: "Byzantium",
  [ENGLAND]: "England",
  [FRANCE]: "France",
  [HOLY_ROMAN_EMIRE]: "Holy Roman Empire",
  [HUNGARY]: "Hungary",
  [MAMLUK]: "Mamluk",
  [OTTOMAN]: "Ottoman",
  [PAPAL_STATES]: "Papal States",
  [PORTUGAL]: "Portugal",
};

/**
 * Origin and destination types used in regime changes
 */
const EMPIRE_SQUARE_DESTINATION_KING = 'king';
const EMPIRE_SQUARE_DESTINATION_VASSAL = 'vassal';
const EMPIRE_SQUARE_ORIGIN_TABLEAU = 'tableau';
const EMPIRE_SQUARE_ORIGIN_THRONE = 'throne';

/**
 * Borders
 */
const BORDER_ARAGON_FRANCE = "border_aragon_france";
const BORDER_ARAGON_PAPAL_STATES = "border_aragon_papalStates";
const BORDER_ARAGON_PORTUGAL = "border_aragon_portugal";
const BORDER_BYZANTIUM_HUNGARY = "border_byzantium_hungary";
const BORDER_BYZANTIUM_MAMLUK = "border_byzantium_mamluk";
const BORDER_ENGLAND_FRANCE = "border_england_france";
const BORDER_ENGLAND_PORTUGAL = "border_england_portugal";
const BORDER_FRANCE_HOLY_ROMAN_EMPIRE = "border_france_holyRomanEmpire";
const BORDER_HOLY_ROMAN_EMPIRE_HUNGARY = "border_holyRomanEmpire_hungary";
const BORDER_HOLY_ROMAN_EMPIRE_PAPAL_STATES =
  "border_holyRomanEmpire_papalStates";
const BORDER_HUNGARY_OTTOMAN = "border_hungary_ottoman";
const BORDER_MAMLUK_OTTOMAN = "border_mamluk_ottoman";
const BORDER_OTTOMAN_PAPAL_STATES = "border_ottoman_papalStates";

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

/**
 * Victory cards
 */
const VICTORY_RENAISSANCE = "victory_renaissance";
const VICTORY_GLOBALIZATION = "victory_globalization";
const VICTORY_IMPERIAL = "victory_imperial";
const VICTORY_HOLY = "victory_holy";

const VICTORY_SQUARES = [
  VICTORY_RENAISSANCE,
  VICTORY_GLOBALIZATION,
  VICTORY_IMPERIAL,
  VICTORY_HOLY,
];

/**
 * cities
 */

const LONDON = "london";
const BORDEAUX = "bordeaux";
const BRUGES = "bruges";
const PARIS = "paris";
const LYON = "lyon";
const LUBECK = "lubeck";
const NURNBERG = "nurnberg";
const NOVGOROD = "novgorod";
const VIENNA = "vienna";
const BUDA = "buda";
const VARNA = "varna";
const TANA = "tana";
const CAFFA = "caffa";
const TREBIZOND = "trebizond";
const TOLEDO = "toledo";
const GRANADA = "granada";
const SPICE_ISLANDS = "spiceIslands";
const VALENCIA = "valencia";
const ALGIERS = "algiers";
const TIMBUKTU = "timbuktu";
const VENICE = "venice";
const CONSTANTINOPLE_1 = "constantinople1";
const CONSTANTINOPLE_2 = "constantinople2";
const CONSTANTINOPLE_3 = "constantinople3";
const MODON = "modon";
const RHODES = "rhodes";
const CYPRUS = "cyprus";
const CAIRO = "cairo";
const RED_SEA = "redSea";

const CITIES = [
  LONDON,
  BORDEAUX,
  BRUGES,
  PARIS,
  LYON,
  LUBECK,
  NURNBERG,
  NOVGOROD,
  VIENNA,
  BUDA,
  VARNA,
  TANA,
  CAFFA,
  TREBIZOND,
  TOLEDO,
  GRANADA,
  SPICE_ISLANDS,
  VALENCIA,
  ALGIERS,
  TIMBUKTU,
  VENICE,
  CONSTANTINOPLE_1,
  CONSTANTINOPLE_2,
  CONSTANTINOPLE_3,
  MODON,
  RHODES,
  CYPRUS,
  CAIRO,
  RED_SEA,
];

/**
 * Tableau ops
 */
// Types
const RELIGIOUS = "religious";
const ECONOMIC = "economic";
const POLITICAL = "political";
const MILITARY = "military";

// Ids
const BEHEAD_OP = "BEHEAD_OP";
const CAMPAIGN_OP = "CAMPAIGN_OP";
const COMMERCE_OP_EAST = "COMMERCE_OP_EAST";
const COMMERCE_OP_WEST = "COMMERCE_OP_WEST";
const CORSAIR_OP_CATHOLIC = "CORSAIR_OP_CATHOLIC";
const CORSAIR_OP_ISLAMIC = "CORSAIR_OP_ISLAMIC";
const CORSAIR_OP_REFORMIST = "CORSAIR_OP_REFORMIST";
const INQUISITOR_OP_CATHOLIC = "INQUISITOR_OP_CATHOLIC";
const INQUISITOR_OP_ISLAMIC = "INQUISITOR_OP_ISLAMIC";
const INQUISITOR_OP_REFORMIST = "INQUISITOR_OP_REFORMIST";
const REPRESS_OP_KNIGHT = "REPRESS_OP_KNIGHT";
const REPRESS_OP_PAWN = "REPRESS_OP_PAWN";
const REPRESS_OP_PAWN_KNIGHT = "REPRESS_OP_PAWN_KNIGHT";
const REPRESS_OP_PAWN_ROOK = "REPRESS_OP_PAWN_ROOK";
const REPRESS_OP_PAWN_ROOK_KNIGHT = "REPRESS_OP_PAWN_ROOK_KNIGHT";
const REPRESS_OP_ROOK = "REPRESS_OP_ROOK";
const REPRESS_OP_ROOK_KNIGHT = "REPRESS_OP_ROOK_KNIGHT";
const SIEGE_OP = "SIEGE_OP";
const TAX_OP = "TAX_OP";
const VOTE_OP_EAST = "VOTE_OP_EAST";
const VOTE_OP_WEST = "VOTE_OP_WEST";
