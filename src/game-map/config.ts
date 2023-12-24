const THRONES_CONFIG: Record<string, {top: number; left: number; location: 'top' | 'bottom'}> = {
  [ENGLAND]: {
    top: 120,
    left: 349,
    location: 'top',
  },
  [FRANCE]: {
    top: 120,
    left: 526,
    location: 'top',
  },
  [HOLY_ROMAN_EMIRE]: {
    top: 120,
    left: 700,
    location: 'top',
  },
  [HUNGARY]: {
    top: 120,
    left: 876,
    location: 'top',
  },
  [BYZANTIUM]: {
    top: 120,
    left: 1052,
    location: 'top',
  },
  [PORTUGAL]: {
    top: 754,
    left: 349,
    location: 'bottom',
  },
  [ARAGON]: {
    top: 754,
    left: 526,
    location: 'bottom',
  },
  [PAPAL_STATES]: {
    top: 754,
    left: 700,
    location: 'bottom',
  },
  [OTTOMAN]: {
    top: 754,
    left: 876,
    location: 'bottom',
  },
  [MAMLUK]: {
    top: 754,
    left: 1052,
    location: 'bottom',
  },
};

const MARKET_EAST_CONFIG = [
  {
    top: 1200,
    left: 93,
  },
  {
    top: 1200,
    left: 256,
  },
  {
    top: 1200,
    left: 425,
  },
  {
    top: 1200,
    left: 594,
  },
  {
    top: 1200,
    left: 762,
  },
  {
    top: 1200,
    left: 931,
  },
];

const MARKET_WEST_CONFIG = [
  {
    top: 950,
    left: 93,
  },
  {
    top: 950,
    left: 256,
  },
  {
    top: 950,
    left: 425,
  },
  {
    top: 950,
    left: 594,
  },
  {
    top: 950,
    left: 762,
  },
  {
    top: 950,
    left: 931,
  },
];

const VICTORY_CARD_CONFIG = {
  [VICTORY_RENAISSANCE]: {
    top: 120.5,
    left: 135.5,
  },
  [VICTORY_GLOBALIZATION]: {
    top: 296,
    left: 135.5,
  },
  [VICTORY_IMPERIAL]: {
    top: 578,
    left: 135.5,
  },
  [VICTORY_HOLY]: {
    top: 753.5,
    left: 135.5,
  },
};

const MAP_CONFIG = {
  [ENGLAND]: {
    top: 270,
    left: 350,
    cities: {
      [LONDON]: {
        top: 76,
        left: 80,
      },
      [BORDEAUX]: {
        top: 185,
        left: 108,
      },
    },
  },
  [FRANCE]: {
    top: 270,
    left: 525.5,
    cities: {
      [BRUGES]: {
        top: 65.5,
        left: 51.5,
      },
      [PARIS]: {
        top: 127,
        left: 9,
      },
      [LYON]: {
        top: 164,
        left: 91,
      },
    },
  },
  [HOLY_ROMAN_EMIRE]: {
    top: 270,
    left: 701,
    cities: {
      [LUBECK]: {
        top: 42,
        left: 27,
      },
      [NOVGOROD]: {
        top: 35,
        left: 89,
      },
      [NURNBERG]: {
        top: 128.5,
        left: 14,
      },
      [VIENNA]: {
        top: 150,
        left: 88.5,
      },
    },
  },
  [HUNGARY]: {
    top: 270,
    left: 876,
    cities: {
      [BUDA]: {
        top: 158,
        left: 15.5,
      },
      [VARNA]: {
        top: 170.5,
        left: 76,
      },
    },
  },
  [BYZANTIUM]: {
    top: 270,
    left: 1053,
    cities: {
      [TANA]: {
        top: 41,
        left: 40,
      },
      [CAFFA]: {
        top: 131,
        left: 5,
      },
      [TREBIZOND]: {
        top: 188,
        left: 112,
      },
    },
  },
  [PORTUGAL]: {
    top: 525,
    left: 350,
    cities: {
      [TOLEDO]: {
        top: 62.5,
        left: 94,
      },
      [GRANADA]: {
        top: 118.5,
        left: 103,
      },
      [SPICE_ISLANDS]: {
        top: 184,
        left: 37,
      },
    },
  },
  [ARAGON]: {
    top: 525,
    left: 525.5,
    cities: {
      [VALENCIA]: {
        top: 55.5,
        left: 14.5,
      },
      [ALGIERS]: {
        top: 143.5,
        left: 101,
      },
      [TIMBUKTU]: {
        top: 165.5,
        left: 33,
      },
    },
  },
  [PAPAL_STATES]: {
    top: 525,
    left: 701,
    cities: {
      [VENICE]: {
        top: 20.5,
        left: 40,
      },
    },
  },
  [OTTOMAN]: {
    top: 525,
    left: 876,
    cities: {
      [CONSTANTINOPLE_1]: {
        top: 24.5,
        left: 10.5,
      },
      [CONSTANTINOPLE_2]: {
        top: 24.5,
        left: 45,
      },
      [CONSTANTINOPLE_3]: {
        top: 24.5,
        left: 79.5,
      },
      [MODON]: {
        top: 96,
        left: 19.5,
      },
      [RHODES]: {
        top: 86.5,
        left: 108,
      },
    },
  },
  [MAMLUK]: {
    top: 525,
    left: 1053,
    cities: {
      [CYPRUS]: {
        top: 76,
        left: 54.5,
      },
      [CAIRO]: {
        top: 162,
        left: 42,
      },
      [RED_SEA]: {
        top: 163.5,
        left: 106,
      },
    },
  },
};

const BORDER_CONFIG = {
  [BORDER_ARAGON_FRANCE]: {
    top: 495,
    left: 586,
  },
  [BORDER_ARAGON_PAPAL_STATES]: {
    top: 601,
    left: 670,
  },
  [BORDER_ARAGON_PORTUGAL]: {
    top: 676,
    left: 495,
  },
  [BORDER_BYZANTIUM_HUNGARY]: {
    top: 446,
    left: 1022,
  },
  [BORDER_BYZANTIUM_MAMLUK]: {
    top: 495,
    left: 1112,
  },
  [BORDER_ENGLAND_PORTUGAL]: {
    top: 495,
    left: 390,
  },
  [BORDER_ENGLAND_FRANCE]: {
    top: 348,
    left: 495,
  },
  [BORDER_FRANCE_HOLY_ROMAN_EMPIRE]: {
    top: 313,
    left: 670,
  },
  [BORDER_HOLY_ROMAN_EMPIRE_HUNGARY]: {
    top: 368,
    left: 846,
  },
  [BORDER_HOLY_ROMAN_EMPIRE_PAPAL_STATES]: {
    top: 495,
    left: 754,
  },
  [BORDER_HUNGARY_OTTOMAN]: {
    top: 495,
    left: 976,
  },
  [BORDER_MAMLUK_OTTOMAN]: {
    top: 670,
    left: 1022,
  },
  [BORDER_OTTOMAN_PAPAL_STATES]: {
    top: 663,
    left: 846,
  },
};
