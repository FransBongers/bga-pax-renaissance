var MIN_PLAY_AREA_WIDTH = 1516;
var CLIENT_CONFIRM_TABLEAU_OPS = "clientConfirmTableauOpsState";
var CLIENT_DECLARE_VICTORY_STATE = "clientDeclareVictoryState";
var CLIENT_SELL_CARD_STATE = "clientSellCardState";
var CLIENT_START_TRADE_FAIR_STATE = "clientStartTradeFairState";
var CLIENT_USE_ABILITY_ACTION_STATE = "clientUseAbilityActionState";
var ENABLED = 'enabled';
var REPRESS_TOKENS_TO_THRONES = 'repressTokensToThrones';
var CARDS_IN_TABLEAU_OVERLAP = 'cardsInTableauOverlap';
var CARD_SIZE_IN_TABLEAU = 'cardSizeInTableau';
var CARD_SIZE_IN_LOG = 'cardSizeInLog';
var CARD_INFO_IN_TOOLTIP = 'cardInfoInTooltip';
var OVERLAP_EMPIRE_SQUARES = 'overlapEmpireSquares';
var CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY = 'confirmEndOfTurnPlayerSwitchOnly';
var PREF_SHOW_ANIMATIONS = 'showAnimations';
var PREF_ANIMATION_SPEED = 'animationSpeed';
var SHOW_FLORIN_CARD_COUNTERS = 'florinCardCountersTableau';
var PREF_SHOW_ACTION_BUTTONS = 'showActionButtons';
var CITY = 'city';
var BORDER = 'border';
var CARD = 'card';
var BLUE = "blue";
var GREEN = "green";
var PURPLE = "purple";
var YELLOW = "yellow";
var BLACK = "black";
var WHITE = "white";
var COLOR_MAP = {
    "1084c7": BLUE,
    bddcc6: GREEN,
    "732473": PURPLE,
    ffce00: YELLOW,
    "191716": BLACK,
    bfc0c3: WHITE
};
var COLORS_WITH_SHADOW = [GREEN, YELLOW];
var DISABLED = "disabled";
var PR_NONE = "pr_none";
var PR_SELECTABLE = "pr_selectable";
var PR_SELECTED = "pr_selected";
var DISCARD = "discard";
var FUGGER = "fugger";
var MEDICI = "medici";
var COEUR = "coeur";
var MARCHIONNI = "marchionni";
var BERENBERG = 'berenberg';
var MENDES = 'mendes';
var WEST = "west";
var EAST = "east";
var EAST_AND_WEST = 'eastAndWest';
var REGIONS = [WEST, EAST];
var EMPIRE_CARD = "empireCard";
var TABLEAU_CARD = "tableauCard";
var VICTORY_CARD = "victoryCard";
var EMPIRE_CARD_CONTAINER = "empireCardContainer";
var KING = "king";
var REPUBLIC = "republic";
var VASSAL = 'vassal';
var ACTIVE = "active";
var INACTIVE = "inactive";
var BISHOP = "bishop";
var DISK = "disk";
var KNIGHT = "knight";
var PAWN = "pawn";
var PIRATE = "pirate";
var ROOK = "rook";
var MEDIEVAL = "medieval";
var CATHOLIC = "catholic";
var ISLAMIC = "islamic";
var REFORMIST = "reformist";
var RELIGIONS = [CATHOLIC, ISLAMIC, REFORMIST];
var DISCOVERY = "discovery";
var LAW = "law";
var PATRON = "patron";
var ENGLAND = "england";
var FRANCE = "france";
var HOLY_ROMAN_EMIRE = "holyRomanEmpire";
var HUNGARY = "hungary";
var BYZANTIUM = "byzantium";
var PORTUGAL = "portugal";
var ARAGON = "aragon";
var PAPAL_STATES = "papalStates";
var OTTOMAN = "ottoman";
var MAMLUK = "mamluk";
var EMPIRES = [
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
var EMPIRE_SQUARE_DESTINATION_KING = 'king';
var EMPIRE_SQUARE_DESTINATION_VASSAL = 'vassal';
var EMPIRE_SQUARE_ORIGIN_TABLEAU = 'tableau';
var EMPIRE_SQUARE_ORIGIN_THRONE = 'throne';
var BORDER_ARAGON_FRANCE = "border_aragon_france";
var BORDER_ARAGON_PAPAL_STATES = "border_aragon_papalStates";
var BORDER_ARAGON_PORTUGAL = "border_aragon_portugal";
var BORDER_BYZANTIUM_HUNGARY = "border_byzantium_hungary";
var BORDER_BYZANTIUM_MAMLUK = "border_byzantium_mamluk";
var BORDER_ENGLAND_FRANCE = "border_england_france";
var BORDER_ENGLAND_PORTUGAL = "border_england_portugal";
var BORDER_FRANCE_HOLY_ROMAN_EMPIRE = "border_france_holyRomanEmpire";
var BORDER_HOLY_ROMAN_EMPIRE_HUNGARY = "border_holyRomanEmpire_hungary";
var BORDER_HOLY_ROMAN_EMPIRE_PAPAL_STATES = "border_holyRomanEmpire_papalStates";
var BORDER_HUNGARY_OTTOMAN = "border_hungary_ottoman";
var BORDER_MAMLUK_OTTOMAN = "border_mamluk_ottoman";
var BORDER_OTTOMAN_PAPAL_STATES = "border_ottoman_papalStates";
var BORDERS = [
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
var VICTORY_RENAISSANCE = "victory_renaissance";
var VICTORY_GLOBALIZATION = "victory_globalization";
var VICTORY_AGE_OF_BYZANTINE = 'victory_ageOfByzantine';
var VICTORY_IMPERIAL = "victory_imperial";
var VICTORY_HOLY = "victory_holy";
var VICTORY_SQUARES = [
    VICTORY_RENAISSANCE,
    VICTORY_GLOBALIZATION,
    VICTORY_IMPERIAL,
    VICTORY_HOLY,
];
var LONDON = "london";
var BORDEAUX = "bordeaux";
var BRUGES = "bruges";
var PARIS = "paris";
var KVIV = "kviv";
var LYON = "lyon";
var LUBECK = "lubeck";
var NURNBERG = "nurnberg";
var NOVGOROD = "novgorod";
var VIENNA = "vienna";
var BUDA = "buda";
var VARNA = "varna";
var TANA = "tana";
var CAFFA = "caffa";
var TREBIZOND = "trebizond";
var TOLEDO = "toledo";
var GRANADA = "granada";
var SPICE_ISLANDS = "spiceIslands";
var VALENCIA = "valencia";
var ALGIERS = "algiers";
var TIMBUKTU = "timbuktu";
var VENICE = "venice";
var VENICE_2 = "venice2";
var CONSTANTINOPLE_1 = "constantinople1";
var CONSTANTINOPLE_2 = "constantinople2";
var CONSTANTINOPLE_3 = "constantinople3";
var MODON = "modon";
var RHODES = "rhodes";
var CYPRUS = "cyprus";
var CAIRO = "cairo";
var RED_SEA = "redSea";
var CITIES = [
    LONDON,
    BORDEAUX,
    BRUGES,
    PARIS,
    KVIV,
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
    VENICE_2,
    CONSTANTINOPLE_1,
    CONSTANTINOPLE_2,
    CONSTANTINOPLE_3,
    MODON,
    RHODES,
    CYPRUS,
    CAIRO,
    RED_SEA,
];
var RELIGIOUS = "religious";
var ECONOMIC = "economic";
var POLITICAL = "political";
var MILITARY = "military";
var BEHEAD_OP = "BEHEAD_OP";
var CAMPAIGN_OP = "CAMPAIGN_OP";
var COMMERCE_OP_EAST = "COMMERCE_OP_EAST";
var COMMERCE_OP_WEST = "COMMERCE_OP_WEST";
var CORSAIR_OP_CATHOLIC = "CORSAIR_OP_CATHOLIC";
var CORSAIR_OP_ISLAMIC = "CORSAIR_OP_ISLAMIC";
var CORSAIR_OP_REFORMIST = "CORSAIR_OP_REFORMIST";
var INQUISITOR_OP_CATHOLIC = "INQUISITOR_OP_CATHOLIC";
var INQUISITOR_OP_ISLAMIC = "INQUISITOR_OP_ISLAMIC";
var INQUISITOR_OP_REFORMIST = "INQUISITOR_OP_REFORMIST";
var REPRESS_OP_KNIGHT = "REPRESS_OP_KNIGHT";
var REPRESS_OP_PAWN = "REPRESS_OP_PAWN";
var REPRESS_OP_PAWN_KNIGHT = "REPRESS_OP_PAWN_KNIGHT";
var REPRESS_OP_PAWN_ROOK = "REPRESS_OP_PAWN_ROOK";
var REPRESS_OP_PAWN_ROOK_KNIGHT = "REPRESS_OP_PAWN_ROOK_KNIGHT";
var REPRESS_OP_ROOK = "REPRESS_OP_ROOK";
var REPRESS_OP_ROOK_KNIGHT = "REPRESS_OP_ROOK_KNIGHT";
var SIEGE_OP = "SIEGE_OP";
var TAX_OP = "TAX_OP";
var VOTE_OP_EAST = "VOTE_OP_EAST";
var VOTE_OP_WEST = "VOTE_OP_WEST";
var APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT = 'APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT';
var APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT = 'APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT';
var APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT = 'APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT';
var CONSPIRACY_ONE_SHOT = 'CONSPIRACY_ONE_SHOT';
var CORONATION_ONE_SHOT = 'CORONATION_ONE_SHOT';
var CRUSADE_ONE_SHOT = 'CRUSADE_ONE_SHOT';
var JIHAD_ONE_SHOT = 'JIHAD_ONE_SHOT';
var PEASANT_REVOLT_ONE_SHOT = 'PEASANT_REVOLT_ONE_SHOT';
var REFORMATION_ONE_SHOT = 'REFORMATION_ONE_SHOT';
var TRADE_SHIFT_NOVGOROD_ONE_SHOT = 'TRADE_SHIFT_NOVGOROD_ONE_SHOT';
var TRADE_SHIFT_RED_SEA_ONE_SHOT = 'TRADE_SHIFT_RED_SEA_ONE_SHOT';
var TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT = 'TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT';
var TRADE_SHIFT_TIMBUKTU_ONE_SHOT = 'TRADE_SHIFT_TIMBUKTU_ONE_SHOT';
var SA_BEHEAD_EAST_CARD_WITH_BISHOP_ONLY = 'SA_BEHEAD_EAST_CARD_WITH_BISHOP_ONLY';
var SA_BEHEAD_EAST_CARD_WITH_ISLAMIC_REFORMIST_BISHOP_ONLY = 'SA_BEHEAD_EAST_CARD_WITH_ISLAMIC_REFORMIST_BISHOP_ONLY';
var SA_BEHEAD_WEST_CARD_WITH_CATHOLIC_REFORMIST_BISHOP_ONLY = 'SA_BEHEAD_WEST_CARD_WITH_CATHOLIC_REFORMIST_BISHOP_ONLY';
var SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_1 = 'SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_1';
var SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_2 = 'SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_2';
var SA_CONCESSIONS_2X_SPICE_ISLANDS_TRADE_FAIRS_1 = 'SA_CONCESSIONS_2X_SPICE_ISLANDS_TRADE_FAIRS_1';
var SA_CONCESSIONS_2X_SPICE_ISLANDS_TRADE_FAIRS_2 = 'SA_CONCESSIONS_2X_SPICE_ISLANDS_TRADE_FAIRS_2';
var SA_CONCESSIONS_2X_TRADE_FAIRS_VOTES = 'SA_CONCESSIONS_2X_TRADE_FAIRS_VOTES';
var SA_CONCESSIONS_CANNOT_BE_KILLED_BY_PIRATES = 'SA_CONCESSIONS_CANNOT_BE_KILLED_BY_PIRATES';
var SA_CORONATION_CAN_CLAIM_MARRIED_KINGS = 'SA_CORONATION_CAN_CLAIM_MARRIED_KINGS';
var SA_DECLARE_GLOBALIZATION_COSTS_TWO_ACTIONS = 'SA_DECLARE_GLOBALIZATION_COSTS_TWO_ACTIONS';
var SA_DECLARE_HOLY_COSTS_TWO_ACTIONS = 'SA_DECLARE_HOLY_COSTS_TWO_ACTIONS';
var SA_DECLARE_IMPERIAL_COSTS_TWO_ACTIONS = 'SA_DECLARE_IMPERIAL_COSTS_TWO_ACTIONS';
var SA_DISCARD_TO_LAUNCH_PEASANT_REVOLT = 'SA_DISCARD_TO_LAUNCH_PEASANT_REVOLT';
var SA_EAST_AND_WEST_OPS_IN_ONE_ACTION = 'SA_EAST_AND_WEST_OPS_IN_ONE_ACTION';
var SA_EMPORIUM_SUBSIDY_2_FLORINS = 'SA_EMPORIUM_SUBSIDY_2_FLORINS';
var SA_FREE_EASTERN_OPS = 'SA_FREE_EASTERN_OPS';
var SA_FREE_WESTERN_OPS = 'SA_FREE_WESTERN_OPS';
var SA_FREE_TRADE_FAIR = 'SA_FREE_TRADE_FAIR';
var SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS = 'SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS';
var SA_IMMUNE_TO_APOSTASY = 'SA_IMMUNE_TO_APOSTASY';
var SA_IMMUNE_TO_SILENCING = 'SA_IMMUNE_TO_SILENCING';
var SA_IN_CRUSADE_COUNT_ROOKS_AS_KNIGHTS = 'SA_IN_CRUSADE_COUNT_ROOKS_AS_KNIGHTS';
var SA_PERFORM_APOSTASY_AS_AN_ACTION = 'SA_PERFORM_APOSTASY_AS_AN_ACTION';
var SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_1 = 'SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_1';
var SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_2 = 'SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_2';
var SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY = 'SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY';
var SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_1 = 'SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_1';
var SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_2 = 'SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_2';
var SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_3 = 'SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_3';
var SA_PATRON_REDUCES_VOTE_OPS_COST = 'SA_PATRON_REDUCES_VOTE_OPS_COST';
var SA_PORTUGAL_FRANCE_NOT_ADJACENT = 'SA_PORTUGAL_FRANCE_NOT_ADJACENT';
var SA_REPRESSED_TOKENS_COUNTS_AS_KNIGHT_IN_EAST_CAMPAIGN = 'SA_REPRESSED_TOKENS_COUNTS_AS_KNIGHT_IN_EAST_CAMPAIGN';
var SA_SELL_AND_EMANCIPATE_ALL_REPRESSED_TOKENS_IN_THE_WEST = 'SA_SELL_AND_EMANCIPATE_ALL_REPRESSED_TOKENS_IN_THE_WEST';
var SA_SELL_AND_PERFORM_ONE_SHOT = 'SA_SELL_AND_PERFORM_ONE_SHOT';
var SA_SELL_AND_PERFORM_PURPLE_OP_FROM_OPPONENT = 'SA_SELL_AND_PERFORM_PURPLE_OP_FROM_OPPONENT';
var SA_SELL_FOR_4 = 'SA_SELL_FOR_4';
var SA_UNLIMITED_HAND_SIZE = 'SA_UNLIMITED_HAND_SIZE';
var SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS = 'SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS';
var Modal = (function () {
    function Modal(id, config) {
        var _this = this;
        this.open = false;
        this.container = 'ebd-body';
        this.class = 'custom_popin';
        this.autoShow = false;
        this.modalTpl = "\n    <div id='popin_${id}_container' class=\"${class}_container\">\n      <div id='popin_${id}_underlay' class=\"${class}_underlay\"></div>\n      <div id='popin_${id}_wrapper' class=\"${class}_wrapper\">\n        <div id=\"popin_${id}\" class=\"${class}\">\n          ${titleTpl}\n          ${closeIconTpl}\n          ${helpIconTpl}\n          ${contentsTpl}\n        </div>\n      </div>\n    </div>\n  ";
        this.closeIcon = 'fa-times-circle';
        this.closeIconTpl = '<a id="popin_${id}_close" class="${class}_closeicon"><i class="fa ${closeIcon} fa-2x" aria-hidden="true"></i></a>';
        this.closeAction = 'destroy';
        this.closeWhenClickOnUnderlay = true;
        this.helpIcon = null;
        this.helpLink = '#';
        this.helpIconTpl = '<a href="${helpLink}" target="_blank" id="popin_${id}_help" class="${class}_helpicon"><i class="fa ${helpIcon} fa-2x" aria-hidden="true"></i></a>';
        this.title = null;
        this.titleTpl = '<h2 id="popin_${id}_title" class="${class}_title">${title}</h2>';
        this.contentsTpl = "\n      <div id=\"popin_${id}_contents\" class=\"${class}_contents\">\n        ${contents}\n      </div>";
        this.contents = '';
        this.verticalAlign = 'center';
        this.animationDuration = 500;
        this.fadeIn = true;
        this.fadeOut = true;
        this.openAnimation = false;
        this.openAnimationTarget = null;
        this.openAnimationDelta = 200;
        this.onShow = null;
        this.onHide = null;
        this.statusElt = null;
        this.scale = 1;
        this.breakpoint = null;
        if (id === undefined) {
            console.error('You need an ID to create a modal');
            throw 'You need an ID to create a modal';
        }
        this.id = id;
        Object.entries(config).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (value !== undefined) {
                _this[key] = value;
            }
        });
        this.create();
        if (this.autoShow)
            this.show();
    }
    Modal.prototype.isDisplayed = function () {
        return this.open;
    };
    Modal.prototype.isCreated = function () {
        return this.id != null;
    };
    Modal.prototype.create = function () {
        var _this = this;
        dojo.destroy('popin_' + this.id + '_container');
        var titleTpl = this.title == null ? '' : dojo.string.substitute(this.titleTpl, this);
        var closeIconTpl = this.closeIcon == null ? '' : dojo.string.substitute(this.closeIconTpl, this);
        var helpIconTpl = this.helpIcon == null ? '' : dojo.string.substitute(this.helpIconTpl, this);
        var contentsTpl = dojo.string.substitute(this.contentsTpl, this);
        var modalTpl = dojo.string.substitute(this.modalTpl, {
            id: this.id,
            class: this.class,
            titleTpl: titleTpl,
            closeIconTpl: closeIconTpl,
            helpIconTpl: helpIconTpl,
            contentsTpl: contentsTpl,
        });
        dojo.place(modalTpl, this.container);
        dojo.style('popin_' + this.id + '_container', {
            display: 'none',
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '100%',
            height: '100%',
        });
        dojo.style('popin_' + this.id + '_underlay', {
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '100%',
            height: '100%',
            zIndex: 949,
            opacity: 0,
            backgroundColor: 'white',
        });
        dojo.style('popin_' + this.id + '_wrapper', {
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: 'min(100%,100vw)',
            height: '100vh',
            zIndex: 950,
            opacity: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: this.verticalAlign,
            paddingTop: this.verticalAlign == 'center' ? 0 : '125px',
            transformOrigin: 'top left',
        });
        this.adjustSize();
        this.resizeListener = dojo.connect(window, 'resize', function () { return _this.adjustSize(); });
        if (this.closeIcon != null && $('popin_' + this.id + '_close')) {
            dojo.connect($('popin_' + this.id + '_close'), 'click', function () { return _this[_this.closeAction](); });
        }
        if (this.closeWhenClickOnUnderlay) {
            dojo.connect($('popin_' + this.id + '_underlay'), 'click', function () { return _this[_this.closeAction](); });
            dojo.connect($('popin_' + this.id + '_wrapper'), 'click', function () { return _this[_this.closeAction](); });
            dojo.connect($('popin_' + this.id), 'click', function (evt) { return evt.stopPropagation(); });
        }
    };
    Modal.prototype.updateContent = function (newContent) {
        var contentContainerId = "popin_".concat(this.id, "_contents");
        dojo.empty(contentContainerId);
        dojo.place(newContent, contentContainerId);
    };
    Modal.prototype.adjustSize = function () {
        var bdy = dojo.position(this.container);
        dojo.style('popin_' + this.id + '_container', {
            width: bdy.w + 'px',
            height: bdy.h + 'px',
        });
        if (this.breakpoint != null) {
            var newModalWidth = bdy.w * this.scale;
            var modalScale = newModalWidth / this.breakpoint;
            if (modalScale > 1)
                modalScale = 1;
            dojo.style('popin_' + this.id, {
                transform: "scale(".concat(modalScale, ")"),
                transformOrigin: this.verticalAlign == 'center' ? 'center center' : 'top center',
            });
        }
    };
    Modal.prototype.getOpeningTargetCenter = function () {
        var startTop, startLeft;
        if (this.openAnimationTarget == null) {
            startLeft = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 2;
            startTop = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) / 2;
        }
        else {
            var target = dojo.position(this.openAnimationTarget);
            startLeft = target.x + target.w / 2;
            startTop = target.y + target.h / 2;
        }
        return {
            x: startLeft,
            y: startTop,
        };
    };
    Modal.prototype.fadeInAnimation = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var containerId = 'popin_' + _this.id + '_container';
            if (!$(containerId))
                reject();
            if (_this.runningAnimation)
                _this.runningAnimation.stop();
            var duration = _this.fadeIn ? _this.animationDuration : 0;
            var animations = [];
            animations.push(dojo.fadeIn({
                node: 'popin_' + _this.id + '_wrapper',
                duration: duration,
            }));
            animations.push(dojo.animateProperty({
                node: 'popin_' + _this.id + '_underlay',
                duration: duration,
                properties: { opacity: { start: 0, end: 0.7 } },
            }));
            if (_this.openAnimation) {
                var pos = _this.getOpeningTargetCenter();
                animations.push(dojo.animateProperty({
                    node: 'popin_' + _this.id + '_wrapper',
                    properties: {
                        transform: { start: 'scale(0)', end: 'scale(1)' },
                        top: { start: pos.y, end: 0 },
                        left: { start: pos.x, end: 0 },
                    },
                    duration: _this.animationDuration + _this.openAnimationDelta,
                }));
            }
            _this.runningAnimation = dojo.fx.combine(animations);
            dojo.connect(_this.runningAnimation, 'onEnd', function () { return resolve(); });
            _this.runningAnimation.play();
            setTimeout(function () {
                if ($('popin_' + _this.id + '_container'))
                    dojo.style('popin_' + _this.id + '_container', 'display', 'block');
            }, 10);
        });
    };
    Modal.prototype.show = function () {
        var _this = this;
        if (this.isOpening || this.open)
            return;
        if (this.statusElt !== null) {
            dojo.addClass(this.statusElt, 'opened');
        }
        this.adjustSize();
        this.isOpening = true;
        this.isClosing = false;
        this.fadeInAnimation().then(function () {
            if (!_this.isOpening)
                return;
            _this.isOpening = false;
            _this.open = true;
            if (_this.onShow !== null) {
                _this.onShow();
            }
        });
    };
    Modal.prototype.fadeOutAnimation = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var containerId = 'popin_' + _this.id + '_container';
            if (!$(containerId))
                reject();
            if (_this.runningAnimation)
                _this.runningAnimation.stop();
            var duration = _this.fadeOut ? _this.animationDuration + (_this.openAnimation ? _this.openAnimationDelta : 0) : 0;
            var animations = [];
            animations.push(dojo.fadeOut({
                node: 'popin_' + _this.id + '_wrapper',
                duration: duration,
            }));
            animations.push(dojo.animateProperty({
                node: 'popin_' + _this.id + '_underlay',
                duration: duration,
                properties: { opacity: { start: 0.7, end: 0 } },
            }));
            if (_this.openAnimation) {
                var pos = _this.getOpeningTargetCenter();
                animations.push(dojo.animateProperty({
                    node: 'popin_' + _this.id + '_wrapper',
                    properties: {
                        transform: { start: 'scale(1)', end: 'scale(0)' },
                        top: { start: 0, end: pos.y },
                        left: { start: 0, end: pos.x },
                    },
                    duration: _this.animationDuration,
                }));
            }
            _this.runningAnimation = dojo.fx.combine(animations);
            dojo.connect(_this.runningAnimation, 'onEnd', function () { return resolve(); });
            _this.runningAnimation.play();
        });
    };
    Modal.prototype.hide = function () {
        var _this = this;
        if (this.isClosing)
            return;
        this.isClosing = true;
        this.isOpening = false;
        this.fadeOutAnimation().then(function () {
            if (!_this.isClosing || _this.isOpening)
                return;
            _this.isClosing = false;
            _this.open = false;
            dojo.style('popin_' + _this.id + '_container', 'display', 'none');
            if (_this.onHide !== null) {
                _this.onHide();
            }
            if (_this.statusElt !== null) {
                dojo.removeClass(_this.statusElt, 'opened');
            }
        });
    };
    Modal.prototype.destroy = function () {
        var _this = this;
        if (this.isClosing)
            return;
        this.isOpening = false;
        this.isClosing = true;
        this.fadeOutAnimation().then(function () {
            if (!_this.isClosing || _this.isOpening)
                return;
            _this.isClosing = false;
            _this.open = false;
            _this.kill();
        });
    };
    Modal.prototype.kill = function () {
        if (this.runningAnimation)
            this.runningAnimation.stop();
        var underlayId = 'popin_' + this.id + '_container';
        dojo.destroy(underlayId);
        dojo.disconnect(this.resizeListener);
        this.id = null;
        if (this.statusElt !== null) {
            dojo.removeClass(this.statusElt, 'opened');
        }
    };
    return Modal;
}());
var BgaAnimation = (function () {
    function BgaAnimation(animationFunction, settings) {
        this.animationFunction = animationFunction;
        this.settings = settings;
        this.played = null;
        this.result = null;
        this.playWhenNoAnimation = false;
    }
    return BgaAnimation;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function attachWithAnimation(animationManager, animation) {
    var _a;
    var settings = animation.settings;
    var element = settings.animation.settings.element;
    var fromRect = element.getBoundingClientRect();
    settings.animation.settings.fromRect = fromRect;
    settings.attachElement.appendChild(element);
    (_a = settings.afterAttach) === null || _a === void 0 ? void 0 : _a.call(settings, element, settings.attachElement);
    return animationManager.play(settings.animation);
}
var BgaAttachWithAnimation = (function (_super) {
    __extends(BgaAttachWithAnimation, _super);
    function BgaAttachWithAnimation(settings) {
        var _this = _super.call(this, attachWithAnimation, settings) || this;
        _this.playWhenNoAnimation = true;
        return _this;
    }
    return BgaAttachWithAnimation;
}(BgaAnimation));
function cumulatedAnimations(animationManager, animation) {
    return animationManager.playSequence(animation.settings.animations);
}
var BgaCumulatedAnimation = (function (_super) {
    __extends(BgaCumulatedAnimation, _super);
    function BgaCumulatedAnimation(settings) {
        var _this = _super.call(this, cumulatedAnimations, settings) || this;
        _this.playWhenNoAnimation = true;
        return _this;
    }
    return BgaCumulatedAnimation;
}(BgaAnimation));
function showScreenCenterAnimation(animationManager, animation) {
    var promise = new Promise(function (success) {
        var _a, _b, _c, _d;
        var settings = animation.settings;
        var element = settings.element;
        var elementBR = element.getBoundingClientRect();
        var xCenter = (elementBR.left + elementBR.right) / 2;
        var yCenter = (elementBR.top + elementBR.bottom) / 2;
        var x = xCenter - (window.innerWidth / 2);
        var y = yCenter - (window.innerHeight / 2);
        var duration = (_a = settings === null || settings === void 0 ? void 0 : settings.duration) !== null && _a !== void 0 ? _a : 500;
        var originalZIndex = element.style.zIndex;
        var originalTransition = element.style.transition;
        var transitionTimingFunction = (_b = settings.transitionTimingFunction) !== null && _b !== void 0 ? _b : 'linear';
        element.style.zIndex = "".concat((_c = settings === null || settings === void 0 ? void 0 : settings.zIndex) !== null && _c !== void 0 ? _c : 10);
        var timeoutId = null;
        var cleanOnTransitionEnd = function () {
            element.style.zIndex = originalZIndex;
            element.style.transition = originalTransition;
            success();
            element.removeEventListener('transitioncancel', cleanOnTransitionEnd);
            element.removeEventListener('transitionend', cleanOnTransitionEnd);
            document.removeEventListener('visibilitychange', cleanOnTransitionEnd);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
        var cleanOnTransitionCancel = function () {
            var _a;
            element.style.transition = "";
            element.offsetHeight;
            element.style.transform = (_a = settings === null || settings === void 0 ? void 0 : settings.finalTransform) !== null && _a !== void 0 ? _a : null;
            element.offsetHeight;
            cleanOnTransitionEnd();
        };
        element.addEventListener('transitioncancel', cleanOnTransitionEnd);
        element.addEventListener('transitionend', cleanOnTransitionEnd);
        document.addEventListener('visibilitychange', cleanOnTransitionCancel);
        element.offsetHeight;
        element.style.transition = "width 1s, height 1s, transform ".concat(duration, "ms ").concat(transitionTimingFunction);
        element.offsetHeight;
        element.style.transform = "translate(".concat(-x, "px, ").concat(-y, "px) rotate(").concat((_d = settings === null || settings === void 0 ? void 0 : settings.rotationDelta) !== null && _d !== void 0 ? _d : 0, "deg)");
        timeoutId = setTimeout(cleanOnTransitionEnd, duration + 100);
    });
    return promise;
}
var BgaShowScreenCenterAnimation = (function (_super) {
    __extends(BgaShowScreenCenterAnimation, _super);
    function BgaShowScreenCenterAnimation(settings) {
        return _super.call(this, showScreenCenterAnimation, settings) || this;
    }
    return BgaShowScreenCenterAnimation;
}(BgaAnimation));
function slideToAnimation(animationManager, animation) {
    var promise = new Promise(function (success) {
        var _a, _b, _c, _d, _e;
        var settings = animation.settings;
        var element = settings.element;
        var _f = getDeltaCoordinates(element, settings), x = _f.x, y = _f.y;
        var duration = (_a = settings === null || settings === void 0 ? void 0 : settings.duration) !== null && _a !== void 0 ? _a : 500;
        var originalZIndex = element.style.zIndex;
        var originalTransition = element.style.transition;
        var transitionTimingFunction = (_b = settings.transitionTimingFunction) !== null && _b !== void 0 ? _b : 'linear';
        element.style.zIndex = "".concat((_c = settings === null || settings === void 0 ? void 0 : settings.zIndex) !== null && _c !== void 0 ? _c : 10);
        var timeoutId = null;
        var cleanOnTransitionEnd = function () {
            element.style.zIndex = originalZIndex;
            element.style.transition = originalTransition;
            success();
            element.removeEventListener('transitioncancel', cleanOnTransitionEnd);
            element.removeEventListener('transitionend', cleanOnTransitionEnd);
            document.removeEventListener('visibilitychange', cleanOnTransitionEnd);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
        var cleanOnTransitionCancel = function () {
            var _a;
            element.style.transition = "";
            element.offsetHeight;
            element.style.transform = (_a = settings === null || settings === void 0 ? void 0 : settings.finalTransform) !== null && _a !== void 0 ? _a : null;
            element.offsetHeight;
            cleanOnTransitionEnd();
        };
        element.addEventListener('transitioncancel', cleanOnTransitionEnd);
        element.addEventListener('transitionend', cleanOnTransitionEnd);
        document.addEventListener('visibilitychange', cleanOnTransitionCancel);
        element.offsetHeight;
        element.style.transition = "transform ".concat(duration, "ms ").concat(transitionTimingFunction);
        element.offsetHeight;
        element.style.transform = "translate(".concat(-x, "px, ").concat(-y, "px) rotate(").concat((_d = settings === null || settings === void 0 ? void 0 : settings.rotationDelta) !== null && _d !== void 0 ? _d : 0, "deg) scale(").concat((_e = settings.scale) !== null && _e !== void 0 ? _e : 1, ")");
        timeoutId = setTimeout(cleanOnTransitionEnd, duration + 100);
    });
    return promise;
}
var BgaSlideToAnimation = (function (_super) {
    __extends(BgaSlideToAnimation, _super);
    function BgaSlideToAnimation(settings) {
        return _super.call(this, slideToAnimation, settings) || this;
    }
    return BgaSlideToAnimation;
}(BgaAnimation));
function slideAnimation(animationManager, animation) {
    var promise = new Promise(function (success) {
        var _a, _b, _c, _d, _e;
        var settings = animation.settings;
        var element = settings.element;
        var _f = getDeltaCoordinates(element, settings), x = _f.x, y = _f.y;
        var duration = (_a = settings.duration) !== null && _a !== void 0 ? _a : 500;
        var originalZIndex = element.style.zIndex;
        var originalTransition = element.style.transition;
        var transitionTimingFunction = (_b = settings.transitionTimingFunction) !== null && _b !== void 0 ? _b : 'linear';
        element.style.zIndex = "".concat((_c = settings === null || settings === void 0 ? void 0 : settings.zIndex) !== null && _c !== void 0 ? _c : 10);
        element.style.transition = null;
        element.offsetHeight;
        element.style.transform = "translate(".concat(-x, "px, ").concat(-y, "px) rotate(").concat((_d = settings === null || settings === void 0 ? void 0 : settings.rotationDelta) !== null && _d !== void 0 ? _d : 0, "deg)");
        var timeoutId = null;
        var cleanOnTransitionEnd = function () {
            element.style.zIndex = originalZIndex;
            element.style.transition = originalTransition;
            success();
            element.removeEventListener('transitioncancel', cleanOnTransitionEnd);
            element.removeEventListener('transitionend', cleanOnTransitionEnd);
            document.removeEventListener('visibilitychange', cleanOnTransitionEnd);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
        var cleanOnTransitionCancel = function () {
            var _a;
            element.style.transition = "";
            element.offsetHeight;
            element.style.transform = (_a = settings === null || settings === void 0 ? void 0 : settings.finalTransform) !== null && _a !== void 0 ? _a : null;
            element.offsetHeight;
            cleanOnTransitionEnd();
        };
        element.addEventListener('transitioncancel', cleanOnTransitionCancel);
        element.addEventListener('transitionend', cleanOnTransitionEnd);
        document.addEventListener('visibilitychange', cleanOnTransitionCancel);
        element.offsetHeight;
        element.style.transition = "transform ".concat(duration, "ms ").concat(transitionTimingFunction);
        element.offsetHeight;
        element.style.transform = (_e = settings === null || settings === void 0 ? void 0 : settings.finalTransform) !== null && _e !== void 0 ? _e : null;
        timeoutId = setTimeout(cleanOnTransitionEnd, duration + 100);
    });
    return promise;
}
var BgaSlideAnimation = (function (_super) {
    __extends(BgaSlideAnimation, _super);
    function BgaSlideAnimation(settings) {
        return _super.call(this, slideAnimation, settings) || this;
    }
    return BgaSlideAnimation;
}(BgaAnimation));
function pauseAnimation(animationManager, animation) {
    var promise = new Promise(function (success) {
        var _a;
        var settings = animation.settings;
        var duration = (_a = settings === null || settings === void 0 ? void 0 : settings.duration) !== null && _a !== void 0 ? _a : 500;
        setTimeout(function () { return success(); }, duration);
    });
    return promise;
}
var BgaPauseAnimation = (function (_super) {
    __extends(BgaPauseAnimation, _super);
    function BgaPauseAnimation(settings) {
        return _super.call(this, pauseAnimation, settings) || this;
    }
    return BgaPauseAnimation;
}(BgaAnimation));
function shouldAnimate(settings) {
    var _a;
    return document.visibilityState !== 'hidden' && !((_a = settings === null || settings === void 0 ? void 0 : settings.game) === null || _a === void 0 ? void 0 : _a.instantaneousMode);
}
function getDeltaCoordinates(element, settings) {
    var _a;
    if (!settings.fromDelta && !settings.fromRect && !settings.fromElement) {
        throw new Error("[bga-animation] fromDelta, fromRect or fromElement need to be set");
    }
    var x = 0;
    var y = 0;
    if (settings.fromDelta) {
        x = settings.fromDelta.x;
        y = settings.fromDelta.y;
    }
    else {
        var originBR = (_a = settings.fromRect) !== null && _a !== void 0 ? _a : settings.fromElement.getBoundingClientRect();
        var originalTransform = element.style.transform;
        element.style.transform = '';
        var destinationBR = element.getBoundingClientRect();
        element.style.transform = originalTransform;
        x = (destinationBR.left + destinationBR.right) / 2 - (originBR.left + originBR.right) / 2;
        y = (destinationBR.top + destinationBR.bottom) / 2 - (originBR.top + originBR.bottom) / 2;
    }
    if (settings.scale) {
        x /= settings.scale;
        y /= settings.scale;
    }
    return { x: x, y: y };
}
function logAnimation(animationManager, animation) {
    var settings = animation.settings;
    var element = settings.element;
    if (element) {
        console.log(animation, settings, element, element.getBoundingClientRect(), element.style.transform);
    }
    else {
        console.log(animation, settings);
    }
    return Promise.resolve(false);
}
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var AnimationManager = (function () {
    function AnimationManager(game, settings) {
        this.game = game;
        this.settings = settings;
        this.zoomManager = settings === null || settings === void 0 ? void 0 : settings.zoomManager;
        if (!game) {
            throw new Error('You must set your game as the first parameter of AnimationManager');
        }
    }
    AnimationManager.prototype.getZoomManager = function () {
        return this.zoomManager;
    };
    AnimationManager.prototype.setZoomManager = function (zoomManager) {
        this.zoomManager = zoomManager;
    };
    AnimationManager.prototype.getSettings = function () {
        return this.settings;
    };
    AnimationManager.prototype.animationsActive = function () {
        return document.visibilityState !== 'hidden' && !this.game.instantaneousMode;
    };
    AnimationManager.prototype.play = function (animation) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        return __awaiter(this, void 0, void 0, function () {
            var settings, _r;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        animation.played = animation.playWhenNoAnimation || this.animationsActive();
                        if (!animation.played) return [3, 2];
                        settings = animation.settings;
                        (_a = settings.animationStart) === null || _a === void 0 ? void 0 : _a.call(settings, animation);
                        (_b = settings.element) === null || _b === void 0 ? void 0 : _b.classList.add((_c = settings.animationClass) !== null && _c !== void 0 ? _c : 'bga-animations_animated');
                        animation.settings = __assign(__assign({}, animation.settings), { duration: (_g = (_e = (_d = animation.settings) === null || _d === void 0 ? void 0 : _d.duration) !== null && _e !== void 0 ? _e : (_f = this.settings) === null || _f === void 0 ? void 0 : _f.duration) !== null && _g !== void 0 ? _g : 500, scale: (_l = (_j = (_h = animation.settings) === null || _h === void 0 ? void 0 : _h.scale) !== null && _j !== void 0 ? _j : (_k = this.zoomManager) === null || _k === void 0 ? void 0 : _k.zoom) !== null && _l !== void 0 ? _l : undefined });
                        _r = animation;
                        return [4, animation.animationFunction(this, animation)];
                    case 1:
                        _r.result = _s.sent();
                        (_o = (_m = animation.settings).animationEnd) === null || _o === void 0 ? void 0 : _o.call(_m, animation);
                        (_p = settings.element) === null || _p === void 0 ? void 0 : _p.classList.remove((_q = settings.animationClass) !== null && _q !== void 0 ? _q : 'bga-animations_animated');
                        return [3, 3];
                    case 2: return [2, Promise.resolve(animation)];
                    case 3: return [2];
                }
            });
        });
    };
    AnimationManager.prototype.playParallel = function (animations) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, Promise.all(animations.map(function (animation) { return _this.play(animation); }))];
            });
        });
    };
    AnimationManager.prototype.playSequence = function (animations) {
        return __awaiter(this, void 0, void 0, function () {
            var result, others;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!animations.length) return [3, 3];
                        return [4, this.play(animations[0])];
                    case 1:
                        result = _a.sent();
                        return [4, this.playSequence(animations.slice(1))];
                    case 2:
                        others = _a.sent();
                        return [2, __spreadArray([result], others, true)];
                    case 3: return [2, Promise.resolve([])];
                }
            });
        });
    };
    AnimationManager.prototype.playWithDelay = function (animations, delay) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return __generator(this, function (_a) {
                promise = new Promise(function (success) {
                    var promises = [];
                    var _loop_1 = function (i) {
                        setTimeout(function () {
                            promises.push(_this.play(animations[i]));
                            if (i == animations.length - 1) {
                                Promise.all(promises).then(function (result) {
                                    success(result);
                                });
                            }
                        }, i * delay);
                    };
                    for (var i = 0; i < animations.length; i++) {
                        _loop_1(i);
                    }
                });
                return [2, promise];
            });
        });
    };
    AnimationManager.prototype.attachWithAnimation = function (animation, attachElement) {
        var attachWithAnimation = new BgaAttachWithAnimation({
            animation: animation,
            attachElement: attachElement
        });
        return this.play(attachWithAnimation);
    };
    return AnimationManager;
}());
var CardStock = (function () {
    function CardStock(manager, element, settings) {
        this.manager = manager;
        this.element = element;
        this.settings = settings;
        this.cards = [];
        this.selectedCards = [];
        this.selectionMode = 'none';
        manager.addStock(this);
        element === null || element === void 0 ? void 0 : element.classList.add('card-stock');
        this.bindClick();
        this.sort = settings === null || settings === void 0 ? void 0 : settings.sort;
    }
    CardStock.prototype.remove = function () {
        var _a;
        this.manager.removeStock(this);
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
    };
    CardStock.prototype.getCards = function () {
        return this.cards.slice();
    };
    CardStock.prototype.isEmpty = function () {
        return !this.cards.length;
    };
    CardStock.prototype.getSelection = function () {
        return this.selectedCards.slice();
    };
    CardStock.prototype.isSelected = function (card) {
        var _this = this;
        return this.selectedCards.some(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); });
    };
    CardStock.prototype.contains = function (card) {
        var _this = this;
        return this.cards.some(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); });
    };
    CardStock.prototype.getCardElement = function (card) {
        return this.manager.getCardElement(card);
    };
    CardStock.prototype.canAddCard = function (card, settings) {
        return !this.contains(card);
    };
    CardStock.prototype.addCard = function (card, animation, settings) {
        var _this = this;
        var _a, _b, _c, _d;
        if (!this.canAddCard(card, settings)) {
            return Promise.resolve(false);
        }
        var promise;
        var originStock = this.manager.getCardStock(card);
        var index = this.getNewCardIndex(card);
        var settingsWithIndex = __assign({ index: index }, (settings !== null && settings !== void 0 ? settings : {}));
        var updateInformations = (_a = settingsWithIndex.updateInformations) !== null && _a !== void 0 ? _a : true;
        var needsCreation = true;
        if (originStock === null || originStock === void 0 ? void 0 : originStock.contains(card)) {
            var element = this.getCardElement(card);
            if (element) {
                promise = this.moveFromOtherStock(card, element, __assign(__assign({}, animation), { fromStock: originStock }), settingsWithIndex);
                needsCreation = false;
                if (!updateInformations) {
                    element.dataset.side = ((_b = settingsWithIndex === null || settingsWithIndex === void 0 ? void 0 : settingsWithIndex.visible) !== null && _b !== void 0 ? _b : this.manager.isCardVisible(card)) ? 'front' : 'back';
                }
            }
        }
        else if ((_c = animation === null || animation === void 0 ? void 0 : animation.fromStock) === null || _c === void 0 ? void 0 : _c.contains(card)) {
            var element = this.getCardElement(card);
            if (element) {
                promise = this.moveFromOtherStock(card, element, animation, settingsWithIndex);
                needsCreation = false;
            }
        }
        if (needsCreation) {
            var element = this.manager.createCardElement(card, ((_d = settingsWithIndex === null || settingsWithIndex === void 0 ? void 0 : settingsWithIndex.visible) !== null && _d !== void 0 ? _d : this.manager.isCardVisible(card)));
            promise = this.moveFromElement(card, element, animation, settingsWithIndex);
        }
        if (settingsWithIndex.index !== null && settingsWithIndex.index !== undefined) {
            this.cards.splice(index, 0, card);
        }
        else {
            this.cards.push(card);
        }
        if (updateInformations) {
            this.manager.updateCardInformations(card);
        }
        if (!promise) {
            console.warn("CardStock.addCard didn't return a Promise");
            promise = Promise.resolve(false);
        }
        if (this.selectionMode !== 'none') {
            promise.then(function () { var _a; return _this.setSelectableCard(card, (_a = settingsWithIndex.selectable) !== null && _a !== void 0 ? _a : true); });
        }
        return promise;
    };
    CardStock.prototype.getNewCardIndex = function (card) {
        if (this.sort) {
            var otherCards = this.getCards();
            for (var i = 0; i < otherCards.length; i++) {
                var otherCard = otherCards[i];
                if (this.sort(card, otherCard) < 0) {
                    return i;
                }
            }
            return otherCards.length;
        }
        else {
            return undefined;
        }
    };
    CardStock.prototype.addCardElementToParent = function (cardElement, settings) {
        var _a;
        var parent = (_a = settings === null || settings === void 0 ? void 0 : settings.forceToElement) !== null && _a !== void 0 ? _a : this.element;
        if ((settings === null || settings === void 0 ? void 0 : settings.index) === null || (settings === null || settings === void 0 ? void 0 : settings.index) === undefined || !parent.children.length || (settings === null || settings === void 0 ? void 0 : settings.index) >= parent.children.length) {
            parent.appendChild(cardElement);
        }
        else {
            parent.insertBefore(cardElement, parent.children[settings.index]);
        }
    };
    CardStock.prototype.moveFromOtherStock = function (card, cardElement, animation, settings) {
        var promise;
        var element = animation.fromStock.contains(card) ? this.manager.getCardElement(card) : animation.fromStock.element;
        var fromRect = element === null || element === void 0 ? void 0 : element.getBoundingClientRect();
        this.addCardElementToParent(cardElement, settings);
        this.removeSelectionClassesFromElement(cardElement);
        promise = fromRect ? this.animationFromElement(cardElement, fromRect, {
            originalSide: animation.originalSide,
            rotationDelta: animation.rotationDelta,
            animation: animation.animation,
        }) : Promise.resolve(false);
        if (animation.fromStock && animation.fromStock != this) {
            animation.fromStock.removeCard(card);
        }
        if (!promise) {
            console.warn("CardStock.moveFromOtherStock didn't return a Promise");
            promise = Promise.resolve(false);
        }
        return promise;
    };
    CardStock.prototype.moveFromElement = function (card, cardElement, animation, settings) {
        var promise;
        this.addCardElementToParent(cardElement, settings);
        if (animation) {
            if (animation.fromStock) {
                promise = this.animationFromElement(cardElement, animation.fromStock.element.getBoundingClientRect(), {
                    originalSide: animation.originalSide,
                    rotationDelta: animation.rotationDelta,
                    animation: animation.animation,
                });
                animation.fromStock.removeCard(card);
            }
            else if (animation.fromElement) {
                promise = this.animationFromElement(cardElement, animation.fromElement.getBoundingClientRect(), {
                    originalSide: animation.originalSide,
                    rotationDelta: animation.rotationDelta,
                    animation: animation.animation,
                });
            }
        }
        else {
            promise = Promise.resolve(false);
        }
        if (!promise) {
            console.warn("CardStock.moveFromElement didn't return a Promise");
            promise = Promise.resolve(false);
        }
        return promise;
    };
    CardStock.prototype.addCards = function (cards, animation, settings, shift) {
        if (shift === void 0) { shift = false; }
        return __awaiter(this, void 0, void 0, function () {
            var promises, result, others, _loop_2, i, results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.manager.animationsActive()) {
                            shift = false;
                        }
                        promises = [];
                        if (!(shift === true)) return [3, 4];
                        if (!cards.length) return [3, 3];
                        return [4, this.addCard(cards[0], animation, settings)];
                    case 1:
                        result = _a.sent();
                        return [4, this.addCards(cards.slice(1), animation, settings, shift)];
                    case 2:
                        others = _a.sent();
                        return [2, result || others];
                    case 3: return [3, 5];
                    case 4:
                        if (typeof shift === 'number') {
                            _loop_2 = function (i) {
                                setTimeout(function () { return promises.push(_this.addCard(cards[i], animation, settings)); }, i * shift);
                            };
                            for (i = 0; i < cards.length; i++) {
                                _loop_2(i);
                            }
                        }
                        else {
                            promises = cards.map(function (card) { return _this.addCard(card, animation, settings); });
                        }
                        _a.label = 5;
                    case 5: return [4, Promise.all(promises)];
                    case 6:
                        results = _a.sent();
                        return [2, results.some(function (result) { return result; })];
                }
            });
        });
    };
    CardStock.prototype.removeCard = function (card, settings) {
        var promise;
        if (this.contains(card) && this.element.contains(this.getCardElement(card))) {
            promise = this.manager.removeCard(card, settings);
        }
        else {
            promise = Promise.resolve(false);
        }
        this.cardRemoved(card, settings);
        return promise;
    };
    CardStock.prototype.cardRemoved = function (card, settings) {
        var _this = this;
        var index = this.cards.findIndex(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); });
        if (index !== -1) {
            this.cards.splice(index, 1);
        }
        if (this.selectedCards.find(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); })) {
            this.unselectCard(card);
        }
    };
    CardStock.prototype.removeCards = function (cards, settings) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = cards.map(function (card) { return _this.removeCard(card, settings); });
                        return [4, Promise.all(promises)];
                    case 1:
                        results = _a.sent();
                        return [2, results.some(function (result) { return result; })];
                }
            });
        });
    };
    CardStock.prototype.removeAll = function (settings) {
        var _this = this;
        var cards = this.getCards();
        cards.forEach(function (card) { return _this.removeCard(card, settings); });
    };
    CardStock.prototype.setSelectionMode = function (selectionMode, selectableCards) {
        var _this = this;
        if (selectionMode !== this.selectionMode) {
            this.unselectAll(true);
        }
        this.cards.forEach(function (card) { return _this.setSelectableCard(card, selectionMode != 'none'); });
        this.element.classList.toggle('bga-cards_selectable-stock', selectionMode != 'none');
        this.selectionMode = selectionMode;
        if (selectionMode === 'none') {
            this.getCards().forEach(function (card) { return _this.removeSelectionClasses(card); });
        }
        else {
            this.setSelectableCards(selectableCards !== null && selectableCards !== void 0 ? selectableCards : this.getCards());
        }
    };
    CardStock.prototype.setSelectableCard = function (card, selectable) {
        if (this.selectionMode === 'none') {
            return;
        }
        var element = this.getCardElement(card);
        var selectableCardsClass = this.getSelectableCardClass();
        var unselectableCardsClass = this.getUnselectableCardClass();
        if (selectableCardsClass) {
            element === null || element === void 0 ? void 0 : element.classList.toggle(selectableCardsClass, selectable);
        }
        if (unselectableCardsClass) {
            element === null || element === void 0 ? void 0 : element.classList.toggle(unselectableCardsClass, !selectable);
        }
        if (!selectable && this.isSelected(card)) {
            this.unselectCard(card, true);
        }
    };
    CardStock.prototype.setSelectableCards = function (selectableCards) {
        var _this = this;
        if (this.selectionMode === 'none') {
            console.log('selectenMode none');
            return;
        }
        var selectableCardsIds = (selectableCards !== null && selectableCards !== void 0 ? selectableCards : this.getCards()).map(function (card) { return _this.manager.getId(card); });
        this.cards.forEach(function (card) {
            return _this.setSelectableCard(card, selectableCardsIds.includes(_this.manager.getId(card)));
        });
    };
    CardStock.prototype.selectCard = function (card, silent) {
        var _this = this;
        var _a;
        if (silent === void 0) { silent = false; }
        if (this.selectionMode == 'none') {
            return;
        }
        var element = this.getCardElement(card);
        var selectableCardsClass = this.getSelectableCardClass();
        if (!element || !element.classList.contains(selectableCardsClass)) {
            return;
        }
        if (this.selectionMode === 'single') {
            this.cards.filter(function (c) { return _this.manager.getId(c) != _this.manager.getId(card); }).forEach(function (c) { return _this.unselectCard(c, true); });
        }
        var selectedCardsClass = this.getSelectedCardClass();
        element.classList.add(selectedCardsClass);
        this.selectedCards.push(card);
        if (!silent) {
            (_a = this.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(this, this.selectedCards.slice(), card);
        }
    };
    CardStock.prototype.unselectCard = function (card, silent) {
        var _this = this;
        var _a;
        if (silent === void 0) { silent = false; }
        var element = this.getCardElement(card);
        var selectedCardsClass = this.getSelectedCardClass();
        element === null || element === void 0 ? void 0 : element.classList.remove(selectedCardsClass);
        var index = this.selectedCards.findIndex(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); });
        if (index !== -1) {
            this.selectedCards.splice(index, 1);
        }
        if (!silent) {
            (_a = this.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(this, this.selectedCards.slice(), card);
        }
    };
    CardStock.prototype.selectAll = function (silent) {
        var _this = this;
        var _a;
        if (silent === void 0) { silent = false; }
        if (this.selectionMode == 'none') {
            return;
        }
        this.cards.forEach(function (c) { return _this.selectCard(c, true); });
        if (!silent) {
            (_a = this.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(this, this.selectedCards.slice(), null);
        }
    };
    CardStock.prototype.unselectAll = function (silent) {
        var _this = this;
        var _a;
        if (silent === void 0) { silent = false; }
        var cards = this.getCards();
        cards.forEach(function (c) { return _this.unselectCard(c, true); });
        if (!silent) {
            (_a = this.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(this, this.selectedCards.slice(), null);
        }
    };
    CardStock.prototype.bindClick = function () {
        var _this = this;
        var _a;
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (event) {
            var cardDiv = event.target.closest('.card');
            if (!cardDiv) {
                return;
            }
            var card = _this.cards.find(function (c) { return _this.manager.getId(c) == cardDiv.id; });
            if (!card) {
                return;
            }
            _this.cardClick(card);
        });
    };
    CardStock.prototype.cardClick = function (card) {
        var _this = this;
        var _a;
        if (this.selectionMode != 'none') {
            var alreadySelected = this.selectedCards.some(function (c) { return _this.manager.getId(c) == _this.manager.getId(card); });
            if (alreadySelected) {
                this.unselectCard(card);
            }
            else {
                this.selectCard(card);
            }
        }
        (_a = this.onCardClick) === null || _a === void 0 ? void 0 : _a.call(this, card);
    };
    CardStock.prototype.animationFromElement = function (element, fromRect, settings) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var side, cardSides_1, animation, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        side = element.dataset.side;
                        if (settings.originalSide && settings.originalSide != side) {
                            cardSides_1 = element.getElementsByClassName('card-sides')[0];
                            cardSides_1.style.transition = 'none';
                            element.dataset.side = settings.originalSide;
                            setTimeout(function () {
                                cardSides_1.style.transition = null;
                                element.dataset.side = side;
                            });
                        }
                        animation = settings.animation;
                        if (animation) {
                            animation.settings.element = element;
                            animation.settings.fromRect = fromRect;
                        }
                        else {
                            animation = new BgaSlideAnimation({ element: element, fromRect: fromRect });
                        }
                        return [4, this.manager.animationManager.play(animation)];
                    case 1:
                        result = _b.sent();
                        return [2, (_a = result === null || result === void 0 ? void 0 : result.played) !== null && _a !== void 0 ? _a : false];
                }
            });
        });
    };
    CardStock.prototype.setCardVisible = function (card, visible, settings) {
        this.manager.setCardVisible(card, visible, settings);
    };
    CardStock.prototype.flipCard = function (card, settings) {
        this.manager.flipCard(card, settings);
    };
    CardStock.prototype.getSelectableCardClass = function () {
        var _a, _b;
        return ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.selectableCardClass) === undefined ? this.manager.getSelectableCardClass() : (_b = this.settings) === null || _b === void 0 ? void 0 : _b.selectableCardClass;
    };
    CardStock.prototype.getUnselectableCardClass = function () {
        var _a, _b;
        return ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.unselectableCardClass) === undefined ? this.manager.getUnselectableCardClass() : (_b = this.settings) === null || _b === void 0 ? void 0 : _b.unselectableCardClass;
    };
    CardStock.prototype.getSelectedCardClass = function () {
        var _a, _b;
        return ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.selectedCardClass) === undefined ? this.manager.getSelectedCardClass() : (_b = this.settings) === null || _b === void 0 ? void 0 : _b.selectedCardClass;
    };
    CardStock.prototype.removeSelectionClasses = function (card) {
        this.removeSelectionClassesFromElement(this.getCardElement(card));
    };
    CardStock.prototype.removeSelectionClassesFromElement = function (cardElement) {
        var selectableCardsClass = this.getSelectableCardClass();
        var unselectableCardsClass = this.getUnselectableCardClass();
        var selectedCardsClass = this.getSelectedCardClass();
        cardElement === null || cardElement === void 0 ? void 0 : cardElement.classList.remove(selectableCardsClass, unselectableCardsClass, selectedCardsClass);
    };
    return CardStock;
}());
var SlideAndBackAnimation = (function (_super) {
    __extends(SlideAndBackAnimation, _super);
    function SlideAndBackAnimation(manager, element, tempElement) {
        var distance = (manager.getCardWidth() + manager.getCardHeight()) / 2;
        var angle = Math.random() * Math.PI * 2;
        var fromDelta = {
            x: distance * Math.cos(angle),
            y: distance * Math.sin(angle),
        };
        return _super.call(this, {
            animations: [
                new BgaSlideToAnimation({ element: element, fromDelta: fromDelta, duration: 250 }),
                new BgaSlideAnimation({ element: element, fromDelta: fromDelta, duration: 250, animationEnd: tempElement ? (function () { return element.remove(); }) : undefined }),
            ]
        }) || this;
    }
    return SlideAndBackAnimation;
}(BgaCumulatedAnimation));
var Deck = (function (_super) {
    __extends(Deck, _super);
    function Deck(manager, element, settings) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        var _this = _super.call(this, manager, element) || this;
        _this.manager = manager;
        _this.element = element;
        element.classList.add('deck');
        var cardWidth = _this.manager.getCardWidth();
        var cardHeight = _this.manager.getCardHeight();
        if (cardWidth && cardHeight) {
            _this.element.style.setProperty('--width', "".concat(cardWidth, "px"));
            _this.element.style.setProperty('--height', "".concat(cardHeight, "px"));
        }
        else {
            throw new Error("You need to set cardWidth and cardHeight in the card manager to use Deck.");
        }
        _this.fakeCardGenerator = (_a = settings === null || settings === void 0 ? void 0 : settings.fakeCardGenerator) !== null && _a !== void 0 ? _a : manager.getFakeCardGenerator();
        _this.thicknesses = (_b = settings.thicknesses) !== null && _b !== void 0 ? _b : [0, 2, 5, 10, 20, 30];
        _this.setCardNumber((_c = settings.cardNumber) !== null && _c !== void 0 ? _c : 0);
        _this.autoUpdateCardNumber = (_d = settings.autoUpdateCardNumber) !== null && _d !== void 0 ? _d : true;
        _this.autoRemovePreviousCards = (_e = settings.autoRemovePreviousCards) !== null && _e !== void 0 ? _e : true;
        var shadowDirection = (_f = settings.shadowDirection) !== null && _f !== void 0 ? _f : 'bottom-right';
        var shadowDirectionSplit = shadowDirection.split('-');
        var xShadowShift = shadowDirectionSplit.includes('right') ? 1 : (shadowDirectionSplit.includes('left') ? -1 : 0);
        var yShadowShift = shadowDirectionSplit.includes('bottom') ? 1 : (shadowDirectionSplit.includes('top') ? -1 : 0);
        _this.element.style.setProperty('--xShadowShift', '' + xShadowShift);
        _this.element.style.setProperty('--yShadowShift', '' + yShadowShift);
        if (settings.topCard) {
            _this.addCard(settings.topCard);
        }
        else if (settings.cardNumber > 0) {
            _this.addCard(_this.getFakeCard());
        }
        if (settings.counter && ((_g = settings.counter.show) !== null && _g !== void 0 ? _g : true)) {
            if (settings.cardNumber === null || settings.cardNumber === undefined) {
                console.warn("Deck card counter created without a cardNumber");
            }
            _this.createCounter((_h = settings.counter.position) !== null && _h !== void 0 ? _h : 'bottom', (_j = settings.counter.extraClasses) !== null && _j !== void 0 ? _j : 'round', settings.counter.counterId);
            if ((_k = settings.counter) === null || _k === void 0 ? void 0 : _k.hideWhenEmpty) {
                _this.element.querySelector('.bga-cards_deck-counter').classList.add('hide-when-empty');
            }
        }
        _this.setCardNumber((_l = settings.cardNumber) !== null && _l !== void 0 ? _l : 0);
        return _this;
    }
    Deck.prototype.createCounter = function (counterPosition, extraClasses, counterId) {
        var left = counterPosition.includes('right') ? 100 : (counterPosition.includes('left') ? 0 : 50);
        var top = counterPosition.includes('bottom') ? 100 : (counterPosition.includes('top') ? 0 : 50);
        this.element.style.setProperty('--bga-cards-deck-left', "".concat(left, "%"));
        this.element.style.setProperty('--bga-cards-deck-top', "".concat(top, "%"));
        this.element.insertAdjacentHTML('beforeend', "\n            <div ".concat(counterId ? "id=\"".concat(counterId, "\"") : '', " class=\"bga-cards_deck-counter ").concat(extraClasses, "\"></div>\n        "));
    };
    Deck.prototype.getCardNumber = function () {
        return this.cardNumber;
    };
    Deck.prototype.setCardNumber = function (cardNumber, topCard) {
        var _this = this;
        if (topCard === void 0) { topCard = undefined; }
        var promise = topCard === null || cardNumber == 0 ?
            Promise.resolve(false) :
            _super.prototype.addCard.call(this, topCard || this.getFakeCard(), undefined, { autoUpdateCardNumber: false });
        this.cardNumber = cardNumber;
        this.element.dataset.empty = (this.cardNumber == 0).toString();
        var thickness = 0;
        this.thicknesses.forEach(function (threshold, index) {
            if (_this.cardNumber >= threshold) {
                thickness = index;
            }
        });
        this.element.style.setProperty('--thickness', "".concat(thickness, "px"));
        var counterDiv = this.element.querySelector('.bga-cards_deck-counter');
        if (counterDiv) {
            counterDiv.innerHTML = "".concat(cardNumber);
        }
        return promise;
    };
    Deck.prototype.addCard = function (card, animation, settings) {
        var _this = this;
        var _a, _b;
        if ((_a = settings === null || settings === void 0 ? void 0 : settings.autoUpdateCardNumber) !== null && _a !== void 0 ? _a : this.autoUpdateCardNumber) {
            this.setCardNumber(this.cardNumber + 1, null);
        }
        var promise = _super.prototype.addCard.call(this, card, animation, settings);
        if ((_b = settings === null || settings === void 0 ? void 0 : settings.autoRemovePreviousCards) !== null && _b !== void 0 ? _b : this.autoRemovePreviousCards) {
            promise.then(function () {
                var previousCards = _this.getCards().slice(0, -1);
                _this.removeCards(previousCards, { autoUpdateCardNumber: false });
            });
        }
        return promise;
    };
    Deck.prototype.cardRemoved = function (card, settings) {
        var _a;
        if ((_a = settings === null || settings === void 0 ? void 0 : settings.autoUpdateCardNumber) !== null && _a !== void 0 ? _a : this.autoUpdateCardNumber) {
            this.setCardNumber(this.cardNumber - 1);
        }
        _super.prototype.cardRemoved.call(this, card, settings);
    };
    Deck.prototype.getTopCard = function () {
        var cards = this.getCards();
        return cards.length ? cards[cards.length - 1] : null;
    };
    Deck.prototype.shuffle = function (settings) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var animatedCardsMax, animatedCards, elements, getFakeCard, uid, i, newCard, newElement, pauseDelayAfterAnimation;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        animatedCardsMax = (_a = settings === null || settings === void 0 ? void 0 : settings.animatedCardsMax) !== null && _a !== void 0 ? _a : 10;
                        this.addCard((_b = settings === null || settings === void 0 ? void 0 : settings.newTopCard) !== null && _b !== void 0 ? _b : this.getFakeCard(), undefined, { autoUpdateCardNumber: false });
                        if (!this.manager.animationsActive()) {
                            return [2, Promise.resolve(false)];
                        }
                        animatedCards = Math.min(10, animatedCardsMax, this.getCardNumber());
                        if (!(animatedCards > 1)) return [3, 4];
                        elements = [this.getCardElement(this.getTopCard())];
                        getFakeCard = function (uid) {
                            var newCard;
                            if (settings === null || settings === void 0 ? void 0 : settings.fakeCardSetter) {
                                newCard = {};
                                settings === null || settings === void 0 ? void 0 : settings.fakeCardSetter(newCard, uid);
                            }
                            else {
                                newCard = _this.fakeCardGenerator("".concat(_this.element.id, "-shuffle-").concat(uid));
                            }
                            return newCard;
                        };
                        uid = 0;
                        for (i = elements.length; i <= animatedCards; i++) {
                            newCard = void 0;
                            do {
                                newCard = getFakeCard(uid++);
                            } while (this.manager.getCardElement(newCard));
                            newElement = this.manager.createCardElement(newCard, false);
                            newElement.dataset.tempCardForShuffleAnimation = 'true';
                            this.element.prepend(newElement);
                            elements.push(newElement);
                        }
                        return [4, this.manager.animationManager.playWithDelay(elements.map(function (element) { return new SlideAndBackAnimation(_this.manager, element, element.dataset.tempCardForShuffleAnimation == 'true'); }), 50)];
                    case 1:
                        _d.sent();
                        pauseDelayAfterAnimation = (_c = settings === null || settings === void 0 ? void 0 : settings.pauseDelayAfterAnimation) !== null && _c !== void 0 ? _c : 500;
                        if (!(pauseDelayAfterAnimation > 0)) return [3, 3];
                        return [4, this.manager.animationManager.play(new BgaPauseAnimation({ duration: pauseDelayAfterAnimation }))];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3: return [2, true];
                    case 4: return [2, Promise.resolve(false)];
                }
            });
        });
    };
    Deck.prototype.getFakeCard = function () {
        return this.fakeCardGenerator(this.element.id);
    };
    return Deck;
}(CardStock));
var LineStock = (function (_super) {
    __extends(LineStock, _super);
    function LineStock(manager, element, settings) {
        var _a, _b, _c, _d;
        var _this = _super.call(this, manager, element, settings) || this;
        _this.manager = manager;
        _this.element = element;
        element.classList.add('line-stock');
        element.dataset.center = ((_a = settings === null || settings === void 0 ? void 0 : settings.center) !== null && _a !== void 0 ? _a : true).toString();
        element.style.setProperty('--wrap', (_b = settings === null || settings === void 0 ? void 0 : settings.wrap) !== null && _b !== void 0 ? _b : 'wrap');
        element.style.setProperty('--direction', (_c = settings === null || settings === void 0 ? void 0 : settings.direction) !== null && _c !== void 0 ? _c : 'row');
        element.style.setProperty('--gap', (_d = settings === null || settings === void 0 ? void 0 : settings.gap) !== null && _d !== void 0 ? _d : '8px');
        return _this;
    }
    return LineStock;
}(CardStock));
var ManualPositionStock = (function (_super) {
    __extends(ManualPositionStock, _super);
    function ManualPositionStock(manager, element, settings, updateDisplay) {
        var _this = _super.call(this, manager, element, settings) || this;
        _this.manager = manager;
        _this.element = element;
        _this.updateDisplay = updateDisplay;
        element.classList.add('manual-position-stock');
        return _this;
    }
    ManualPositionStock.prototype.addCard = function (card, animation, settings) {
        var promise = _super.prototype.addCard.call(this, card, animation, settings);
        this.updateDisplay(this.element, this.getCards(), card, this);
        return promise;
    };
    ManualPositionStock.prototype.cardRemoved = function (card, settings) {
        _super.prototype.cardRemoved.call(this, card, settings);
        this.updateDisplay(this.element, this.getCards(), card, this);
    };
    return ManualPositionStock;
}(CardStock));
var VoidStock = (function (_super) {
    __extends(VoidStock, _super);
    function VoidStock(manager, element) {
        var _this = _super.call(this, manager, element) || this;
        _this.manager = manager;
        _this.element = element;
        element.classList.add('void-stock');
        return _this;
    }
    VoidStock.prototype.addCard = function (card, animation, settings) {
        var _this = this;
        var _a;
        var promise = _super.prototype.addCard.call(this, card, animation, settings);
        var cardElement = this.getCardElement(card);
        var originalLeft = cardElement.style.left;
        var originalTop = cardElement.style.top;
        cardElement.style.left = "".concat((this.element.clientWidth - cardElement.clientWidth) / 2, "px");
        cardElement.style.top = "".concat((this.element.clientHeight - cardElement.clientHeight) / 2, "px");
        if (!promise) {
            console.warn("VoidStock.addCard didn't return a Promise");
            promise = Promise.resolve(false);
        }
        if ((_a = settings === null || settings === void 0 ? void 0 : settings.remove) !== null && _a !== void 0 ? _a : true) {
            return promise.then(function () {
                return _this.removeCard(card);
            });
        }
        else {
            cardElement.style.left = originalLeft;
            cardElement.style.top = originalTop;
            return promise;
        }
    };
    return VoidStock;
}(CardStock));
function sortFunction() {
    var sortedFields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sortedFields[_i] = arguments[_i];
    }
    return function (a, b) {
        for (var i = 0; i < sortedFields.length; i++) {
            var direction = 1;
            var field = sortedFields[i];
            if (field[0] == '-') {
                direction = -1;
                field = field.substring(1);
            }
            else if (field[0] == '+') {
                field = field.substring(1);
            }
            var type = typeof a[field];
            if (type === 'string') {
                var compare = a[field].localeCompare(b[field]);
                if (compare !== 0) {
                    return compare;
                }
            }
            else if (type === 'number') {
                var compare = (a[field] - b[field]) * direction;
                if (compare !== 0) {
                    return compare * direction;
                }
            }
        }
        return 0;
    };
}
var CardManager = (function () {
    function CardManager(game, settings) {
        var _a;
        this.game = game;
        this.settings = settings;
        this.stocks = [];
        this.updateMainTimeoutId = [];
        this.updateFrontTimeoutId = [];
        this.updateBackTimeoutId = [];
        this.animationManager = (_a = settings.animationManager) !== null && _a !== void 0 ? _a : new AnimationManager(game);
    }
    CardManager.prototype.animationsActive = function () {
        return this.animationManager.animationsActive();
    };
    CardManager.prototype.addStock = function (stock) {
        this.stocks.push(stock);
    };
    CardManager.prototype.removeStock = function (stock) {
        var index = this.stocks.indexOf(stock);
        if (index !== -1) {
            this.stocks.splice(index, 1);
        }
    };
    CardManager.prototype.getId = function (card) {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.settings).getId) === null || _b === void 0 ? void 0 : _b.call(_a, card)) !== null && _c !== void 0 ? _c : "card-".concat(card.id);
    };
    CardManager.prototype.createCardElement = function (card, visible) {
        var _a, _b, _c, _d, _e, _f;
        if (visible === void 0) { visible = true; }
        var id = this.getId(card);
        var side = visible ? 'front' : 'back';
        if (this.getCardElement(card)) {
            throw new Error('This card already exists ' + JSON.stringify(card));
        }
        var element = document.createElement("div");
        element.id = id;
        element.dataset.side = '' + side;
        element.innerHTML = "\n            <div class=\"card-sides\">\n                <div id=\"".concat(id, "-front\" class=\"card-side front\">\n                </div>\n                <div id=\"").concat(id, "-back\" class=\"card-side back\">\n                </div>\n            </div>\n        ");
        element.classList.add('card');
        document.body.appendChild(element);
        (_b = (_a = this.settings).setupDiv) === null || _b === void 0 ? void 0 : _b.call(_a, card, element);
        (_d = (_c = this.settings).setupFrontDiv) === null || _d === void 0 ? void 0 : _d.call(_c, card, element.getElementsByClassName('front')[0]);
        (_f = (_e = this.settings).setupBackDiv) === null || _f === void 0 ? void 0 : _f.call(_e, card, element.getElementsByClassName('back')[0]);
        document.body.removeChild(element);
        return element;
    };
    CardManager.prototype.getCardElement = function (card) {
        return document.getElementById(this.getId(card));
    };
    CardManager.prototype.removeCard = function (card, settings) {
        var _a;
        var id = this.getId(card);
        var div = document.getElementById(id);
        if (!div) {
            return Promise.resolve(false);
        }
        div.id = "deleted".concat(id);
        div.remove();
        (_a = this.getCardStock(card)) === null || _a === void 0 ? void 0 : _a.cardRemoved(card, settings);
        return Promise.resolve(true);
    };
    CardManager.prototype.getCardStock = function (card) {
        return this.stocks.find(function (stock) { return stock.contains(card); });
    };
    CardManager.prototype.isCardVisible = function (card) {
        var _a, _b, _c, _d;
        return (_c = (_b = (_a = this.settings).isCardVisible) === null || _b === void 0 ? void 0 : _b.call(_a, card)) !== null && _c !== void 0 ? _c : ((_d = card.type) !== null && _d !== void 0 ? _d : false);
    };
    CardManager.prototype.setCardVisible = function (card, visible, settings) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        var element = this.getCardElement(card);
        if (!element) {
            return;
        }
        var isVisible = visible !== null && visible !== void 0 ? visible : this.isCardVisible(card);
        element.dataset.side = isVisible ? 'front' : 'back';
        var stringId = JSON.stringify(this.getId(card));
        if ((_a = settings === null || settings === void 0 ? void 0 : settings.updateMain) !== null && _a !== void 0 ? _a : false) {
            if (this.updateMainTimeoutId[stringId]) {
                clearTimeout(this.updateMainTimeoutId[stringId]);
                delete this.updateMainTimeoutId[stringId];
            }
            var updateMainDelay = (_b = settings === null || settings === void 0 ? void 0 : settings.updateMainDelay) !== null && _b !== void 0 ? _b : 0;
            if (isVisible && updateMainDelay > 0 && this.animationsActive()) {
                this.updateMainTimeoutId[stringId] = setTimeout(function () { var _a, _b; return (_b = (_a = _this.settings).setupDiv) === null || _b === void 0 ? void 0 : _b.call(_a, card, element); }, updateMainDelay);
            }
            else {
                (_d = (_c = this.settings).setupDiv) === null || _d === void 0 ? void 0 : _d.call(_c, card, element);
            }
        }
        if ((_e = settings === null || settings === void 0 ? void 0 : settings.updateFront) !== null && _e !== void 0 ? _e : true) {
            if (this.updateFrontTimeoutId[stringId]) {
                clearTimeout(this.updateFrontTimeoutId[stringId]);
                delete this.updateFrontTimeoutId[stringId];
            }
            var updateFrontDelay = (_f = settings === null || settings === void 0 ? void 0 : settings.updateFrontDelay) !== null && _f !== void 0 ? _f : 500;
            if (!isVisible && updateFrontDelay > 0 && this.animationsActive()) {
                this.updateFrontTimeoutId[stringId] = setTimeout(function () { var _a, _b; return (_b = (_a = _this.settings).setupFrontDiv) === null || _b === void 0 ? void 0 : _b.call(_a, card, element.getElementsByClassName('front')[0]); }, updateFrontDelay);
            }
            else {
                (_h = (_g = this.settings).setupFrontDiv) === null || _h === void 0 ? void 0 : _h.call(_g, card, element.getElementsByClassName('front')[0]);
            }
        }
        if ((_j = settings === null || settings === void 0 ? void 0 : settings.updateBack) !== null && _j !== void 0 ? _j : false) {
            if (this.updateBackTimeoutId[stringId]) {
                clearTimeout(this.updateBackTimeoutId[stringId]);
                delete this.updateBackTimeoutId[stringId];
            }
            var updateBackDelay = (_k = settings === null || settings === void 0 ? void 0 : settings.updateBackDelay) !== null && _k !== void 0 ? _k : 0;
            if (isVisible && updateBackDelay > 0 && this.animationsActive()) {
                this.updateBackTimeoutId[stringId] = setTimeout(function () { var _a, _b; return (_b = (_a = _this.settings).setupBackDiv) === null || _b === void 0 ? void 0 : _b.call(_a, card, element.getElementsByClassName('back')[0]); }, updateBackDelay);
            }
            else {
                (_m = (_l = this.settings).setupBackDiv) === null || _m === void 0 ? void 0 : _m.call(_l, card, element.getElementsByClassName('back')[0]);
            }
        }
        if ((_o = settings === null || settings === void 0 ? void 0 : settings.updateData) !== null && _o !== void 0 ? _o : true) {
            var stock = this.getCardStock(card);
            var cards = stock.getCards();
            var cardIndex = cards.findIndex(function (c) { return _this.getId(c) === _this.getId(card); });
            if (cardIndex !== -1) {
                stock.cards.splice(cardIndex, 1, card);
            }
        }
    };
    CardManager.prototype.flipCard = function (card, settings) {
        var element = this.getCardElement(card);
        var currentlyVisible = element.dataset.side === 'front';
        this.setCardVisible(card, !currentlyVisible, settings);
    };
    CardManager.prototype.updateCardInformations = function (card, settings) {
        var newSettings = __assign(__assign({}, (settings !== null && settings !== void 0 ? settings : {})), { updateData: true });
        this.setCardVisible(card, undefined, newSettings);
    };
    CardManager.prototype.getCardWidth = function () {
        var _a;
        return (_a = this.settings) === null || _a === void 0 ? void 0 : _a.cardWidth;
    };
    CardManager.prototype.getCardHeight = function () {
        var _a;
        return (_a = this.settings) === null || _a === void 0 ? void 0 : _a.cardHeight;
    };
    CardManager.prototype.getSelectableCardClass = function () {
        var _a, _b;
        return ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.selectableCardClass) === undefined ? 'bga-cards_selectable-card' : (_b = this.settings) === null || _b === void 0 ? void 0 : _b.selectableCardClass;
    };
    CardManager.prototype.getUnselectableCardClass = function () {
        var _a, _b;
        return ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.unselectableCardClass) === undefined ? 'bga-cards_disabled-card' : (_b = this.settings) === null || _b === void 0 ? void 0 : _b.unselectableCardClass;
    };
    CardManager.prototype.getSelectedCardClass = function () {
        var _a, _b;
        return ((_a = this.settings) === null || _a === void 0 ? void 0 : _a.selectedCardClass) === undefined ? 'bga-cards_selected-card' : (_b = this.settings) === null || _b === void 0 ? void 0 : _b.selectedCardClass;
    };
    CardManager.prototype.getFakeCardGenerator = function () {
        var _this = this;
        var _a, _b;
        return (_b = (_a = this.settings) === null || _a === void 0 ? void 0 : _a.fakeCardGenerator) !== null && _b !== void 0 ? _b : (function (deckId) { return ({ id: _this.getId({ id: "".concat(deckId, "-fake-top-card") }) }); });
    };
    return CardManager;
}());
var PaxRenaissance = (function () {
    function PaxRenaissance() {
        this._helpMode = false;
        this._notif_uid_to_log_id = {};
        this._notif_uid_to_mobile_log_id = {};
        this._last_notif = null;
        this._last_tooltip_id = 0;
        this._selectableNodes = [];
        this.tooltipsToMap = [];
        console.log("paxrenaissance constructor");
    }
    PaxRenaissance.prototype.setup = function (gamedatas) {
        var _a;
        dojo.place("<div id='customActions' style='display:inline-block'></div>", $("generalactions"), "after");
        this.setAlwaysFixTopActions();
        this.setupDontPreloadImages();
        this.gamedatas = gamedatas;
        this.gameOptions = gamedatas.gameOptions;
        debug("gamedatas", gamedatas);
        this.setupPlayerOrder({ customPlayerOrder: gamedatas.customPlayerOrder });
        this._connections = [];
        this.activeStates = (_a = {},
            _a[CLIENT_CONFIRM_TABLEAU_OPS] = new ClientConfirmTableauOpsState(this),
            _a[CLIENT_DECLARE_VICTORY_STATE] = new ClientDeclareVictoryState(this),
            _a[CLIENT_SELL_CARD_STATE] = new ClientSellCardState(this),
            _a[CLIENT_START_TRADE_FAIR_STATE] = new ClientStartTradeFairState(this),
            _a[CLIENT_USE_ABILITY_ACTION_STATE] = new ClientUseAbilityActionState(this),
            _a.abilityActionSelectApostasy = new AbilityActionSelectApostasyState(this),
            _a.abilityActionSelectTradeFair = new AbilityActionSelectTradeFairState(this),
            _a.abilityOpponentsPurpleOp = new AbilityOpponentsPurpleOpState(this),
            _a.announceOneShot = new AnnounceOneShotState(this),
            _a.battleCasualties = new BattleCasualtiesState(this),
            _a.battleLocation = new BattleLocationState(this),
            _a.battlePlaceAttackers = new BattlePlaceAttackersState(this),
            _a.battleReconfigureContantinople = new BattleReconfigureConstantinopleState(this),
            _a.bishopPacification = new BishopPacificationState(this),
            _a.confirmPartialTurn = new ConfirmPartialTurnState(this),
            _a.confirmTurn = new ConfirmTurnState(this),
            _a.coronationOneShot = new CoronationState(this),
            _a.discardDownToHandLimit = new DiscardDownToHandLimitState(this),
            _a.flipVictoryCard = new FlipVictoryCardState(this),
            _a.freeAction = new FreeActionState(this),
            _a.placeAgent = new PlaceAgentState(this),
            _a.placeLevySelectCity = new PlaceLevySelectCityState(this),
            _a.playerAction = new PlayerActionState(this),
            _a.regimeChangeEmancipation = new RegimeChangeEmancipationState(this),
            _a.regimeChangeGoldenLiberty = new RegimeChangeGoldenLibertyState(this),
            _a.removeTokenFromCity = new RemoveTokenFromCityState(this),
            _a.selectToken = new SelectTokenState(this),
            _a.tableauOpBehead = new TableauOpBeheadState(this),
            _a.tableauOpCampaign = new TableauOpCampaignState(this),
            _a.tableauOpCommerce = new TableauOpCommerceState(this),
            _a.tableauOpCorsair = new TableauOpCorsairState(this),
            _a.tableauOpInquisitor = new TableauOpInquisitorState(this),
            _a.tableauOpRepress = new TableauOpRepressState(this),
            _a.tableauOpSiege = new TableauOpSiegeState(this),
            _a.tableauOpsSelect = new TableauOpsSelectState(this),
            _a.tableauOpTax = new TableauOpTaxState(this),
            _a.tableauOpTaxPayOrRepress = new TableauOpTaxPayOrRepressState(this),
            _a.tableauOpVote = new TableauOpVoteState(this),
            _a.tradeFairLevy = new TradeFairLevyState(this),
            _a);
        this.infoPanel = new InfoPanel(this);
        this.informationModal = new InformationModal(this);
        this.settings = new Settings(this);
        this.animationManager = new AnimationManager(this, {
            duration: this.settings.get({ id: PREF_SHOW_ANIMATIONS }) === DISABLED
                ? 0
                : 2100 - this.settings.get({ id: PREF_ANIMATION_SPEED }),
        });
        this.tableauCardManager = new TableauCardManager(this);
        this.discard = new VoidStock(this.tableauCardManager, document.getElementById("pr_discard"));
        this.tooltipManager = new TooltipManager(this);
        this.gameMap = new GameMap(this);
        if (this.playerOrder.includes(this.getPlayerId())) {
            this.hand = new Hand(this);
        }
        this.playerManager = new PlayerManager(this);
        this.supply = new Supply(this);
        this.market = new Market(this);
        this.victoryCardManager = new VictoryCardManager(this);
        this.openHandsModal = new OpenHandsModal(this);
        if (this.notificationManager != undefined) {
            this.notificationManager.destroy();
        }
        this.notificationManager = new NotificationManager(this);
        this.notificationManager.setupNotifications();
        this.tooltipManager.setupTooltips();
        debug("Ending game setup");
    };
    PaxRenaissance.prototype.setupPlayerOrder = function (_a) {
        var customPlayerOrder = _a.customPlayerOrder;
        var currentPlayerId = this.getPlayerId();
        var isInGame = customPlayerOrder.includes(currentPlayerId);
        if (isInGame) {
            while (customPlayerOrder[0] !== currentPlayerId) {
                var firstItem = customPlayerOrder.shift();
                customPlayerOrder.push(firstItem);
            }
        }
        this.playerOrder = customPlayerOrder;
    };
    PaxRenaissance.prototype.setupDontPreloadImages = function () {
        this.framework().dontPreloadImage("background_balcony.jpg");
        this.framework().dontPreloadImage("background_cathedral.jpg");
        this.framework().dontPreloadImage("background_goldsmith.jpg");
        this.framework().dontPreloadImage("background_lucrezia.jpg");
        this.framework().dontPreloadImage("background_poison.jpg");
        this.framework().dontPreloadImage("background_war.jpg");
        this.framework().dontPreloadImage("player_boards3.png");
    };
    PaxRenaissance.prototype.updateLayout = function () {
        if (!this.settings) {
            return;
        }
        $("pr_play_area_container").setAttribute("data-two-columns", this.settings.get({ id: "twoColumnsLayout" }));
        var ROOT = document.documentElement;
        var WIDTH = $("pr_play_area_container").getBoundingClientRect()["width"] - 8;
        var LEFT_COLUMN = 1500;
        var RIGHT_COLUMN = 1500;
        if (this.settings.get({ id: "twoColumnsLayout" }) === ENABLED) {
            WIDTH = WIDTH - 8;
            var size = Number(this.settings.get({ id: "columnSizes" }));
            var proportions = [size, 100 - size];
            var LEFT_SIZE = (proportions[0] * WIDTH) / 100;
            var leftColumnScale = LEFT_SIZE / LEFT_COLUMN;
            ROOT.style.setProperty("--paxRenLeftColumnScale", "".concat(leftColumnScale));
            var RIGHT_SIZE = (proportions[1] * WIDTH) / 100;
            var rightColumnScale = RIGHT_SIZE / RIGHT_COLUMN;
            ROOT.style.setProperty("--paxRenRightColumnScale", "".concat(rightColumnScale));
            $("pr_play_area_container").style.gridTemplateColumns = "".concat(LEFT_SIZE, "px ").concat(RIGHT_SIZE, "px");
        }
        else {
            var LEFT_SIZE = WIDTH;
            var leftColumnScale = LEFT_SIZE / LEFT_COLUMN;
            ROOT.style.setProperty("--paxRenLeftColumnScale", "".concat(leftColumnScale));
            var RIGHT_SIZE = WIDTH;
            var rightColumnScale = RIGHT_SIZE / RIGHT_COLUMN;
            ROOT.style.setProperty("--paxRenRightColumnScale", "".concat(rightColumnScale));
        }
    };
    PaxRenaissance.prototype.setupNotifications = function () {
    };
    PaxRenaissance.prototype.onEnteringState = function (stateName, args) {
        var _this = this;
        debug("Entering state: " + stateName, args);
        if (this.framework().isCurrentPlayerActive() &&
            this.activeStates[stateName]) {
            this.activeStates[stateName].onEnteringState(args.args);
        }
        else if (this.activeStates[stateName]) {
            this.activeStates[stateName].setDescription(Number(args.active_player), args.args);
        }
        if (args.args && args.args.previousSteps) {
            args.args.previousSteps.forEach(function (stepId) {
                var logEntry = $("logs").querySelector(".log.notif_newUndoableStep[data-step=\"".concat(stepId, "\"]"));
                if (logEntry) {
                    _this.onClick(logEntry, function () { return _this.undoToStep({ stepId: stepId }); });
                }
                logEntry = document.querySelector(".chatwindowlogs_zone .log.notif_newUndoableStep[data-step=\"".concat(stepId, "\"]"));
                if (logEntry) {
                    _this.onClick(logEntry, function () { return _this.undoToStep({ stepId: stepId }); });
                }
            });
        }
    };
    PaxRenaissance.prototype.onLeavingState = function (stateName) {
        this.clearPossible();
    };
    PaxRenaissance.prototype.onUpdateActionButtons = function (stateName, args) {
        var _this = this;
        return;
        if (this.framework().isCurrentPlayerActive()) {
            this.addPrimaryActionButton({
                id: "draw_button",
                text: _("Test"),
                callback: function () {
                    _this.clearInterface();
                },
            });
        }
    };
    PaxRenaissance.prototype.addActionButtonClient = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses, _b = _a.color, color = _b === void 0 ? "none" : _b;
        if ($(id)) {
            return;
        }
        this.framework().addActionButton(id, text, callback, "customActions", false, color);
        if (extraClasses) {
            dojo.addClass(id, extraClasses);
        }
    };
    PaxRenaissance.prototype.addCancelButton = function () {
        var _this = this;
        this.addDangerActionButton({
            id: "cancel_btn",
            text: _("Cancel"),
            callback: function () { return _this.onCancel(); },
        });
    };
    PaxRenaissance.prototype.addConfirmButton = function (_a) {
        var callback = _a.callback;
        this.addPrimaryActionButton({
            id: "confirm_btn",
            text: _("Confirm"),
            callback: callback,
        });
    };
    PaxRenaissance.prototype.createAgentMapTokenId = function (agent) {
        var id = "";
        if (agent.type === PAWN) {
            var bank = this.playerManager
                .getPlayer({ playerId: this.getPlayerId() })
                .getBank();
            id = "".concat(bank, "_pawn");
        }
        else {
            id = "".concat(agent.separator, "_").concat(agent.type);
        }
        return id;
    };
    PaxRenaissance.prototype.addAgentButton = function (_a) {
        var id = _a.id, callback = _a.callback, agent = _a.agent;
        var text = this.format_string_recursive(_("${tkn_mapToken} Agent"), {
            tkn_mapToken: this.createAgentMapTokenId(agent),
        });
        this.addSecondaryActionButton({
            id: id,
            callback: callback,
            text: text,
            extraClasses: "pr_agent_button",
        });
    };
    PaxRenaissance.prototype.addPassButton = function (_a) {
        var _this = this;
        var optionalAction = _a.optionalAction, text = _a.text;
        if (optionalAction) {
            this.addSecondaryActionButton({
                id: "pass_btn",
                text: text ? _(text) : _("Pass"),
                callback: function () { return _this.takeAction({ action: "actPassOptionalAction" }); },
            });
        }
    };
    PaxRenaissance.prototype.addSkipButton = function (_a) {
        var callback = _a.callback;
        this.addSecondaryActionButton({
            id: "skip_btn",
            text: _("Skip"),
            callback: callback,
        });
    };
    PaxRenaissance.prototype.addPrimaryActionButton = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses;
        if ($(id)) {
            return;
        }
        this.framework().addActionButton(id, text, callback, "customActions", false, "blue");
        if (extraClasses) {
            dojo.addClass(id, extraClasses);
        }
    };
    PaxRenaissance.prototype.addSecondaryActionButton = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses;
        if ($(id)) {
            return;
        }
        this.framework().addActionButton(id, text, callback, "customActions", false, "gray");
        if (extraClasses) {
            dojo.addClass(id, extraClasses);
        }
    };
    PaxRenaissance.prototype.addDangerActionButton = function (_a) {
        var id = _a.id, text = _a.text, callback = _a.callback, extraClasses = _a.extraClasses;
        if ($(id)) {
            return;
        }
        this.framework().addActionButton(id, text, callback, "customActions", false, "red");
        if (extraClasses) {
            dojo.addClass(id, extraClasses);
        }
    };
    PaxRenaissance.prototype.addRestartButton = function (_a) {
        var _this = this;
        var previousEngineChoices = _a.previousEngineChoices;
        if (previousEngineChoices < 1) {
            return;
        }
        this.addDangerActionButton({
            id: "restart_btn",
            text: _("Restart turn"),
            callback: function () { return _this.takeAction({ action: "actRestart" }); },
        });
    };
    PaxRenaissance.prototype.addUndoButtons = function (_a) {
        var _this = this;
        var previousSteps = _a.previousSteps, previousEngineChoices = _a.previousEngineChoices;
        var lastStep = Math.max.apply(Math, __spreadArray([0], previousSteps, false));
        if (lastStep > 0) {
            this.addDangerActionButton({
                id: "undo_last_step_btn",
                text: _("Undo last step"),
                callback: function () {
                    return _this.takeAction({
                        action: "actUndoToStep",
                        args: {
                            stepId: lastStep,
                        },
                        checkAction: "actRestart",
                    });
                },
            });
        }
        if (previousEngineChoices > 0) {
            this.addDangerActionButton({
                id: "restart_btn",
                text: _("Restart turn"),
                callback: function () { return _this.takeAction({ action: "actRestart" }); },
            });
        }
    };
    PaxRenaissance.prototype.clearInterface = function () {
        this.tableauCardManager.clearInterface();
        this.victoryCardManager.clearInterface();
        this.gameMap.clearInterface();
        this.market.clearInterface();
        this.playerManager.clearInterface();
    };
    PaxRenaissance.prototype.clearPossible = function () {
        this.framework().removeActionButtons();
        dojo.empty("customActions");
        dojo.forEach(this._connections, dojo.disconnect);
        this._connections = [];
        this._selectableNodes.forEach(function (node) {
            if ($(node))
                dojo.removeClass(node, "selectable selected");
        });
        this._selectableNodes = [];
        dojo.query(".".concat(PR_SELECTABLE)).removeClass(PR_SELECTABLE);
        dojo.query(".".concat(PR_SELECTED)).removeClass(PR_SELECTED);
    };
    PaxRenaissance.prototype.getPlayerId = function () {
        return Number(this.framework().player_id);
    };
    PaxRenaissance.prototype.framework = function () {
        return this;
    };
    PaxRenaissance.prototype.onCancel = function () {
        this.clearPossible();
        this.framework().restoreServerGameState();
    };
    PaxRenaissance.prototype.clientUpdatePageTitle = function (_a) {
        var text = _a.text, args = _a.args, _b = _a.nonActivePlayers, nonActivePlayers = _b === void 0 ? false : _b;
        var title = this.format_string_recursive(_(text), args);
        if (nonActivePlayers) {
            this.gamedatas.gamestate.description = title;
        }
        else {
            this.gamedatas.gamestate.descriptionmyturn = title;
        }
        this.framework().updatePageTitle();
    };
    PaxRenaissance.prototype.setCardSelectable = function (_a) {
        var id = _a.id, callback = _a.callback;
        var node = $(id);
        if (node === null) {
            return;
        }
        node.classList.add(PR_SELECTABLE);
        this._connections.push(dojo.connect(node, "onclick", this, function (event) {
            return callback(event);
        }));
    };
    PaxRenaissance.prototype.setCardSelected = function (_a) {
        var id = _a.id;
        var node = $(id);
        if (node === null) {
            return;
        }
        node.classList.add(PR_SELECTED);
    };
    PaxRenaissance.prototype.setLocationSelectable = function (_a) {
        var id = _a.id, callback = _a.callback;
        var nodeId = "pr_".concat(id);
        var node = $(nodeId);
        if (node === null) {
            return;
        }
        node.classList.add(PR_SELECTABLE);
        this._connections.push(dojo.connect(node, "onclick", this, function (event) {
            return callback(event);
        }));
    };
    PaxRenaissance.prototype.setLocationSelected = function (_a) {
        var id = _a.id;
        var nodeId = "pr_".concat(id);
        var node = $(nodeId);
        if (node === null) {
            return;
        }
        node.classList.add(PR_SELECTED);
    };
    PaxRenaissance.prototype.setTokenSelectable = function (_a) {
        var id = _a.id, callback = _a.callback;
        var nodeId = "".concat(id);
        var node = $(nodeId);
        if (node === null) {
            return;
        }
        node.classList.add(PR_SELECTABLE);
        this._connections.push(dojo.connect(node, "onclick", this, function (event) {
            return callback(event);
        }));
    };
    PaxRenaissance.prototype.setTokenSelected = function (_a) {
        var id = _a.id;
        var nodeId = "".concat(id);
        var node = $(nodeId);
        if (node === null) {
            return;
        }
        node.classList.add(PR_SELECTED);
    };
    PaxRenaissance.prototype.undoToStep = function (_a) {
        var stepId = _a.stepId;
        this.takeAction({
            action: "actUndoToStep",
            args: {
                stepId: stepId,
            },
            checkAction: "actRestart",
        });
    };
    PaxRenaissance.prototype.connect = function (node, action, callback) {
        this._connections.push(dojo.connect($(node), action, callback));
    };
    PaxRenaissance.prototype.onClick = function (node, callback, temporary) {
        var _this = this;
        if (temporary === void 0) { temporary = true; }
        var safeCallback = function (evt) {
            evt.stopPropagation();
            if (_this.framework().isInterfaceLocked()) {
                return false;
            }
            if (_this._helpMode) {
                return false;
            }
            callback(evt);
        };
        if (temporary) {
            this.connect($(node), "click", safeCallback);
            dojo.removeClass(node, "unselectable");
            dojo.addClass(node, "selectable");
            this._selectableNodes.push(node);
        }
        else {
            dojo.connect($(node), "click", safeCallback);
        }
    };
    PaxRenaissance.prototype.onScreenWidthChange = function () {
        this.updateLayout();
    };
    PaxRenaissance.prototype.onAddingNewUndoableStepToLog = function (notif) {
        var _this = this;
        var _a;
        if (!$("log_".concat(notif.logId)))
            return;
        var stepId = notif.msg.args.stepId;
        $("log_".concat(notif.logId)).dataset.step = stepId;
        if ($("dockedlog_".concat(notif.mobileLogId)))
            $("dockedlog_".concat(notif.mobileLogId)).dataset.step = stepId;
        if ((_a = this.gamedatas.gamestate.args.previousSteps) === null || _a === void 0 ? void 0 : _a.includes(Number(stepId))) {
            this.onClick($("log_".concat(notif.logId)), function () { return _this.undoToStep({ stepId: stepId }); });
            if ($("dockedlog_".concat(notif.mobileLogId)))
                this.onClick($("dockedlog_".concat(notif.mobileLogId)), function () {
                    return _this.undoToStep({ stepId: stepId });
                });
        }
    };
    PaxRenaissance.prototype.format_string_recursive = function (log, args) {
        var _this = this;
        try {
            if (log && args && !args.processed) {
                args.processed = true;
                Object.entries(args).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    if (key.startsWith("tkn_")) {
                        args[key] = getTokenDiv({
                            key: key,
                            value: value,
                            game: _this,
                        });
                    }
                });
            }
        }
        catch (e) {
            console.error(log, args, "Exception thrown", e.stack);
        }
        return this.inherited(arguments);
    };
    PaxRenaissance.prototype.onPlaceLogOnChannel = function (msg) {
        var currentLogId = this.framework().notifqueue.next_log_id;
        var currentMobileLogId = this.framework().next_log_id;
        var res = this.framework().inherited(arguments);
        this._notif_uid_to_log_id[msg.uid] = currentLogId;
        this._notif_uid_to_mobile_log_id[msg.uid] = currentMobileLogId;
        this._last_notif = {
            logId: currentLogId,
            mobileLogId: currentMobileLogId,
            msg: msg,
        };
        return res;
    };
    PaxRenaissance.prototype.checkLogCancel = function (notifId) {
        if (this.gamedatas.canceledNotifIds != null &&
            this.gamedatas.canceledNotifIds.includes(notifId)) {
            this.cancelLogs([notifId]);
        }
    };
    PaxRenaissance.prototype.cancelLogs = function (notifIds) {
        var _this = this;
        notifIds.forEach(function (uid) {
            if (_this._notif_uid_to_log_id.hasOwnProperty(uid)) {
                var logId = _this._notif_uid_to_log_id[uid];
                if ($("log_" + logId))
                    dojo.addClass("log_" + logId, "cancel");
            }
            if (_this._notif_uid_to_mobile_log_id.hasOwnProperty(uid)) {
                var mobileLogId = _this._notif_uid_to_mobile_log_id[uid];
                if ($("dockedlog_" + mobileLogId))
                    dojo.addClass("dockedlog_" + mobileLogId, "cancel");
            }
        });
    };
    PaxRenaissance.prototype.addLogClass = function () {
        var _a;
        if (this._last_notif == null) {
            return;
        }
        var notif = this._last_notif;
        var type = notif.msg.type;
        if (type == "history_history") {
            type = notif.msg.args.originalType;
        }
        if ($("log_" + notif.logId)) {
            dojo.addClass("log_" + notif.logId, "notif_" + type);
            var methodName = "onAdding" + type.charAt(0).toUpperCase() + type.slice(1) + "ToLog";
            (_a = this[methodName]) === null || _a === void 0 ? void 0 : _a.call(this, notif);
        }
        if ($("dockedlog_" + notif.mobileLogId)) {
            dojo.addClass("dockedlog_" + notif.mobileLogId, "notif_" + type);
        }
        while (this.tooltipsToMap.length) {
            var tooltipToMap = this.tooltipsToMap.pop();
            if (!tooltipToMap || !tooltipToMap[1]) {
                console.error("error tooltipToMap", tooltipToMap);
            }
            else {
                this.addLogTooltip({
                    tooltipId: tooltipToMap[0],
                    cardId: tooltipToMap[1],
                });
            }
        }
    };
    PaxRenaissance.prototype.addLogTooltip = function (_a) {
        var tooltipId = _a.tooltipId, cardId = _a.cardId;
        if (cardId.startsWith("EmpireSquare")) {
            var empireCard = this.gamedatas.empireSquares.find(function (square) { return square.id === cardId; });
            if (empireCard) {
                this.tooltipManager.addEmpireCardTooltip({
                    nodeId: "pr_tooltip_".concat(tooltipId),
                    card: empireCard,
                });
            }
        }
        else if (cardId.startsWith("Victory")) {
            var card = this.gamedatas.victoryCards.find(function (card) { return cardId === card.id; });
            if (card) {
                this.tooltipManager.addVictoryCardTooltip({
                    nodeId: "pr_tooltip_".concat(tooltipId),
                    card: card,
                });
            }
        }
        else {
            var card = this.gamedatas.staticData.tableauCards[cardId];
            if (card) {
                this.tooltipManager.addCardTooltip({
                    nodeId: "pr_tooltip_".concat(tooltipId),
                    card: card,
                });
            }
        }
    };
    PaxRenaissance.prototype.updateLogTooltips = function () {
    };
    PaxRenaissance.prototype.setLoader = function (value, max) {
        this.framework().inherited(arguments);
        if (!this.framework().isLoadingComplete && value >= 100) {
            this.framework().isLoadingComplete = true;
            this.onLoadingComplete();
        }
    };
    PaxRenaissance.prototype.onLoadingComplete = function () {
        this.cancelLogs(this.gamedatas.canceledNotifIds);
        this.updateLayout();
    };
    PaxRenaissance.prototype.updatePlayerOrdering = function () {
        this.framework().inherited(arguments);
        var container = document.getElementById("player_boards");
        var infoPanel = document.getElementById("pr_info_panel");
        if (!container) {
            return;
        }
        container.insertAdjacentElement("afterbegin", infoPanel);
    };
    PaxRenaissance.prototype.setAlwaysFixTopActions = function (alwaysFixed, maximum) {
        if (alwaysFixed === void 0) { alwaysFixed = true; }
        if (maximum === void 0) { maximum = 30; }
        this.alwaysFixTopActions = alwaysFixed;
        this.alwaysFixTopActionsMaximum = maximum;
        this.adaptStatusBar();
    };
    PaxRenaissance.prototype.adaptStatusBar = function () {
        this.inherited(arguments);
        if (this.alwaysFixTopActions) {
            var afterTitleElem = document.getElementById("after-page-title");
            var titleElem = document.getElementById("page-title");
            var zoom = getComputedStyle(titleElem).zoom;
            if (!zoom) {
                zoom = 1;
            }
            var titleRect = afterTitleElem.getBoundingClientRect();
            if (titleRect.top < 0 &&
                titleElem.offsetHeight <
                    (window.innerHeight * this.alwaysFixTopActionsMaximum) / 100) {
                var afterTitleRect = afterTitleElem.getBoundingClientRect();
                titleElem.classList.add("fixed-page-title");
                titleElem.style.width = (afterTitleRect.width - 10) / zoom + "px";
                afterTitleElem.style.height = titleRect.height + "px";
            }
            else {
                titleElem.classList.remove("fixed-page-title");
                titleElem.style.width = "auto";
                afterTitleElem.style.height = "0px";
            }
        }
    };
    PaxRenaissance.prototype.actionError = function (actionName) {
        this.framework().showMessage("cannot take ".concat(actionName, " action"), "error");
    };
    PaxRenaissance.prototype.takeAction = function (_a) {
        var action = _a.action, _b = _a.args, args = _b === void 0 ? {} : _b, checkAction = _a.checkAction;
        if (!this.framework().checkAction(checkAction ? checkAction : action)) {
            this.actionError(action);
            return;
        }
        var data = {
            lock: true,
            args: JSON.stringify(args),
        };
        var gameName = this.framework().game_name;
        this.framework().ajaxcall("/".concat(gameName, "/").concat(gameName, "/").concat(action, ".html"), data, this, function () { });
    };
    return PaxRenaissance;
}());
var _this = this;
var moveToAnimation = function (_a) {
    var game = _a.game, element = _a.element, toId = _a.toId, _b = _a.remove, remove = _b === void 0 ? false : _b;
    return __awaiter(_this, void 0, void 0, function () {
        var toElement, fromRect, toRect, top, left, originalPositionStyle;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    toElement = document.getElementById(toId);
                    fromRect = element.getBoundingClientRect();
                    toRect = toElement.getBoundingClientRect();
                    top = toRect.top - fromRect.top;
                    left = toRect.left - fromRect.left;
                    originalPositionStyle = element.style.position;
                    element.style.top = "".concat(pxNumber(element.style.top) + top, "px");
                    element.style.left = "".concat(pxNumber(element.style.left) + left, "px");
                    element.style.position = 'absolute';
                    return [4, game.animationManager.play(new BgaSlideAnimation({
                            element: element,
                            transitionTimingFunction: 'lineart',
                            fromRect: fromRect,
                        }))];
                case 1:
                    _c.sent();
                    if (remove) {
                        element.remove();
                    }
                    else {
                        element.style.position = originalPositionStyle;
                    }
                    return [2];
            }
        });
    });
};
var TableauCardManager = (function (_super) {
    __extends(TableauCardManager, _super);
    function TableauCardManager(game) {
        var _this = _super.call(this, game, {
            getId: function (card) { return card.id; },
            setupDiv: function (card, div) { return _this.setupDiv(card, div); },
            setupFrontDiv: function (card, div) { return _this.setupFrontDiv(card, div); },
            setupBackDiv: function (card, div) { return _this.setupBackDiv(card, div); },
            isCardVisible: function (card) { return _this.isCardVisible(card); },
            animationManager: game.animationManager,
        }) || this;
        _this.game = game;
        _this.empireSquareStocks = {};
        _this.vassalStocks = {};
        _this.queenStocks = {};
        _this.addMarginBottomQueen = function (_a) {
            var queen = _a.queen;
            var queenNode = document.getElementById(queen.id);
            if (!queenNode) {
                return;
            }
            queenNode.style.marginBottom = "calc(var(--paxRenCardScale) * -".concat(230 - queen.height, "px)");
        };
        return _this;
    }
    TableauCardManager.prototype.clearInterface = function () {
        var _this = this;
        Object.keys(this.vassalStocks).forEach(function (key) {
            _this.vassalStocks[key].removeAll();
            _this.removeStock(_this.vassalStocks[key]);
        });
    };
    TableauCardManager.prototype.updateCardTooltips = function () {
        var _this = this;
        Object.values(this.empireSquareStocks).forEach(function (stock) {
            stock.getCards().forEach(function (card) {
                var _a, _b;
                if (card.type !== EMPIRE_CARD) {
                    return;
                }
                _this.game.tooltipManager.removeTooltip(card.id);
                _this.game.tooltipManager.addEmpireCardTooltip({
                    nodeId: card.id,
                    card: card,
                    religion: _this.game.gameOptions.ageOfReformationPromo &&
                        card.id === "EmpireSquare_PapalStates"
                        ? ((_b = (_a = document
                            .getElementById("pr_papalStates")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-card-id")) === null || _b === void 0 ? void 0 : _b.split("_")[0]) || ""
                        : "",
                });
            });
        });
        Object.values(this.queenStocks).forEach(function (stock) {
            stock.getCards().forEach(function (card) {
                if (card.type !== TABLEAU_CARD) {
                    return;
                }
                _this.game.tooltipManager.removeTooltip(card.id);
                _this.game.tooltipManager.addCardTooltip({ nodeId: card.id, card: card });
            });
        });
    };
    TableauCardManager.prototype.setupDiv = function (card, div) {
        if (card.type === EMPIRE_CARD_CONTAINER) {
            this.setupEmpireCardContainerDiv(card, div);
            return;
        }
        var isEmpireCard = card.type === EMPIRE_CARD;
        if (card.type === TABLEAU_CARD) {
            div.style.width = "calc(var(--paxRenCardScale) * 151px)";
            div.style.height = "calc(var(--paxRenCardScale) * 230px)";
        }
        else {
            div.style.minWidth = "calc(var(--paxRenCardScale) * 151px)";
            div.style.minHeight = "calc(var(--paxRenCardScale) * 151px)";
        }
        div.style.position = "relative";
        div.insertAdjacentHTML("beforeend", tplTokensContainer({ id: card.id }));
        if (isEmpireCard) {
            (card.king.ops || []).forEach(function (operation) {
                var element = document.getElementById("pr_".concat(card.id, "_").concat(operation.id, "_king"));
                if (!element) {
                    div.insertAdjacentHTML("beforeend", tplOperationSelect({
                        operation: operation,
                        cardId: card.id,
                        side: KING,
                    }));
                }
            });
            (card.republic.ops || []).forEach(function (operation) {
                var element = document.getElementById("pr_".concat(card.id, "_").concat(operation.id, "_republic"));
                if (!element) {
                    div.insertAdjacentHTML("beforeend", tplOperationSelect({
                        operation: operation,
                        cardId: card.id,
                        side: REPUBLIC,
                    }));
                }
            });
        }
        else {
            var ops = card.ops;
            (ops || []).forEach(function (operation) {
                var element = document.getElementById("pr_".concat(card.id, "_").concat(operation.id).concat(isEmpireCard ? "_".concat(KING) : ""));
                if (!element) {
                    div.insertAdjacentHTML("beforeend", tplOperationSelect({
                        operation: operation,
                        cardId: card.id,
                        side: null,
                    }));
                }
            });
            var abilityAction = card.specialAbilities.find(function (ability) { return ability.abilityAction; });
            if (abilityAction) {
                var abilityActionElement = document.getElementById("pr_".concat(card.id, "_").concat(abilityAction.id));
                if (!abilityActionElement) {
                    div.insertAdjacentHTML("beforeend", tplAbilityActionSelect({
                        abilityAction: abilityAction,
                        cardId: card.id,
                    }));
                }
            }
        }
        if (card.type === EMPIRE_CARD) {
            div.classList.add("pr_empire_square");
        }
    };
    TableauCardManager.prototype.setupFrontDiv = function (card, div) {
        if (card.type === EMPIRE_CARD_CONTAINER) {
            div.style.display = "none";
            return;
        }
        var isEmpireCard = card.type === EMPIRE_CARD;
        if (card.type === TABLEAU_CARD) {
            div.classList.add("pr_card");
            div.setAttribute("data-card-id", card.id.split("_")[0]);
            div.style.width = "calc(var(--paxRenCardScale) * 151px)";
            div.style.height = "calc(var(--paxRenCardScale) * 230px)";
        }
        else if (isEmpireCard) {
            div.classList.add("pr_square_card");
            div.setAttribute("data-card-id", "".concat(card.id, "_king"));
            div.style.width = "calc(var(--paxRenCardScale) * 151px)";
            div.style.height = "calc(var(--paxRenCardScale) * 151px)";
            if (this.game.gameOptions.ageOfReformationPromo) {
                div.setAttribute("data-map-type", "ageOfReformation");
                if (card.id === "EmpireSquare_PapalStates") {
                    var religion = this.game.gamedatas.gameMap.empires.find(function (empire) { return empire.id === PAPAL_STATES; }).religion;
                    div.setAttribute("data-religion", religion);
                }
            }
        }
        if (card.type === TABLEAU_CARD &&
            card.location !== "market_west_0" &&
            card.location !== "market_east_0") {
            this.game.tooltipManager.addCardTooltip({
                nodeId: card.id,
                card: card,
            });
        }
        else if (card.type === EMPIRE_CARD) {
            this.game.tooltipManager.addEmpireCardTooltip({
                nodeId: card.id,
                card: card,
                religion: this.game.gameOptions.ageOfReformationPromo &&
                    card.id === "EmpireSquare_PapalStates"
                    ? this.game.gamedatas.gameMap.empires.find(function (empire) { return empire.id === PAPAL_STATES; })
                        .religion
                    : "",
            });
        }
    };
    TableauCardManager.prototype.setupBackDiv = function (card, div) {
        if (card.type === EMPIRE_CARD_CONTAINER) {
            div.style.display = "none";
            return;
        }
        var isEmpireCard = card.type === EMPIRE_CARD;
        if (card.type === TABLEAU_CARD) {
            div.classList.add("pr_card");
            div.setAttribute("data-card-id", card.region === EAST ? "EAST_BACK" : "WEST_BACK");
            div.style.width = "calc(var(--paxRenCardScale) * 151px)";
            div.style.height = "calc(var(--paxRenCardScale) * 230px)";
        }
        else if (isEmpireCard) {
            div.classList.add("pr_square_card");
            div.setAttribute("data-card-id", "".concat(card.id, "_republic"));
            div.style.width = "calc(var(--paxRenCardScale) * 151px)";
            div.style.height = "calc(var(--paxRenCardScale) * 151px)";
            if (this.game.gameOptions.ageOfReformationPromo) {
                div.setAttribute("data-map-type", "ageOfReformation");
            }
        }
    };
    TableauCardManager.prototype.isCardVisible = function (card) {
        if (card.type === EMPIRE_CARD_CONTAINER) {
            return true;
        }
        var location = card.location, type = card.type;
        if (location && location.startsWith("deck")) {
            return false;
        }
        if (location === "market_west_0" || location === "market_east_0") {
            return false;
        }
        if (type === EMPIRE_CARD && card.side === REPUBLIC) {
            return false;
        }
        return true;
    };
    TableauCardManager.prototype.setupVassal = function (_a) {
        var vassal = _a.vassal, suzerain = _a.suzerain;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.vassalStocks[suzerain.empire].addCard(createEmpireCardContainer(vassal));
                return [2];
            });
        });
    };
    TableauCardManager.prototype.addVassal = function (_a) {
        var vassal = _a.vassal, suzerain = _a.suzerain;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.vassalStocks[suzerain.empire].addCard(createEmpireCardContainer(vassal));
                return [2];
            });
        });
    };
    TableauCardManager.prototype.addQueen = function (_a) {
        var king = _a.king, queen = _a.queen;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.queenStocks[king.empire].addCard(queen)];
                    case 1:
                        _b.sent();
                        this.addMarginBottomQueen({ queen: queen });
                        return [2];
                }
            });
        });
    };
    TableauCardManager.prototype.setupEmpireCardContainerDiv = function (container, div) {
        div.classList.add("pr_empire_square_container");
        div.insertAdjacentHTML("beforeend", "<div id=\"".concat(container.id, "_queens\" class=\"pr_queens_container\"></div>"));
        div.insertAdjacentHTML("beforeend", "<div id=\"".concat(container.id, "_empire_square\" style=\"width: calc(var(--paxRenCardScale) * 151px); height: calc(var(--paxRenCardScale) * 151px);\"></div>"));
        div.insertAdjacentHTML("beforeend", "<div id=\"".concat(container.id, "_vassals\" class=\"pr_vassals_container\"></div>"));
        this.empireSquareStocks[container.empireId] = new LineStock(this, document.getElementById("".concat(container.id, "_empire_square")), {
            gap: "12px",
            sort: sortFunction("state"),
        });
        this.empireSquareStocks[container.empireId].addCard(container.card);
        this.vassalStocks[container.empireId] = new LineStock(this, document.getElementById("".concat(container.id, "_vassals")), {
            sort: sortFunction("state"),
            gap: "calc(var(--paxRenCardScale) * 12px)",
        });
        this.queenStocks[container.empireId] = new LineStock(this, document.getElementById("".concat(container.id, "_queens")));
        for (var _i = 0, _a = container.card.queens; _i < _a.length; _i++) {
            var queen = _a[_i];
            this.queenStocks[container.empireId].addCard(queen);
            this.addMarginBottomQueen({ queen: queen });
        }
    };
    return TableauCardManager;
}(CardManager));
var createEmpireCardContainerId = function (card) {
    return "".concat(card.empire, "_container");
};
var createEmpireCardContainer = function (card) {
    var empire = card.empire, state = card.state, location = card.location;
    var container = {
        type: EMPIRE_CARD_CONTAINER,
        id: "".concat(empire, "_container"),
        empireId: empire,
        card: card,
        state: state,
        location: location,
    };
    return container;
};
var noMarriedQueensNoVassals = function (card) {
    if (card.isQueen && card.hasKing) {
        return false;
    }
    return card.type === TABLEAU_CARD || !card.isVassal;
};
var getTotalHeightQueens = function (_a) {
    var queens = _a.queens;
    var totalHeight = 0;
    queens.forEach(function (queen) {
        totalHeight = totalHeight + queen.height;
    });
    return totalHeight;
};
var tplAbilityActionSelect = function (_a) {
    var abilityAction = _a.abilityAction, cardId = _a.cardId;
    return "<div id=\"pr_".concat(cardId, "_").concat(abilityAction.id, "\" class=\"pr_ability_action_select\" style=\"top: calc(var(--paxRenCardScale) * ").concat(abilityAction.top, "px); left: calc(var(--paxRenCardScale) * ").concat(abilityAction.left, "px); height: calc(var(--paxRenCardScale) * ").concat(abilityAction.height, "px); width: calc(var(--paxRenCardScale) * ").concat(abilityAction.width, "px);\"></div>");
};
var tplOperationSelect = function (_a) {
    var operation = _a.operation, cardId = _a.cardId, side = _a.side;
    return "<div id=\"pr_".concat(cardId, "_").concat(operation.id).concat(side ? "_".concat(side) : "", "\" class=\"pr_tableau_op_select\" style=\"top: calc(var(--paxRenCardScale) * ").concat(operation.top, "px); left: calc(var(--paxRenCardScale) * ").concat(operation.left, "px);\"></div>");
};
var tplTokensContainer = function (_a) {
    var id = _a.id;
    return "\n  <div id=\"".concat(id, "_tokens\" class=\"pr_card_tokens_container\"></div>");
};
var tplVassalsContainer = function (_a) {
    var id = _a.id;
    return "\n  <div id=\"vassals_".concat(id, "\" class=\"pr_vassals_container\"></div>");
};
var tplQueen = function (_a) {
    var queen = _a.queen;
    return "<div id=\"".concat(queen.id, "\" class=\"pr_card\" data-card-id=\"").concat(queen.id.split("_")[0], "\">\n    <div id=\"").concat(queen.id, "_tokens\" class=\"pr_card_tokens_container\"></div>\n  </div>");
};
var tplQueenContainer = function (_a) {
    var id = _a.id;
    return "\n  <div id=\"queens_".concat(id, "\" class=\"pr_queens_container\">\n    \n  </div>");
};
var VictoryCardManager = (function (_super) {
    __extends(VictoryCardManager, _super);
    function VictoryCardManager(game) {
        var _this = _super.call(this, game, {
            getId: function (card) { return "".concat(card.id); },
            setupDiv: function (card, div) {
                div.style.width = "calc(var(--paxRenCardScale) * 151px)";
                div.style.height = "calc(var(--paxRenCardScale) * 151px)";
                _this.game.tooltipManager.addVictoryCardTooltip({
                    nodeId: card.id,
                    card: card,
                });
            },
            setupFrontDiv: function (card, div) { return _this.setupFrontDiv(card, div); },
            setupBackDiv: function (card, div) { return _this.setupBackDiv(card, div); },
            isCardVisible: function (card) {
                return card.side === ACTIVE;
            },
            animationManager: game.animationManager,
        }) || this;
        _this.game = game;
        _this.setupVictorySquares();
        return _this;
    }
    VictoryCardManager.prototype.updateCardTooltips = function () {
        var _this = this;
        Object.values(this.victoryCardStocks).forEach(function (stock) {
            stock.getCards().forEach(function (card) {
                _this.game.tooltipManager.removeTooltip(card.id);
                _this.game.tooltipManager.addVictoryCardTooltip({
                    nodeId: card.id,
                    card: card,
                });
            });
        });
    };
    VictoryCardManager.prototype.clearInterface = function () {
        var _this = this;
        Object.keys(this.victoryCardStocks).forEach(function (key) {
            _this.victoryCardStocks[key].removeAll();
        });
    };
    VictoryCardManager.prototype.updateInterface = function (_a) {
        var gamedatas = _a.gamedatas;
        this.setupCards({ gamedatas: gamedatas });
    };
    VictoryCardManager.prototype.setupFrontDiv = function (card, div) {
        div.setAttribute("data-card-id", "".concat(card.location, "_active"));
        div.classList.add("pr_square_card");
    };
    VictoryCardManager.prototype.setupBackDiv = function (card, div) {
        div.setAttribute("data-card-id", "".concat(card.location, "_inactive"));
        div.classList.add("pr_square_card");
    };
    VictoryCardManager.prototype.setupVictorySquares = function () {
        var _a;
        this.victoryCardStocks = (_a = {},
            _a[VICTORY_RENAISSANCE] = new LineStock(this, document.getElementById("pr_".concat(VICTORY_RENAISSANCE, "_slot"))),
            _a[VICTORY_GLOBALIZATION] = new LineStock(this, document.getElementById("pr_".concat(VICTORY_GLOBALIZATION, "_slot"))),
            _a[VICTORY_IMPERIAL] = new LineStock(this, document.getElementById("pr_".concat(VICTORY_IMPERIAL, "_slot"))),
            _a[VICTORY_HOLY] = new LineStock(this, document.getElementById("pr_".concat(VICTORY_HOLY, "_slot"))),
            _a);
        if (this.game.gameOptions.ageOfReformationPromo) {
            this.victoryCardStocks[VICTORY_AGE_OF_BYZANTINE] =
                new LineStock(this, document.getElementById("pr_".concat(VICTORY_AGE_OF_BYZANTINE, "_slot")));
        }
        this.setupCards({ gamedatas: this.game.gamedatas });
    };
    VictoryCardManager.prototype.setupCards = function (_a) {
        var _this = this;
        var gamedatas = _a.gamedatas;
        gamedatas.victoryCards.forEach(function (card) {
            _this.victoryCardStocks[card.location].addCard(card);
        });
    };
    return VictoryCardManager;
}(CardManager));
var isDebug = window.location.host == 'studio.boardgamearena.com' || window.location.hash.indexOf('debug') > -1;
var debug = isDebug ? console.info.bind(window.console) : function () { };
var capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
var pxNumber = function (px) {
    if ((px || '').endsWith('px')) {
        return Number(px.slice(0, -2));
    }
    else {
        return 0;
    }
};
var getUniqueAgents = function (_a) {
    var agents = _a.agents;
    if (agents.length <= 1) {
        return agents;
    }
    var equalSeparator = agents[0].separator === agents[1].separator;
    var equalType = agents[0].type === agents[1].type;
    if (equalSeparator && equalType) {
        return [agents[0]];
    }
    else {
        return agents;
    }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
var THRONES_CONFIG = (_a = {},
    _a[ENGLAND] = {
        empireSquareId: "EmpireSquare_England",
        top: 120,
        left: 349,
        location: 'top',
    },
    _a[FRANCE] = {
        empireSquareId: "EmpireSquare_France",
        top: 120,
        left: 526,
        location: 'top',
    },
    _a[HOLY_ROMAN_EMIRE] = {
        empireSquareId: "EmpireSquare_HolyRomanEmpire",
        top: 120,
        left: 700,
        location: 'top',
    },
    _a[HUNGARY] = {
        empireSquareId: "EmpireSquare_Hungary",
        top: 120,
        left: 876,
        location: 'top',
    },
    _a[BYZANTIUM] = {
        empireSquareId: "EmpireSquare_Byzantium",
        top: 120,
        left: 1052,
        location: 'top',
    },
    _a[PORTUGAL] = {
        empireSquareId: "EmpireSquare_Portugal",
        top: 754,
        left: 349,
        location: 'bottom',
    },
    _a[ARAGON] = {
        empireSquareId: "EmpireSquare_Aragon",
        top: 754,
        left: 526,
        location: 'bottom',
    },
    _a[PAPAL_STATES] = {
        empireSquareId: "EmpireSquare_PapalStates",
        top: 754,
        left: 700,
        location: 'bottom',
    },
    _a[OTTOMAN] = {
        empireSquareId: "EmpireSquare_Ottoman",
        top: 754,
        left: 876,
        location: 'bottom',
    },
    _a[MAMLUK] = {
        empireSquareId: "EmpireSquare_Mamluk",
        top: 754,
        left: 1052,
        location: 'bottom',
    },
    _a);
var MARKET_EAST_CONFIG = [
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
var MARKET_WEST_CONFIG = [
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
var VICTORY_CARD_CONFIG = (_b = {},
    _b[VICTORY_RENAISSANCE] = {
        top: 120.5,
        left: 135.5,
    },
    _b[VICTORY_GLOBALIZATION] = {
        top: 296,
        left: 135.5,
    },
    _b[VICTORY_AGE_OF_BYZANTINE] = {
        top: 440,
        left: 135.5,
    },
    _b[VICTORY_IMPERIAL] = {
        top: 578,
        left: 135.5,
    },
    _b[VICTORY_HOLY] = {
        top: 753.5,
        left: 135.5,
    },
    _b);
var MAP_CONFIG = (_c = {},
    _c[ENGLAND] = {
        top: 270,
        left: 350,
        cities: (_d = {},
            _d[LONDON] = {
                top: 76,
                left: 80,
            },
            _d[BORDEAUX] = {
                top: 185,
                left: 108,
            },
            _d),
    },
    _c[FRANCE] = {
        top: 270,
        left: 525.5,
        cities: (_e = {},
            _e[BRUGES] = {
                top: 65.5,
                left: 51.5,
            },
            _e[PARIS] = {
                top: 127,
                left: 9,
            },
            _e[LYON] = {
                top: 164,
                left: 91,
            },
            _e),
    },
    _c[HOLY_ROMAN_EMIRE] = {
        top: 270,
        left: 701,
        cities: (_f = {},
            _f[LUBECK] = {
                top: 42,
                left: 27,
            },
            _f[NOVGOROD] = {
                top: 35,
                left: 89,
            },
            _f[NURNBERG] = {
                top: 128.5,
                left: 14,
            },
            _f[VIENNA] = {
                top: 150,
                left: 88.5,
            },
            _f),
    },
    _c[HUNGARY] = {
        top: 270,
        left: 876,
        cities: (_g = {},
            _g[BUDA] = {
                top: 158,
                left: 15.5,
            },
            _g[KVIV] = {
                top: 46,
                left: 97,
            },
            _g[VARNA] = {
                top: 170.5,
                left: 76,
            },
            _g),
    },
    _c[BYZANTIUM] = {
        top: 270,
        left: 1053,
        cities: (_h = {},
            _h[TANA] = {
                top: 41,
                left: 40,
            },
            _h[CAFFA] = {
                top: 131,
                left: 5,
            },
            _h[TREBIZOND] = {
                top: 188,
                left: 112,
            },
            _h),
    },
    _c[PORTUGAL] = {
        top: 525,
        left: 350,
        cities: (_j = {},
            _j[TOLEDO] = {
                top: 62.5,
                left: 94,
            },
            _j[GRANADA] = {
                top: 118.5,
                left: 103,
            },
            _j[SPICE_ISLANDS] = {
                top: 184,
                left: 37,
            },
            _j),
    },
    _c[ARAGON] = {
        top: 525,
        left: 525.5,
        cities: (_k = {},
            _k[VALENCIA] = {
                top: 55.5,
                left: 14.5,
            },
            _k[ALGIERS] = {
                top: 143.5,
                left: 101,
            },
            _k[TIMBUKTU] = {
                top: 165.5,
                left: 33,
            },
            _k),
    },
    _c[PAPAL_STATES] = {
        top: 525,
        left: 701,
        cities: (_l = {},
            _l[VENICE] = {
                top: 20.5,
                left: 40,
            },
            _l[VENICE_2] = {
                top: 39,
                left: 58,
            },
            _l),
    },
    _c[OTTOMAN] = {
        top: 525,
        left: 876,
        cities: (_m = {},
            _m[CONSTANTINOPLE_1] = {
                top: 24.5,
                left: 10.5,
            },
            _m[CONSTANTINOPLE_2] = {
                top: 24.5,
                left: 45,
            },
            _m[CONSTANTINOPLE_3] = {
                top: 24.5,
                left: 79.5,
            },
            _m[MODON] = {
                top: 96,
                left: 19.5,
            },
            _m[RHODES] = {
                top: 86.5,
                left: 108,
            },
            _m),
    },
    _c[MAMLUK] = {
        top: 525,
        left: 1053,
        cities: (_o = {},
            _o[CYPRUS] = {
                top: 76,
                left: 54.5,
            },
            _o[CAIRO] = {
                top: 162,
                left: 42,
            },
            _o[RED_SEA] = {
                top: 163.5,
                left: 106,
            },
            _o),
    },
    _c);
var BORDER_CONFIG = (_p = {},
    _p[BORDER_ARAGON_FRANCE] = {
        top: 495,
        left: 586,
    },
    _p[BORDER_ARAGON_PAPAL_STATES] = {
        top: 601,
        left: 670,
    },
    _p[BORDER_ARAGON_PORTUGAL] = {
        top: 676,
        left: 495,
    },
    _p[BORDER_BYZANTIUM_HUNGARY] = {
        top: 446,
        left: 1022,
    },
    _p[BORDER_BYZANTIUM_MAMLUK] = {
        top: 495,
        left: 1112,
    },
    _p[BORDER_ENGLAND_PORTUGAL] = {
        top: 495,
        left: 390,
    },
    _p[BORDER_ENGLAND_FRANCE] = {
        top: 348,
        left: 495,
    },
    _p[BORDER_FRANCE_HOLY_ROMAN_EMPIRE] = {
        top: 313,
        left: 670,
    },
    _p[BORDER_HOLY_ROMAN_EMPIRE_HUNGARY] = {
        top: 368,
        left: 846,
    },
    _p[BORDER_HOLY_ROMAN_EMPIRE_PAPAL_STATES] = {
        top: 495,
        left: 754,
    },
    _p[BORDER_HUNGARY_OTTOMAN] = {
        top: 495,
        left: 976,
    },
    _p[BORDER_MAMLUK_OTTOMAN] = {
        top: 670,
        left: 1022,
    },
    _p[BORDER_OTTOMAN_PAPAL_STATES] = {
        top: 663,
        left: 846,
    },
    _p);
var LOCAL_STORAGE_MAP_ZOOM_KEY = "PaxRenaissance-map-zoom";
var ZOOM_LEVELS = [0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];
var MAX_MAP_HEIGHT = 1500;
var MAX_MAP_WIDTH = 1500;
var GameMap = (function () {
    function GameMap(game) {
        var _a;
        this.supremeReligion = (_a = {},
            _a[CATHOLIC] = {
                bishops: new ebg.counter(),
                tokens: new ebg.counter(),
            },
            _a[ISLAMIC] = {
                bishops: new ebg.counter(),
                tokens: new ebg.counter(),
            },
            _a[REFORMIST] = {
                bishops: new ebg.counter(),
                tokens: new ebg.counter(),
            },
            _a);
        this.game = game;
        var gamedatas = game.gamedatas;
        this.setupGameMap({ gamedatas: gamedatas });
    }
    GameMap.prototype.clearInterface = function () {
        var _this = this;
        __spreadArray(__spreadArray([], BORDERS, true), CITIES, true).forEach(function (location) {
            var node = document.getElementById("pr_".concat(location));
            if (!node) {
                return;
            }
            node.replaceChildren();
        });
        Object.keys(this.empireSquareStocks).forEach(function (stockId) {
            _this.empireSquareStocks[stockId].removeAll();
        });
        Object.values(THRONES_CONFIG).forEach(function (_a) {
            var empireSquareId = _a.empireSquareId;
            var node = document.getElementById("".concat(empireSquareId, "_throne_tokens"));
            if (!node) {
                return;
            }
            node.replaceChildren();
        });
    };
    GameMap.prototype.updateInterface = function (_a) {
        var gamedatas = _a.gamedatas;
        this.setupTokensBorders({ gamedatas: gamedatas });
        this.setupTokensCities({ gamedatas: gamedatas });
        this.updateEmpireCards({ gamedatas: gamedatas });
        this.setupMapCards({ gamedatas: gamedatas });
        this.updateSupremeReligionCounters({ gamedatas: gamedatas });
    };
    GameMap.prototype.setupSupremeReligionCounters = function (_a) {
        var _b;
        var _this = this;
        var gamedatas = _a.gamedatas;
        var religionArgs = (_b = {},
            _b[CATHOLIC] = {
                religion: _("Catholic"),
            },
            _b[ISLAMIC] = {
                religion: _("Islamic"),
            },
            _b[REFORMIST] = {
                religion: _("Reformist"),
            },
            _b);
        RELIGIONS.forEach(function (religion) {
            _this.supremeReligion[religion].bishops.create("pr_supreme_religion_bishop_counter_".concat(religion));
            _this.game.tooltipManager.addIconTooltip({
                nodeId: "pr_supreme_religion_bishop_counter_container_".concat(religion),
                iconHtml: tplToken({
                    type: BISHOP,
                    separator: religion,
                    style: "--paxRenTokenScale: 0.8;",
                }),
                text: _this.game.format_string_recursive(_("The number of ${religion} Bishop Tokens in play for Holy Victory."), religionArgs[religion]),
                title: _this.game.format_string_recursive(_("${religion} Bishop Tokens"), religionArgs[religion]),
            });
            _this.supremeReligion[religion].tokens.create("pr_tokens_theocracies_counter_".concat(religion));
            _this.game.tooltipManager.addIconTooltip({
                nodeId: "pr_supreme_religion_token_counter_".concat(religion),
                iconHtml: tplTokensInTheocraciesIcon({ religion: religion }),
                text: _this.game.format_string_recursive(_("The number of ${religion} Tokens in play in ${religion} Theocracies for Holy Victory."), religionArgs[religion]),
                title: _this.game.format_string_recursive(_("${religion} Tokens"), religionArgs[religion]),
            });
        });
        this.updateSupremeReligionCounters({ gamedatas: gamedatas });
    };
    GameMap.prototype.setupMapCards = function (_a) {
        var _this = this;
        var gamedatas = _a.gamedatas;
        gamedatas.gameMap.empires.forEach(function (empire) {
            return _this.setEmpireReligion({ empireId: empire.id, religion: empire.religion });
        });
        this.setAgeOfReformationPromoAttributes(gamedatas.gameOptions.ageOfReformationPromo);
        this.setVenice2Visibility(gamedatas.gameMap.condottiereActive);
    };
    GameMap.prototype.setupTokensBorders = function (_a) {
        var gamedatas = _a.gamedatas;
        BORDERS.forEach(function (border) {
            var tokens = gamedatas.tokens.inPlay.filter(function (piece) { return piece.location === border; });
            var node = document.getElementById("pr_".concat(border));
            if (!node) {
                return;
            }
            tokens.forEach(function (token) {
                node.insertAdjacentHTML("beforeend", tplToken(token));
            });
        });
    };
    GameMap.prototype.setupTokensCities = function (_a) {
        var gamedatas = _a.gamedatas;
        CITIES.forEach(function (city) {
            var token = gamedatas.tokens.inPlay.find(function (piece) { return piece.location === city; });
            if (!token) {
                return;
            }
            var node = document.getElementById("pr_".concat(city));
            if (!node) {
                return;
            }
            node.insertAdjacentHTML("beforeend", tplToken(token));
        });
    };
    GameMap.prototype.setupEmpireCards = function (_a) {
        var _b;
        var gamedatas = _a.gamedatas;
        this.empireSquareStocks = (_b = {},
            _b[ARAGON] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(ARAGON, "_throne")), { direction: "column", center: false }),
            _b[BYZANTIUM] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(BYZANTIUM, "_throne")), { direction: "column", center: false }),
            _b[ENGLAND] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(ENGLAND, "_throne")), { direction: "column", center: false }),
            _b[FRANCE] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(FRANCE, "_throne")), { direction: "column", center: false }),
            _b[HOLY_ROMAN_EMIRE] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(HOLY_ROMAN_EMIRE, "_throne")), { direction: "column", center: false }),
            _b[HUNGARY] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(HUNGARY, "_throne")), { direction: "column", center: false }),
            _b[MAMLUK] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(MAMLUK, "_throne")), { direction: "column", center: false }),
            _b[OTTOMAN] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(OTTOMAN, "_throne")), { direction: "column", center: false }),
            _b[PAPAL_STATES] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(PAPAL_STATES, "_throne")), { direction: "column", center: false }),
            _b[PORTUGAL] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(PORTUGAL, "_throne")), { direction: "column", center: false }),
            _b);
        this.updateEmpireCards({ gamedatas: gamedatas });
    };
    GameMap.prototype.updateEmpireCards = function (_a) {
        var _this = this;
        var gamedatas = _a.gamedatas;
        gamedatas.gameMap.thrones.cards
            .filter(function (card) { return !card.isQueen; })
            .forEach(function (card) {
            var empire = card.location.split("_")[1];
            if (_this.empireSquareStocks[empire]) {
                var container = {
                    type: EMPIRE_CARD_CONTAINER,
                    id: "".concat(empire, "_container"),
                    empireId: card.empire,
                    card: card,
                    state: card.state,
                    location: card.location,
                };
                _this.empireSquareStocks[empire].addCard(container);
                card.queens.forEach(function (queen) {
                    var queenTokensNode = document.getElementById("".concat(queen.id, "_tokens"));
                    gamedatas.tokens.inPlay
                        .filter(function (token) { return token.location === queen.id; })
                        .forEach(function (token) {
                        queenTokensNode.insertAdjacentHTML("beforeend", tplToken(token));
                    });
                });
            }
        });
        var repressTokensToThrones = this.game.settings.get({
            id: REPRESS_TOKENS_TO_THRONES,
        }) === ENABLED;
        gamedatas.gameMap.thrones.tokens.forEach(function (token) {
            var location = token.location;
            var node = token.type === BISHOP || !repressTokensToThrones
                ? document.getElementById("".concat(location, "_tokens"))
                : document.getElementById("".concat(location, "_throne_tokens"));
            if (!node) {
                return;
            }
            node.insertAdjacentHTML("beforeend", tplToken(token));
        });
        gamedatas.empireSquares.forEach(function (card) {
            _this.updateCoatOfArms({ card: card });
        });
    };
    GameMap.prototype.setupGameMap = function (_a) {
        var gamedatas = _a.gamedatas;
        document.getElementById("pr_play_area_container").insertAdjacentHTML("afterbegin", tplGameMap({
            ageOfReformation: this.game.gameOptions.ageOfReformationPromo,
        }));
        this.game.tooltipManager.setupDrawDeckTooltips();
        this.setupEmpireCards({ gamedatas: gamedatas });
        this.setupTokensCities({ gamedatas: gamedatas });
        this.setupTokensBorders({ gamedatas: gamedatas });
        this.setupMapCards({ gamedatas: gamedatas });
        this.setupSupremeReligionCounters({ gamedatas: gamedatas });
    };
    GameMap.prototype.updateSupremeReligionCounters = function (_a) {
        var _this = this;
        var gamedatas = _a.gamedatas;
        RELIGIONS.forEach(function (religion) {
            _this.supremeReligion[religion].bishops.setValue(gamedatas.supremeReligion.bishops[religion]);
            _this.supremeReligion[religion].tokens.setValue(gamedatas.supremeReligion.tokens[religion]);
        });
    };
    GameMap.prototype.getEmpireSquareStock = function (_a) {
        var empireId = _a.empireId;
        return this.empireSquareStocks[empireId];
    };
    GameMap.prototype.setEmpireReligion = function (_a) {
        var empireId = _a.empireId, religion = _a.religion;
        var node = document.getElementById("pr_".concat(empireId));
        if (!node) {
            return;
        }
        node.setAttribute("data-card-id", "".concat(religion, "_").concat(empireId));
    };
    GameMap.prototype.setAgeOfReformationPromoAttributes = function (active) {
        if (!active) {
            return;
        }
        [HUNGARY, OTTOMAN].forEach(function (empire) {
            var node = document.getElementById("pr_".concat(empire));
            if (!node) {
                return;
            }
            node.setAttribute("data-map-type", "ageOfReformation");
        });
    };
    GameMap.prototype.setVenice2Visibility = function (visible) {
        if (visible === void 0) { visible = true; }
        var venice2Node = document.getElementById("venice2_overlay");
        if (!venice2Node) {
            return;
        }
        if (visible) {
            venice2Node.style.opacity = "1";
        }
        else {
            venice2Node.style.opacity = "0";
        }
    };
    GameMap.prototype.updateCoatOfArms = function (_a) {
        var card = _a.card;
        var coatOfArmsNode = document.getElementById("pr_".concat(card.empire, "_coat_of_arms"));
        if (!coatOfArmsNode) {
            return;
        }
        coatOfArmsNode.setAttribute("data-side", card.side);
        coatOfArmsNode.setAttribute("data-owner", card.owningBank === null ? "none" : card.owningBank);
    };
    return GameMap;
}());
var tplToken = function (_a) {
    var id = _a.id, type = _a.type, separator = _a.separator, style = _a.style;
    return "<div ".concat(id ? "id=\"".concat(id, "\"") : "", " class=\"pr_token pr_").concat(type, "\" data-separator=\"").concat(separator, "\" ").concat(style ? "style=\"".concat(style, "\"") : '', "></div>");
};
var tplGameMapMarket = function () { return "\n  ".concat(MARKET_WEST_CONFIG.map(function (_a, index) {
    var top = _a.top, left = _a.left;
    return "\n  <div id=\"pr_market_west_".concat(index, "\" class=\"pr_market\" style=\"top: calc(var(--paxRenMapScale) * ").concat(top, "px); left: calc(var(--paxRenMapScale) * ").concat(left, "px);\">\n    <div id=\"pr_market_west_").concat(index, "_stock\" class=\"pr_market_stock\"></div>\n    ").concat(tplIcon({
        id: "pr_market_west_".concat(index, "_florins"),
        icon: "florin",
        classes: "pr_none",
        extra: 'data-region="west"',
        children: "<span id=\"pr_market_west_".concat(index, "_counter\" class=\"pr_counter\"></span>"),
    }), "\n  </div>");
}).join(""), "\n  <div id=\"pr_market_west_deck_container\" class=\"pr_market pr_card\" data-card-id=\"WEST_BACK\" style=\"top: calc(var(--paxRenCardScale) * 950px); left: calc(var(--paxRenCardScale) * 1095px);\">\n    <div id=\"pr_market_west_deck\"></div>\n    <div id=\"pr_market_west_deck_counter_container\" class=\"pr_deck_counter\">\n      <span id=\"pr_market_west_deck_counter\" class=\"pr_deck_counter_text\"></span>\n      <span class=\"pr_deck_counter_text\">/</span>\n      <div id=\"pr_deck_counter_comet3\" class=\"pr_deck_counter_comet\" data-card-id=\"COMET3\"></div>\n      <div id=\"pr_deck_counter_comet4\" class=\"pr_deck_counter_comet\" data-card-id=\"COMET4\"></div>\n    </div>\n  </div>\n  ").concat(MARKET_EAST_CONFIG.map(function (_a, index) {
    var top = _a.top, left = _a.left;
    return "\n  <div id=\"pr_market_east_".concat(index, "\" class=\"pr_market\" style=\"top: calc(var(--paxRenMapScale) * ").concat(top, "px); left: calc(var(--paxRenMapScale) * ").concat(left, "px);\">\n    <div id=\"pr_market_east_").concat(index, "_stock\" class=\"pr_market_stock\"></div>\n    ").concat(tplIcon({
        id: "pr_market_east_".concat(index, "_florins"),
        icon: "florin",
        classes: "pr_none",
        extra: 'data-region="east"',
        children: "<span id=\"pr_market_east_".concat(index, "_counter\" class=\"pr_counter\"></span>"),
    }), "\n  </div>");
}).join(""), "\n  <div id=\"pr_market_east_deck_container\" class=\"pr_market pr_card\" data-card-id=\"EAST_BACK\" style=\"top: calc(var(--paxRenCardScale) * 1200px); left: calc(var(--paxRenCardScale) * 1095px);\">\n    <div id=\"pr_market_east_deck\"></div>\n    <div id=\"pr_market_east_deck_counter_container\" class=\"pr_deck_counter\">\n      <span id=\"pr_market_east_deck_counter\" class=\"pr_deck_counter_text\"></span>\n      <span class=\"pr_deck_counter_text\">/</span>\n      <div id=\"pr_deck_counter_comet1\" class=\"pr_deck_counter_comet\" data-card-id=\"COMET1\"></div>\n      <div id=\"pr_deck_counter_comet2\" class=\"pr_deck_counter_comet\" data-card-id=\"COMET2\"></div>\n    </div>\n  </div>\n"); };
var tplGameMapEmpireCards = function () { return "\n  ".concat(Object.entries(THRONES_CONFIG)
    .map(function (_a) {
    var empire = _a[0], _b = _a[1], top = _b.top, left = _b.left, location = _b.location, empireSquareId = _b.empireSquareId;
    return "<div id=\"pr_".concat(empire, "_throne\" class=\"pr_empire_throne pr_empire_throne_").concat(location, "\" style=\"top: calc(var(--paxRenMapScale) * ").concat(top, "px); left: calc(var(--paxRenMapScale) * ").concat(left, "px);\">\n          <div id=\"pr_").concat(empire, "_coat_of_arms\" class=\"pr_empire_throne_coat_of_arms pr_coat_of_arms\"></div>\n          <div id=\"").concat(empireSquareId, "_throne_tokens\" class=\"pr_empire_throne_tokens\"></div>\n        </div>");
})
    .join(""), "\n"); };
var tplGameMapMapBorders = function () {
    return Object.entries(BORDER_CONFIG)
        .map(function (_a) {
        var border = _a[0], coords = _a[1];
        return "<div id=\"pr_".concat(border, "\" class=\"pr_border\" style=\"top: calc(var(--paxRenMapScale) * ").concat(coords.top, "px); left: calc(var(--paxRenMapScale) * ").concat(coords.left, "px);\"></div>");
    })
        .join("");
};
var tplGameMapMapCards = function () {
    var htmlArray = Object.entries(MAP_CONFIG).map(function (_a) {
        var empire = _a[0], data = _a[1];
        return "\n  <div id=\"pr_".concat(empire, "\" class=\"pr_map_card\" data-card-id=\"medieval_").concat(empire, "\">\n    ").concat(Object.entries(data.cities)
            .map(function (_a) {
            var city = _a[0], coords = _a[1];
            if (city === VENICE_2) {
                return "<div id=\"".concat(city, "_overlay\" style=\"top: calc(var(--paxRenMapScale) * ").concat(coords.top, "px); left: calc(var(--paxRenMapScale) * ").concat(coords.left, "px); opacity: 0;\">\n                    <div id=\"pr_").concat(city, "\" class=\"pr_city\"></div>\n                  </div>");
            }
            else {
                return "<div id=\"pr_".concat(city, "\" data-city-id=\"").concat(city, "\" class=\"pr_city\"></div>");
            }
        })
            .join(""), "\n  </div>\n");
    });
    return htmlArray.join("");
};
var tplGameMapVictoryCards = function (_a) {
    var _b = _a.ageOfReformation, ageOfReformation = _b === void 0 ? false : _b;
    return "\n  ".concat(Object.entries(VICTORY_CARD_CONFIG)
        .map(function (_a) {
        var victory = _a[0], _b = _a[1], top = _b.top, left = _b.left;
        return "<div id=\"pr_".concat(victory, "_slot\" class=\"pr_victory_slot\"").concat(ageOfReformation ? ' data-map-type="ageOfReformation"' : "", "></div>");
    })
        .join(""), "\n  ");
};
var tplTokensInTheocraciesIcon = function (_a) {
    var religion = _a.religion;
    return "\n  <div class=\"pr_supreme_religion_tokens_theocracies_icon_container\">\n    <div class=\"pr_token pr_pirate\" data-separator=\"".concat(religion, "\"></div>\n    <div class=\"pr_token pr_knight\" data-separator=\"").concat(religion, "\" style=\"margin-left: calc(var(--paxRenTokenScale) * -32px);\"></div>\n    <div class=\"pr_token pr_rook\" data-separator=\"").concat(religion, "\" style=\"margin-left: calc(var(--paxRenTokenScale) * -18px);\"></div>\n  </div>\n  ");
};
var tplGameMapTheocraciesCounter = function (_a) {
    var religion = _a.religion;
    return "\n  <div id=\"pr_supreme_religion_token_counter_".concat(religion, "\" class=\"pr_supreme_religion_token_counter\">\n      ").concat(tplTokensInTheocraciesIcon({ religion: religion }), "\n  <span id=\"pr_tokens_theocracies_counter_").concat(religion, "\"></span>\n</div>\n  ");
};
var tplGameMapSupremeReligion = function () { return "\n  <div id=\"pr_supreme_religion_container\">\n    <div class=\"pr_religion_icons\">\n      <div id=\"pr_catholic_icon\" class=\"pr_religion_icon\" data-religion=\"catholic\"></div>\n      <div id=\"pr_islamic_icon\" class=\"pr_religion_icon\" data-religion=\"islamic\"></div>\n      <div id=\"pr_reformist_icon\" class=\"pr_religion_icon\" data-religion=\"reformist\"></div>\n    </div>\n    <div id=\"pr_supreme_religion_bishops\">\n      <div id=\"pr_supreme_religion_bishop_counter_container_catholic\" class=\"pr_supreme_religion_bishop_counter\" style=\"margin-left: calc(var(--paxRenMapScale) * 21px);\">\n        <div id=\"bishop_catholic_sr\" class=\"pr_token pr_bishop\" data-separator=\"catholic\"></div>\n        <span id=\"pr_supreme_religion_bishop_counter_catholic\"></span>\n      </div>\n      <div id=\"pr_supreme_religion_bishop_counter_container_islamic\" class=\"pr_supreme_religion_bishop_counter\">\n        <div id=\"bishop_islamic_sr\" class=\"pr_token pr_bishop\" data-separator=\"islamic\"></div>\n        <span id=\"pr_supreme_religion_bishop_counter_islamic\"></span>\n      </div>\n      <div id=\"pr_supreme_religion_bishop_counter_container_reformist\" class=\"pr_supreme_religion_bishop_counter\" style=\"margin-right: calc(var(--paxRenMapScale) * 24px);\">\n        <div id=\"bishop_reformist_sr\" class=\"pr_token pr_bishop\" data-separator=\"reformist\"></div>\n        <span id=\"pr_supreme_religion_bishop_counter_reformist\"></span>\n      </div>\n    </div>\n    <div id=\"pr_supreme_religion_tokens_theocracies\">\n      ".concat(RELIGIONS.map(function (religion) {
    return tplGameMapTheocraciesCounter({ religion: religion });
}).join(""), "\n    </div>\n  </div>\n  "); };
var tplGameMap = function (_a) {
    var _b = _a.ageOfReformation, ageOfReformation = _b === void 0 ? false : _b;
    return "\n  <div id=\"pr_game_map\">\n    <div id=\"pr_china\" ></div>\n    ".concat(tplGameMapVictoryCards({ ageOfReformation: ageOfReformation }), "\n    ").concat(tplGameMapEmpireCards(), "\n    ").concat(tplGameMapMapCards(), "\n    ").concat(tplGameMapMapBorders(), "\n    ").concat(tplGameMapSupremeReligion(), "\n    ").concat(tplGameMapSupply({ title: _("Supply") }), "\n    ").concat(tplGameMapMarket(), "\n  </div>");
};
var Hand = (function () {
    function Hand(game) {
        this.game = game;
        this.setupHand();
    }
    Hand.prototype.clearInterface = function () {
        this.hand.removeAll();
    };
    Hand.prototype.updateHand = function () {
    };
    Hand.prototype.setupHand = function () {
        var node = $("game_play_area");
        node.insertAdjacentHTML("beforeend", tplHand());
        var handWrapper = $("pr_floating_hand_wrapper");
        $("pr_floating_hand_button").addEventListener("click", function () {
            if (handWrapper.dataset.open && handWrapper.dataset.open == "hand") {
                delete handWrapper.dataset.open;
            }
            else {
                handWrapper.dataset.open = "hand";
            }
        });
        this.hand = new LineStock(this.game.tableauCardManager, document.getElementById("pr_player_hand"), { wrap: "wrap", gap: '12px', center: false });
    };
    Hand.prototype.addCard = function (card) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.hand.addCard(card)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Hand.prototype.removeCard = function (card) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.hand.removeCard(card)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Hand.prototype.getCards = function () {
        return this.hand.getCards();
    };
    Hand.prototype.getStock = function () {
        return this.hand;
    };
    return Hand;
}());
var tplHand = function () {
    return "<div id=\"pr_floating_hand_wrapper\" class=\"active\">\n            <div id=\"pr_floating_hand_button_container\">\n              <button id=\"pr_floating_hand_button\" type=\"button\" class=\"pr_button\">\n                <div class=\"pr_icon\"></div>\n              </button>  \n            </div>\n            <div id=\"pr_floating_hand\">\n              <div id=\"pr_player_hand\"\">\n              </div>\n            </div>\n          </div\n  ";
};
var IconCounter = (function () {
    function IconCounter(config) {
        var iconCounterId = config.iconCounterId, containerId = config.containerId;
        this.iconCounterId = iconCounterId;
        this.containerId = containerId;
        this.setup(config);
    }
    IconCounter.prototype.setup = function (_a) {
        var icon = _a.icon, initialValue = _a.initialValue, extraIconClasses = _a.extraIconClasses, insert = _a.insert, dataAttribute = _a.dataAttribute;
        var container = document.getElementById(this.containerId);
        if (!container) {
            return;
        }
        container.insertAdjacentHTML(insert || "beforeend", tplIconCounter({ extraIconClasses: extraIconClasses, icon: icon, iconCounterId: this.iconCounterId, value: initialValue, dataAttribute: dataAttribute }));
        this.counter = new ebg.counter();
        this.counter.create("".concat(this.iconCounterId, "_counter"));
        this.counter.setValue(initialValue);
    };
    IconCounter.prototype.setValue = function (value) {
        this.counter.setValue(value);
        var node = document.getElementById(this.iconCounterId);
        if (!node) {
            return;
        }
        this.checkNone({ node: node, value: value });
    };
    IconCounter.prototype.incValue = function (value) {
        this.counter.incValue(value);
        var node = document.getElementById(this.iconCounterId);
        if (!node) {
            return;
        }
        this.checkNone({ node: node, value: this.counter.getValue() });
    };
    IconCounter.prototype.getValue = function () {
        return this.counter.getValue();
    };
    IconCounter.prototype.checkNone = function (_a) {
        var node = _a.node, value = _a.value;
        if (value === 0) {
            node.classList.add(PR_NONE);
        }
        else {
            node.classList.remove(PR_NONE);
        }
    };
    return IconCounter;
}());
var tplIconCounter = function (_a) {
    var icon = _a.icon, iconCounterId = _a.iconCounterId, value = _a.value, extraIconClasses = _a.extraIconClasses, dataAttribute = _a.dataAttribute;
    return "\n  <div id=\"".concat(iconCounterId, "\" class=\"pr_icon_counter_container").concat(value === 0 ? " pr_none" : "", "\">\n    <span id=\"").concat(iconCounterId, "_counter\" class=\"pr_counter\"></span>\n    <div id=\"").concat(iconCounterId, "_icon\" class=\"pr_icon").concat(extraIconClasses ? " ".concat(extraIconClasses) : "", "\" data-icon=\"").concat(icon, "\"").concat(dataAttribute ? " ".concat(dataAttribute.key, "=\"").concat(dataAttribute.value, "\"") : '', "></div>\n  </div>");
};
var tplIcon = function (_a) {
    var id = _a.id, children = _a.children, classes = _a.classes, _b = _a.extra, extra = _b === void 0 ? "" : _b, icon = _a.icon, style = _a.style;
    return "<div ".concat(id ? "id=\"".concat(id, "\"") : '', " class=\"pr_icon").concat(classes ? " ".concat(classes) : '', "\" data-icon=\"").concat(icon, "\" ").concat(extra, " ").concat(style ? "style=\"".concat(style, "\"") : '', ">\n    ").concat(children || '', "\n  </div>");
};
var tplOneShot = function (_a) {
    var id = _a.id, oneShot = _a.oneShot;
    return "\n  <div ".concat(id ? "id=\"".concat(id, "\"") : '', " class=\"pr_one_shot\" data-one-shot-id=\"").concat(oneShot, "\"></div>");
};
var tplTableauOp = function (_a) {
    var id = _a.id, tableauOpId = _a.tableauOpId;
    return "\n  <div ".concat(id ? "id=\"".concat(id, "\"") : '', " class=\"pr_tableau_op\" data-tableau-op-id=\"").concat(tableauOpId, "\"></div>");
};
var InfoPanel = (function () {
    function InfoPanel(game) {
        this.game = game;
        var gamedatas = game.gamedatas;
        this.setup({ gamedatas: gamedatas });
    }
    InfoPanel.prototype.clearInterface = function () { };
    InfoPanel.prototype.updateInterface = function (_a) {
        var gamedatas = _a.gamedatas;
    };
    InfoPanel.prototype.setup = function (_a) {
        var gamedatas = _a.gamedatas;
        var node = document.getElementById("player_boards");
        if (!node) {
            return;
        }
        node.insertAdjacentHTML("afterbegin", tplInfoPanel());
    };
    return InfoPanel;
}());
var tplInfoPanel = function () { return "<div class='player-board' id=\"pr_info_panel\"></div>"; };
var getBattleTableConfig = function () { return ({
    headers: [
        _("TYPE"),
        _("ATTACKER"),
        _("DEFENDER"),
        _("VICTOR PLACEMENT"),
        _("NON-STRAWMAN"),
        _("STRAWMAN"),
    ],
    rows: [
        {
            type: {
                iconType: "operation",
                icons: [CAMPAIGN_OP],
                text: _("CAMPAIGN"),
            },
            attacker: [
                _("• Knights in attacker's Location adjacent to target Empire"),
            ],
            defender: [_("• Knights / Rooks in target Empire")],
            victorPlacement: [
                _("• (optional) All Repressed Tokens"),
                _("• Bonus Concession"),
            ],
            nonStrawman: _("Place King as Vassal."),
            strawman: _("Not allowed."),
        },
        {
            type: {
                iconType: "oneShot",
                icons: [CONSPIRACY_ONE_SHOT],
                text: _("CONSPIRACY"),
            },
            attacker: [
                _("• Agents"),
                _("• Pirates bordering"),
                _("• Repressed Knights / Rooks"),
            ],
            defender: [_("• Knights / Rooks in card's Location")],
            victorPlacement: [
                _("• Agents"),
                _("• Repressed Knights / Rooks"),
                _("• (optional) Repressed Pawns"),
                _("• Bonus Concession"),
            ],
            nonStrawman: _("Place King in your Tableau with Repressed and (if from Throne) Queen and Bishop."),
            strawman: _("Flip Empire Card."),
        },
        {
            type: {
                iconType: "oneShot",
                icons: [PEASANT_REVOLT_ONE_SHOT],
                text: _("PEASANT REVOLT"),
            },
            attacker: [
                _("• Agents"),
                _("• Pirates bordering"),
                _("• Your Concessions bordering"),
                _("• Repressed Pawns"),
            ],
            defender: [_("• Knights / Rooks in card's Location")],
            victorPlacement: [
                _("• Agents"),
                _("• Repressed Pawns"),
                _("• (optional) Repressed Knights / Rooks"),
                _("• Bonus Concession"),
            ],
            nonStrawman: _("Place King in your Tableau with Repressed and (if from Throne) Queen and Bishop."),
            strawman: _("Flip Empire Card."),
        },
        {
            type: {
                iconType: "oneShot",
                icons: [CRUSADE_ONE_SHOT, JIHAD_ONE_SHOT, REFORMATION_ONE_SHOT],
                text: _("RELIGIOUS WAR"),
            },
            attacker: [
                _("• Agents (Knights & Rooks)"),
                _("• Believer Knights / Rooks in target"),
                _("• Believer Knights adjacent"),
                _("• Believer Pirates bordering"),
            ],
            defender: [
                _("• Heretic Knights / Rooks in card's Location"),
                _("• Heretic Pirates bordering"),
            ],
            victorPlacement: [
                _("• Agents"),
                _("• (optional) All Repressed Tokens"),
                _("• Bonus Concession"),
            ],
            nonStrawman: _("Place King in your Tableau with Repressed and (if from Throne) Queen and Bishop. Change Map Card to the indicated Theocracy."),
            strawman: _("Flip Empire Card."),
        },
    ],
}); };
var getOperationsConfig = function () { return ({
    headers: [_("TYPE"), _("TARGET"), _("REQUIREMENT"), _("EFFECT")],
    rows: [
        {
            icons: [INQUISITOR_OP_CATHOLIC],
            target: _("Bishop of indicated religion"),
            effect: _("Move to adjacent Tableau card or to card with same Location. If Bishop on card: Kill both. If Repressed Tokens on card: optional Kill one. On Card: Silence."),
        },
        {
            icons: [COMMERCE_OP_EAST],
            target: _("Market (East or West)"),
            effect: _("Take on Florin from any space in the market row specified (West/East)."),
        },
        {
            icons: [BEHEAD_OP],
            target: _("Tableau Card with the card's Location"),
            effect: _("Discard target card. Also discard itself if target is an Empire."),
        },
        {
            icons: [TAX_OP],
            target: _("Concession bordering the card's Location"),
            requirement: _("Empire must have 1 or more empty Cities"),
            effect: _("Target pays 1 Florin to China or is Repressed, Target places a Levy."),
        },
        {
            icons: [REPRESS_OP_PAWN_ROOK_KNIGHT],
            target: _("Rook / Knight / Concession on Map with card's Location"),
            requirement: _("Must Repress 1 Token."),
            effect: _("Move to Empire square as repressed Token. Gain 1 Florin from China."),
        },
        {
            icons: [VOTE_OP_EAST],
            target: _("Empire card in Tableau, same EAST or WEST as card"),
            requirement: _("Have Concession majority. Pay 1 Florin per Repressed Token. Empire not on a Throne, or be a Vassal."),
            effect: _("Regime Change. Golden Liberty (optional): change Map Card to medieval."),
        },
        {
            icons: [CORSAIR_OP_CATHOLIC],
            target: _("Pirate bordering the card's Location"),
            effect: _("Move to any Sea Border on same or Adjacent Location sharing a Sea Border. Kill Pirate or Concession in the destination (if any)."),
        },
        {
            icons: [SIEGE_OP],
            target: _("Rook / Knight / Pirate on Map with card's Location"),
            effect: _("Kill target."),
        },
        {
            icons: [CAMPAIGN_OP],
            target: _("Adjacent target Empire"),
            requirement: _("Pay 1 Florin per Attacker."),
            effect: _("Battle Casualties. If successful, Regime Change with Vassal. See Battle Table."),
        },
    ],
}); };
var getOneShotsConfig = function () { return ({
    headers: [_("TYPE"), _("TARGET"), _("REQUIREMENT"), _("EFFECT")],
    rows: [
        {
            icons: [
                TRADE_SHIFT_NOVGOROD_ONE_SHOT,
                TRADE_SHIFT_RED_SEA_ONE_SHOT,
                TRADE_SHIFT_TIMBUKTU_ONE_SHOT,
            ],
            target: _("Busted Disk on indicated Emporium"),
            effect: _("New Trade Route. Move Busted disk to uncovered Emporium of the same color, Repressing Token."),
        },
        {
            icons: [TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT],
            target: _("Busted Disk on Spice Islands"),
            requirement: _("Must have at least one Discovery Prestige in Tableau (not counting card being played)"),
            effect: _("New Trade Route. Move Busted disk to uncovered Emporium of the same color, Repressing Token."),
        },
        {
            icons: [PEASANT_REVOLT_ONE_SHOT, CONSPIRACY_ONE_SHOT],
            target: _("Empire / Map Card on card's Location"),
            effect: _("Battle Casualties. If successful, Regime Change with Vassal. See Battle Table."),
        },
        {
            icons: [CRUSADE_ONE_SHOT, JIHAD_ONE_SHOT, REFORMATION_ONE_SHOT],
            target: _("Empire / Map Card on card's Location"),
            requirement: _("Heretic(s) in target Empire."),
            effect: _("Battle Casualties. If successful, Regime Change with Vassal. See Battle Table."),
        },
        {
            icons: [
                APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT,
                APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT,
                APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT,
            ],
            target: _("All players with both types of indicated Religious Prestige in Tableau"),
            effect: _("Discard all Tableau cards with indicated Religious Prestige."),
        },
        {
            icons: [CORONATION_ONE_SHOT],
            target: _("Empire Square"),
            requirement: _("Must be Empire contained in Queen's list of suitors. King must be unmarried and either in his Throne or in your Tableau."),
            effect: _("Form royal couple. Regime Change."),
        },
    ],
}); };
var InformationModal = (function () {
    function InformationModal(game) {
        this.selectedTab = "battleTable";
        this.tabs = {
            battleTable: {
                text: _("Battle Table"),
            },
            operations: {
                text: _("Operations"),
            },
            oneShots: {
                text: _("One-Shots"),
            },
            mapCards: {
                text: _("Map Cards"),
            },
        };
        this.game = game;
        var gamedatas = game.gamedatas;
        this.setup({ gamedatas: gamedatas });
    }
    InformationModal.prototype.clearInterface = function () { };
    InformationModal.prototype.updateInterface = function (_a) {
        var gamedatas = _a.gamedatas;
    };
    InformationModal.prototype.addButton = function (_a) {
        var gamedatas = _a.gamedatas;
        var configPanel = document.getElementById("pr_info_panel");
        if (configPanel) {
            configPanel.insertAdjacentHTML("beforeend", tplInformationButton());
        }
    };
    InformationModal.prototype.setupModal = function (_a) {
        var gamedatas = _a.gamedatas;
        this.modal = new Modal("information_modal", {
            class: "pr_information_modal",
            closeIcon: "fa-times",
            contents: tplInformationModalContent({
                tabs: this.tabs,
                ageOfReformation: this.game.gamedatas.gameOptions.ageOfReformationPromo,
            }),
            closeAction: "hide",
            verticalAlign: "flex-start",
            breakpoint: 740,
        });
    };
    InformationModal.prototype.setup = function (_a) {
        var _this = this;
        var gamedatas = _a.gamedatas;
        this.addButton({ gamedatas: gamedatas });
        this.setupModal({ gamedatas: gamedatas });
        this.informationModalContent();
        this.changeTab({ id: this.selectedTab });
        Object.keys(this.tabs).forEach(function (id) {
            dojo.connect($("pr_information_modal_tab_".concat(id)), "onclick", function () {
                return _this.changeTab({ id: id });
            });
        });
        dojo.connect($("pr_information_button"), "onclick", function () {
            return _this.modal.show();
        });
    };
    InformationModal.prototype.informationModalContent = function () { };
    InformationModal.prototype.changeTab = function (_a) {
        var id = _a.id;
        var currentTab = document.getElementById("pr_information_modal_tab_".concat(this.selectedTab));
        var currentTabContent = document.getElementById("pr_".concat(this.selectedTab));
        currentTab.removeAttribute("data-state");
        if (currentTabContent) {
            currentTabContent.style.display = "none";
        }
        this.selectedTab = id;
        var tab = document.getElementById("pr_information_modal_tab_".concat(id));
        var tabContent = document.getElementById("pr_".concat(this.selectedTab));
        tab.setAttribute("data-state", "selected");
        if (tabContent) {
            tabContent.style.display = "";
        }
    };
    return InformationModal;
}());
var tplInformationButton = function () { return "<button id=\"pr_information_button\" type=\"button\" class=\"pr_button\">\n<div class=\"pr_icon\"></div>\n</button>"; };
var tplInfoModalTab = function (_a) {
    var id = _a.id, text = _a.text;
    return "\n  <div id=\"pr_information_modal_tab_".concat(id, "\" class=\"pr_information_modal_tab\">\n    <span>").concat(_(text), "</span>\n  </div>");
};
var tplOperationsInfoRow = function (_a) {
    var row = _a.row, last = _a.last, lightBackground = _a.lightBackground, _b = _a.type, type = _b === void 0 ? "operation" : _b;
    var icons = row.icons, target = row.target, requirement = row.requirement, effect = row.effect;
    return "\n  <div class=\"pr_cell".concat(last ? " pr_last" : "").concat(lightBackground ? " pr_light_background" : "", "\">\n    ").concat(icons
        .map(function (icon) {
        return type === "operation"
            ? "<div class=\"pr_tableau_op\" data-tableau-op-id=\"".concat(icon, "\"></div>")
            : "<div class=\"pr_one_shot\" data-one-shot-id=\"".concat(icon, "\"></div>");
    })
        .join(""), "\n  </div>\n  <div class=\"pr_cell").concat(last ? " pr_last" : "").concat(lightBackground ? " pr_light_background" : "", "\">\n      <span style=\"font-weight: bold;\">").concat(_(target), "</span>\n  </div>\n  <div class=\"pr_cell").concat(last ? " pr_last" : "").concat(lightBackground ? " pr_light_background" : "", "\">\n    <span>").concat(_(requirement || ""), "</span>\n  </div>\n  <div class=\"pr_cell").concat(last ? " pr_last" : "").concat(lightBackground ? " pr_light_background" : "", "\">\n    <span>").concat(_(effect), "</span>\n  </div>\n");
};
var tplBattleTableRow = function (_a) {
    var row = _a.row, lightBackground = _a.lightBackground, last = _a.last;
    var type = row.type, attacker = row.attacker, defender = row.defender, victorPlacement = row.victorPlacement, nonStrawman = row.nonStrawman, strawman = row.strawman;
    return "\n  <div class=\"pr_cell".concat(last ? " pr_last" : "").concat(lightBackground ? " pr_light_background" : "", "\" style=\"justify-content: space-between;\">\n  <span style=\"font-weight: bold;\">").concat(_(type.text), "</span>\n    ").concat(type.icons
        .map(function (icon) {
        return type.iconType === "operation"
            ? "<div class=\"pr_tableau_op\" data-tableau-op-id=\"".concat(icon, "\"></div>")
            : "<div class=\"pr_one_shot\" data-one-shot-id=\"".concat(icon, "\"></div>");
    })
        .join(""), "\n  </div>\n  <div class=\"pr_cell").concat(last ? " pr_last" : "").concat(lightBackground ? " pr_light_background" : "", "\">\n      ").concat(attacker.map(function (text) { return "<span>".concat(_(text), "</span>"); }).join(""), "\n  </div>\n  <div class=\"pr_cell").concat(last ? " pr_last" : "").concat(lightBackground ? " pr_light_background" : "", "\">\n  ").concat(defender.map(function (text) { return "<span>".concat(_(text), "</span>"); }).join(""), "\n  </div>\n  <div class=\"pr_cell").concat(last ? " pr_last" : "").concat(lightBackground ? " pr_light_background" : "", "\">\n  ").concat(victorPlacement.map(function (text) { return "<span>".concat(_(text), "</span>"); }).join(""), "\n  </div>\n  <div class=\"pr_cell").concat(last ? " pr_last" : "").concat(lightBackground ? " pr_light_background" : "", "\">\n    <span>").concat(_(nonStrawman), "</span>\n  </div>\n  <div class=\"pr_cell").concat(last ? " pr_last" : "").concat(lightBackground ? " pr_light_background" : "", "\">\n    <span>").concat(_(strawman), "</span>\n  </div>\n");
};
var tplInformationModalContent = function (_a) {
    var tabs = _a.tabs, ageOfReformation = _a.ageOfReformation;
    var OPERATIONS_INFO_CONFIG = getOperationsConfig();
    var ONE_SHOTS_INFO_CONFIG = getOneShotsConfig();
    var BATTLE_TABLE_CONFIG = getBattleTableConfig();
    return "<div id=\"pr_information_modal_content\">\n    <div class=\"pr_information_modal_tabs\">\n      ".concat(Object.entries(tabs)
        .map(function (_a) {
        var id = _a[0], info = _a[1];
        return tplInfoModalTab({ id: id, text: info.text });
    })
        .join(""), "\n    </div>\n      <div id=\"pr_operations\" style=\"display: none;\">\n        ").concat(OPERATIONS_INFO_CONFIG.headers
        .map(function (headerText) {
        return "<div class=\"pr_header\"><span>".concat(_(headerText), "</span></div>");
    })
        .join(""), "\n        ").concat(OPERATIONS_INFO_CONFIG.rows
        .map(function (row, index) {
        return tplOperationsInfoRow({
            row: row,
            last: index === OPERATIONS_INFO_CONFIG.rows.length - 1,
            lightBackground: index % 2 === 1,
        });
    })
        .join(""), "\n      </div>\n      <div id=\"pr_oneShots\" style=\"display: none;\">\n      ").concat(ONE_SHOTS_INFO_CONFIG.headers
        .map(function (headerText) {
        return "<div class=\"pr_header\"><span>".concat(_(headerText), "</span></div>");
    })
        .join(""), "\n      ").concat(ONE_SHOTS_INFO_CONFIG.rows
        .map(function (row, index) {
        return tplOperationsInfoRow({
            row: row,
            last: index === ONE_SHOTS_INFO_CONFIG.rows.length - 1,
            type: "oneShot",
            lightBackground: index % 2 === 1,
        });
    })
        .join(""), "\n    </div>\n    <div id=\"pr_battleTable\" style=\"display: none;\">\n    ").concat(BATTLE_TABLE_CONFIG.headers
        .map(function (headerText) {
        return "<div class=\"pr_header\"><span>".concat(_(headerText), "</span></div>");
    })
        .join(""), "\n      ").concat(BATTLE_TABLE_CONFIG.rows
        .map(function (row, index) {
        return tplBattleTableRow({
            row: row,
            last: index === BATTLE_TABLE_CONFIG.rows.length - 1,
            lightBackground: index % 2 === 1,
        });
    })
        .join(""), "\n    </div>\n    <div id=\"pr_mapCards\" style=\"display: none;\">\n      ").concat(EMPIRES.map(function (empireId) {
        return __spreadArray([MEDIEVAL], RELIGIONS, true).map(function (religion) {
            return "<div class=\"pr_map_card\" data-card-id=\"".concat(religion, "_").concat(empireId, "\"").concat(ageOfReformation ? 'data-map-type="ageOfReformation"' : "", "></div>");
        })
            .join("");
    }).join(""), "\n    </div>\n  </div>");
};
var LOG_TOKEN_BOLD_TEXT = "boldText";
var LOG_TOKEN_CARD_NAME = "cardName";
var LOG_TOKEN_NEW_LINE = "newLine";
var LOG_TOKEN_PLAYER_NAME = "playerName";
var LOG_TOKEN_CARD = "card";
var LOG_TOKEN_FLORIN = "florin";
var LOG_TOKEN_MAP_TOKEN = "mapToken";
var LOG_TOKEN_ONE_SHOT = "oneShot";
var LOG_TOKEN_PRESTIGE = "prestige";
var LOG_TOKEN_TABLEAU_OP = "tableauOp";
var tooltipIdCounter = 0;
var getTokenDiv = function (_a) {
    var key = _a.key, value = _a.value, game = _a.game;
    var splitKey = key.split("_");
    var type = splitKey[1];
    switch (type) {
        case LOG_TOKEN_CARD:
            return tplLogTokenCard(value);
        case LOG_TOKEN_BOLD_TEXT:
            return tlpLogTokenBoldText({
                text: value,
            });
        case LOG_TOKEN_CARD_NAME:
            var cardNameTooltipId = undefined;
            var withTooltip = value.includes(":");
            if (withTooltip) {
                cardNameTooltipId = "pr_tooltip_".concat(game._last_tooltip_id);
                game.tooltipsToMap.push([game._last_tooltip_id, value.split(":")[0]]);
                game._last_tooltip_id++;
            }
            return tlpLogTokenBoldText({
                text: withTooltip ? value.split(":")[1] : value,
                tooltipId: cardNameTooltipId,
            });
        case LOG_TOKEN_FLORIN:
            return tplIcon({ icon: "florin" });
        case LOG_TOKEN_NEW_LINE:
            return "<br>";
        case LOG_TOKEN_MAP_TOKEN:
            var mtValue = value.split("_");
            return tplToken({ type: mtValue[1], separator: mtValue[0] });
        case LOG_TOKEN_ONE_SHOT:
            return tplOneShot({ oneShot: value });
        case LOG_TOKEN_PLAYER_NAME:
            var player = value === "${you}"
                ? game.playerManager.getPlayer({ playerId: game.getPlayerId() })
                : game.playerManager
                    .getPlayers()
                    .find(function (player) { return player.getName() === value; });
            return player
                ? tplLogTokenPlayerName({
                    name: value === "${you}" ? _("You") : player.getName(),
                    color: player.getHexColor(),
                })
                : value;
        case LOG_TOKEN_PRESTIGE:
            return tplIcon({
                icon: "prestige_".concat(value),
                classes: "pr_prestige_icon",
            });
        case LOG_TOKEN_TABLEAU_OP:
            return tplTableauOp({ tableauOpId: value });
        default:
            return value;
    }
};
var tknFlorin = function () {
    return _("Florin(s)");
};
var tknMapToken = function (tokenId) {
    var split = tokenId.split("_");
    return "".concat(split[1], "_").concat(split[0]);
};
var tplLogTokenCard = function (id) {
    var className = id.startsWith("EmpireSquare") || id.startsWith("victory")
        ? "pr_square_card"
        : "pr_card";
    return "<div class=\"".concat(className, " pr_log_card\" data-card-id=\"").concat(id, "\"></div>");
};
var tlpLogTokenBoldText = function (_a) {
    var text = _a.text, tooltipId = _a.tooltipId;
    return "<span ".concat(tooltipId ? "id=\"".concat(tooltipId, "\"") : "", " style=\"font-weight: 700;\">").concat(_(text), "</span>");
};
var tplLogTokenPlayerName = function (_a) {
    var name = _a.name, color = _a.color;
    return "<span class=\"playername\" ".concat(COLORS_WITH_SHADOW.includes(COLOR_MAP[color]) ? 'data-shadow="true"' : "", " style=\"color:#").concat(color, ";\">").concat(name, "</span>");
};
var Market = (function () {
    function Market(game) {
        var _a;
        this.deckCounters = (_a = {},
            _a[EAST] = new ebg.counter(),
            _a[WEST] = new ebg.counter(),
            _a);
        this.game = game;
        var gamedatas = game.gamedatas;
        this.setupDecks({ gamedatas: gamedatas });
        this.setupStocks({ gamedatas: gamedatas });
        this.setupMarket({ gamedatas: gamedatas });
    }
    Market.prototype.clearInterface = function () {
        var _this = this;
        var comets = {
            comet1: EAST,
            comet2: EAST,
            comet3: WEST,
            comet4: WEST,
        };
        Object.entries(comets).forEach(function (_a) {
            var comet = _a[0], region = _a[1];
            _this.removeCometOpacity(comet);
        });
        REGIONS.forEach(function (region) {
            _this.stocks[region].forEach(function (stock) {
                stock.removeAll();
            });
            _this.counters[region].forEach(function (counter, index) {
                return _this.setFlorinValue({ region: region, column: index, value: 0 });
            });
        });
    };
    Market.prototype.updateMarket = function (_a) {
        var gamedatas = _a.gamedatas;
        this.updateDecks({ gamedatas: gamedatas });
        this.setupMarket({ gamedatas: gamedatas });
    };
    Market.prototype.updateMarketCardTooltips = function () {
        var _this = this;
        REGIONS.forEach(function (region) {
            for (var i = 1; i <= 5; i++) {
                _this.stocks[region][i].getCards().forEach(function (card) {
                    _this.game.tooltipManager.removeTooltip(card.id);
                    _this.game.tooltipManager.addCardTooltip({
                        nodeId: card.id,
                        card: card,
                    });
                });
            }
        });
    };
    Market.prototype.setupDecks = function (_a) {
        var _b;
        var _this = this;
        var gamedatas = _a.gamedatas;
        this.decks = (_b = {},
            _b[EAST] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_market_east_deck")),
            _b[WEST] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_market_west_deck")),
            _b);
        REGIONS.forEach(function (region) {
            _this.deckCounters[region].create("pr_market_".concat(region, "_deck_counter"));
        });
        this.updateDecks({ gamedatas: gamedatas });
    };
    Market.prototype.updateDecks = function (_a) {
        var _this = this;
        var gamedatas = _a.gamedatas;
        REGIONS.forEach(function (region) {
            _this.deckCounters[region].setValue(gamedatas.market.deckCounts[region].cardCount);
        });
        var comets = {
            comet1: EAST,
            comet2: EAST,
            comet3: WEST,
            comet4: WEST,
        };
        Object.entries(comets).forEach(function (_a) {
            var comet = _a[0], region = _a[1];
            if (!gamedatas.market.deckCounts[region][comet]) {
                _this.setCometOpacity(comet);
            }
        });
    };
    Market.prototype.setupStocks = function (_a) {
        var _b, _c;
        var gamedatas = _a.gamedatas;
        this.stocks = (_b = {},
            _b[EAST] = [],
            _b[WEST] = [],
            _b);
        this.counters = (_c = {},
            _c[EAST] = [],
            _c[WEST] = [],
            _c);
        for (var i = 0; i <= 5; i++) {
            this.stocks[EAST][i] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_market_east_".concat(i, "_stock")));
            this.counters[EAST][i] = new ebg.counter();
            this.counters[EAST][i].create("pr_market_east_".concat(i, "_counter"));
            this.stocks[WEST][i] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_market_west_".concat(i, "_stock")));
            this.counters[WEST][i] = new ebg.counter();
            this.counters[WEST][i].create("pr_market_west_".concat(i, "_counter"));
        }
    };
    Market.prototype.setupMarket = function (_a) {
        var gamedatas = _a.gamedatas;
        return __awaiter(this, void 0, void 0, function () {
            var i;
            var _this = this;
            return __generator(this, function (_b) {
                gamedatas.market.cards.forEach(function (card) {
                    var id = card.id, location = card.location;
                    var _a = location.split("_"), market = _a[0], region = _a[1], column = _a[2];
                    var stock = _this.getStock({ region: region, column: Number(column) });
                    stock.addCard(card);
                });
                for (i = 0; i <= 5; i++) {
                    this.setFlorinValue({
                        column: i,
                        region: EAST,
                        value: gamedatas.market.florins["market_".concat(EAST, "_").concat(i, "_florins")] || 0,
                    });
                    this.setFlorinValue({
                        column: i,
                        region: WEST,
                        value: gamedatas.market.florins["market_".concat(WEST, "_").concat(i, "_florins")] || 0,
                    });
                }
                return [2];
            });
        });
    };
    Market.prototype.drawCard = function (card) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _, region, column;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.decks[card.region].addCard(__assign(__assign({}, card), { location: "deck" }))];
                    case 1:
                        _b.sent();
                        this.deckCounters[card.region].incValue(-1);
                        if (card.id.startsWith("COMET")) {
                            this.setCometOpacity(card.id.split("_")[0].toLowerCase());
                        }
                        _a = card.location.split("_"), _ = _a[0], region = _a[1], column = _a[2];
                        return [4, this.getStock({ region: region, column: Number(column) }).addCard(card)];
                    case 2:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    Market.prototype.getDeck = function (_a) {
        var region = _a.region;
        return this.decks[region];
    };
    Market.prototype.getStock = function (_a) {
        var region = _a.region, column = _a.column;
        return this.stocks[region][column];
    };
    Market.prototype.incFlorinValue = function (_a) {
        var region = _a.region, column = _a.column, value = _a.value;
        var currentValue = this.counters[region][column].getValue();
        this.counters[region][column].incValue(value);
        var node = document.getElementById("pr_market_".concat(region, "_").concat(column, "_florins"));
        if (node !== null) {
            this.checkNone({ node: node, value: currentValue + value });
        }
    };
    Market.prototype.setFlorinValue = function (_a) {
        var region = _a.region, column = _a.column, value = _a.value;
        this.counters[region][column].setValue(value);
        var node = document.getElementById("pr_market_".concat(region, "_").concat(column, "_florins"));
        if (node !== null) {
            this.checkNone({ node: node, value: value });
        }
    };
    Market.prototype.getFlorins = function (_a) {
        var region = _a.region, column = _a.column;
        return this.counters[region][column].getValue();
    };
    Market.prototype.checkNone = function (_a) {
        var node = _a.node, value = _a.value;
        if (value === 0) {
            node.classList.add(PR_NONE);
        }
        else {
            node.classList.remove(PR_NONE);
        }
    };
    Market.prototype.setCometOpacity = function (comet) {
        var nodeId = "pr_deck_counter_".concat(comet);
        var node = document.getElementById(nodeId);
        if (node) {
            node.classList.add(PR_NONE);
        }
        this.game.tooltipManager.cometCardNoLongerInDrawDeckTooltip({ nodeId: nodeId });
    };
    Market.prototype.removeCometOpacity = function (comet) {
        var nodeId = "pr_deck_counter_".concat(comet);
        var node = document.getElementById(nodeId);
        if (node) {
            node.classList.remove(PR_NONE);
        }
        this.game.tooltipManager.cometCardInDrawDeckTooltip({ nodeId: nodeId });
    };
    Market.prototype.moveFlorinAnimation = function (_a) {
        var index = _a.index, fromId = _a.fromId, toId = _a.toId, htmlFlorinChildren = _a.htmlFlorinChildren;
        return __awaiter(this, void 0, void 0, function () {
            var from, to, node, element, elementRect, fromRect, toRect, top, left;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        from = document.getElementById(fromId);
                        to = document.getElementById(toId);
                        node = document.getElementById("pr_game_map");
                        node.insertAdjacentHTML("beforeend", tplIcon({
                            id: "temp_florin_".concat(index),
                            icon: "florin",
                            classes: "pr_temp_florin",
                            style: "position: absolute;",
                            children: htmlFlorinChildren,
                        }));
                        element = document.getElementById("temp_florin_".concat(index));
                        elementRect = element.getBoundingClientRect();
                        fromRect = from.getBoundingClientRect();
                        toRect = to.getBoundingClientRect();
                        top = toRect.top - elementRect.top;
                        left = toRect.left - elementRect.left;
                        element.style.top = "".concat(pxNumber(element.style.top) + top, "px");
                        element.style.left = "".concat(pxNumber(element.style.left) + left, "px");
                        return [4, this.game.animationManager.play(new BgaSlideAnimation({
                                element: element,
                                transitionTimingFunction: "linear",
                                fromRect: fromRect,
                            }))];
                    case 1:
                        _b.sent();
                        element.remove();
                        return [2];
                }
            });
        });
    };
    Market.prototype.moveFlorinFromPlayerCounter = function (_a) {
        var florinLocation = _a.florinLocation, index = _a.index, playerId = _a.playerId;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _, region, column;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = florinLocation.split("_"), _ = _b[0], region = _b[1], column = _b[2];
                        this.game.playerManager
                            .getPlayer({ playerId: playerId })
                            .incFlorins(-1);
                        if (!this.game.animationManager.animationsActive()) return [3, 2];
                        return [4, this.moveFlorinAnimation({
                                index: index,
                                fromId: "pr_florins_counter_".concat(playerId, "_icon"),
                                toId: "pr_".concat(florinLocation),
                            })];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        this.incFlorinValue({
                            region: region,
                            column: Number(column),
                            value: 1,
                        });
                        return [2];
                }
            });
        });
    };
    Market.prototype.moveFlorinToPlayerCounter = function (_a) {
        var florinLocation = _a.florinLocation, index = _a.index, playerId = _a.playerId;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _, region, column;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = florinLocation.split("_"), _ = _b[0], region = _b[1], column = _b[2];
                        this.incFlorinValue({
                            region: region,
                            column: Number(column),
                            value: -1,
                        });
                        if (!this.game.animationManager.animationsActive()) return [3, 2];
                        return [4, this.moveFlorinAnimation({
                                index: index,
                                toId: "pr_florins_counter_".concat(playerId, "_icon"),
                                fromId: "pr_".concat(florinLocation),
                            })];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        this.game.playerManager
                            .getPlayer({ playerId: playerId })
                            .incFlorins(1);
                        return [2, true];
                }
            });
        });
    };
    Market.prototype.payFlorins = function (_a) {
        var placedFlorins = _a.placedFlorins, playerId = _a.playerId;
        return __awaiter(this, void 0, void 0, function () {
            var promises, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        promises = [];
                        for (i = 0; i < placedFlorins.length; i++) {
                            promises.push(this.moveFlorinFromPlayerCounter({
                                index: i,
                                playerId: playerId,
                                florinLocation: placedFlorins[i],
                            }));
                        }
                        return [4, Promise.all(promises)];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    Market.prototype.takeFlorins = function (_a) {
        var playerId = _a.playerId, florins = _a.florins, from = _a.from;
        return __awaiter(this, void 0, void 0, function () {
            var promises, _loop_3, i;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        promises = [];
                        _loop_3 = function (i) {
                            setTimeout(function () {
                                return promises.push(_this.moveFlorinToPlayerCounter({
                                    index: i,
                                    playerId: playerId,
                                    florinLocation: from,
                                }));
                            }, i * 100);
                        };
                        for (i = 0; i < florins; i++) {
                            _loop_3(i);
                        }
                        return [4, Promise.all(promises)];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    return Market;
}());
var NotificationManager = (function () {
    function NotificationManager(game) {
        this.game = game;
        this.subscriptions = [];
    }
    NotificationManager.prototype.setupNotifications = function () {
        var _this = this;
        debug('notifications subscriptions setup');
        dojo.connect(this.game.framework().notifqueue, 'addToLog', function () {
            _this.game.addLogClass();
        });
        var notifs = [
            ['log', undefined],
            ['activateAbility', undefined],
            ['changeEmpireToMedievalState', undefined],
            ['changeEmpireToTheocracy', undefined],
            ['changeEmpireSquare', undefined],
            ['clearTurn', undefined],
            ['coronation', undefined],
            ['deactivateAbility', undefined],
            ['declareVictory', undefined],
            ['discardCard', undefined],
            ['discardQueen', undefined],
            ['flipEmpireCard', undefined],
            ['flipVictoryCard', undefined],
            ['moveEmpireSquare', undefined],
            ['moveToken', undefined],
            ['moveTokensWithinConstantinople', undefined],
            ['oldMaid', undefined],
            ['payFlorinsToChina', undefined],
            ['placeToken', undefined],
            ['playCard', undefined],
            ['purchaseCard', undefined],
            ['refreshHand', undefined],
            ['refreshMarket', undefined],
            ['refreshUI', undefined],
            ['repressToken', undefined],
            ['returnToSupply', undefined],
            ['returnToThrone', undefined],
            ['sellCard', undefined],
            ['sellRoyalCouple', undefined],
            ['tableauOpCommerce', undefined],
            ['tableauOpTaxPay', undefined],
            ['tradeFairConvene', undefined],
            ['tradeFairEmporiumSubsidy', undefined],
            ['tradeFairProfitDispersalPirates', undefined],
            ['tradeFairProfitDispersalPlayer', undefined],
        ];
        notifs.forEach(function (notif) {
            _this.subscriptions.push(dojo.subscribe(notif[0], _this, function (notifDetails) {
                debug("notif_".concat(notif[0]), notifDetails);
                var msg = _this.game.format_string_recursive(notifDetails.log, notifDetails.args);
                if (msg != '') {
                    $('gameaction_status').innerHTML = msg;
                    $('pagemaintitletext').innerHTML = msg;
                }
                var promise = _this["notif_".concat(notif[0])](notifDetails);
                promise === null || promise === void 0 ? void 0 : promise.then(function () {
                    return _this.game.framework().notifqueue.onSynchronousNotificationEnd();
                });
            }));
            _this.game.framework().notifqueue.setSynchronous(notif[0], notif[1]);
        });
    };
    NotificationManager.prototype.notif_log = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                debug('notif_log', notif.args);
                return [2, Promise.resolve()];
            });
        });
    };
    NotificationManager.prototype.notif_clearTurn = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var notifIds;
            return __generator(this, function (_a) {
                notifIds = notif.args.notifIds;
                this.game.cancelLogs(notifIds);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_activateAbility = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ability, playerId, data, ownerId, player, concessionChange, valueChange, lawChange;
            return __generator(this, function (_b) {
                _a = notif.args, ability = _a.ability, playerId = _a.playerId, data = _a.data, ownerId = _a.ownerId;
                player = this.getPlayer({ playerId: playerId });
                switch (ability) {
                    case SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_1:
                    case SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_2:
                        if (ownerId == null) {
                            break;
                        }
                        this.getPlayer({
                            playerId: ownerId,
                        }).counters.republic.incValue(1);
                        break;
                    case SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS:
                        this.game.gameMap.setVenice2Visibility(true);
                        break;
                    case SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_1:
                    case SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_2:
                        if (ownerId == null) {
                            break;
                        }
                        concessionChange = this.getPlayer({
                            playerId: ownerId,
                        }).counters.prestige.patron.getValue();
                        this.getPlayer({ playerId: ownerId }).counters.concessions.incValue(concessionChange);
                        break;
                    case SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY:
                        valueChange = ownerId !== null
                            ? this.getPlayer({
                                playerId: ownerId,
                            }).counters.prestige.patron.getValue()
                            : 0;
                        this.game.gameMap.supremeReligion.islamic.bishops.incValue(valueChange);
                        player.activateAbility({ ability: ability });
                        break;
                    case SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_1:
                    case SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_2:
                    case SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_3:
                        if (ownerId == null) {
                            break;
                        }
                        lawChange = this.getPlayer({
                            playerId: ownerId,
                        }).counters.prestige.patron.getValue();
                        this.getPlayer({ playerId: ownerId }).counters.prestige.law.incValue(lawChange);
                        break;
                    case SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS:
                        if (ownerId == null) {
                            break;
                        }
                        this.game.gameMap.supremeReligion.reformist.bishops.incValue(data.bishops);
                        this.game.gameMap.supremeReligion.reformist.tokens.incValue(data.tokens);
                        player.activateAbility({ ability: ability });
                        break;
                    default:
                        debug('Unhandled ability: ', ability);
                }
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_deactivateAbility = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ability, data, playerId, ownerId, player, concessionChange, valueChange, lawChange;
            return __generator(this, function (_b) {
                _a = notif.args, ability = _a.ability, data = _a.data, playerId = _a.playerId, ownerId = _a.ownerId;
                player = this.getPlayer({ playerId: playerId });
                switch (ability) {
                    case SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_1:
                    case SA_CARD_COUNTS_AS_REPUBLIC_FOR_RENAISSANCE_VICTORY_2:
                        if (ownerId == null) {
                            break;
                        }
                        this.getPlayer({
                            playerId: ownerId,
                        }).counters.republic.incValue(-1);
                        break;
                    case SA_VENICE_CAN_HOLD_TWO_GOLD_TOKENS:
                        this.game.gameMap.setVenice2Visibility(false);
                        break;
                    case SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_1:
                    case SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_2:
                        if (ownerId == null) {
                            break;
                        }
                        concessionChange = this.getPlayer({
                            playerId: ownerId,
                        }).counters.prestige.patron.getValue() * -1;
                        this.getPlayer({ playerId: ownerId }).counters.concessions.incValue(concessionChange);
                        break;
                    case SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY:
                        valueChange = ownerId !== null
                            ? this.getPlayer({
                                playerId: ownerId,
                            }).counters.prestige.patron.getValue() * -1
                            : 0;
                        this.game.gameMap.supremeReligion.islamic.bishops.incValue(valueChange);
                        player.deactivateAbility({ ability: ability });
                        break;
                    case SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_1:
                    case SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_2:
                    case SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_3:
                        if (ownerId == null) {
                            break;
                        }
                        lawChange = this.getPlayer({
                            playerId: ownerId,
                        }).counters.prestige.patron.getValue() * -1;
                        this.getPlayer({ playerId: ownerId }).counters.prestige.law.incValue(lawChange);
                        break;
                    case SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS:
                        if (ownerId == null) {
                            break;
                        }
                        this.game.gameMap.supremeReligion.reformist.bishops.incValue(-data.bishops);
                        this.game.gameMap.supremeReligion.reformist.tokens.incValue(-data.tokens);
                        player.deactivateAbility({ ability: ability });
                        break;
                    default:
                        debug('Unhandled ability: ', ability);
                }
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_changeEmpireToMedievalState = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, empire, tokensInEmpire, fromReligion, count;
            return __generator(this, function (_b) {
                _a = notif.args, empire = _a.empire, tokensInEmpire = _a.tokensInEmpire, fromReligion = _a.fromReligion;
                this.game.gameMap.setEmpireReligion({
                    empireId: empire.id,
                    religion: MEDIEVAL,
                });
                count = tokensInEmpire.filter(function (token) { return token.separator === fromReligion; }).length;
                this.game.gameMap.supremeReligion[fromReligion].tokens.incValue(-count);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_changeEmpireToTheocracy = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, empire, religion, tokensInEmpire, count;
            return __generator(this, function (_b) {
                _a = notif.args, empire = _a.empire, religion = _a.religionId, tokensInEmpire = _a.tokensInEmpire;
                this.game.gameMap.setEmpireReligion({ empireId: empire.id, religion: religion });
                count = tokensInEmpire.filter(function (token) { return token.separator === religion; }).length;
                this.game.gameMap.supremeReligion[religion].tokens.incValue(count);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_changeEmpireSquare = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, oldEmpireSquare, newEmpireSquare, religion, papalStatesIndex, node, player;
            return __generator(this, function (_b) {
                _a = notif.args, oldEmpireSquare = _a.oldEmpireSquare, newEmpireSquare = _a.newEmpireSquare, religion = _a.religion;
                papalStatesIndex = this.game.gamedatas.gameMap.empires.findIndex(function (empire) { return empire.id === PAPAL_STATES; });
                this.game.gamedatas.gameMap.empires[papalStatesIndex].religion = religion;
                node = document.getElementById("".concat(oldEmpireSquare.id, "-front"));
                if (node) {
                    node.setAttribute('data-religion', religion);
                }
                this.game.tooltipManager.removeTooltip(oldEmpireSquare.id);
                this.game.tooltipManager.addEmpireCardTooltip({
                    nodeId: newEmpireSquare.id,
                    card: newEmpireSquare,
                    religion: religion,
                });
                if (oldEmpireSquare.owningPlayerId &&
                    newEmpireSquare.owningPlayerId &&
                    oldEmpireSquare.side === KING &&
                    newEmpireSquare.side === KING) {
                    player = this.getPlayer({
                        playerId: oldEmpireSquare.owningPlayerId,
                    });
                    this.removePrestige({ player: player, prestige: oldEmpireSquare.king.prestige });
                    this.addPrestige({ player: player, prestige: newEmpireSquare.king.prestige });
                }
                this.game.tableauCardManager.updateCardInformations(newEmpireSquare);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_coronation = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, queen, king, playerId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, queen = _a.queen, king = _a.king, playerId = _a.playerId;
                        return [4, this.game.tableauCardManager.removeCard(queen)];
                    case 1:
                        _b.sent();
                        return [4, this.game.tableauCardManager.addQueen({ king: king, queen: queen })];
                    case 2:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_declareVictory = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var playerId;
            return __generator(this, function (_a) {
                playerId = notif.args.playerId;
                this.game.framework().scoreCtrl[playerId].toValue(1);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_discardCard = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, adjustPrestige, playerId, card, fromLocationId, toLocationId, wasVassalTo, king, wasOldMaid, player;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, adjustPrestige = _a.adjustPrestige, playerId = _a.playerId, card = _a.card, fromLocationId = _a.fromLocationId, toLocationId = _a.toLocationId, wasVassalTo = _a.wasVassalTo, king = _a.wasQueenTo, wasOldMaid = _a.wasOldMaid;
                        if (!(card.type === TABLEAU_CARD && toLocationId === DISCARD)) return [3, 2];
                        return [4, this.game.discard.addCard(card)];
                    case 1:
                        _b.sent();
                        return [3, 4];
                    case 2:
                        if (!(card.type === EMPIRE_CARD)) return [3, 4];
                        return [4, this.game.gameMap
                                .getEmpireSquareStock({ empireId: card.empire })
                                .addCard(card)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        player = this.getPlayer({ playerId: playerId });
                        if (fromLocationId.startsWith('hand_')) {
                            player.incHandCards(card.region, -1);
                            this.game.openHandsModal.removeCard({
                                playerId: playerId,
                                card: card,
                            });
                        }
                        if (wasOldMaid) {
                            player.tableau.checkOldMaidContainerHeight();
                        }
                        if (adjustPrestige) {
                            if (card.type === EMPIRE_CARD) {
                                this.removeEmpireSquarePrestige({
                                    empireSquare: card,
                                    side: card.side,
                                    playerId: playerId,
                                });
                            }
                            else {
                                this.removePrestige({
                                    player: this.getPlayer({ playerId: playerId }),
                                    prestige: card.prestige,
                                });
                            }
                        }
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_discardQueen = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, queen, king, fromTableau, fromOldMaid, player;
            return __generator(this, function (_b) {
                _a = notif.args, playerId = _a.playerId, queen = _a.queen, king = _a.king, fromTableau = _a.fromTableau, fromOldMaid = _a.fromOldMaid;
                player = this.getPlayer({ playerId: playerId });
                if (fromTableau || fromOldMaid) {
                    queen.prestige.forEach(function (item) {
                        return player.counters.prestige[item].incValue(-1);
                    });
                }
                else {
                    player.incHandCards(queen.region, -1);
                    this.game.openHandsModal.removeCard({
                        playerId: playerId,
                        card: queen,
                    });
                }
                this.game.discard.addCard(queen);
                if (king === null) {
                    player.tableau.checkOldMaidContainerHeight();
                }
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_flipEmpireCard = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, card, formerSuzerain, oldSide, player, container;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, card = _a.card, formerSuzerain = _a.formerSuzerain;
                        oldSide = card.side === REPUBLIC ? KING : REPUBLIC;
                        player = this.getPlayer({ playerId: playerId });
                        this.game.gameMap.updateCoatOfArms({ card: card });
                        this.removePrestige({ prestige: card[oldSide].prestige, player: player });
                        player.counters[oldSide].incValue(-1);
                        container = createEmpireCardContainer(card);
                        if (!(formerSuzerain !== null)) return [3, 2];
                        return [4, player.tableau.addCard(container)];
                    case 1:
                        _b.sent();
                        return [3, 3];
                    case 2:
                        this.game.tableauCardManager.updateCardInformations(container);
                        player.tableau.tableau[container.location.split('_')[1]].sortStock();
                        _b.label = 3;
                    case 3:
                        this.game.tableauCardManager.updateCardInformations(card);
                        this.addPrestige({ prestige: card[card.side].prestige, player: player });
                        player.counters[card.side].incValue(1);
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_flipVictoryCard = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, card;
            return __generator(this, function (_b) {
                _a = notif.args, playerId = _a.playerId, card = _a.card;
                this.game.victoryCardManager.flipCard(card);
                return [2, Promise.resolve()];
            });
        });
    };
    NotificationManager.prototype.notif_moveEmpireSquare = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, card, origin, destination, newOwner, container;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, card = _a.card, origin = _a.origin, destination = _a.destination;
                        this.game.gameMap.updateCoatOfArms({ card: card });
                        if (origin.type === EMPIRE_SQUARE_ORIGIN_TABLEAU) {
                            this.removeEmpireSquarePrestige({
                                empireSquare: card,
                                side: origin.side,
                                playerId: origin.ownerId,
                            });
                        }
                        if (!(destination.type === KING)) return [3, 2];
                        newOwner = this.getPlayer({ playerId: destination.ownerId });
                        container = createEmpireCardContainer(card);
                        return [4, newOwner.tableau.addCard(container)];
                    case 1:
                        _b.sent();
                        return [3, 4];
                    case 2:
                        if (!(destination.type === VASSAL)) return [3, 4];
                        return [4, this.game.tableauCardManager.addVassal({
                                vassal: card,
                                suzerain: destination.suzerain,
                            })];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        this.game.tableauCardManager.updateCardInformations(card);
                        this.addEmpireSquarePrestige({
                            empireSquare: card,
                            side: KING,
                            playerId: destination.ownerId,
                        });
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_moveToken = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, token, from, to, tokenNode, isPawn, node;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, token = _a.token, from = _a.from, to = _a.to;
                        tokenNode = document.getElementById(token.id);
                        if (!tokenNode) {
                            return [2];
                        }
                        isPawn = token.type === PAWN;
                        this.adjustSupremeReligionCounters({
                            token: token,
                            location: from,
                            addOrRemove: 'remove',
                        });
                        if (isPawn && from.type === BORDER) {
                            this.game.playerManager
                                .getPlayerForBank({ bank: token.id.split('_')[1] })
                                .counters.concessions.incValue(-1);
                        }
                        node = document.getElementById(token['type'] === BISHOP
                            ? "".concat(token.location, "_tokens")
                            : "pr_".concat(token.location));
                        return [4, this.game.animationManager.attachWithAnimation(new BgaSlideAnimation({ element: tokenNode }), node)];
                    case 1:
                        _b.sent();
                        this.adjustSupremeReligionCounters({
                            token: token,
                            location: to,
                            addOrRemove: 'add',
                        });
                        if (isPawn && to.type === BORDER) {
                            this.game.playerManager
                                .getPlayerForBank({ bank: token.id.split('_')[1] })
                                .counters.concessions.incValue(1);
                        }
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_moveTokensWithinConstantinople = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, animations;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokens = notif.args.tokens;
                        animations = [];
                        tokens.forEach(function (token) {
                            var tokenNode = document.getElementById(token.id);
                            var cityNode = document.getElementById("pr_".concat(token.location));
                            if (!(tokenNode && cityNode)) {
                                return;
                            }
                            animations.push(_this.game.animationManager.attachWithAnimation(new BgaSlideAnimation({ element: tokenNode }), cityNode));
                        });
                        return [4, Promise.all(animations)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_oldMaid = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, card, player;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, card = _a.card;
                        player = this.getPlayer({ playerId: playerId });
                        return [4, player.tableau.addOldMaid(card)];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_payFlorinsToChina = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, amount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, amount = _a.amount;
                        if (amount === 0) {
                            return [2];
                        }
                        this.getPlayer({ playerId: playerId }).incFlorins(-amount);
                        return [4, this.game.market.moveFlorinAnimation({
                                fromId: "pr_florins_counter_".concat(playerId, "_icon"),
                                toId: 'pr_china',
                                index: 0,
                            })];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_placeToken = function (notif) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, token, fromLocationId, to, split, isPawn, isBishop, fromSupply, node, repressTokensToThrones, element, fromRect, tokenNode;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = notif.args, token = _b.token, fromLocationId = _b.fromLocationId, to = _b.to;
                        split = token.id.split('_');
                        isPawn = split[0] === PAWN;
                        isBishop = split[0] === BISHOP;
                        fromSupply = fromLocationId.startsWith('supply');
                        if (fromSupply && isPawn) {
                            this.game.supply.incValue({
                                bank: split[1],
                                type: split[0],
                                value: -1,
                            });
                        }
                        else if (fromSupply) {
                            this.game.supply.incValue({
                                religion: split[1],
                                type: split[0],
                                value: -1,
                            });
                        }
                        if (isBishop) {
                            node = document.getElementById("".concat(token.location, "_tokens"));
                        }
                        else if (token.location.startsWith('EmpireSquare_')) {
                            repressTokensToThrones = this.game.settings.get({
                                id: REPRESS_TOKENS_TO_THRONES,
                            }) === ENABLED;
                            node = repressTokensToThrones
                                ? document.getElementById("".concat(token.location, "_throne_tokens"))
                                : document.getElementById("".concat(token.location, "_tokens"));
                        }
                        else {
                            node = document.getElementById("pr_".concat(token.location));
                        }
                        if (!node) {
                            return [2];
                        }
                        if (!fromSupply) return [3, 2];
                        node.insertAdjacentHTML('beforeend', tplToken(token));
                        element = document.getElementById(token.id);
                        fromRect = (_a = document
                            .getElementById("".concat(token.type, "_").concat(token.separator, "_supply"))) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
                        return [4, this.game.animationManager.play(new BgaSlideAnimation({
                                element: element,
                                transitionTimingFunction: 'linear',
                                fromRect: fromRect,
                            }))];
                    case 1:
                        _c.sent();
                        return [3, 4];
                    case 2:
                        tokenNode = document.getElementById(token.id);
                        if (!tokenNode) return [3, 4];
                        return [4, this.game.animationManager.attachWithAnimation(new BgaSlideAnimation({ element: tokenNode }), node)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        this.adjustSupremeReligionCounters({
                            token: token,
                            location: to,
                            addOrRemove: 'add',
                        });
                        if (isPawn) {
                            this.game.playerManager
                                .getPlayerForBank({ bank: split[1] })
                                .counters.concessions.incValue(1);
                        }
                        return [2, Promise.resolve()];
                }
            });
        });
    };
    NotificationManager.prototype.notif_playCard = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, card, player;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, card = _a.card;
                        player = this.getPlayer({ playerId: playerId });
                        player.incHandCards(card.region, -1);
                        this.game.openHandsModal.removeCard({ playerId: playerId, card: card });
                        return [4, player.tableau.addCard(card)];
                    case 1:
                        _b.sent();
                        this.addPrestige({ player: player, prestige: card.prestige });
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_purchaseCard = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, card, placedFlorins, takenFlorins, discard, player;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, card = _a.card, placedFlorins = _a.placedFlorins, takenFlorins = _a.takenFlorins, discard = _a.discard;
                        player = this.getPlayer({ playerId: playerId });
                        return [4, this.game.market.payFlorins({ placedFlorins: placedFlorins, playerId: playerId })];
                    case 1:
                        _b.sent();
                        return [4, this.game.market.takeFlorins({
                                playerId: playerId,
                                florins: takenFlorins,
                                from: card.location,
                            })];
                    case 2:
                        _b.sent();
                        if (!!discard) return [3, 4];
                        return [4, player.addCardToHand({ card: card })];
                    case 3:
                        _b.sent();
                        this.game.openHandsModal.addCard({ playerId: playerId, card: card });
                        return [3, 6];
                    case 4: return [4, this.getStockMarketLocation({ location: card.location }).removeCard(card)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_refreshHand = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, hand;
            return __generator(this, function (_b) {
                _a = notif.args, playerId = _a.playerId, hand = _a.hand;
                this.game.hand.clearInterface();
                this.game.hand.getStock().addCards(hand);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_refreshMarket = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, cardMoves, cardDraws, index, _i, cardMoves_1, move, from, to, card, _b, _1, fromRegion, fromColumn, _c, _2, toRegion, toCol, florinsOnCard, promises, _d, cardDraws_1, card;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.game.clearPossible();
                        _a = notif.args, cardMoves = _a.cardMoves, cardDraws = _a.cardDraws;
                        index = 0;
                        _i = 0, cardMoves_1 = cardMoves;
                        _e.label = 1;
                    case 1:
                        if (!(_i < cardMoves_1.length)) return [3, 4];
                        move = cardMoves_1[_i];
                        index += 1;
                        from = move.from, to = move.to, card = move.card;
                        _b = from.split('_'), _1 = _b[0], fromRegion = _b[1], fromColumn = _b[2];
                        _c = to.split('_'), _2 = _c[0], toRegion = _c[1], toCol = _c[2];
                        card.location = to;
                        florinsOnCard = this.game.market.getFlorins({
                            region: fromRegion,
                            column: Number(fromColumn),
                        });
                        this.game.market.setFlorinValue({
                            region: fromRegion,
                            column: Number(fromColumn),
                            value: 0,
                        });
                        promises = [
                            this.game.market
                                .getStock({
                                region: toRegion,
                                column: Number(toCol),
                            })
                                .addCard(card),
                        ];
                        if (florinsOnCard > 0) {
                            promises.push(this.game.market.moveFlorinAnimation({
                                fromId: "pr_".concat(from, "_florins"),
                                toId: "pr_".concat(to, "_florins"),
                                index: index,
                                htmlFlorinChildren: "<span class=\"pr_counter\">".concat(florinsOnCard, "</span>"),
                            }));
                        }
                        return [4, Promise.all(promises)];
                    case 2:
                        _e.sent();
                        this.game.market.setFlorinValue({
                            region: toRegion,
                            column: Number(toCol),
                            value: florinsOnCard +
                                this.game.market.getFlorins({
                                    region: toRegion,
                                    column: Number(toCol),
                                }),
                        });
                        if (Number(toCol) === 0) {
                            this.game.tooltipManager.removeTooltip(card.id);
                        }
                        _e.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        _d = 0, cardDraws_1 = cardDraws;
                        _e.label = 5;
                    case 5:
                        if (!(_d < cardDraws_1.length)) return [3, 8];
                        card = cardDraws_1[_d];
                        return [4, this.game.market.drawCard(card)];
                    case 6:
                        _e.sent();
                        _e.label = 7;
                    case 7:
                        _d++;
                        return [3, 5];
                    case 8: return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_refreshUI = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var gamedatas, updatedGamedatas;
            return __generator(this, function (_a) {
                gamedatas = notif.args.datas;
                updatedGamedatas = __assign(__assign({}, this.game.gamedatas), gamedatas);
                this.game.gamedatas = updatedGamedatas;
                this.game.clearInterface();
                this.game.victoryCardManager.updateInterface({ gamedatas: gamedatas });
                this.game.gameMap.updateInterface({ gamedatas: gamedatas });
                this.game.market.updateMarket({ gamedatas: gamedatas });
                this.game.supply.updateInterdace({ gamedatas: gamedatas });
                this.game.playerManager.updatePlayers({ gamedatas: gamedatas });
                this.game.openHandsModal.updateInterface({ gamedatas: gamedatas });
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_repressToken = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, token, cost, from, element, empireSquareId, repressTokensToThrones, toNode;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, token = _a.token, cost = _a.cost, from = _a.from;
                        if (!(cost < 0)) return [3, 2];
                        return [4, this.game.market.moveFlorinAnimation({
                                fromId: 'pr_china',
                                index: 0,
                                toId: "pr_florins_counter_".concat(playerId, "_icon"),
                            })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        this.getPlayer({ playerId: playerId }).incFlorins(-cost);
                        if (!(cost > 0)) return [3, 4];
                        return [4, this.game.market.moveFlorinAnimation({
                                toId: 'pr_china',
                                index: 0,
                                fromId: "pr_florins_counter_".concat(playerId, "_icon"),
                            })];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        element = document.getElementById(token.id);
                        empireSquareId = token.location;
                        this.adjustSupremeReligionCounters({
                            token: token,
                            location: from,
                            addOrRemove: 'remove',
                        });
                        if (token.type === PAWN) {
                            this.game.playerManager
                                .getPlayerForBank({ bank: token.separator })
                                .counters.concessions.incValue(-1);
                        }
                        repressTokensToThrones = this.game.settings.get({
                            id: REPRESS_TOKENS_TO_THRONES,
                        }) === ENABLED;
                        toNode = token.type === BISHOP || !repressTokensToThrones
                            ? document.getElementById("".concat(empireSquareId, "_tokens"))
                            : document.getElementById("".concat(empireSquareId, "_throne_tokens"));
                        if (!(element && toNode)) {
                            return [2];
                        }
                        return [4, this.game.animationManager.attachWithAnimation(new BgaSlideAnimation({ element: element }), toNode)];
                    case 5:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_returnToThrone = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, king, fromSide, playerId, suzerain, player, prestige;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, king = _a.king, fromSide = _a.fromSide, playerId = _a.playerId, suzerain = _a.suzerain;
                        this.game.gameMap.updateCoatOfArms({ card: king });
                        player = this.getPlayer({ playerId: playerId });
                        player.counters[fromSide].incValue(-1);
                        prestige = king[fromSide].prestige;
                        king.queens.forEach(function (queen) {
                            prestige.push.apply(prestige, queen.prestige);
                        });
                        this.removePrestige({ player: player, prestige: prestige });
                        this.game.tableauCardManager.updateCardInformations(king);
                        return [4, this.game.gameMap
                                .getEmpireSquareStock({ empireId: king.empire })
                                .addCard(createEmpireCardContainer(king))];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_sellCard = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, card, value, player;
            return __generator(this, function (_b) {
                _a = notif.args, playerId = _a.playerId, card = _a.card, value = _a.value;
                player = this.getPlayer({ playerId: playerId });
                player.incFlorins(value);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_returnToSupply = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, token, from, node, split;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, token = _a.token, from = _a.from;
                        this.adjustSupremeReligionCounters({
                            token: token,
                            location: from,
                            addOrRemove: 'remove',
                        });
                        if (token.type === PAWN && !from.id.startsWith('EmpireSquare')) {
                            this.game.playerManager
                                .getPlayerForBank({ bank: token.separator })
                                .counters.concessions.incValue(-1);
                        }
                        node = document.getElementById(token.id);
                        if (!node) return [3, 2];
                        return [4, this.game.animationManager.attachWithAnimation(new BgaSlideAnimation({ element: node }), document.getElementById("".concat(token.type, "_").concat(token.separator, "_supply")))];
                    case 1:
                        _b.sent();
                        node.remove();
                        _b.label = 2;
                    case 2:
                        split = token.id.split('_');
                        if (split[0] === PAWN) {
                            this.game.supply.incValue({
                                bank: split[1],
                                type: split[0],
                                value: 1,
                            });
                        }
                        else {
                            this.game.supply.incValue({
                                religion: split[1],
                                type: split[0],
                                value: 1,
                            });
                        }
                        return [2, Promise.resolve()];
                }
            });
        });
    };
    NotificationManager.prototype.notif_sellRoyalCouple = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, value;
            return __generator(this, function (_b) {
                _a = notif.args, playerId = _a.playerId, value = _a.value;
                this.getPlayer({ playerId: playerId }).incFlorins(value);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_tableauOpCommerce = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, location, _b, _, region, column;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, location = _a.location;
                        _b = location.split('_'), _ = _b[0], region = _b[1], column = _b[2];
                        this.game.market.incFlorinValue({
                            region: region,
                            column: Number(column),
                            value: -1,
                        });
                        return [4, this.game.market.moveFlorinAnimation({
                                toId: "pr_florins_counter_".concat(playerId, "_icon"),
                                fromId: "pr_market_".concat(region, "_").concat(column, "_florins"),
                                index: 1,
                            })];
                    case 1:
                        _c.sent();
                        this.getPlayer({ playerId: playerId }).incFlorins(1);
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_tableauOpTaxPay = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var playerId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        playerId = notif.args.playerId;
                        this.getPlayer({ playerId: playerId }).incFlorins(-1);
                        return [4, this.game.market.moveFlorinAnimation({
                                fromId: "pr_florins_counter_".concat(playerId, "_icon"),
                                toId: 'pr_china',
                                index: 0,
                            })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_tradeFairConvene = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, florinsFromChina, region, stock, card;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, florinsFromChina = _a.florinsFromChina, region = _a.region;
                        return [4, this.game.market.moveFlorinAnimation({
                                fromId: 'pr_china',
                                toId: "pr_market_".concat(region, "_0_florins"),
                                index: 1,
                            })];
                    case 1:
                        _b.sent();
                        this.game.market.incFlorinValue({
                            region: region,
                            column: 0,
                            value: florinsFromChina,
                        });
                        stock = this.game.market.getStock({ region: region, column: 0 });
                        card = stock.getCards()[0];
                        stock.removeCard(card);
                        return [2, Promise.resolve()];
                }
            });
        });
    };
    NotificationManager.prototype.notif_tradeFairEmporiumSubsidy = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, amount, playerId, region;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, amount = _a.amount, playerId = _a.playerId, region = _a.region;
                        this.game.market.incFlorinValue({
                            region: region,
                            column: 0,
                            value: -amount,
                        });
                        return [4, this.game.market.moveFlorinAnimation({
                                toId: "pr_florins_counter_".concat(playerId, "_icon"),
                                fromId: "pr_market_".concat(region, "_0_florins"),
                                index: 1,
                            })];
                    case 1:
                        _b.sent();
                        this.getPlayer({ playerId: playerId }).incFlorins(amount);
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_tradeFairProfitDispersalPirates = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var region;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        region = notif.args.region;
                        this.game.market.incFlorinValue({
                            region: region,
                            column: 0,
                            value: -1,
                        });
                        return [4, this.game.market.moveFlorinAnimation({
                                toId: "pr_china",
                                fromId: "pr_market_".concat(region, "_0_florins"),
                                index: 1,
                            })];
                    case 1:
                        _a.sent();
                        return [2, Promise.resolve()];
                }
            });
        });
    };
    NotificationManager.prototype.notif_tradeFairProfitDispersalPlayer = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, region, playerId, amount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, region = _a.region, playerId = _a.playerId, amount = _a.amount;
                        this.game.market.incFlorinValue({
                            region: region,
                            column: 0,
                            value: -amount,
                        });
                        return [4, this.game.market.moveFlorinAnimation({
                                toId: "pr_florins_counter_".concat(playerId, "_icon"),
                                fromId: "pr_market_".concat(region, "_0_florins"),
                                index: 1,
                            })];
                    case 1:
                        _b.sent();
                        this.getPlayer({ playerId: playerId }).incFlorins(amount);
                        return [2, Promise.resolve()];
                }
            });
        });
    };
    NotificationManager.prototype.notif_smallRefreshInterface = function (notif) {
        var updatedGamedatas = __assign(__assign({}, this.game.gamedatas), notif.args);
        this.game.clearInterface();
        this.game.gamedatas = updatedGamedatas;
        this.game.playerManager.updatePlayers({ gamedatas: updatedGamedatas });
    };
    NotificationManager.prototype.adjustSupremeReligionCounters = function (_a) {
        var _this = this;
        var token = _a.token, location = _a.location, addOrRemove = _a.addOrRemove;
        var add = addOrRemove === 'add';
        if (token.type === PAWN || !location) {
            return;
        }
        else if (token.type === BISHOP) {
            this.game.gameMap.supremeReligion[token.separator].bishops.incValue(add ? 1 : -1);
        }
        else if ((token.type === KNIGHT || token.type === ROOK) &&
            location.type === CITY &&
            token.separator === location.empire.religion) {
            this.game.gameMap.supremeReligion[token.separator].tokens.incValue(add ? 1 : -1);
        }
        else if (token.type === PIRATE && location.type === BORDER) {
            var pirateAbilityActive_1 = this.game.playerManager.anyPlayerHasActiveAbility({
                ability: SA_GREEN_PIRATES_COUNT_AS_RED_BISHOPS_AND_UNITS,
            });
            location.adjacentEmpires.forEach(function (empire) {
                if (empire.religion === token.separator) {
                    _this.game.gameMap.supremeReligion[token.separator].tokens.incValue(add ? 1 : -1);
                }
                if (pirateAbilityActive_1 &&
                    empire.religion === REFORMIST &&
                    token.separator === ISLAMIC) {
                    _this.game.gameMap.supremeReligion.reformist.tokens.incValue(add ? 1 : -1);
                }
            });
            if (pirateAbilityActive_1 && token.separator === ISLAMIC) {
                this.game.gameMap.supremeReligion.reformist.bishops.incValue(add ? 1 : -1);
            }
        }
    };
    NotificationManager.prototype.addEmpireSquarePrestige = function (_a) {
        var empireSquare = _a.empireSquare, side = _a.side, playerId = _a.playerId;
        var owner = this.getPlayer({ playerId: playerId });
        owner.counters[side].incValue(1);
        var prestige = empireSquare[side].prestige.concat(this.getQueensPrestige({ queens: empireSquare.queens }));
        this.addPrestige({ player: owner, prestige: prestige });
    };
    NotificationManager.prototype.removeEmpireSquarePrestige = function (_a) {
        var empireSquare = _a.empireSquare, side = _a.side, playerId = _a.playerId;
        var owner = this.getPlayer({ playerId: playerId });
        owner.counters[side].incValue(-1);
        var prestige = empireSquare[side].prestige.concat(this.getQueensPrestige({ queens: empireSquare.queens }));
        this.removePrestige({ player: owner, prestige: prestige });
    };
    NotificationManager.prototype.getQueensPrestige = function (_a) {
        var queens = _a.queens;
        var prestige = [];
        queens.forEach(function (queen) {
            prestige.push.apply(prestige, queen.prestige);
        });
        return prestige;
    };
    NotificationManager.prototype.addPrestige = function (_a) {
        var _this = this;
        var player = _a.player, prestige = _a.prestige;
        prestige.forEach(function (prestige) {
            player.counters.prestige[prestige].incValue(1);
            if (prestige === PATRON) {
                if (player.hasActiveAbility({
                    ability: SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY,
                })) {
                    _this.game.gameMap.supremeReligion.islamic.bishops.incValue(1);
                }
                [
                    SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_1,
                    SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_2,
                ].forEach(function (ability) {
                    if (player.hasActiveAbility({
                        ability: ability,
                    })) {
                        player.counters.concessions.incValue(1);
                    }
                });
                [
                    SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_1,
                    SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_2,
                    SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_3,
                ].forEach(function (ability) {
                    if (player.hasActiveAbility({
                        ability: ability,
                    })) {
                        player.counters.prestige.law.incValue(1);
                    }
                });
            }
        });
    };
    NotificationManager.prototype.removePrestige = function (_a) {
        var _this = this;
        var player = _a.player, prestige = _a.prestige;
        prestige.forEach(function (prestige) {
            player.counters.prestige[prestige].incValue(-1);
            if (prestige === PATRON) {
                if (player.hasActiveAbility({
                    ability: SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY,
                })) {
                    _this.game.gameMap.supremeReligion.islamic.bishops.incValue(-1);
                }
                [
                    SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_1,
                    SA_PATRON_COUNTS_AS_CONCESSION_IN_GLOBALIZATION_VICTORY_2,
                ].forEach(function (ability) {
                    if (player.hasActiveAbility({
                        ability: ability,
                    })) {
                        player.counters.concessions.incValue(-1);
                    }
                });
                [
                    SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_1,
                    SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_2,
                    SA_PATRON_COUNTS_AS_LAW_IN_RENAISSANCE_VICTORY_3,
                ].forEach(function (ability) {
                    if (player.hasActiveAbility({
                        ability: ability,
                    })) {
                        player.counters.prestige.law.incValue(-1);
                    }
                });
            }
        });
    };
    NotificationManager.prototype.destroy = function () {
        dojo.forEach(this.subscriptions, dojo.unsubscribe);
    };
    NotificationManager.prototype.getPlayer = function (_a) {
        var playerId = _a.playerId;
        return this.game.playerManager.getPlayer({ playerId: playerId });
    };
    NotificationManager.prototype.getRegionAndColumnMarketLocation = function (_a) {
        var location = _a.location;
        var _b = location.split('_'), _ = _b[0], region = _b[1], colummn = _b[2];
        return {
            region: region,
            column: Number(colummn),
        };
    };
    NotificationManager.prototype.getStockMarketLocation = function (_a) {
        var location = _a.location;
        var _b = this.getRegionAndColumnMarketLocation({
            location: location,
        }), region = _b.region, column = _b.column;
        return this.game.market.getStock({ region: region, column: column });
    };
    return NotificationManager;
}());
var OpenHandsModal = (function () {
    function OpenHandsModal(game) {
        this.game = game;
        var gamedatas = game.gamedatas;
        this.enabled = gamedatas.gameOptions.openHands;
        this.handCardData = {};
        this.setup({ gamedatas: gamedatas });
    }
    OpenHandsModal.prototype.clearInterface = function () { };
    OpenHandsModal.prototype.updateInterface = function (_a) {
        var _this = this;
        var gamedatas = _a.gamedatas;
        if (!this.enabled) {
            return;
        }
        Object.entries(gamedatas.players).forEach(function (_a) {
            var playerId = _a[0], playerData = _a[1];
            _this.handCardData[playerId] = {
                playerName: playerData.name,
                cards: playerData.hand.cards,
            };
        });
        if (this.modal.isDisplayed()) {
            this.updateModalContent();
        }
    };
    OpenHandsModal.prototype.addButton = function (_a) {
        var gamedatas = _a.gamedatas;
        var configPanel = document.getElementById("pr_info_panel");
        if (configPanel) {
            configPanel.insertAdjacentHTML("afterbegin", tplOpenHandsButton());
        }
    };
    OpenHandsModal.prototype.setupModal = function (_a) {
        var gamedatas = _a.gamedatas;
        this.modal = new Modal("open_hand_modal", {
            class: "pr_open_hands_modal",
            closeIcon: "fa-times",
            contents: tplOpenHandsModal({
                data: Object.values(this.handCardData),
                game: this.game,
            }),
            closeAction: "hide",
            verticalAlign: "flex-start",
            breakpoint: 510,
        });
    };
    OpenHandsModal.prototype.setup = function (_a) {
        var _this = this;
        var gamedatas = _a.gamedatas;
        if (!this.enabled) {
            return;
        }
        Object.entries(gamedatas.players).forEach(function (_a) {
            var playerId = _a[0], playerData = _a[1];
            _this.handCardData[playerId] = {
                playerName: playerData.name,
                cards: playerData.hand.cards,
            };
        });
        this.addButton({ gamedatas: gamedatas });
        this.setupModal({ gamedatas: gamedatas });
        dojo.connect($("pr_open_hands_button"), "onclick", function () { return _this.open(); });
    };
    OpenHandsModal.prototype.addCard = function (_a) {
        var card = _a.card, playerId = _a.playerId;
        if (!this.enabled) {
            return;
        }
        this.handCardData[playerId].cards.push(card);
        if (this.modal.isDisplayed()) {
            this.updateModalContent();
        }
    };
    OpenHandsModal.prototype.removeCard = function (_a) {
        var cardToRemove = _a.card, playerId = _a.playerId;
        if (!this.enabled) {
            return;
        }
        this.handCardData[playerId].cards = this.handCardData[playerId].cards.filter(function (card) { return card.id !== cardToRemove.id; });
        if (this.modal.isDisplayed()) {
            this.updateModalContent();
        }
    };
    OpenHandsModal.prototype.open = function () {
        this.updateModalContent();
        this.modal.show();
    };
    OpenHandsModal.prototype.updateModalContent = function () {
        var _this = this;
        this.modal.updateContent(tplOpenHandsModal({
            data: Object.values(this.handCardData),
            game: this.game,
        }));
        Object.entries(this.handCardData).forEach(function (_a) {
            var playerId = _a[0], cards = _a[1].cards;
            cards.forEach(function (card) {
                return _this.game.tooltipManager.addCardTooltip({
                    nodeId: "".concat(card.id, "-modal"),
                    card: card,
                });
            });
        });
    };
    return OpenHandsModal;
}());
var tplOpenHandsButton = function () { return "<button id=\"pr_open_hands_button\" type=\"button\" class=\"pr_button\">\n<div class=\"pr_icon\"></div>\n</button>"; };
var tplOpenHandCard = function (_a) {
    var card = _a.card;
    return "<div id=\"".concat(card.id, "-modal\" class=\"pr_card\" data-card-id=\"").concat(card.id.split("_")[0], "\"></div>");
};
var tplOpenHandPlayerData = function (_a) {
    var playerName = _a.playerName, cards = _a.cards, game = _a.game;
    var titleText = _("${tkn_playerName}");
    var title = game.format_string_recursive(titleText, {
        tkn_playerName: playerName,
    });
    return "\n  <div class=\"pr_open_hands_modal_player_container\">\n    <h2>".concat(title, "</h2>\n    <div class=\"pr_open_hands_modal_cards_container\">\n      ").concat(cards.map(function (card) { return tplOpenHandCard({ card: card }); }).join(""), "\n    </div>\n  </div>\n");
};
var tplOpenHandsModal = function (_a) {
    var data = _a.data, game = _a.game;
    return data
        .map(function (playerData) { return tplOpenHandPlayerData(__assign({ game: game }, playerData)); })
        .join("");
};
var PlayerManager = (function () {
    function PlayerManager(game) {
        this.game = game;
        this.players = {};
        this.setupPlayerTableaux({
            playerOrder: game.playerOrder.map(function (playerId) {
                return Number(playerId);
            }),
        });
        for (var playerId in game.gamedatas.players) {
            var player = game.gamedatas.players[playerId];
            this.players[playerId] = new PRPlayer({ player: player, game: this.game });
        }
    }
    PlayerManager.prototype.setupPlayerTableaux = function (_a) {
        var playerOrder = _a.playerOrder;
        document
            .getElementById("pr_play_area_container")
            .insertAdjacentHTML("beforeend", tplPlayerTableauxContainer({ playerOrder: playerOrder }));
        var cardsInTableauScale = this.game.settings.get({
            id: CARD_SIZE_IN_TABLEAU,
        });
        var node = document.getElementById("pr_player_tableaux");
        if (node) {
            node.style.setProperty("--paxRenCardInTableauScale", "".concat(Number(cardsInTableauScale) / 100));
        }
    };
    PlayerManager.prototype.anyPlayerHasActiveAbility = function (props) {
        return this.getPlayers().some(function (player) { return player.hasActiveAbility(props); });
    };
    PlayerManager.prototype.getPlayer = function (_a) {
        var playerId = _a.playerId;
        return this.players[playerId];
    };
    PlayerManager.prototype.getPlayers = function () {
        return Object.values(this.players);
    };
    PlayerManager.prototype.getPlayerForBank = function (_a) {
        var bank = _a.bank;
        return this.getPlayers().find(function (player) { return player.getBank() === bank; });
    };
    PlayerManager.prototype.getPlayerIds = function () {
        return Object.keys(this.players).map(Number);
    };
    PlayerManager.prototype.updatePlayers = function (_a) {
        var gamedatas = _a.gamedatas;
        for (var playerId in gamedatas.players) {
            this.players[playerId].updatePlayer({ gamedatas: gamedatas });
        }
    };
    PlayerManager.prototype.updateCardTooltips = function () {
        this.getPlayers().forEach(function (player) {
            player.updateCardTooltips();
        });
    };
    PlayerManager.prototype.clearInterface = function () {
        var _this = this;
        Object.keys(this.players).forEach(function (playerId) {
            _this.players[playerId].clearInterface();
        });
    };
    return PlayerManager;
}());
var PRPlayer = (function () {
    function PRPlayer(_a) {
        var game = _a.game, player = _a.player;
        this.counters = {
            prestige: {},
            cards: {},
            cardsTableau: {},
        };
        this.activeAbilities = [];
        this.game = game;
        this.bank = player.bank;
        var playerId = player.id;
        this.playerId = Number(playerId);
        this.player = player;
        this.playerName = player.name;
        this.playerColor = COLOR_MAP[player.color];
        this.playerHexColor = player.color;
        this.activeAbilities = player.activeAbilities;
        var gamedatas = game.gamedatas;
        this.setupPlayer({ gamedatas: gamedatas, player: player });
    }
    PRPlayer.prototype.clearInterface = function () {
        this.tableau.clearInterface();
    };
    PRPlayer.prototype.updatePlayer = function (_a) {
        var gamedatas = _a.gamedatas;
        var playerGamedatas = gamedatas.players[this.playerId];
        this.activeAbilities = playerGamedatas.activeAbilities;
        this.player = playerGamedatas;
        this.updatePlayerPanel({ playerGamedatas: playerGamedatas, gamedatas: gamedatas });
        this.tableau.updateInterface({ player: playerGamedatas });
    };
    PRPlayer.prototype.setupHand = function (_a) {
        var gamedatas = _a.gamedatas, player = _a.player;
        if (this.playerId === this.game.getPlayerId()) {
            this.game.hand.getStock().addCards(player.hand.cards);
        }
    };
    PRPlayer.prototype.setupPlayer = function (_a) {
        var gamedatas = _a.gamedatas, player = _a.player;
        var playerGamedatas = gamedatas.players[this.playerId];
        this.tableau = new PlayerTableau({ game: this.game, player: player });
        this.setupPlayerPanel({ playerGamedatas: playerGamedatas, player: player, gamedatas: gamedatas });
        this.setupHand({ gamedatas: gamedatas, player: player });
    };
    PRPlayer.prototype.setupPlayerPanel = function (_a) {
        var _this = this;
        var playerGamedatas = _a.playerGamedatas, player = _a.player, gamedatas = _a.gamedatas;
        var playerBoardDiv = $("player_board_" + this.playerId);
        playerBoardDiv.insertAdjacentHTML("beforeend", tplPlayerPanel({ playerId: this.playerId, banker: this.bank }));
        this.counters.florins = new IconCounter({
            containerId: "pr_player_panel_icons_".concat(this.playerId),
            icon: "florin",
            iconCounterId: "pr_florins_counter_".concat(this.playerId),
            initialValue: player.florins,
        });
        this.counters.florinsTableau = new IconCounter({
            containerId: "pr_tableau_title_counters_".concat(this.playerId),
            icon: "florin",
            iconCounterId: "pr_florins_tableau_counter_".concat(this.playerId),
            initialValue: player.florins,
        });
        [
            "pr_florins_counter_".concat(this.playerId),
            "pr_florins_tableau_counter_".concat(this.playerId),
        ].forEach(function (nodeId) {
            _this.game.tooltipManager.addIconTooltip({
                iconHtml: tplIcon({
                    icon: "florin",
                    style: "--paxRenIconScale: 0.85;",
                }),
                nodeId: nodeId,
                title: _("Florins"),
                text: _("The amount of Florins this player owns."),
            });
        });
        this.counters.cards.west = new IconCounter({
            containerId: "pr_player_panel_icons_".concat(this.playerId),
            extraIconClasses: "pr_card_back_icon",
            icon: "west_back",
            iconCounterId: "pr_cards_west_counter_".concat(this.playerId),
            initialValue: 0,
        });
        this.counters.cardsTableau.west = new IconCounter({
            containerId: "pr_tableau_title_counters_".concat(this.playerId),
            extraIconClasses: "pr_card_back_icon",
            icon: "west_back",
            iconCounterId: "pr_cards_tableau_west_counter_".concat(this.playerId),
            initialValue: 0,
        });
        [
            "pr_cards_west_counter_".concat(this.playerId),
            "pr_cards_tableau_west_counter_".concat(this.playerId),
        ].forEach(function (nodeId) {
            _this.game.tooltipManager.addIconTooltip({
                iconHtml: tplIcon({
                    icon: "west_back",
                    classes: "pr_card_back_icon",
                    style: "width: 30px; height: 45px;",
                }),
                nodeId: nodeId,
                title: _("West cards"),
                text: _("The number of cards from the West deck this player has in their hand."),
            });
        });
        this.counters.cards.east = new IconCounter({
            containerId: "pr_player_panel_icons_".concat(this.playerId),
            extraIconClasses: "pr_card_back_icon",
            icon: "east_back",
            iconCounterId: "pr_cards_east_counter_".concat(this.playerId),
            initialValue: 0,
        });
        this.counters.cardsTableau.east = new IconCounter({
            containerId: "pr_tableau_title_counters_".concat(this.playerId),
            extraIconClasses: "pr_card_back_icon",
            icon: "east_back",
            iconCounterId: "pr_cards_tableau_east_counter_".concat(this.playerId),
            initialValue: 0,
        });
        [
            "pr_cards_east_counter_".concat(this.playerId),
            "pr_cards_tableau_east_counter_".concat(this.playerId),
        ].forEach(function (nodeId) {
            _this.game.tooltipManager.addIconTooltip({
                iconHtml: tplIcon({
                    icon: "east_back",
                    classes: "pr_card_back_icon",
                    style: "width: 30px; height: 45px;",
                }),
                nodeId: nodeId,
                title: _("East cards"),
                text: _("The number of cards from the East deck this player has in their hand."),
            });
        });
        var prestigeText = _("The amount of ${prestige} this player has in their tableau. Counts for ${victory}.");
        var prestigeTitle = _("${prestige}");
        [CATHOLIC, ISLAMIC, REFORMIST].forEach(function (prestige) {
            var _a, _b;
            var titleArgs = (_a = {},
                _a[CATHOLIC] = {
                    prestige: _("Catholic Prestige"),
                },
                _a[ISLAMIC] = {
                    prestige: _("Islamic Prestige"),
                },
                _a[REFORMIST] = {
                    prestige: _("Reformist Prestige"),
                },
                _a);
            var textArgs = (_b = {},
                _b[CATHOLIC] = {
                    prestige: _("Catholic Prestige"),
                    victory: _("Holy Victory"),
                },
                _b[ISLAMIC] = {
                    prestige: _("Islamic Prestige"),
                    victory: _("Holy Victory"),
                },
                _b[REFORMIST] = {
                    prestige: _("Reformist Prestige"),
                    victory: _("Holy Victory"),
                },
                _b);
            var icon = "prestige_".concat(prestige);
            var id = "pr_prestige_".concat(prestige, "_counter_").concat(_this.playerId);
            var classes = "pr_prestige_icon";
            _this.counters.prestige[prestige] = new IconCounter({
                containerId: "pr_player_panel_icons_".concat(_this.playerId),
                extraIconClasses: classes,
                icon: icon,
                iconCounterId: id,
                initialValue: 0,
            });
            _this.game.tooltipManager.addIconTooltip({
                iconHtml: tplIcon({ icon: icon, classes: classes, style: "--paxRenIconScale: 1.35;" }),
                nodeId: id,
                text: _this.game.format_string_recursive(prestigeText, textArgs[prestige]),
                title: _this.game.format_string_recursive(prestigeTitle, titleArgs[prestige]),
            });
        });
        [PATRON, LAW, DISCOVERY].forEach(function (prestige) {
            var _a, _b;
            var titleArgs = (_a = {},
                _a[PATRON] = {
                    prestige: _("Patron Prestige"),
                },
                _a[LAW] = {
                    prestige: _("Law Prestige"),
                },
                _a[DISCOVERY] = {
                    prestige: _("Discovery Prestige"),
                },
                _a);
            var textArgs = (_b = {},
                _b[PATRON] = {
                    prestige: _("Patron Prestige"),
                    victory: _("Patron Victory"),
                },
                _b[LAW] = {
                    prestige: _("Law Prestige"),
                    victory: _("Renaissance Victory"),
                },
                _b[DISCOVERY] = {
                    prestige: _("Discovery Prestige"),
                    victory: _("Globalization Victory"),
                },
                _b);
            var icon = "prestige_".concat(prestige);
            var id = "pr_prestige_".concat(prestige, "_counter_").concat(_this.playerId);
            var classes = "pr_prestige_icon";
            _this.counters.prestige[prestige] = new IconCounter({
                containerId: "pr_player_panel_icons_".concat(_this.playerId),
                extraIconClasses: classes,
                icon: icon,
                iconCounterId: id,
                initialValue: 0,
            });
            _this.game.tooltipManager.addIconTooltip({
                iconHtml: tplIcon({ icon: icon, classes: classes, style: "--paxRenIconScale: 1.35;" }),
                nodeId: id,
                text: _this.game.format_string_recursive(prestigeText, textArgs[prestige]),
                title: _this.game.format_string_recursive(prestigeTitle, titleArgs[prestige]),
            });
        });
        this.counters.king = new IconCounter({
            containerId: "pr_player_panel_icons_".concat(this.playerId),
            extraIconClasses: "pr_square_card_icon",
            icon: "king",
            iconCounterId: "pr_kings_counter_".concat(this.playerId),
            initialValue: 0,
            dataAttribute: {
                key: "data-bank",
                value: this.bank,
            },
        });
        this.game.tooltipManager.addIconTooltip({
            iconHtml: tplIcon({
                icon: "king",
                classes: "pr_square_card_icon",
                extra: "data-bank=\"".concat(this.bank, "\""),
                style: "--paxRenIconScale: 1.45;",
            }),
            nodeId: "pr_kings_counter_".concat(this.playerId),
            text: _("The number of Empire Squares on their King side this player has in their tableau. Counts for Imperial Victory."),
            title: _("Kings"),
        });
        this.counters.republic = new IconCounter({
            containerId: "pr_player_panel_icons_".concat(this.playerId),
            extraIconClasses: "pr_square_card_icon",
            icon: "republic",
            iconCounterId: "pr_republics_counter_".concat(this.playerId),
            initialValue: 0,
            dataAttribute: {
                key: "data-bank",
                value: this.bank,
            },
        });
        this.game.tooltipManager.addIconTooltip({
            iconHtml: tplIcon({
                icon: "republic",
                classes: "pr_square_card_icon",
                extra: "data-bank=\"".concat(this.bank, "\""),
                style: "--paxRenIconScale: 1.45;",
            }),
            nodeId: "pr_republics_counter_".concat(this.playerId),
            text: _("The number of Empire Squares on their Republic side this player has in their tableau. Counts for Renaissance Victory."),
            title: _("Republics"),
        });
        this.counters.concessions = new IconCounter({
            containerId: "pr_player_panel_icons_".concat(this.playerId),
            extraIconClasses: "pr_concession_icon",
            icon: "concession",
            iconCounterId: "pr_concessions_counter_".concat(this.playerId),
            initialValue: 0,
            dataAttribute: {
                key: "data-bank",
                value: this.bank,
            },
        });
        this.game.tooltipManager.addIconTooltip({
            iconHtml: tplIcon({
                icon: "concession",
                classes: "pr_concession_icon",
                extra: "data-bank=\"".concat(this.bank, "\""),
                style: "--paxRenTokenScale: 1.35;",
            }),
            nodeId: "pr_concessions_counter_".concat(this.playerId),
            text: _("The number of Concessions this player has in play. Counts for Globalization Victory."),
            title: _("Concessions"),
        });
        if (COLORS_WITH_SHADOW.includes(this.getColor())) {
            var node = document.getElementById("player_name_".concat(this.playerId));
            if (node) {
                node.setAttribute("data-shadow", "true");
            }
        }
        this.updatePlayerPanel({ playerGamedatas: playerGamedatas, gamedatas: gamedatas });
    };
    PRPlayer.prototype.updatePlayerPanel = function (_a) {
        var _b;
        var _this = this;
        var _c, _d, _e, _f, _g, _h;
        var gamedatas = _a.gamedatas, playerGamedatas = _a.playerGamedatas;
        this.setHandCards(EAST, playerGamedatas.hand.counts.east);
        this.setHandCards(WEST, playerGamedatas.hand.counts.west);
        this.setFlorins(playerGamedatas.florins);
        if ((_c = this.game.framework().scoreCtrl) === null || _c === void 0 ? void 0 : _c[this.playerId]) {
            this.game
                .framework()
                .scoreCtrl[this.playerId].setValue(Number(playerGamedatas.score));
        }
        var allCards = __spreadArray(__spreadArray(__spreadArray([], playerGamedatas.tableau.cards.east, true), playerGamedatas.tableau.cards.west, true), playerGamedatas.oldMaids, true);
        var prestigeCount = (_b = {},
            _b[CATHOLIC] = 0,
            _b[ISLAMIC] = 0,
            _b[REFORMIST] = 0,
            _b[LAW] = 0,
            _b[DISCOVERY] = 0,
            _b[PATRON] = 0,
            _b);
        allCards.forEach(function (card) {
            if (card.type === TABLEAU_CARD) {
                card.prestige.forEach(function (prestige) {
                    prestigeCount[prestige] = prestigeCount[prestige] + 1;
                });
            }
            else if (card.type === EMPIRE_CARD) {
                card[card.side].prestige.forEach(function (prestige) {
                    prestigeCount[prestige] = prestigeCount[prestige] + 1;
                });
            }
        });
        Object.keys(prestigeCount)
            .filter(function (prestige) {
            return [CATHOLIC, ISLAMIC, REFORMIST, PATRON].includes(prestige);
        })
            .forEach(function (prestige) {
            _this.counters.prestige[prestige].setValue(prestigeCount[prestige]);
        });
        this.counters.prestige[LAW].setValue(((_d = gamedatas.victoryCounts.lawPrestige.find(function (item) { return item.playerId === _this.playerId; })) === null || _d === void 0 ? void 0 : _d.lawPrestige) || 0);
        this.counters.prestige[DISCOVERY].setValue(((_e = gamedatas.victoryCounts.discoveryPrestige.find(function (item) { return item.playerId === _this.playerId; })) === null || _e === void 0 ? void 0 : _e.discoveryPrestige) || 0);
        this.counters.king.setValue(((_f = gamedatas.victoryCounts.kings.find(function (item) { return item.playerId === _this.playerId; })) === null || _f === void 0 ? void 0 : _f.numberOfKings) || 0);
        this.counters.republic.setValue(((_g = gamedatas.victoryCounts.republics.find(function (item) { return item.playerId === _this.playerId; })) === null || _g === void 0 ? void 0 : _g.numberOfRepublics) || 0);
        this.counters.concessions.setValue(((_h = gamedatas.victoryCounts.concessions.find(function (item) { return item.playerId === _this.playerId; })) === null || _h === void 0 ? void 0 : _h.numberOfConcessions) || 0);
    };
    PRPlayer.prototype.getBank = function () {
        return this.bank;
    };
    PRPlayer.prototype.getColor = function () {
        return this.playerColor;
    };
    PRPlayer.prototype.getHexColor = function () {
        return this.playerHexColor;
    };
    PRPlayer.prototype.getName = function () {
        return this.playerName;
    };
    PRPlayer.prototype.getPlayerId = function () {
        return this.playerId;
    };
    PRPlayer.prototype.hasActiveAbility = function (_a) {
        var ability = _a.ability;
        return this.activeAbilities.includes(ability);
    };
    PRPlayer.prototype.activateAbility = function (_a) {
        var ability = _a.ability;
        this.activeAbilities.push(ability);
    };
    PRPlayer.prototype.deactivateAbility = function (_a) {
        var ability = _a.ability;
        this.activeAbilities = this.activeAbilities.filter(function (item) { return item !== ability; });
    };
    PRPlayer.prototype.incFlorins = function (value) {
        this.counters.florins.incValue(value);
        this.counters.florinsTableau.incValue(value);
    };
    PRPlayer.prototype.setFlorins = function (value) {
        this.counters.florins.setValue(value);
        this.counters.florinsTableau.setValue(value);
    };
    PRPlayer.prototype.incHandCards = function (region, value) {
        this.counters.cards[region].incValue(value);
        this.counters.cardsTableau[region].incValue(value);
    };
    PRPlayer.prototype.setHandCards = function (region, value) {
        this.counters.cards[region].setValue(value);
        this.counters.cardsTableau[region].setValue(value);
    };
    PRPlayer.prototype.updateCardTooltips = function () {
        this.tableau.updateCardTooltips();
    };
    PRPlayer.prototype.addCardToHand = function (_a) {
        var card = _a.card;
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.getPlayerId() === this.game.getPlayerId())) return [3, 2];
                        return [4, this.game.hand.addCard(card)];
                    case 1:
                        _b.sent();
                        return [3, 4];
                    case 2:
                        element = this.game.tableauCardManager.getCardElement(card);
                        return [4, moveToAnimation({
                                game: this.game,
                                element: element,
                                toId: "pr_cards_".concat(card.region, "_counter_").concat(this.playerId),
                                remove: true,
                            })];
                    case 3:
                        _b.sent();
                        this.game.tableauCardManager.removeCard(card);
                        _b.label = 4;
                    case 4:
                        this.incHandCards(card.region, 1);
                        return [2];
                }
            });
        });
    };
    PRPlayer.prototype.removeCardFromHand = function (_a) {
        var card = _a.card;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.getPlayerId() === this.game.getPlayerId())) return [3, 2];
                        return [4, this.game.hand.removeCard(card)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        this.incHandCards(card.region, -1);
                        return [2];
                }
            });
        });
    };
    return PRPlayer;
}());
var PlayerTableau = (function () {
    function PlayerTableau(_a) {
        var game = _a.game, player = _a.player;
        this.tableau = {};
        this.game = game;
        this.playerId = Number(player.id);
        this.setup({ player: player });
    }
    PlayerTableau.prototype.updateCardTooltips = function () {
        var _this = this;
        this.tableau.oldMaids.getCards().forEach(function (card) {
            _this.game.tooltipManager.removeTooltip(card.id);
            _this.game.tooltipManager.addCardTooltip({ nodeId: card.id, card: card });
        });
        REGIONS.forEach(function (region) {
            _this.tableau[region].getCards().forEach(function (card) {
                if (card.type !== TABLEAU_CARD) {
                    return;
                }
                _this.game.tooltipManager.removeTooltip(card.id);
                _this.game.tooltipManager.addCardTooltip({ nodeId: card.id, card: card });
            });
        });
    };
    PlayerTableau.prototype.clearInterface = function () {
        this.tableau[EAST].removeAll();
        this.tableau[WEST].removeAll();
    };
    PlayerTableau.prototype.updateInterface = function (_a) {
        var player = _a.player;
        this.updateCards({ player: player });
    };
    PlayerTableau.prototype.setup = function (_a) {
        var player = _a.player;
        var overlap = this.game.settings.get({
            id: CARDS_IN_TABLEAU_OVERLAP,
        });
        var overlapEmpireSquares = this.game.settings.get({
            id: OVERLAP_EMPIRE_SQUARES,
        });
        document
            .getElementById("pr_player_tableau_".concat(player.id))
            .insertAdjacentHTML("beforeend", tplPlayerTableauContent({
            overlap: overlap,
            overlapEmpireSquares: overlapEmpireSquares,
            player: player,
            showCounters: this.game.settings.get({
                id: SHOW_FLORIN_CARD_COUNTERS,
            }),
            title: _("${tkn_playerName}'s tableau").replace("${tkn_playerName}", tplLogTokenPlayerName({
                name: player.name,
                color: player.color,
            })),
        }));
        this.tableau[EAST] = new LineStockWithSort(this.game.tableauCardManager, document.getElementById("tableau_east_".concat(player.id)), { center: false, sort: sortFunction("state") });
        this.tableau[WEST] = new LineStockWithSort(this.game.tableauCardManager, document.getElementById("tableau_west_".concat(player.id)), { center: false, sort: sortFunction("state") });
        this.tableau.oldMaids = new LineStock(this.game.tableauCardManager, document.getElementById("old_maids_".concat(player.id)));
        this.updateCards({ player: player });
    };
    PlayerTableau.prototype.updateCards = function (_a) {
        var _this = this;
        var player = _a.player;
        player.tableau.cards[EAST].filter(noMarriedQueensNoVassals).forEach(function (card) {
            if (card.type === EMPIRE_CARD) {
                _this.tableau[EAST].addCard(createEmpireCardContainer(card));
            }
            else {
                _this.tableau[EAST].addCard(card);
            }
        });
        player.tableau.cards[WEST].filter(noMarriedQueensNoVassals).forEach(function (card) {
            if (card.type === EMPIRE_CARD) {
                _this.tableau[WEST].addCard(createEmpireCardContainer(card));
            }
            else {
                _this.tableau[WEST].addCard(card);
            }
        });
        __spreadArray(__spreadArray([], player.tableau.cards[EAST], true), player.tableau.cards[WEST], true).filter(function (card) { return card.type === EMPIRE_CARD && card.isVassal; })
            .forEach(function (card) {
            _this.game.tableauCardManager.setupVassal({
                vassal: card,
                suzerain: _this.game.gamedatas.empireSquares.find(function (empireCard) { return empireCard.id === card.suzerainId; }),
            });
        });
        player.oldMaids.forEach(function (card) {
            _this.tableau.oldMaids.addCard(card);
        });
        this.checkOldMaidContainerHeight();
        var repressTokensToThrones = this.game.settings.get({
            id: REPRESS_TOKENS_TO_THRONES,
        }) === ENABLED;
        player.tableau.tokens.forEach(function (token) {
            var location = token.location;
            var node = token.type === BISHOP || !repressTokensToThrones
                ? document.getElementById("".concat(location, "_tokens"))
                : document.getElementById("".concat(location, "_throne_tokens"));
            if (!node) {
                return;
            }
            node.insertAdjacentHTML("beforeend", tplToken(token));
        });
    };
    PlayerTableau.prototype.addCard = function (card) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(card.location.split("_")[1] === EAST)) return [3, 2];
                        return [4, this.tableau[EAST].addCard(card)];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2: return [4, this.tableau[WEST].addCard(card)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    PlayerTableau.prototype.addOldMaid = function (card) {
        return __awaiter(this, void 0, void 0, function () {
            var node, currentZIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node = document.getElementById("player_bank_board_".concat(this.playerId));
                        currentZIndex = node.style.zIndex;
                        node.style.zIndex = "50";
                        this.checkOldMaidContainerHeight({ increase: 1 });
                        return [4, this.tableau.oldMaids.addCard(card)];
                    case 1:
                        _a.sent();
                        node.style.zIndex = currentZIndex;
                        return [2];
                }
            });
        });
    };
    PlayerTableau.prototype.checkOldMaidContainerHeight = function (_a) {
        var _b = _a === void 0 ? { increase: 0 } : _a, increase = _b.increase;
        var node = document.getElementById("old_maids_".concat(this.playerId));
        if (!node) {
            return;
        }
        if (this.tableau.oldMaids.getCards().length + increase > 0) {
            node.setAttribute("data-has-old-maids", "true");
        }
        else {
            node.setAttribute("data-has-old-maids", "false");
        }
    };
    return PlayerTableau;
}());
var LineStockWithSort = (function (_super) {
    __extends(LineStockWithSort, _super);
    function LineStockWithSort(manager, element, settings) {
        var _this = _super.call(this, manager, element, settings) || this;
        _this.manager = manager;
        _this.element = element;
        return _this;
    }
    LineStockWithSort.prototype.sortStock = function () {
        if (this.sort && this.cards.length) {
            this.cards.sort(this.sort);
            var previouslyMovedCardDiv = this.getCardElement(this.cards[this.cards.length - 1]);
            this.element.appendChild(previouslyMovedCardDiv);
            for (var i = this.cards.length - 2; i >= 0; i--) {
                var movedCardDiv = this.getCardElement(this.cards[i]);
                this.element.insertBefore(movedCardDiv, previouslyMovedCardDiv);
                previouslyMovedCardDiv = movedCardDiv;
            }
        }
    };
    return LineStockWithSort;
}(LineStock));
var tplPlayerTableauContent = function (_a) {
    var player = _a.player, title = _a.title, overlap = _a.overlap, overlapEmpireSquares = _a.overlapEmpireSquares, showCounters = _a.showCounters;
    var playerId = player.id;
    return "\n  <div class=\"pr_player_tableau_title\" data-show-counters=\"".concat(showCounters, "\">\n    <div class=\"pr_tableau_title_icon_container\"></div>\n      <span class=\"pr_title\">").concat(title, "</span>\n    <div id=\"pr_tableau_title_counters_").concat(playerId, "\" class=\"pr_tableau_title_icon_container\"></div>\n  </div>\n  <div class=\"pr_player_tableau_cards_container\" data-overlap=\"").concat(overlap, "\">\n    <div id=\"tableau_west_").concat(playerId, "\" class=\"pr_player_board_tableau_cards\" data-region=\"west\" data-overlap=\"").concat(overlap, "\" data-overlap-empire-squares=\"").concat(overlapEmpireSquares, "\"></div>\n    <div class=\"pr_player_board_container\">\n      <div id=\"old_maids_").concat(playerId, "\" class=\"pr_old_maids_container\"></div>\n      <div id=\"player_bank_board_").concat(playerId, "\" class=\"pr_player_board\" data-color=\"").concat(COLOR_MAP[player.color], "\"></div>\n    </div>\n\n    <div id=\"tableau_east_").concat(playerId, "\" class=\"pr_player_board_tableau_cards\" data-region=\"east\" data-overlap=\"").concat(overlap, "\" data-overlap-empire-squares=\"").concat(overlapEmpireSquares, "\"></div>\n  </div>\n    ");
};
var tplPlayerPanel = function (_a) {
    var banker = _a.banker, playerId = _a.playerId;
    return "<div id=\"pr_player_panel_".concat(playerId, "\" class=\"pr_player_panel\">\n            <div id=\"pr_player_panel_icons_").concat(playerId, "\" class=\"pr_player_panel_icons\"></div>\n            <div class=\"pr_coat_of_arms\" data-owner=\"").concat(banker, "\"></div>\n          </div>");
};
var tplPlayerTableauxContainer = function (_a) {
    var playerOrder = _a.playerOrder;
    return "\n    <div id=\"pr_player_tableaux\">\n    ".concat(playerOrder
        .map(function (playerId) {
        return "<div id=\"pr_player_tableau_".concat(playerId, "\" class=\"pr_player_tableau\"></div>");
    })
        .join(""), "\n    </div>\n  ");
};
var getSettingsConfig = function () {
    var _a, _b, _c;
    return ({
        layout: {
            id: "layout",
            config: (_a = {
                    backgroundImage: {
                        id: "backgroundImage",
                        onChangeInSetup: true,
                        defaultValue: "goldsmith",
                        label: _("Background image"),
                        type: "select",
                        options: [
                            {
                                label: _("No image"),
                                value: "none",
                            },
                            {
                                label: _("Balcony"),
                                value: "balcony",
                            },
                            {
                                label: _("Cathedral"),
                                value: "cathedral",
                            },
                            {
                                label: _("Goldsmith"),
                                value: "goldsmith",
                            },
                            {
                                label: _("Lucrezia"),
                                value: "lucrezia",
                            },
                            {
                                label: _("Poison"),
                                value: "poison",
                            },
                            {
                                label: _("War"),
                                value: "war",
                            },
                        ],
                    },
                    twoColumnsLayout: {
                        id: "twoColumnsLayout",
                        onChangeInSetup: true,
                        defaultValue: "disabled",
                        label: _("Two column layout"),
                        type: "select",
                        options: [
                            {
                                label: _("Enabled"),
                                value: "enabled",
                            },
                            {
                                label: _("Disabled (single column)"),
                                value: "disabled",
                            },
                        ],
                    },
                    columnSizes: {
                        id: "columnSizes",
                        onChangeInSetup: true,
                        label: _("Column sizes"),
                        defaultValue: 50,
                        visibleCondition: {
                            id: "twoColumnsLayout",
                            values: [ENABLED],
                        },
                        sliderConfig: {
                            step: 5,
                            padding: 0,
                            range: {
                                min: 30,
                                max: 70,
                            },
                        },
                        type: "slider",
                    }
                },
                _a[CARD_SIZE_IN_LOG] = {
                    id: CARD_SIZE_IN_LOG,
                    onChangeInSetup: true,
                    label: _("Size of cards in log"),
                    defaultValue: 0,
                    sliderConfig: {
                        step: 5,
                        padding: 0,
                        range: {
                            min: 0,
                            max: 150,
                        },
                    },
                    type: "slider",
                },
                _a[CARD_INFO_IN_TOOLTIP] = {
                    id: CARD_INFO_IN_TOOLTIP,
                    onChangeInSetup: false,
                    defaultValue: ENABLED,
                    label: _("Show card info in tooltip"),
                    type: "select",
                    options: [
                        {
                            label: _("Enabled"),
                            value: ENABLED,
                        },
                        {
                            label: _("Disabled (card image only)"),
                            value: DISABLED,
                        },
                    ],
                },
                _a),
        },
        tableau: {
            id: "tableau",
            config: (_b = {},
                _b[CARDS_IN_TABLEAU_OVERLAP] = {
                    id: CARDS_IN_TABLEAU_OVERLAP,
                    onChangeInSetup: false,
                    defaultValue: DISABLED,
                    label: _("Cards in tableau overlap"),
                    type: "select",
                    options: [
                        {
                            label: _("Enabled"),
                            value: ENABLED,
                        },
                        {
                            label: _("Disabled"),
                            value: DISABLED,
                        },
                    ],
                },
                _b[OVERLAP_EMPIRE_SQUARES] = {
                    id: OVERLAP_EMPIRE_SQUARES,
                    onChangeInSetup: false,
                    defaultValue: ENABLED,
                    visibleCondition: {
                        id: CARDS_IN_TABLEAU_OVERLAP,
                        values: [ENABLED],
                    },
                    label: _("Cards overlap empire squares"),
                    type: "select",
                    options: [
                        {
                            label: _("Enabled"),
                            value: ENABLED,
                        },
                        {
                            label: _("Disabled"),
                            value: DISABLED,
                        },
                    ],
                },
                _b[CARD_SIZE_IN_TABLEAU] = {
                    id: CARD_SIZE_IN_TABLEAU,
                    onChangeInSetup: false,
                    label: _("Size of cards in tableau"),
                    defaultValue: 100,
                    sliderConfig: {
                        step: 5,
                        padding: 0,
                        range: {
                            min: 50,
                            max: 200,
                        },
                    },
                    type: "slider",
                },
                _b[SHOW_FLORIN_CARD_COUNTERS] = {
                    id: SHOW_FLORIN_CARD_COUNTERS,
                    onChangeInSetup: false,
                    defaultValue: ENABLED,
                    label: _("Show Florin and cards in hand counters"),
                    type: "select",
                    options: [
                        {
                            label: _("Enabled"),
                            value: ENABLED,
                        },
                        {
                            label: _("Disabled"),
                            value: DISABLED,
                        },
                    ],
                },
                _b),
        },
        gameplay: {
            id: "gameplay",
            config: (_c = {},
                _c[REPRESS_TOKENS_TO_THRONES] = {
                    id: REPRESS_TOKENS_TO_THRONES,
                    onChangeInSetup: false,
                    defaultValue: ENABLED,
                    label: _("Repress tokens to thrones"),
                    type: "select",
                    options: [
                        {
                            label: _("Enabled"),
                            value: ENABLED,
                        },
                        {
                            label: _("Disabled (repress to empire squares)"),
                            value: DISABLED,
                        },
                    ],
                },
                _c[CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY] = {
                    id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
                    onChangeInSetup: false,
                    defaultValue: DISABLED,
                    label: _("Confirm end of turn and player switch only"),
                    type: "select",
                    options: [
                        {
                            label: _("Enabled"),
                            value: ENABLED,
                        },
                        {
                            label: _("Disabled (confirm every move)"),
                            value: DISABLED,
                        },
                    ],
                },
                _c[PREF_SHOW_ANIMATIONS] = {
                    id: PREF_SHOW_ANIMATIONS,
                    onChangeInSetup: false,
                    defaultValue: ENABLED,
                    label: _("Show animations"),
                    type: "select",
                    options: [
                        {
                            label: _("Enabled"),
                            value: ENABLED,
                        },
                        {
                            label: _("Disabled"),
                            value: DISABLED,
                        },
                    ],
                },
                _c[PREF_ANIMATION_SPEED] = {
                    id: PREF_ANIMATION_SPEED,
                    onChangeInSetup: false,
                    label: _("Animation speed"),
                    defaultValue: 1600,
                    visibleCondition: {
                        id: PREF_SHOW_ANIMATIONS,
                        values: [ENABLED],
                    },
                    sliderConfig: {
                        step: 100,
                        padding: 0,
                        range: {
                            min: 100,
                            max: 2000,
                        },
                    },
                    type: "slider",
                },
                _c[PREF_SHOW_ACTION_BUTTONS] = {
                    id: PREF_SHOW_ACTION_BUTTONS,
                    onChangeInSetup: false,
                    defaultValue: ENABLED,
                    label: _("Also show button for clickable action"),
                    type: "select",
                    options: [
                        {
                            label: _("Enabled"),
                            value: ENABLED,
                        },
                        {
                            label: _("Disabled (Sell button only)"),
                            value: DISABLED,
                        },
                    ],
                },
                _c),
        },
    });
};
var Settings = (function () {
    function Settings(game) {
        this.settings = {};
        this.selectedTab = "layout";
        this.tabs = [
            {
                id: "layout",
                name: _("Layout"),
            },
            {
                id: "tableau",
                name: _("Player Tableau"),
            },
            {
                id: "gameplay",
                name: _("Gameplay"),
            },
        ];
        this.game = game;
        var gamedatas = game.gamedatas;
        this.setup({ gamedatas: gamedatas });
    }
    Settings.prototype.clearInterface = function () { };
    Settings.prototype.updateInterface = function (_a) {
        var gamedatas = _a.gamedatas;
    };
    Settings.prototype.addButton = function (_a) {
        var gamedatas = _a.gamedatas;
        var configPanel = document.getElementById("pr_info_panel");
        if (configPanel) {
            configPanel.insertAdjacentHTML("beforeend", tplSettingsButton());
        }
    };
    Settings.prototype.setupModal = function (_a) {
        var gamedatas = _a.gamedatas;
        this.modal = new Modal("settings_modal", {
            class: "pr_settings_modal",
            closeIcon: "fa-times",
            titleTpl: '<h2 id="popin_${id}_title" class="${class}_title">${title}</h2>',
            title: _("Settings"),
            contents: tplSettingsModalContent({
                tabs: this.tabs,
            }),
            closeAction: "hide",
            verticalAlign: "flex-start",
            breakpoint: 740,
        });
    };
    Settings.prototype.setup = function (_a) {
        var _this = this;
        var gamedatas = _a.gamedatas;
        this.addButton({ gamedatas: gamedatas });
        this.setupModal({ gamedatas: gamedatas });
        this.setupModalContent();
        this.changeTab({ id: this.selectedTab });
        dojo.connect($("pr_show_settings"), "onclick", function () { return _this.open(); });
        this.tabs.forEach(function (_a) {
            var id = _a.id;
            dojo.connect($("pr_settings_modal_tab_".concat(id)), "onclick", function () {
                return _this.changeTab({ id: id });
            });
        });
    };
    Settings.prototype.setupModalContent = function () {
        var _this = this;
        var config = getSettingsConfig();
        var node = document.getElementById("setting_modal_content");
        if (!node) {
            return;
        }
        Object.entries(config).forEach(function (_a) {
            var tabId = _a[0], tabConfig = _a[1];
            node.insertAdjacentHTML("beforeend", tplSettingsModalTabContent({ id: tabId }));
            var tabContentNode = document.getElementById("pr_settings_modal_tab_content_".concat(tabId));
            if (!tabContentNode) {
                return;
            }
            Object.values(tabConfig.config).forEach(function (setting) {
                var id = setting.id, type = setting.type, defaultValue = setting.defaultValue, visibleCondition = setting.visibleCondition;
                var localValue = localStorage.getItem(_this.getLocalStorageKey({ id: id }));
                _this.settings[id] = localValue || defaultValue;
                var methodName = _this.getMethodName({ id: id });
                if (setting.onChangeInSetup && localValue && _this[methodName]) {
                    _this[methodName](localValue);
                }
                if (setting.type === "select") {
                    var visible = !visibleCondition ||
                        (visibleCondition &&
                            visibleCondition.values.includes(_this.settings[visibleCondition.id]));
                    tabContentNode.insertAdjacentHTML("beforeend", tplPlayerPrefenceSelectRow({
                        setting: setting,
                        currentValue: _this.settings[setting.id],
                        visible: visible,
                    }));
                    var controlId_1 = "setting_".concat(setting.id);
                    $(controlId_1).addEventListener("change", function () {
                        var value = $(controlId_1).value;
                        _this.changeSetting({ id: setting.id, value: value });
                    });
                }
                else if (setting.type === "slider") {
                    var visible = !visibleCondition ||
                        (visibleCondition &&
                            visibleCondition.values.includes(_this.settings[visibleCondition.id]));
                    tabContentNode.insertAdjacentHTML("beforeend", tplPlayerPrefenceSliderRow({
                        id: setting.id,
                        label: setting.label,
                        visible: visible,
                    }));
                    var sliderConfig = __assign(__assign({}, setting.sliderConfig), { start: _this.settings[setting.id] });
                    noUiSlider.create($("setting_" + setting.id), sliderConfig);
                    $("setting_" + setting.id).noUiSlider.on("slide", function (arg) {
                        return _this.changeSetting({ id: setting.id, value: arg[0] });
                    });
                }
            });
        });
    };
    Settings.prototype.changeSetting = function (_a) {
        var id = _a.id, value = _a.value;
        var suffix = this.getSuffix({ id: id });
        this.settings[id] = value;
        localStorage.setItem(this.getLocalStorageKey({ id: id }), value);
        var methodName = this.getMethodName({ id: id });
        if (this[methodName]) {
            this[methodName](value);
        }
    };
    Settings.prototype.onChangeBackgroundImageSetting = function (value) {
        document.documentElement.setAttribute("data-background-pref", value);
    };
    Settings.prototype.onChangeTwoColumnsLayoutSetting = function (value) {
        this.checkColumnSizesVisisble();
        var node = document.getElementById("pr_play_area_container");
        if (node) {
            node.setAttribute("data-two-columns", value);
        }
        this.game.updateLayout();
    };
    Settings.prototype.onChangeColumnSizesSetting = function (value) {
        this.game.updateLayout();
    };
    Settings.prototype.onChangeCardSizeInLogSetting = function (value) {
        var ROOT = document.documentElement;
        ROOT.style.setProperty("--paxRenLogCardScale", "".concat(Number(value) / 100));
    };
    Settings.prototype.onChangeCardSizeInTableauSetting = function (value) {
        var node = document.getElementById("pr_player_tableaux");
        if (node) {
            node.style.setProperty("--paxRenCardInTableauScale", "".concat(Number(value) / 100));
        }
    };
    Settings.prototype.onChangeRepressTokensToThronesSetting = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var animations;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        animations = [];
                        Object.values(THRONES_CONFIG).forEach(function (_a) {
                            var empireSquareId = _a.empireSquareId;
                            var originNode = value === ENABLED
                                ? document.getElementById("".concat(empireSquareId, "_tokens"))
                                : document.getElementById("".concat(empireSquareId, "_throne_tokens"));
                            var destinationNode = value === ENABLED
                                ? document.getElementById("".concat(empireSquareId, "_throne_tokens"))
                                : document.getElementById("".concat(empireSquareId, "_tokens"));
                            if (!(originNode && destinationNode)) {
                                return;
                            }
                            var ids = [];
                            originNode.childNodes.forEach(function (element) {
                                if (element.id.startsWith("bishop")) {
                                    return;
                                }
                                ids.push(element.id);
                            });
                            ids.forEach(function (id) {
                                var element = document.getElementById(id);
                                animations.push(_this.game.animationManager.attachWithAnimation(new BgaSlideAnimation({ element: element }), destinationNode));
                            });
                        });
                        return [4, Promise.all(animations)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Settings.prototype.onChangeCardsInTableauOverlapSetting = function (value) {
        this.checkEmpireSquaresOverlapVisible();
        var elements = document.getElementsByClassName("pr_player_board_tableau_cards");
        for (var i = 0; i < elements.length; i++) {
            var element = elements.item(i);
            element.setAttribute("data-overlap", value);
        }
        var containerElements = document.getElementsByClassName("pr_player_tableau_cards_container");
        for (var i = 0; i < containerElements.length; i++) {
            var element = containerElements.item(i);
            element.setAttribute("data-overlap", value);
        }
    };
    Settings.prototype.onChangeOverlapEmpireSquaresSetting = function (value) {
        var elements = document.getElementsByClassName("pr_player_board_tableau_cards");
        for (var i = 0; i < elements.length; i++) {
            var element = elements.item(i);
            element.setAttribute("data-overlap-empire-squares", value);
        }
    };
    Settings.prototype.onChangeAnimationSpeedSetting = function (value) {
        var duration = 2100 - value;
        debug("onChangeAnimationSpeedSetting", duration);
        this.game.animationManager.getSettings().duration = duration;
    };
    Settings.prototype.onChangeShowAnimationsSetting = function (value) {
        if (value === ENABLED) {
            this.game.animationManager.getSettings().duration = Number(this.settings[PREF_ANIMATION_SPEED]);
        }
        else {
            this.game.animationManager.getSettings().duration = 0;
        }
        this.checkAnmimationSpeedVisisble();
    };
    Settings.prototype.onChangeCardInfoInTooltipSetting = function (value) {
        this.game.market.updateMarketCardTooltips();
        this.game.playerManager.updateCardTooltips();
        this.game.tableauCardManager.updateCardTooltips();
        this.game.victoryCardManager.updateCardTooltips();
        this.game.updateLogTooltips();
    };
    Settings.prototype.onChangeFlorinCardCountersTableauSetting = function (value) {
        var elements = document.getElementsByClassName("pr_player_tableau_title");
        for (var i = 0; i < elements.length; i++) {
            var element = elements.item(i);
            element.setAttribute("data-show-counters", value);
        }
    };
    Settings.prototype.onChangeShowActionButtonsSetting = function (value) {
        if (this.game.gamedatas.gamestate.name === "playerAction") {
            this.game.activeStates.playerAction.updateInterfaceInitialStep();
        }
    };
    Settings.prototype.changeTab = function (_a) {
        var id = _a.id;
        var currentTab = document.getElementById("pr_settings_modal_tab_".concat(this.selectedTab));
        var currentTabContent = document.getElementById("pr_settings_modal_tab_content_".concat(this.selectedTab));
        currentTab.removeAttribute("data-state");
        if (currentTabContent) {
            currentTabContent.style.display = "none";
        }
        this.selectedTab = id;
        var tab = document.getElementById("pr_settings_modal_tab_".concat(id));
        var tabContent = document.getElementById("pr_settings_modal_tab_content_".concat(this.selectedTab));
        tab.setAttribute("data-state", "selected");
        if (tabContent) {
            tabContent.style.display = "";
        }
    };
    Settings.prototype.checkAnmimationSpeedVisisble = function () {
        var sliderNode = document.getElementById("setting_row_animationSpeed");
        if (!sliderNode) {
            return;
        }
        if (this.settings[PREF_SHOW_ANIMATIONS] === ENABLED) {
            sliderNode.style.display = "";
        }
        else {
            sliderNode.style.display = "none";
        }
    };
    Settings.prototype.checkColumnSizesVisisble = function () {
        var sliderNode = document.getElementById("setting_row_columnSizes");
        if (!sliderNode) {
            return;
        }
        if (this.settings["twoColumnsLayout"] === ENABLED) {
            sliderNode.style.display = "";
        }
        else {
            sliderNode.style.display = "none";
        }
    };
    Settings.prototype.checkEmpireSquaresOverlapVisible = function () {
        var node = document.getElementById("setting_row_".concat(OVERLAP_EMPIRE_SQUARES));
        if (!node) {
            return;
        }
        if (this.settings[CARDS_IN_TABLEAU_OVERLAP] === ENABLED) {
            node.style.display = "";
        }
        else {
            node.style.display = "none";
        }
    };
    Settings.prototype.getMethodName = function (_a) {
        var id = _a.id;
        return "onChange".concat(this.getSuffix({ id: id }), "Setting");
    };
    Settings.prototype.get = function (_a) {
        var id = _a.id;
        return this.settings[id] || null;
    };
    Settings.prototype.getSuffix = function (_a) {
        var id = _a.id;
        return id.charAt(0).toUpperCase() + id.slice(1);
    };
    Settings.prototype.getLocalStorageKey = function (_a) {
        var id = _a.id;
        return "".concat(this.game.framework().game_name, "-").concat(this.getSuffix({ id: id }));
    };
    Settings.prototype.open = function () {
        this.modal.show();
    };
    return Settings;
}());
var tplSettingsButton = function () {
    return "<div id=\"pr_show_settings\">\n  <svg  xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 512\">\n    <g>\n      <path class=\"fa-secondary\" fill=\"currentColor\" d=\"M638.41 387a12.34 12.34 0 0 0-12.2-10.3h-16.5a86.33 86.33 0 0 0-15.9-27.4L602 335a12.42 12.42 0 0 0-2.8-15.7 110.5 110.5 0 0 0-32.1-18.6 12.36 12.36 0 0 0-15.1 5.4l-8.2 14.3a88.86 88.86 0 0 0-31.7 0l-8.2-14.3a12.36 12.36 0 0 0-15.1-5.4 111.83 111.83 0 0 0-32.1 18.6 12.3 12.3 0 0 0-2.8 15.7l8.2 14.3a86.33 86.33 0 0 0-15.9 27.4h-16.5a12.43 12.43 0 0 0-12.2 10.4 112.66 112.66 0 0 0 0 37.1 12.34 12.34 0 0 0 12.2 10.3h16.5a86.33 86.33 0 0 0 15.9 27.4l-8.2 14.3a12.42 12.42 0 0 0 2.8 15.7 110.5 110.5 0 0 0 32.1 18.6 12.36 12.36 0 0 0 15.1-5.4l8.2-14.3a88.86 88.86 0 0 0 31.7 0l8.2 14.3a12.36 12.36 0 0 0 15.1 5.4 111.83 111.83 0 0 0 32.1-18.6 12.3 12.3 0 0 0 2.8-15.7l-8.2-14.3a86.33 86.33 0 0 0 15.9-27.4h16.5a12.43 12.43 0 0 0 12.2-10.4 112.66 112.66 0 0 0 .01-37.1zm-136.8 44.9c-29.6-38.5 14.3-82.4 52.8-52.8 29.59 38.49-14.3 82.39-52.8 52.79zm136.8-343.8a12.34 12.34 0 0 0-12.2-10.3h-16.5a86.33 86.33 0 0 0-15.9-27.4l8.2-14.3a12.42 12.42 0 0 0-2.8-15.7 110.5 110.5 0 0 0-32.1-18.6A12.36 12.36 0 0 0 552 7.19l-8.2 14.3a88.86 88.86 0 0 0-31.7 0l-8.2-14.3a12.36 12.36 0 0 0-15.1-5.4 111.83 111.83 0 0 0-32.1 18.6 12.3 12.3 0 0 0-2.8 15.7l8.2 14.3a86.33 86.33 0 0 0-15.9 27.4h-16.5a12.43 12.43 0 0 0-12.2 10.4 112.66 112.66 0 0 0 0 37.1 12.34 12.34 0 0 0 12.2 10.3h16.5a86.33 86.33 0 0 0 15.9 27.4l-8.2 14.3a12.42 12.42 0 0 0 2.8 15.7 110.5 110.5 0 0 0 32.1 18.6 12.36 12.36 0 0 0 15.1-5.4l8.2-14.3a88.86 88.86 0 0 0 31.7 0l8.2 14.3a12.36 12.36 0 0 0 15.1 5.4 111.83 111.83 0 0 0 32.1-18.6 12.3 12.3 0 0 0 2.8-15.7l-8.2-14.3a86.33 86.33 0 0 0 15.9-27.4h16.5a12.43 12.43 0 0 0 12.2-10.4 112.66 112.66 0 0 0 .01-37.1zm-136.8 45c-29.6-38.5 14.3-82.5 52.8-52.8 29.59 38.49-14.3 82.39-52.8 52.79z\" opacity=\"0.4\"></path>\n      <path class=\"fa-primary\" fill=\"currentColor\" d=\"M420 303.79L386.31 287a173.78 173.78 0 0 0 0-63.5l33.7-16.8c10.1-5.9 14-18.2 10-29.1-8.9-24.2-25.9-46.4-42.1-65.8a23.93 23.93 0 0 0-30.3-5.3l-29.1 16.8a173.66 173.66 0 0 0-54.9-31.7V58a24 24 0 0 0-20-23.6 228.06 228.06 0 0 0-76 .1A23.82 23.82 0 0 0 158 58v33.7a171.78 171.78 0 0 0-54.9 31.7L74 106.59a23.91 23.91 0 0 0-30.3 5.3c-16.2 19.4-33.3 41.6-42.2 65.8a23.84 23.84 0 0 0 10.5 29l33.3 16.9a173.24 173.24 0 0 0 0 63.4L12 303.79a24.13 24.13 0 0 0-10.5 29.1c8.9 24.1 26 46.3 42.2 65.7a23.93 23.93 0 0 0 30.3 5.3l29.1-16.7a173.66 173.66 0 0 0 54.9 31.7v33.6a24 24 0 0 0 20 23.6 224.88 224.88 0 0 0 75.9 0 23.93 23.93 0 0 0 19.7-23.6v-33.6a171.78 171.78 0 0 0 54.9-31.7l29.1 16.8a23.91 23.91 0 0 0 30.3-5.3c16.2-19.4 33.7-41.6 42.6-65.8a24 24 0 0 0-10.5-29.1zm-151.3 4.3c-77 59.2-164.9-28.7-105.7-105.7 77-59.2 164.91 28.7 105.71 105.7z\"></path>\n    </g>\n  </svg>\n</div>";
};
var tplPlayerPrefenceSelectRow = function (_a) {
    var setting = _a.setting, currentValue = _a.currentValue, _b = _a.visible, visible = _b === void 0 ? true : _b;
    var values = setting.options
        .map(function (option) {
        return "<option value='".concat(option.value, "' ").concat(option.value === currentValue ? 'selected="selected"' : "", ">").concat(_(option.label), "</option>");
    })
        .join("");
    return "\n    <div id=\"setting_row_".concat(setting.id, "\" class=\"player_preference_row\"").concat(!visible ? " style=\"display: none;\"" : '', ">\n      <div class=\"player_preference_row_label\">").concat(_(setting.label), "</div>\n      <div class=\"player_preference_row_value\">\n        <select id=\"setting_").concat(setting.id, "\" class=\"\" style=\"display: block;\">\n        ").concat(values, "\n        </select>\n      </div>\n    </div>\n  ");
};
var tplSettingsModalTabContent = function (_a) {
    var id = _a.id;
    return "\n  <div id=\"pr_settings_modal_tab_content_".concat(id, "\" style=\"display: none;\"></div>");
};
var tplSettingsModalTab = function (_a) {
    var id = _a.id, name = _a.name;
    return "\n  <div id=\"pr_settings_modal_tab_".concat(id, "\" class=\"pr_settings_modal_tab\">\n    <span>").concat(_(name), "</span>\n  </div>");
};
var tplSettingsModalContent = function (_a) {
    var tabs = _a.tabs;
    return "<div id=\"setting_modal_content\">\n    <div class=\"pr_settings_modal_tabs\">\n  ".concat(tabs
        .map(function (_a) {
        var id = _a.id, name = _a.name;
        return tplSettingsModalTab({ id: id, name: name });
    })
        .join(""), "\n    </div>\n  </div>");
};
var tplPlayerPrefenceSliderRow = function (_a) {
    var label = _a.label, id = _a.id, _b = _a.visible, visible = _b === void 0 ? true : _b;
    return "\n  <div id=\"setting_row_".concat(id, "\" class=\"player_preference_row\"").concat(!visible ? " style=\"display: none;\"" : '', ">\n    <div class=\"player_preference_row_label\">").concat(_(label), "</div>\n    <div class=\"player_preference_row_value slider\">\n      <div id=\"setting_").concat(id, "\"></div>\n    </div>\n  </div>\n  ");
};
var TokenCounter = (function () {
    function TokenCounter() {
        this.counter = new ebg.counter();
    }
    TokenCounter.prototype.setup = function (_a) {
        var separator = _a.separator, type = _a.type, value = _a.value;
        var supplyContainer = document.getElementById('pr_supply_counters');
        if (!supplyContainer) {
            return;
        }
        supplyContainer.insertAdjacentHTML('beforeend', tplTokenCounter({ id: "".concat(type, "_").concat(separator, "_supply"), separator: separator, type: type }));
        this.counter.create("".concat(type, "_").concat(separator, "_supply_counter"));
        this.counter.setValue(value);
    };
    TokenCounter.prototype.incValue = function (value) {
        this.counter.incValue(value);
    };
    TokenCounter.prototype.setValue = function (value) {
        this.counter.setValue(value);
    };
    return TokenCounter;
}());
var Supply = (function () {
    function Supply(game) {
        var _a, _b, _c, _d;
        this.tokenCounters = (_a = {},
            _a[CATHOLIC] = (_b = {},
                _b[BISHOP] = new TokenCounter(),
                _b[KNIGHT] = new TokenCounter(),
                _b[PIRATE] = new TokenCounter(),
                _b[ROOK] = new TokenCounter(),
                _b),
            _a[ISLAMIC] = (_c = {},
                _c[BISHOP] = new TokenCounter(),
                _c[KNIGHT] = new TokenCounter(),
                _c[PIRATE] = new TokenCounter(),
                _c[ROOK] = new TokenCounter(),
                _c),
            _a[REFORMIST] = (_d = {},
                _d[BISHOP] = new TokenCounter(),
                _d[KNIGHT] = new TokenCounter(),
                _d[PIRATE] = new TokenCounter(),
                _d[ROOK] = new TokenCounter(),
                _d),
            _a.banks = {},
            _a);
        this.game = game;
        var gamedatas = game.gamedatas;
        this.setupTokenCounters({ gamedatas: gamedatas });
    }
    Supply.prototype.updateInterdace = function (_a) {
        var _this = this;
        var gamedatas = _a.gamedatas;
        [BISHOP, KNIGHT, ROOK, PIRATE].forEach(function (type) {
            RELIGIONS.forEach(function (religion) {
                var counter = _this.tokenCounters[religion][type];
                counter.setValue(gamedatas.tokens.supply[religion][type]);
            });
        });
        var entries = Object.entries(gamedatas.tokens.supply.banks);
        entries.forEach(function (_a) {
            var bank = _a[0], count = _a[1];
            var counter = _this.tokenCounters.banks[bank];
            counter.setValue(count);
        });
    };
    Supply.prototype.setupTokenCounters = function (_a) {
        var _this = this;
        var gamedatas = _a.gamedatas;
        [BISHOP, KNIGHT, ROOK, PIRATE].forEach(function (type) {
            RELIGIONS.forEach(function (religion) {
                var counter = _this.tokenCounters[religion][type];
                counter.setup({
                    separator: religion,
                    type: type,
                    value: gamedatas.tokens.supply[religion][type],
                });
            });
        });
        var entries = Object.entries(gamedatas.tokens.supply.banks);
        entries.forEach(function (_a) {
            var bank = _a[0], count = _a[1];
            _this.tokenCounters.banks[bank] = new TokenCounter();
            var counter = _this.tokenCounters.banks[bank];
            counter.setup({ separator: bank, type: PAWN, value: count });
        });
    };
    Supply.prototype.incValue = function (_a) {
        var _b, _c, _d, _e;
        var bank = _a.bank, religion = _a.religion, type = _a.type, value = _a.value;
        var counter = null;
        if (type === PAWN) {
            counter = (_c = (_b = this.tokenCounters) === null || _b === void 0 ? void 0 : _b.banks) === null || _c === void 0 ? void 0 : _c[bank];
        }
        else {
            counter = (_e = (_d = this.tokenCounters) === null || _d === void 0 ? void 0 : _d[religion]) === null || _e === void 0 ? void 0 : _e[type];
        }
        if (!counter) {
            return;
        }
        counter.incValue(value);
    };
    return Supply;
}());
var SUPPLY_TOKENS_CONFIG = [
    {
        type: BISHOP,
        religion: CATHOLIC,
    },
    {
        type: BISHOP,
        religion: ISLAMIC,
    },
    {
        type: BISHOP,
        religion: REFORMIST,
    },
    {
        type: KNIGHT,
        religion: CATHOLIC,
    },
    {
        type: KNIGHT,
        religion: ISLAMIC,
    },
    {
        type: KNIGHT,
        religion: REFORMIST,
    },
    {
        type: ROOK,
        religion: CATHOLIC,
    },
    {
        type: ROOK,
        religion: ISLAMIC,
    },
    {
        type: ROOK,
        religion: REFORMIST,
    },
];
var tplTokenCounter = function (_a) {
    var id = _a.id, separator = _a.separator, type = _a.type;
    return "\n    <div class=\"pr_token_counter_container\" data-token-type=\"".concat(type, "\">\n      <div class=\"pr_token_counter_token\">\n        ").concat(tplToken({ id: id, type: type, separator: separator }), "\n      </div>\n      <span id=\"").concat(id, "_counter\" ></span>\n    </div>");
};
var tplGameMapSupply = function (_a) {
    var title = _a.title;
    return "\n    <div id=\"pr_supply\">\n      <span>".concat(title, "</span>\n      <div id=\"pr_supply_counters\">\n\n      </div>\n    </div>\n  ");
};
var AbilityActionSelectApostasyState = (function () {
    function AbilityActionSelectApostasyState(game) {
        var _a;
        this.apostasyTextMap = (_a = {},
            _a[APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT] = _("Islamic-Catholic"),
            _a[APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT] = _("Reformist-Catholic"),
            _a[APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT] = _("Reformist-Islamic"),
            _a);
        this.game = game;
    }
    AbilityActionSelectApostasyState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    AbilityActionSelectApostasyState.prototype.onLeavingState = function () {
        debug("Leaving AbilityActionSelectApostastStateState");
    };
    AbilityActionSelectApostasyState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must choose an apostasy to perform"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    AbilityActionSelectApostasyState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must choose an apostasy to perform"),
            args: {
                you: "${you}",
            },
        });
        this.addButtons();
        this.game.addUndoButtons(this.args);
    };
    AbilityActionSelectApostasyState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var apostasy = _a.apostasy;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("Perform ${tkn_oneShot} apostasy?"),
            args: {
                tkn_oneShot: apostasy,
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actAbilityActionSelectApostasy",
                args: {
                    apostasy: apostasy,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    AbilityActionSelectApostasyState.prototype.addButtons = function () {
        var _this = this;
        this.args.options.forEach(function (apostasy, index) {
            _this.game.addPrimaryActionButton({
                id: "apostasy_btn_".concat(index),
                text: _this.apostasyTextMap[apostasy],
                callback: function () { return _this.updateInterfaceConfirm({ apostasy: apostasy }); },
            });
        });
    };
    return AbilityActionSelectApostasyState;
}());
var AbilityActionSelectTradeFairState = (function () {
    function AbilityActionSelectTradeFairState(game) {
        this.game = game;
    }
    AbilityActionSelectTradeFairState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    AbilityActionSelectTradeFairState.prototype.onLeavingState = function () {
        debug("Leaving AbilityActionSelectTradeFairState");
    };
    AbilityActionSelectTradeFairState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must select a trade fair to perform"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    AbilityActionSelectTradeFairState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a trade fair to perform"),
            args: {
                you: "${you}",
            },
        });
        this.setTradeFairSelectable();
        this.game.addUndoButtons(this.args);
    };
    AbilityActionSelectTradeFairState.prototype.setTradeFairSelectable = function () {
        var _this = this;
        REGIONS.forEach(function (region) {
            if (!_this.args.tradeFairs[region]) {
                return;
            }
            _this.game.setCardSelectable({
                id: _this.args.tradeFairs[region].card.id,
                callback: function () {
                    return _this.game
                        .framework()
                        .setClientState(CLIENT_START_TRADE_FAIR_STATE, {
                        args: __assign(__assign({}, _this.args.tradeFairs[region]), { action: "actAbilityActionSelectTradeFair" }),
                    });
                },
            });
        });
    };
    return AbilityActionSelectTradeFairState;
}());
var AbilityOpponentsPurpleOpState = (function () {
    function AbilityOpponentsPurpleOpState(game) {
        this.game = game;
    }
    AbilityOpponentsPurpleOpState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    AbilityOpponentsPurpleOpState.prototype.onLeavingState = function () {
        debug("Leaving AbilityActionSelectApostastStateState");
    };
    AbilityOpponentsPurpleOpState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} may choose a purple Op to perform"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    AbilityOpponentsPurpleOpState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} may select a card to perform a purple Op"),
            args: {
                you: "${you}",
            },
        });
        this.setOperationsSelectable();
        this.game.addUndoButtons(this.args);
    };
    AbilityOpponentsPurpleOpState.prototype.updateInterfaceConfirmOp = function (_a) {
        var _this = this;
        var card = _a.card, operation = _a.operation;
        this.game.clearPossible();
        this.setOpSelected({ card: card, operation: operation });
        this.game.clientUpdatePageTitle({
            text: _("Perform ${tkn_tableauOp} with ${cardName}?"),
            args: {
                tkn_tableauOp: operation.id,
                cardName: _(card.type === EMPIRE_CARD ? card[card.side].name : card.name),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actAbilityOpponentsPurpleOp",
                args: {
                    cardId: card.id,
                    tableauOpId: operation.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    AbilityOpponentsPurpleOpState.prototype.setOperationsSelectable = function () {
        var _this = this;
        Object.entries(this.args.options).forEach(function (_a) {
            var cardId = _a[0], operations = _a[1];
            var card = _this.args.tableauCards.find(function (card) { return card.id === cardId; });
            operations.forEach(function (operation) {
                var operationId = "".concat(card.id, "_").concat(operation.id).concat(card.type === EMPIRE_CARD ? "_".concat(card.side) : "");
                _this.game.setLocationSelectable({
                    id: operationId,
                    callback: function () {
                        _this.updateInterfaceConfirmOp({ card: card, operation: operation });
                    },
                });
            });
        });
    };
    AbilityOpponentsPurpleOpState.prototype.setOpSelected = function (_a) {
        var card = _a.card, operation = _a.operation;
        var operationId = "".concat(card.id, "_").concat(operation.id).concat(card.type === EMPIRE_CARD ? "_".concat(card.side) : "");
        this.game.setLocationSelected({
            id: operationId,
        });
    };
    return AbilityOpponentsPurpleOpState;
}());
var AnnounceOneShotState = (function () {
    function AnnounceOneShotState(game) {
        this.game = game;
    }
    AnnounceOneShotState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    AnnounceOneShotState.prototype.onLeavingState = function () {
        debug("Leaving AnnounceOneShotState");
    };
    AnnounceOneShotState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must decide if One-shot occurs"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    AnnounceOneShotState.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("Perform ${tkn_oneShot} One-shot?"),
            args: {
                tkn_oneShot: this.args.oneShot,
            },
        });
        this.game.addPrimaryActionButton({
            id: "occurs_button",
            text: _("Yes"),
            callback: function () {
                return _this.game.takeAction({
                    action: "actAnnounceOneShot",
                    args: {
                        occurs: true,
                    },
                });
            },
        });
        this.game.addSecondaryActionButton({
            id: "does_not_occur_button",
            text: _("No"),
            callback: function () {
                return _this.game.takeAction({
                    action: "actAnnounceOneShot",
                    args: {
                        occurs: false,
                    },
                });
            },
        });
        this.game.addUndoButtons(this.args);
    };
    return AnnounceOneShotState;
}());
var BattleCasualtiesState = (function () {
    function BattleCasualtiesState(game) {
        this.game = game;
    }
    BattleCasualtiesState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    BattleCasualtiesState.prototype.onLeavingState = function () {
        debug("Leaving BattleLocationState");
    };
    BattleCasualtiesState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must select a Token to eliminate"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    BattleCasualtiesState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a Token to eliminate (${number} remaining)"),
            args: {
                you: "${you}",
                number: this.args.numberToEliminate,
            },
        });
        this.setTokensSelectable();
        this.addAgentButtons();
        this.game.addUndoButtons(this.args);
    };
    BattleCasualtiesState.prototype.updateInterfaceConfirmSelectAgent = function (_a) {
        var _this = this;
        var agent = _a.agent;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("Eliminate ${tkn_mapToken} Agent?"),
            args: {
                tkn_mapToken: this.createAgentMapTokenId(agent),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actBattleCasualties",
                args: {
                    agent: agent,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    BattleCasualtiesState.prototype.updateInterfaceConfirmSelectToken = function (_a) {
        var _this = this;
        var token = _a.token;
        this.game.clearPossible();
        this.game.setTokenSelected({ id: token.id });
        this.game.clientUpdatePageTitle({
            text: _("Eliminate ${tkn_mapToken} on ${locationName}?"),
            args: {
                tkn_mapToken: tknMapToken(token.id),
                locationName: _(token.locationName),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actBattleCasualties",
                args: {
                    tokenId: token.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    BattleCasualtiesState.prototype.addAgentButtons = function () {
        var _this = this;
        var uniqueAgents = getUniqueAgents({ agents: this.args.agents });
        uniqueAgents.forEach(function (agent, index) {
            _this.game.addAgentButton({
                id: "agent_button_".concat(index),
                agent: agent,
                callback: function () { return _this.updateInterfaceConfirmSelectAgent({ agent: agent }); },
            });
        });
    };
    BattleCasualtiesState.prototype.createAgentMapTokenId = function (agent) {
        var id = "";
        if (agent.type === PAWN) {
            var bank = this.game.playerManager
                .getPlayer({ playerId: this.game.getPlayerId() })
                .getBank();
            id = "".concat(bank, "_pawn");
        }
        else {
            id = "".concat(agent.separator, "_").concat(agent.type);
        }
        return id;
    };
    BattleCasualtiesState.prototype.setTokensSelectable = function () {
        var _this = this;
        this.args.tokens.forEach(function (token) {
            _this.game.setTokenSelectable({
                id: token.id,
                callback: function () { return _this.updateInterfaceConfirmSelectToken({ token: token }); },
            });
        });
    };
    return BattleCasualtiesState;
}());
var BattleLocationState = (function () {
    function BattleLocationState(game) {
        this.game = game;
    }
    BattleLocationState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    BattleLocationState.prototype.onLeavingState = function () {
        debug("Leaving BattleLocationState");
    };
    BattleLocationState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must select an Empire to Battle in"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    BattleLocationState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select an Empire to Battle in"),
            args: {
                you: "${you}",
            },
        });
        this.setEmpiresSelectable();
        this.game.addUndoButtons(this.args);
    };
    BattleLocationState.prototype.updateInterfaceConfirmSelectEmpire = function (_a) {
        var _this = this;
        var empire = _a.empire;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: empire.id });
        this.game.clientUpdatePageTitle({
            text: _("Battle in ${empireName}?"),
            args: {
                empireName: _(empire.name),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actBattleLocation",
                args: {
                    empireId: empire.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    BattleLocationState.prototype.setEmpiresSelectable = function () {
        var _this = this;
        this.args.empires.forEach(function (empire) {
            _this.game.setLocationSelectable({
                id: empire.id,
                callback: function () { return _this.updateInterfaceConfirmSelectEmpire({ empire: empire }); },
            });
        });
    };
    return BattleLocationState;
}());
var BattlePlaceAttackersState = (function () {
    function BattlePlaceAttackersState(game) {
        this.game = game;
    }
    BattlePlaceAttackersState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    BattlePlaceAttackersState.prototype.onLeavingState = function () {
        debug("Leaving BattleLocationState");
    };
    BattlePlaceAttackersState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must place surviving attackers"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    BattlePlaceAttackersState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a surviving attacker to place"),
            args: {
                you: "${you}",
            },
        });
        this.setTokensSelectable();
        this.addAgentButtons();
        this.game.addUndoButtons(this.args);
    };
    BattlePlaceAttackersState.prototype.updateInterfaceAgentSelected = function (_a) {
        var _this = this;
        var option = _a.option;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a ${borderOrCity} to place ${tkn_mapToken} onto"),
            args: {
                you: "${you}",
                borderOrCity: option.agent.type === PAWN || option.agent.type === PIRATE
                    ? _("Border")
                    : _("City"),
                tkn_mapToken: this.createMapTokenId({ agent: option.agent }),
            },
        });
        option.locations.forEach(function (location) {
            _this.game.setLocationSelectable({
                id: location.id,
                callback: function () {
                    return _this.updateInterfaceConfirmAgentLocation({
                        agent: option.agent,
                        location: location,
                    });
                },
            });
        });
        this.game.addCancelButton();
    };
    BattlePlaceAttackersState.prototype.updateInterfaceConfirmAgentLocation = function (_a) {
        var _this = this;
        var agent = _a.agent, location = _a.location;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: location.id });
        this.game.clientUpdatePageTitle({
            text: _("Place ${tkn_mapToken} onto ${locationName}?"),
            args: {
                tkn_mapToken: this.createMapTokenId({ agent: agent }),
                locationName: _(location.name),
            },
        });
        var callback = function () {
            _this.game.clearPossible();
            _this.game.takeAction({
                action: "actBattlePlaceAttackers",
                args: {
                    agent: agent,
                    locationId: location.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    BattlePlaceAttackersState.prototype.updateInterfaceTokenSelected = function (_a) {
        var _this = this;
        var option = _a.option;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a ${borderOrCity} to place ${tkn_mapToken} onto"),
            args: {
                you: "${you}",
                borderOrCity: option.token.type === PAWN ? _("Border") : _("City"),
                tkn_mapToken: tknMapToken(option.token.id),
            },
        });
        option.locations.forEach(function (location) {
            _this.game.setLocationSelectable({
                id: location.id,
                callback: function () {
                    return _this.updateInterfaceConfirmTokenLocation({
                        token: option.token,
                        location: location,
                    });
                },
            });
        });
        this.game.addCancelButton();
    };
    BattlePlaceAttackersState.prototype.updateInterfaceConfirmTokenLocation = function (_a) {
        var _this = this;
        var token = _a.token, location = _a.location;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: location.id });
        this.game.setTokenSelected({ id: token.id });
        this.game.clientUpdatePageTitle({
            text: _("Place ${tkn_mapToken} onto ${locationName}?"),
            args: {
                tkn_mapToken: tknMapToken(token.id),
                locationName: _(location.name),
            },
        });
        var callback = function () {
            _this.game.clearPossible();
            _this.game.takeAction({
                action: "actBattlePlaceAttackers",
                args: {
                    tokenId: token.id,
                    locationId: location.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    BattlePlaceAttackersState.prototype.createMapTokenId = function (_a) {
        var agent = _a.agent;
        var id = "";
        if (agent.type === PAWN) {
            var bank = this.game.playerManager
                .getPlayer({ playerId: this.game.getPlayerId() })
                .getBank();
            id = "".concat(bank, "_pawn");
        }
        else {
            id = "".concat(agent.separator, "_").concat(agent.type);
        }
        return id;
    };
    BattlePlaceAttackersState.prototype.addAgentButtons = function () {
        var _this = this;
        var uniqueAgents = getUniqueAgents({
            agents: this.args.options.agents.map(function (option) { return option.agent; }),
        });
        uniqueAgents.forEach(function (agent, index) {
            var option = _this.args.options.agents.find(function (option) {
                return option.agent.separator === agent.separator &&
                    option.agent.type === agent.type;
            });
            if (!option) {
                return;
            }
            _this.game.addAgentButton({
                id: "agent_button_".concat(index),
                agent: option.agent,
                callback: function () { return _this.updateInterfaceAgentSelected({ option: option }); },
            });
        });
    };
    BattlePlaceAttackersState.prototype.setTokensSelectable = function () {
        var _this = this;
        this.args.options.repressedTokens.forEach(function (option) {
            _this.game.setTokenSelectable({
                id: option.token.id,
                callback: function () { return _this.updateInterfaceTokenSelected({ option: option }); },
            });
        });
    };
    return BattlePlaceAttackersState;
}());
var BattleReconfigureConstantinopleState = (function () {
    function BattleReconfigureConstantinopleState(game) {
        var _a;
        this.constantinopleCities = [
            CONSTANTINOPLE_1,
            CONSTANTINOPLE_2,
            CONSTANTINOPLE_3,
        ];
        this.cityConfiguration = (_a = {},
            _a[CONSTANTINOPLE_1] = null,
            _a[CONSTANTINOPLE_2] = null,
            _a[CONSTANTINOPLE_3] = null,
            _a);
        this.game = game;
    }
    BattleReconfigureConstantinopleState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.copyCityConfig();
        this.updateInterfaceInitialStep();
    };
    BattleReconfigureConstantinopleState.prototype.onLeavingState = function () {
        debug("Leaving BattleReconfigureConstantinopleState");
    };
    BattleReconfigureConstantinopleState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} may move Tokens within Constantinople"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    BattleReconfigureConstantinopleState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} may select a Token to move within Constantinople"),
            args: {
                you: "${you}",
            },
        });
        this.setTokensSelectable();
        this.checkConfirmAndResetButton();
        this.game.addPassButton({ optionalAction: this.args.optionalAction });
        this.game.addUndoButtons(this.args);
    };
    BattleReconfigureConstantinopleState.prototype.updateInterfaceSelectPosition = function (_a) {
        var cityId = _a.cityId, token = _a.token;
        this.game.clearPossible();
        this.game.setTokenSelected({ id: token.id });
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a spot to move to or Token to switch with"),
            args: {
                you: "${you}",
            },
        });
        this.setDestinationsSelectable({ cityId: cityId });
        this.addResetButton();
    };
    BattleReconfigureConstantinopleState.prototype.copyCityConfig = function () {
        var _this = this;
        this.constantinopleCities.forEach(function (cityId) {
            _this.cityConfiguration[cityId] = _this.args[cityId];
        });
    };
    BattleReconfigureConstantinopleState.prototype.checkConfirmAndResetButton = function () {
        var _this = this;
        var changes = this.constantinopleCities.some(function (cityId) {
            var _a, _b;
            return ((_a = _this.cityConfiguration[cityId]) === null || _a === void 0 ? void 0 : _a.id) !== ((_b = _this.args[cityId]) === null || _b === void 0 ? void 0 : _b.id);
        });
        if (!changes) {
            return;
        }
        this.game.addConfirmButton({
            callback: function () {
                var _a;
                var _b, _c, _d;
                _this.game.clearPossible();
                _this.game.takeAction({
                    action: "actBattleReconfigureContantinople",
                    args: (_a = {},
                        _a[CONSTANTINOPLE_1] = ((_b = _this.cityConfiguration[CONSTANTINOPLE_1]) === null || _b === void 0 ? void 0 : _b.id) || null,
                        _a[CONSTANTINOPLE_2] = ((_c = _this.cityConfiguration[CONSTANTINOPLE_2]) === null || _c === void 0 ? void 0 : _c.id) || null,
                        _a[CONSTANTINOPLE_3] = ((_d = _this.cityConfiguration[CONSTANTINOPLE_3]) === null || _d === void 0 ? void 0 : _d.id) || null,
                        _a),
                });
            },
        });
        this.addResetButton();
    };
    BattleReconfigureConstantinopleState.prototype.addResetButton = function () {
        var _this = this;
        this.game.addDangerActionButton({
            id: "reset_btn",
            text: _("Reset"),
            callback: function () { return _this.onReset(); },
        });
    };
    BattleReconfigureConstantinopleState.prototype.setTokensSelectable = function () {
        var _this = this;
        this.constantinopleCities.forEach(function (cityId) {
            if (_this.cityConfiguration[cityId] === null) {
                return;
            }
            var token = _this.cityConfiguration[cityId];
            _this.game.setTokenSelectable({
                id: token.id,
                callback: function () { return _this.updateInterfaceSelectPosition({ cityId: cityId, token: token }); },
            });
        });
    };
    BattleReconfigureConstantinopleState.prototype.setDestinationsSelectable = function (_a) {
        var _this = this;
        var activeCityId = _a.cityId;
        this.constantinopleCities.forEach(function (cityId) {
            if (cityId === activeCityId || (!_this.args.canPlaceInConstantinople3 && cityId === CONSTANTINOPLE_3)) {
                return;
            }
            if (_this.cityConfiguration[cityId] === null) {
                _this.game.setLocationSelectable({
                    id: cityId,
                    callback: function () {
                        _this.onMove({ fromCityId: activeCityId, toCityId: cityId });
                    },
                });
            }
            else {
                _this.game.setTokenSelectable({
                    id: _this.cityConfiguration[cityId].id,
                    callback: function () {
                        _this.onMove({ fromCityId: activeCityId, toCityId: cityId });
                    },
                });
            }
        });
    };
    BattleReconfigureConstantinopleState.prototype.onMove = function (_a) {
        var fromCityId = _a.fromCityId, toCityId = _a.toCityId;
        return __awaiter(this, void 0, void 0, function () {
            var fromCityNode, toCityNode, selectedToken, targetToken, switchTokenNode, animations, tokenNode;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fromCityNode = document.getElementById("pr_".concat(fromCityId));
                        toCityNode = document.getElementById("pr_".concat(toCityId));
                        selectedToken = this.cityConfiguration[fromCityId];
                        targetToken = this.cityConfiguration[toCityId];
                        if (!(fromCityNode && toCityNode)) {
                            return [2];
                        }
                        switchTokenNode = targetToken === null ? null : document.getElementById(targetToken.id);
                        animations = [];
                        if (switchTokenNode) {
                            animations.push(this.game.animationManager.attachWithAnimation(new BgaSlideAnimation({ element: switchTokenNode }), fromCityNode));
                        }
                        tokenNode = document.getElementById(selectedToken.id);
                        animations.push(this.game.animationManager.attachWithAnimation(new BgaSlideAnimation({ element: tokenNode }), toCityNode));
                        return [4, Promise.all(animations)];
                    case 1:
                        _b.sent();
                        this.cityConfiguration[fromCityId] = targetToken;
                        this.cityConfiguration[toCityId] = selectedToken;
                        this.updateInterfaceInitialStep();
                        return [2];
                }
            });
        });
    };
    BattleReconfigureConstantinopleState.prototype.onReset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var animations;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.copyCityConfig();
                        animations = [];
                        this.constantinopleCities.forEach(function (cityId) {
                            var token = _this.cityConfiguration[cityId];
                            if (token === null) {
                                return;
                            }
                            var tokenNode = document.getElementById(token.id);
                            var cityNode = document.getElementById("pr_".concat(cityId));
                            animations.push(_this.game.animationManager.attachWithAnimation(new BgaSlideAnimation({ element: tokenNode }), cityNode));
                        });
                        return [4, Promise.all(animations)];
                    case 1:
                        _a.sent();
                        this.updateInterfaceInitialStep();
                        return [2];
                }
            });
        });
    };
    return BattleReconfigureConstantinopleState;
}());
var BishopPacificationState = (function () {
    function BishopPacificationState(game) {
        this.game = game;
    }
    BishopPacificationState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    BishopPacificationState.prototype.onLeavingState = function () {
        debug("Leaving BishopPacificationState");
    };
    BishopPacificationState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} may select a Token to Kill"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    BishopPacificationState.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} may choose a Token to Kill"),
            args: {
                you: "${you}",
            },
        });
        this.game.addSecondaryActionButton({
            id: "skip_button",
            text: _("Skip"),
            callback: function () {
                return _this.game.takeAction({
                    action: "actBishopPacification",
                    args: {
                        tokenId: null,
                    },
                });
            },
        });
        this.setTokensSelectable();
        this.game.addUndoButtons(this.args);
    };
    BishopPacificationState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var token = _a.token;
        this.game.clearPossible();
        this.game.setTokenSelected({ id: token.id });
        this.game.clientUpdatePageTitle({
            text: _("Kill ${tkn_mapToken} ?"),
            args: {
                tkn_mapToken: tknMapToken(token.id),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actBishopPacification",
                args: {
                    tokenId: token.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    BishopPacificationState.prototype.setTokensSelectable = function () {
        var _this = this;
        this.args.tokens.forEach(function (token) {
            _this.game.setTokenSelectable({
                id: token.id,
                callback: function () { return _this.updateInterfaceConfirm({ token: token }); },
            });
        });
    };
    return BishopPacificationState;
}());
var CoronationState = (function () {
    function CoronationState(game) {
        this.game = game;
    }
    CoronationState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    CoronationState.prototype.onLeavingState = function () {
        debug("Leaving FlipVictoryCardState");
    };
    CoronationState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must select a King to marry"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    CoronationState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a King to marry"),
            args: {
                you: "${you}",
            },
        });
        this.setCardsSelectable();
        this.game.addUndoButtons(this.args);
    };
    CoronationState.prototype.updateInterfaceConfirmSelectCard = function (_a) {
        var _this = this;
        var card = _a.card;
        this.game.clearPossible();
        this.game.setCardSelected({ id: card.id });
        this.game.clientUpdatePageTitle({
            text: _("Marry ${queenName} to ${kingName}?"),
            args: {
                kingName: _(card[card.side].name),
                queenName: _(this.args.queen.name),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actCoronationOneShot",
                args: {
                    cardId: card.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    CoronationState.prototype.setCardsSelectable = function () {
        var _this = this;
        this.args.suitors.forEach(function (card) {
            _this.game.setCardSelectable({
                id: card.id,
                callback: function () { return _this.updateInterfaceConfirmSelectCard({ card: card }); },
            });
        });
    };
    return CoronationState;
}());
var ClientConfirmTableauOpsState = (function () {
    function ClientConfirmTableauOpsState(game) {
        this.game = game;
    }
    ClientConfirmTableauOpsState.prototype.onEnteringState = function (args) {
        this.args = args;
        if (!this.args.availableOps.eastAndWest) {
            this.updateInterfaceConfirm();
        }
        else {
            this.updateInterfaceInitialStep();
        }
    };
    ClientConfirmTableauOpsState.prototype.onLeavingState = function () {
        debug("Leaving ClientConfirmTableauOpsState");
    };
    ClientConfirmTableauOpsState.prototype.setDescription = function (activePlayerId) { };
    ClientConfirmTableauOpsState.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("Perform East and West ops in one action?"),
            args: {},
        });
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actPlayerAction",
                    args: {
                        action: "tableauOps",
                        region: EAST_AND_WEST,
                        firstOp: _this.args.firstOp,
                    },
                });
            },
        });
        this.game.addSecondaryActionButton({
            id: "region_ops_btn",
            text: this.args.region === EAST ? _("East ops only") : _("West ops only"),
            callback: function () {
                return _this.game.takeAction({
                    action: "actPlayerAction",
                    args: {
                        action: "tableauOps",
                        region: _this.args.region,
                        firstOp: _this.args.firstOp,
                    },
                });
            },
        });
        this.game.addCancelButton();
    };
    ClientConfirmTableauOpsState.prototype.updateInterfaceConfirm = function () {
        var _this = this;
        this.game.clearPossible();
        var text = this.args.region === EAST
            ? _("Perform Tableau Ops East?")
            : _("Perform Tableau Ops West?");
        this.game.clientUpdatePageTitle({
            text: text,
            args: {},
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actPlayerAction",
                args: {
                    action: "tableauOps",
                    region: _this.args.region,
                    firstOp: _this.args.firstOp,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    return ClientConfirmTableauOpsState;
}());
var ClientDeclareVictoryState = (function () {
    function ClientDeclareVictoryState(game) {
        this.game = game;
    }
    ClientDeclareVictoryState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    ClientDeclareVictoryState.prototype.onLeavingState = function () {
        debug("Leaving ClientDeclareVictoryState");
    };
    ClientDeclareVictoryState.prototype.setDescription = function (activePlayerId) { };
    ClientDeclareVictoryState.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.game.setCardSelected({ id: this.args.victoryCard.id });
        this.game.clientUpdatePageTitle({
            text: _("Declare ${victoryTitle}?"),
            args: {
                victoryTitle: _(this.args.victoryCard.active.title),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actPlayerAction",
                args: {
                    action: "declareVictory",
                    cardId: _this.args.victoryCard.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    return ClientDeclareVictoryState;
}());
var ClientSellCardState = (function () {
    function ClientSellCardState(game) {
        this.game = game;
    }
    ClientSellCardState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    ClientSellCardState.prototype.onLeavingState = function () {
        debug("Leaving ClientSellCardState");
    };
    ClientSellCardState.prototype.setDescription = function (activePlayerId) { };
    ClientSellCardState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.setCardsSelectable();
        this.setRoyalCouplesSelectable();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a card to sell"),
            args: {
                you: "${you}",
            },
        });
        this.game.addCancelButton();
    };
    ClientSellCardState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var card = _a.card;
        this.game.clearPossible();
        this.game.setCardSelected({ id: card.id });
        this.game.clientUpdatePageTitle({
            text: _("Sell ${cardName} for ${amount} ${tkn_florin} ?"),
            args: {
                cardName: card.type === TABLEAU_CARD ? card.name : card[card.side].name,
                amount: card.sellValue,
                tkn_florin: tknFlorin(),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actPlayerAction",
                args: {
                    action: "sellCard",
                    cardId: card.id,
                    royalCouple: false,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    ClientSellCardState.prototype.updateInterfaceConfirmRoyalCouple = function (_a) {
        var _this = this;
        var king = _a.king, queens = _a.queens;
        this.game.clearPossible();
        this.game.setCardSelected({ id: king.id });
        queens.forEach(function (queen) {
            _this.game.setCardSelected({ id: queen.id });
        });
        this.game.clientUpdatePageTitle({
            text: _("Sell ${queenNames} and ${kingName} for ${amount} ${tkn_florin} ?"),
            args: {
                kingName: king[king.side].name,
                queenNames: this.getQueenNamesLog({ queens: queens }),
                amount: this.getTotalAmount({ king: king, queens: queens }),
                tkn_florin: tknFlorin(),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actPlayerAction",
                args: {
                    action: "sellCard",
                    cardId: king.id,
                    royalCouple: true,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    ClientSellCardState.prototype.getQueenNamesLog = function (_a) {
        var queens = _a.queens;
        var log = "";
        var args = {};
        queens.forEach(function (queen, index) {
            var separator = index === 0 ? "" : ", ";
            var key = "${queenName_" + index + "}";
            log = log + separator + key;
            args["queenName_".concat(index)] = _(queen.name);
        });
        return {
            log: log,
            args: args,
        };
    };
    ClientSellCardState.prototype.getTotalAmount = function (_a) {
        var king = _a.king, queens = _a.queens;
        var total = king.sellValue;
        queens.forEach(function (queen) {
            total = total + queen.sellValue;
        });
        return total;
    };
    ClientSellCardState.prototype.setCardsSelectable = function () {
        var _this = this;
        this.args.cards.forEach(function (card) {
            _this.game.setCardSelectable({
                id: card.id,
                callback: function () { return _this.updateInterfaceConfirm({ card: card }); },
            });
        });
    };
    ClientSellCardState.prototype.setRoyalCouplesSelectable = function () {
        var _this = this;
        this.args.royalCouples.forEach(function (couple) {
            var king = couple.king, queens = couple.queens;
            _this.game.setCardSelectable({
                id: king.id,
                callback: function () { return _this.updateInterfaceConfirmRoyalCouple(couple); },
            });
            queens.forEach(function (queen) {
                return _this.game.setCardSelectable({
                    id: queen.id,
                    callback: function () { return _this.updateInterfaceConfirmRoyalCouple(couple); },
                });
            });
        });
    };
    return ClientSellCardState;
}());
var ClientStartTradeFairState = (function () {
    function ClientStartTradeFairState(game) {
        this.game = game;
    }
    ClientStartTradeFairState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    ClientStartTradeFairState.prototype.onLeavingState = function () {
        debug("Leaving ClientStartTradeFairState");
    };
    ClientStartTradeFairState.prototype.setDescription = function (activePlayerId) { };
    ClientStartTradeFairState.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.game.setCardSelected({ id: this.args.card.id });
        this.game.setLocationSelected({ id: this.args.city.id });
        this.game.clientUpdatePageTitle({
            text: _("Convene ${region} trade fair from ${cityName}?"),
            args: {
                cityName: _(this.args.city.name),
                region: this.args.city.emporium === EAST ? _("East") : _("West"),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: _this.args.action,
                args: {
                    action: "tradeFair",
                    region: _this.args.city.emporium,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    return ClientStartTradeFairState;
}());
var ClientUseAbilityActionState = (function () {
    function ClientUseAbilityActionState(game) {
        this.game = game;
    }
    ClientUseAbilityActionState.prototype.onEnteringState = function (args) {
        this.args = args;
        if (args.selected) {
            this.updateInterfaceConfirm({
                cardId: args.selected.cardId,
                ability: args.selected.abilityAction,
            });
        }
        else if (Object.entries(this.args.abilityActions).length === 1) {
            var _a = Object.entries(this.args.abilityActions)[0], cardId = _a[0], ability = _a[1];
            this.updateInterfaceConfirm({ cardId: cardId, ability: ability });
        }
        else {
            this.updateInterfaceInitialStep();
        }
    };
    ClientUseAbilityActionState.prototype.onLeavingState = function () {
        debug("Leaving ClientUseAbilityActionState");
    };
    ClientUseAbilityActionState.prototype.setDescription = function (activePlayerId) { };
    ClientUseAbilityActionState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select an action"),
            args: {
                you: "${you}",
            },
        });
        this.addActionButtons();
        this.setAbilityActionsSelectable();
        this.game.addCancelButton();
    };
    ClientUseAbilityActionState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var cardId = _a.cardId, ability = _a.ability;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: "".concat(cardId, "_").concat(ability.id) });
        this.game.clientUpdatePageTitle({
            text: _("Perform ${actionTitle} action?"),
            args: {
                actionTitle: _(ability.title).replace(":", ""),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actPlayerAction",
                args: {
                    action: "abilityAction",
                    cardId: cardId,
                    abilityId: ability.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    ClientUseAbilityActionState.prototype.addActionButtons = function () {
        var _this = this;
        Object.entries(this.args.abilityActions).forEach(function (_a, index) {
            var cardId = _a[0], ability = _a[1];
            _this.game.addPrimaryActionButton({
                id: "abiliy_action_".concat(index, "_btn"),
                text: _(ability.title).replace(":", ""),
                callback: function () { return _this.updateInterfaceConfirm({ cardId: cardId, ability: ability }); },
            });
        });
    };
    ClientUseAbilityActionState.prototype.setAbilityActionsSelectable = function () {
        var _this = this;
        Object.entries(this.args.abilityActions).forEach(function (_a) {
            var cardId = _a[0], ability = _a[1];
            _this.game.setLocationSelectable({
                id: "".concat(cardId, "_").concat(ability.id),
                callback: function () { return _this.updateInterfaceConfirm({ cardId: cardId, ability: ability }); },
            });
        });
    };
    return ClientUseAbilityActionState;
}());
var ConfirmPartialTurnState = (function () {
    function ConfirmPartialTurnState(game) {
        this.game = game;
    }
    ConfirmPartialTurnState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    ConfirmPartialTurnState.prototype.onLeavingState = function () {
        debug("Leaving ConfirmTurnState");
    };
    ConfirmPartialTurnState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must confirm the switch of player"),
            args: {
                tkn_playerName: this.game.playerManager.getPlayer({ playerId: activePlayerId }).getName()
            },
            nonActivePlayers: true,
        });
    };
    ConfirmPartialTurnState.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must confirm the switch of player. You will not be able to restart your turn"),
            args: {
                you: '${you}'
            },
        });
        this.game.addConfirmButton({
            callback: function () { return _this.game.takeAction({ action: 'actConfirmPartialTurn' }); }
        });
        this.game.addUndoButtons(this.args);
    };
    return ConfirmPartialTurnState;
}());
var ConfirmTurnState = (function () {
    function ConfirmTurnState(game) {
        this.game = game;
    }
    ConfirmTurnState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    ConfirmTurnState.prototype.onLeavingState = function () {
        debug("Leaving ConfirmTurnState");
    };
    ConfirmTurnState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must confirm or restart their turn"),
            args: {
                tkn_playerName: this.game.playerManager.getPlayer({ playerId: activePlayerId }).getName()
            },
            nonActivePlayers: true,
        });
    };
    ConfirmTurnState.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must confirm or restart your turn"),
            args: {
                you: '${you}'
            },
        });
        this.game.addConfirmButton({
            callback: function () { return _this.game.takeAction({ action: 'actConfirmTurn' }); }
        });
        this.game.addUndoButtons(this.args);
    };
    return ConfirmTurnState;
}());
var DiscardDownToHandLimitState = (function () {
    function DiscardDownToHandLimitState(game) {
        this.game = game;
    }
    DiscardDownToHandLimitState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    DiscardDownToHandLimitState.prototype.onLeavingState = function () {
        debug("Leaving DiscardDownToHandLimitState");
    };
    DiscardDownToHandLimitState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must discard a card form hand"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    DiscardDownToHandLimitState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a card to discard"),
            args: {
                you: "${you}",
            },
        });
        this.setCardsSelectable();
        this.game.addUndoButtons(this.args);
    };
    DiscardDownToHandLimitState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var card = _a.card;
        this.game.clearPossible();
        this.game.setCardSelected({ id: card.id });
        this.game.clientUpdatePageTitle({
            text: _("Discard ${tkn_cardName}?"),
            args: {
                tkn_cardName: card.name,
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actDiscardDownToHandLimit",
                args: {
                    cardId: card.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    DiscardDownToHandLimitState.prototype.setCardsSelectable = function () {
        var _this = this;
        this.args._private.hand.forEach(function (card) {
            _this.game.setCardSelectable({
                id: card.id,
                callback: function () { return _this.updateInterfaceConfirm({ card: card }); },
            });
        });
    };
    return DiscardDownToHandLimitState;
}());
var FlipVictoryCardState = (function () {
    function FlipVictoryCardState(game) {
        this.game = game;
    }
    FlipVictoryCardState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    FlipVictoryCardState.prototype.onLeavingState = function () {
        debug("Leaving FlipVictoryCardState");
    };
    FlipVictoryCardState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must flip an inactive Victory Card"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    FlipVictoryCardState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must flip an inactive Victory Card"),
            args: {
                you: "${you}",
            },
        });
        this.setVictoryCardsSelectable();
        this.game.addUndoButtons(this.args);
    };
    FlipVictoryCardState.prototype.updateInterfaceConfirmSelectCard = function (_a) {
        var _this = this;
        var card = _a.card;
        this.game.clearPossible();
        var node = document.getElementById("".concat(card.id, "-back"));
        if (!node) {
            return;
        }
        node.classList.add(PR_SELECTED);
        this.game.clientUpdatePageTitle({
            text: _("Flip ${titleActive}?"),
            args: {
                titleActive: _(card.active.title),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actFlipVictoryCard",
                args: {
                    cardId: card.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    FlipVictoryCardState.prototype.setVictoryCardsSelectable = function () {
        var _this = this;
        this.args.victoryCards.forEach(function (card) {
            _this.game.setCardSelectable({
                id: card.id,
                callback: function () { return _this.updateInterfaceConfirmSelectCard({ card: card }); },
            });
        });
    };
    return FlipVictoryCardState;
}());
var FreeActionState = (function () {
    function FreeActionState(game) {
        this.game = game;
    }
    FreeActionState.prototype.onEnteringState = function (args) {
        this.args = args;
        if (Object.entries(this.args.freeActions).length === 1) {
            this.updateInterfaceSingleOption();
        }
        else {
            this.updateInterfaceInitialStep();
        }
    };
    FreeActionState.prototype.onLeavingState = function () {
        debug("Leaving FreeActionState");
    };
    FreeActionState.prototype.setDescription = function (activePlayerId) { };
    FreeActionState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.setAbilityActionsSelectable();
        this.game.clientUpdatePageTitle({
            text: _("${you} may perform an action from an ability"),
            args: {
                you: "${you}",
            },
        });
        this.addActionButtons();
        this.game.addPassButton({ optionalAction: this.args.optionalAction });
        this.game.addUndoButtons(this.args);
    };
    FreeActionState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var cardId = _a.cardId, ability = _a.ability;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: "".concat(cardId, "_").concat(ability.id) });
        this.game.clientUpdatePageTitle({
            text: _("Perform ${actionTitle} action?"),
            args: {
                actionTitle: _(ability.title).replace(":", ""),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actFreeAction",
                args: {
                    action: "abilityAction",
                    cardId: cardId,
                    abilityId: ability.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    FreeActionState.prototype.updateInterfaceSingleOption = function () {
        var _this = this;
        this.game.clearPossible();
        var _a = Object.entries(this.args.freeActions)[0], cardId = _a[0], ability = _a[1];
        this.game.setLocationSelected({ id: "".concat(cardId, "_").concat(ability.id) });
        this.game.clientUpdatePageTitle({
            text: _("Perform ${actionTitle} action?"),
            args: {
                actionTitle: _(ability.title).replace(":", ""),
            },
        });
        this.game.addPrimaryActionButton({
            id: "free_action_button",
            text: _("Perform action"),
            callback: function () {
                return _this.game.takeAction({
                    action: "actFreeAction",
                    args: {
                        action: "abilityAction",
                        cardId: cardId,
                        abilityId: ability.id,
                    },
                });
            },
        });
        this.game.addPassButton({
            text: _("Do not perform action"),
            optionalAction: this.args.optionalAction,
        });
        this.game.addUndoButtons(this.args);
    };
    FreeActionState.prototype.addActionButtons = function () {
        var _this = this;
        Object.entries(this.args.freeActions).forEach(function (_a, index) {
            var cardId = _a[0], ability = _a[1];
            _this.game.addPrimaryActionButton({
                id: "abiliy_action_".concat(index, "_btn"),
                text: _(ability.title).replace(":", ""),
                callback: function () { return _this.updateInterfaceConfirm({ cardId: cardId, ability: ability }); },
            });
        });
    };
    FreeActionState.prototype.setAbilityActionsSelectable = function () {
        var _this = this;
        Object.entries(this.args.freeActions).forEach(function (_a) {
            var cardId = _a[0], ability = _a[1];
            _this.game.setLocationSelectable({
                id: "".concat(cardId, "_").concat(ability.id),
                callback: function () { return _this.updateInterfaceConfirm({ cardId: cardId, ability: ability }); },
            });
        });
    };
    return FreeActionState;
}());
var PlaceAgentState = (function () {
    function PlaceAgentState(game) {
        this.selectedAgent = null;
        this.game = game;
    }
    PlaceAgentState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.selectedAgent = null;
        var uniqueAgents = getUniqueAgents({ agents: args.agents });
        if (uniqueAgents.length > 1) {
            this.updateInterfaceSelectAgent({ agents: uniqueAgents });
        }
        else {
            this.updateInterfaceSelectLocation({ agent: uniqueAgents[0] });
        }
    };
    PlaceAgentState.prototype.onLeavingState = function () {
        debug("Leaving PlaceAgentState");
    };
    PlaceAgentState.prototype.setDescription = function (activePlayerId, args) {
        this.args = args;
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} may place Agents"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    PlaceAgentState.prototype.updateInterfaceSelectAgent = function (_a) {
        var agents = _a.agents;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select an Agent to place"),
            args: {
                you: "${you}",
            },
        });
        this.addAgentButtons({ agents: agents });
        this.game.addPassButton({
            optionalAction: this.args.optionalAction,
            text: _("Do not place"),
        });
        this.game.addUndoButtons(this.args);
    };
    PlaceAgentState.prototype.updateInterfaceSelectLocation = function (_a) {
        var agent = _a.agent;
        this.selectedAgent = agent;
        this.game.clearPossible();
        this.updatePageTitle();
        this.setLocationsSelectable();
        this.game.addPassButton({
            optionalAction: this.args.optionalAction,
            text: Object.values(this.args.locations).length > 0 ? _("Do not place") : _("Skip"),
        });
        this.game.addUndoButtons(this.args);
    };
    PlaceAgentState.prototype.updateInterfaceConfirmCard = function (_a) {
        var _this = this;
        var id = _a.id, card = _a.card;
        this.game.clearPossible();
        this.game.setCardSelected({ id: card.id });
        var _b = card;
        this.game.clientUpdatePageTitle({
            text: _("Place ${tkn_mapToken} on ${location}?"),
            args: {
                tkn_mapToken: this.createMapTokenId(),
                location: _(card.type === EMPIRE_CARD ? card[card.side].name : card.name),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actPlaceAgent",
                args: {
                    agent: _this.args.agents[0],
                    locationId: id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    PlaceAgentState.prototype.updateInterfaceSelectEmpireToRepressTo = function (_a) {
        var _this = this;
        var id = _a.id, location = _a.location;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: id });
        this.game.clientUpdatePageTitle({
            text: _("${you} must select an empire to repress ${tkn_mapToken} to"),
            args: {
                you: "${you}",
                tkn_mapToken: tknMapToken(location.tokenToRepress.token.id),
            },
        });
        location.tokenToRepress.empires.forEach(function (empire) {
            _this.game.setLocationSelectable({
                id: empire.id,
                callback: function () {
                    return _this.updateInterfaceConfirmLocation({ id: id, location: location, empire: empire });
                },
            });
        });
    };
    PlaceAgentState.prototype.updateInterfaceConfirmLocation = function (_a) {
        var _this = this;
        var id = _a.id, location = _a.location, empire = _a.empire;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: id });
        if (empire) {
            this.game.setLocationSelected({ id: empire.id });
        }
        this.updatePageTitleConfirmLocation({ location: location, empire: empire });
        var callback = function () {
            return _this.game.takeAction({
                action: "actPlaceAgent",
                args: {
                    agent: _this.selectedAgent,
                    locationId: id,
                    empireId: empire ? empire.id : null,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    PlaceAgentState.prototype.createMapTokenId = function (activePlayerId) {
        var agent = this.selectedAgent;
        var id = "";
        if (agent.type === PAWN) {
            var bank = this.game.playerManager
                .getPlayer({ playerId: activePlayerId || this.game.getPlayerId() })
                .getBank();
            id = "".concat(bank, "_pawn");
        }
        else {
            id = "".concat(agent.separator, "_").concat(agent.type);
        }
        return id;
    };
    PlaceAgentState.prototype.setLocationsSelectable = function () {
        var _this = this;
        Object.entries(this.args.locations).forEach(function (_a) {
            var id = _a[0], location = _a[1];
            if ((location === null || location === void 0 ? void 0 : location.type) === TABLEAU_CARD || (location === null || location === void 0 ? void 0 : location.type) === EMPIRE_CARD) {
                _this.game.setCardSelectable({
                    id: location.id,
                    callback: function () {
                        return _this.updateInterfaceConfirmCard({ id: id, card: location });
                    },
                });
            }
            else {
                _this.game.setLocationSelectable({
                    id: id,
                    callback: function () {
                        var _a;
                        if ((_a = location === null || location === void 0 ? void 0 : location.tokenToRepress) === null || _a === void 0 ? void 0 : _a.empires) {
                            _this.updateInterfaceSelectEmpireToRepressTo({ id: id, location: location });
                        }
                        else {
                            _this.updateInterfaceConfirmLocation({ id: id, location: location });
                        }
                    },
                });
            }
        });
    };
    PlaceAgentState.prototype.updatePageTitle = function () {
        var noOptions = Object.values(this.args.locations).length === 0;
        var text = this.args.optionalAction
            ? _("${you} may select a location to place ${tkn_mapToken}")
            : _("${you} must select a location to place ${tkn_mapToken}");
        if (noOptions) {
            text = _("${you} cannot place ${tkn_mapToken} and must skip");
        }
        this.game.clientUpdatePageTitle({
            text: text,
            args: {
                you: "${you}",
                tkn_mapToken: this.createMapTokenId(),
            },
        });
    };
    PlaceAgentState.prototype.updatePageTitleConfirmLocation = function (_a) {
        var location = _a.location, empire = _a.empire;
        var name = location.name, cost = location.cost, tokenToRepress = location.tokenToRepress, tokenToKill = location.tokenToKill;
        if (tokenToRepress === null || tokenToRepress === void 0 ? void 0 : tokenToRepress.token) {
            this.game.clientUpdatePageTitle({
                text: cost > 0
                    ? _("Place ${tkn_mapToken} on ${location} and pay ${cost} ${tkn_florin} to Repress ${tkn_mapToken_repressed} ?")
                    : _("Place ${tkn_mapToken} on ${location} and Repress ${tkn_mapToken_repressed} ?"),
                args: {
                    tkn_mapToken: this.createMapTokenId(),
                    location: _(name),
                    cost: cost,
                    tkn_florin: tknFlorin(),
                    tkn_mapToken_repressed: tknMapToken(tokenToRepress.token.id),
                },
            });
        }
        else if (tokenToKill) {
            this.game.clientUpdatePageTitle({
                text: _("Place ${tkn_mapToken} on ${location} and Kill ${tkn_mapToken_killed} ?"),
                args: {
                    tkn_mapToken: this.createMapTokenId(),
                    location: _(name),
                    tkn_mapToken_killed: tknMapToken(tokenToKill.id),
                },
            });
        }
        else {
            this.game.clientUpdatePageTitle({
                text: _("Place ${tkn_mapToken} on ${location}?"),
                args: {
                    tkn_mapToken: this.createMapTokenId(),
                    location: _(name),
                },
            });
        }
    };
    PlaceAgentState.prototype.addAgentButtons = function (_a) {
        var _this = this;
        var agents = _a.agents;
        agents.forEach(function (agent, index) {
            _this.game.addAgentButton({
                callback: function () {
                    _this.selectedAgent = agent;
                    _this.updateInterfaceSelectLocation({ agent: agent });
                },
                id: "agent_".concat(index),
                agent: agent,
            });
        });
    };
    return PlaceAgentState;
}());
var PlaceLevySelectCityState = (function () {
    function PlaceLevySelectCityState(game) {
        this.game = game;
    }
    PlaceLevySelectCityState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    PlaceLevySelectCityState.prototype.onLeavingState = function () {
        debug("Leaving PlaceLevySelectCityState");
    };
    PlaceLevySelectCityState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must select a City to place a Levy"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    PlaceLevySelectCityState.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a City in ${empireName} to place a Levy"),
            args: {
                you: "${you}",
                empireName: _(this.args.empire.name),
            },
        });
        Object.keys(this.args.possibleLevies).forEach(function (cityId) {
            _this.game.setLocationSelectable({
                id: cityId,
                callback: function () { return _this.updateInterfaceConfirmPlaceLevy({ cityId: cityId }); },
            });
        });
        this.game.addUndoButtons(this.args);
    };
    PlaceLevySelectCityState.prototype.updateInterfaceConfirmPlaceLevy = function (_a) {
        var _this = this;
        var cityId = _a.cityId;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: cityId });
        var _b = this.args.possibleLevies[cityId].levy, separator = _b.separator, levyIcon = _b.levyIcon;
        this.game.clientUpdatePageTitle({
            text: _("Place ${tkn_mapToken} in ${cityName}?"),
            args: {
                tkn_mapToken: [separator, levyIcon].join("_"),
                cityName: _(this.args.possibleLevies[cityId].cityName),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actPlaceLevySelectCity",
                args: {
                    cityId: cityId,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    return PlaceLevySelectCityState;
}());
var PlayerActionState = (function () {
    function PlayerActionState(game) {
        this.game = game;
    }
    PlayerActionState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    PlayerActionState.prototype.onLeavingState = function () {
        debug('Leaving PlayerActionsState');
    };
    PlayerActionState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _('${tkn_playerName} may perform actions'),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    PlayerActionState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.updatePageTitle();
        this.setMarketCardsSelectable();
        this.setHandCardsSelectable();
        this.setTradeFairSelectable();
        this.setOperationsSelectable();
        this.setVictoryCardsSelectable();
        this.setAbilityActionsSelectable();
        this.addActionButtons();
        this.game.addPassButton({ optionalAction: this.args.optionalAction });
        this.game.addUndoButtons(this.args);
    };
    PlayerActionState.prototype.updateInterfaceSelectCardToPurchase = function () {
        this.game.clearPossible();
        this.setMarketCardsSelectable();
        this.game.clientUpdatePageTitle({
            text: _('${you} must select a card to purchase'),
            args: {
                you: '${you}',
            },
        });
        this.game.addCancelButton();
    };
    PlayerActionState.prototype.updateInterfaceConfirmPurchase = function (_a) {
        var _this = this;
        var card = _a.card, column = _a.column;
        this.game.clearPossible();
        this.game.setCardSelected({ id: card.id });
        this.game.clientUpdatePageTitle({
            text: _('Purchase ${cardName} for ${amount} ${tkn_florin} ?'),
            args: {
                amount: column,
                cardName: _(card.name),
                tkn_florin: _('Florin(s)'),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: 'actPlayerAction',
                args: {
                    action: 'purchaseCard',
                    cardId: card.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    PlayerActionState.prototype.updateInterfaceSelectHandCard = function () {
        this.game.clearPossible();
        this.setHandCardsSelectable();
        this.game.clientUpdatePageTitle({
            text: _('${you} must select a card to play'),
            args: {
                you: '${you}',
            },
        });
        this.game.addCancelButton();
    };
    PlayerActionState.prototype.updateInterfaceOnClickHandCard = function (_a) {
        var _this = this;
        var card = _a.card;
        this.game.clearPossible();
        this.game.setCardSelected({ id: card.id });
        this.game.clientUpdatePageTitle({
            text: _('Play ${cardName} to tableau?'),
            args: {
                cardName: _(card.name),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: 'actPlayerAction',
                args: {
                    action: 'playCard',
                    cardId: card.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    PlayerActionState.prototype.updateInterfaceSelectVictory = function () {
        this.game.clearPossible();
        this.setVictoryCardsSelectable();
        this.game.clientUpdatePageTitle({
            text: _('${you} must select a Victory to declare'),
            args: {
                you: '${you}',
            },
        });
        this.game.addCancelButton();
    };
    PlayerActionState.prototype.addActionButtons = function () {
        var _this = this;
        var showActionButtons = this.game.settings.get({ id: PREF_SHOW_ACTION_BUTTONS }) === ENABLED;
        if (showActionButtons && this.args.cardsPlayerCanPurchase.length > 0) {
            this.game.addPrimaryActionButton({
                id: 'purchase_card_btn',
                text: _('Purchase'),
                callback: function () { return _this.updateInterfaceSelectCardToPurchase(); },
            });
        }
        var handCards = this.game.hand.getCards();
        if (showActionButtons && handCards.length > 0) {
            this.game.addPrimaryActionButton({
                id: 'play_card_btn',
                text: _('Play'),
                callback: function () { return _this.updateInterfaceSelectHandCard(); },
            });
        }
        if (this.args._private.cardsPlayerCanSell.cards.length +
            this.args._private.cardsPlayerCanSell.royalCouples.length >
            0) {
            this.game.addPrimaryActionButton({
                id: 'sell_card_btn',
                text: _('Sell'),
                callback: function () {
                    return _this.game
                        .framework()
                        .setClientState(CLIENT_SELL_CARD_STATE, {
                        args: _this.args._private.cardsPlayerCanSell,
                    });
                },
            });
        }
        REGIONS.forEach(function (region) {
            if (Object.keys(_this.args.availableOps[region]).length > 0) {
                if (!showActionButtons) {
                    return;
                }
                _this.game.addPrimaryActionButton({
                    id: "".concat(region, "_ops_btn"),
                    text: region === EAST ? _('Tableau Ops East') : _('Tableau Ops West'),
                    callback: function () {
                        return _this.game
                            .framework()
                            .setClientState(CLIENT_CONFIRM_TABLEAU_OPS, {
                            args: {
                                availableOps: _this.args.availableOps,
                                region: region,
                                firstOp: null,
                            },
                        });
                    },
                });
            }
        });
        if (showActionButtons && this.args.tradeFair.west) {
            this.game.addPrimaryActionButton({
                id: 'trade_fair_west_btn',
                text: _('Trade Fair West'),
                callback: function () {
                    return _this.game
                        .framework()
                        .setClientState(CLIENT_START_TRADE_FAIR_STATE, {
                        args: __assign(__assign({}, _this.args.tradeFair.west), { action: 'actPlayerAction' }),
                    });
                },
            });
        }
        if (showActionButtons && this.args.tradeFair.east) {
            this.game.addPrimaryActionButton({
                id: 'trade_fair_east_btn',
                text: _('Trade Fair East'),
                callback: function () {
                    return _this.game
                        .framework()
                        .setClientState(CLIENT_START_TRADE_FAIR_STATE, {
                        args: __assign(__assign({}, _this.args.tradeFair.east), { action: 'actPlayerAction' }),
                    });
                },
            });
        }
        if (showActionButtons && this.args.declarableVictories.length > 0) {
            this.game.addPrimaryActionButton({
                id: 'declare_victory_btn',
                text: _('Declare Victory'),
                callback: function () { return _this.updateInterfaceSelectVictory(); },
            });
        }
        if (showActionButtons &&
            Object.entries(this.args.abilityActions).length > 0) {
            this.game.addPrimaryActionButton({
                id: 'abiliy_action_btn',
                text: _('Use action from ability'),
                callback: function () {
                    return _this.game
                        .framework()
                        .setClientState(CLIENT_USE_ABILITY_ACTION_STATE, {
                        args: {
                            abilityActions: _this.args.abilityActions,
                            selected: null,
                        },
                    });
                },
            });
        }
    };
    PlayerActionState.prototype.addTest = function () { };
    PlayerActionState.prototype.updatePageTitle = function () {
        var remainingActions = this.args.remainingActions;
        var titleTextWithRemaining = _('${you} may perform an action (${number} remaining)');
        var titleTestNoRemaining = _('${you} may perform an action');
        if (remainingActions > 0) {
            this.game.clientUpdatePageTitle({
                text: titleTextWithRemaining,
                args: {
                    you: '${you}',
                    number: remainingActions,
                },
            });
        }
        else {
            this.game.clientUpdatePageTitle({
                text: titleTestNoRemaining,
                args: {
                    you: '${you}',
                },
            });
        }
    };
    PlayerActionState.prototype.setAbilityActionsSelectable = function () {
        var _this = this;
        Object.entries(this.args.abilityActions).forEach(function (_a) {
            var cardId = _a[0], ability = _a[1];
            _this.game.setLocationSelectable({
                id: "".concat(cardId, "_").concat(ability.id),
                callback: function () {
                    return _this.game
                        .framework()
                        .setClientState(CLIENT_USE_ABILITY_ACTION_STATE, {
                        args: {
                            abilityActions: _this.args.abilityActions,
                            selected: {
                                cardId: cardId,
                                abilityAction: ability,
                            },
                        },
                    });
                },
            });
        });
    };
    PlayerActionState.prototype.setHandCardsSelectable = function () {
        var _this = this;
        var cards = this.game.hand.getCards();
        cards.forEach(function (card) {
            _this.game.setCardSelectable({
                id: card.id,
                callback: function () { return _this.updateInterfaceOnClickHandCard({ card: card }); },
            });
        });
    };
    PlayerActionState.prototype.setMarketCardsSelectable = function () {
        var _this = this;
        this.args.cardsPlayerCanPurchase.forEach(function (card) {
            var id = card.id, location = card.location;
            var _a = location.split('_'), market = _a[0], region = _a[1], column = _a[2];
            _this.game.setCardSelectable({
                id: card.id,
                callback: function () {
                    return _this.updateInterfaceConfirmPurchase({ card: card, column: Number(column) });
                },
            });
        });
    };
    PlayerActionState.prototype.setTradeFairSelectable = function () {
        var _this = this;
        REGIONS.forEach(function (region) {
            if (!_this.args.tradeFair[region]) {
                return;
            }
            _this.game.setCardSelectable({
                id: _this.args.tradeFair[region].card.id,
                callback: function () {
                    return _this.game
                        .framework()
                        .setClientState(CLIENT_START_TRADE_FAIR_STATE, {
                        args: __assign(__assign({}, _this.args.tradeFair[region]), { action: 'actPlayerAction' }),
                    });
                },
            });
        });
    };
    PlayerActionState.prototype.setOperationsSelectable = function () {
        var _this = this;
        REGIONS.forEach(function (region) {
            Object.entries(_this.args.availableOps[region]).forEach(function (_a) {
                var cardId = _a[0], operations = _a[1];
                var card = cardId.startsWith('EmpireSquare')
                    ? _this.game.gamedatas.empireSquares.find(function (square) { return square.id === cardId; })
                    : _this.game.gamedatas.staticData.tableauCards[cardId.split('_')[0]];
                operations.forEach(function (operation) {
                    var operationId = "".concat(card.id, "_").concat(operation.id).concat(card.type === EMPIRE_CARD ? "_".concat(card.side) : '');
                    _this.game.setLocationSelectable({
                        id: operationId,
                        callback: function () {
                            return _this.game
                                .framework()
                                .setClientState(CLIENT_CONFIRM_TABLEAU_OPS, {
                                args: {
                                    availableOps: _this.args.availableOps,
                                    region: region,
                                    firstOp: {
                                        tableauOpId: operation.id,
                                        cardId: cardId,
                                    },
                                },
                            });
                        },
                    });
                });
            });
        });
    };
    PlayerActionState.prototype.setVictoryCardsSelectable = function () {
        var _this = this;
        this.args.declarableVictories.forEach(function (victoryCard) {
            _this.game.setCardSelectable({
                id: victoryCard.id,
                callback: function () {
                    return _this.game
                        .framework()
                        .setClientState(CLIENT_DECLARE_VICTORY_STATE, {
                        args: {
                            victoryCard: victoryCard,
                        },
                    });
                },
            });
        });
    };
    return PlayerActionState;
}());
var RegimeChangeEmancipationState = (function () {
    function RegimeChangeEmancipationState(game) {
        this.game = game;
    }
    RegimeChangeEmancipationState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    RegimeChangeEmancipationState.prototype.onLeavingState = function () {
        debug("Leaving RegimeChangeEmancipationState");
    };
    RegimeChangeEmancipationState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} may move Repress Tokens onto the Map"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    RegimeChangeEmancipationState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} may select a Repressed Token to move onto the Map"),
            args: {
                you: "${you}",
            },
        });
        this.game.addPassButton({
            optionalAction: this.args.optionalAction,
            text: _("Done"),
        });
        this.setTokensSelectable();
        this.game.addUndoButtons(this.args);
    };
    RegimeChangeEmancipationState.prototype.updateInterfaceSelectLocation = function (_a) {
        var locations = _a.locations, token = _a.token;
        this.game.clearPossible();
        this.game.setTokenSelected({ id: token.id });
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a ${borderOrCity} to move ${tkn_mapToken} onto"),
            args: {
                you: "${you}",
                borderOrCity: token.type === PAWN ? _("Border") : _("City"),
                tkn_mapToken: tknMapToken(token.id),
            },
        });
        this.game.addCancelButton();
        this.setLocationsSelectable({ locations: locations, token: token });
    };
    RegimeChangeEmancipationState.prototype.updateInterfaceConfirmLocation = function (_a) {
        var _this = this;
        var location = _a.location, token = _a.token;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: location.id });
        this.game.setTokenSelected({ id: token.id });
        this.game.clientUpdatePageTitle({
            text: _("Move ${tkn_mapToken} onto ${locationName}?"),
            args: {
                tkn_mapToken: tknMapToken(token.id),
                locationName: _(location.name),
            },
        });
        var callback = function () {
            _this.game.clearPossible();
            _this.game.takeAction({
                action: "actRegimeChangeEmancipation",
                args: {
                    tokenId: token.id,
                    locationId: location.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    RegimeChangeEmancipationState.prototype.setLocationsSelectable = function (_a) {
        var _this = this;
        var locations = _a.locations, token = _a.token;
        locations.forEach(function (location) {
            _this.game.setLocationSelectable({
                id: location.id,
                callback: function () {
                    return _this.updateInterfaceConfirmLocation({ location: location, token: token });
                },
            });
        });
    };
    RegimeChangeEmancipationState.prototype.setTokensSelectable = function () {
        var _this = this;
        Object.entries(this.args.options).forEach(function (_a) {
            var tokenId = _a[0], _b = _a[1], locations = _b.locations, token = _b.token;
            _this.game.setTokenSelectable({
                id: tokenId,
                callback: function () {
                    return _this.updateInterfaceSelectLocation({ locations: locations, token: token });
                },
            });
        });
    };
    return RegimeChangeEmancipationState;
}());
var RegimeChangeGoldenLibertyState = (function () {
    function RegimeChangeGoldenLibertyState(game) {
        this.game = game;
    }
    RegimeChangeGoldenLibertyState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    RegimeChangeGoldenLibertyState.prototype.onLeavingState = function () {
        debug("Leaving RegimeChangeGoldenLibertyState");
    };
    RegimeChangeGoldenLibertyState.prototype.setDescription = function (activePlayerId, args) {
        this.args = args;
        this.game.clientUpdatePageTitle({
            text: _('${tkn_playerName} may change ${empireName} to a Medieval state'),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
                empireName: this.args.empire.name,
            },
            nonActivePlayers: true,
        });
    };
    RegimeChangeGoldenLibertyState.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: this.args.empire.id });
        this.game.clientUpdatePageTitle({
            text: _("Golden Liberty: ${you} may change ${empireName} to a Medieval state"),
            args: {
                you: "${you}",
                empireName: this.args.empire.name,
            },
        });
        this.game.addPrimaryActionButton({
            id: "change_btn",
            text: _("Change"),
            callback: function () {
                return _this.game.takeAction({
                    action: "actRegimeChangeGoldenLiberty",
                    args: {
                        change: true,
                    },
                });
            },
        });
        this.game.addSkipButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actRegimeChangeGoldenLiberty",
                    args: {
                        change: false,
                    },
                });
            },
        });
        this.game.addUndoButtons(this.args);
    };
    return RegimeChangeGoldenLibertyState;
}());
var RemoveTokenFromCityState = (function () {
    function RemoveTokenFromCityState(game) {
        this.game = game;
    }
    RemoveTokenFromCityState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    RemoveTokenFromCityState.prototype.onLeavingState = function () {
        debug("Leaving RemoveTokenFromCity");
    };
    RemoveTokenFromCityState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must select a Token to remove"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    RemoveTokenFromCityState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a Token to remove"),
            args: {
                you: "${you}",
            },
        });
        this.setTokensSelectable();
        this.game.addPassButton({ optionalAction: this.args.optionalAction });
        this.game.addUndoButtons(this.args);
    };
    RemoveTokenFromCityState.prototype.updateInterfaceConfirmSelectToken = function (_a) {
        var _this = this;
        var tokenId = _a.tokenId, cityName = _a.cityName;
        this.game.clearPossible();
        this.game.setTokenSelected({ id: tokenId });
        this.game.clientUpdatePageTitle({
            text: _("Remove ${tkn_mapToken} on ${locationName}?"),
            args: {
                tkn_mapToken: tknMapToken(tokenId),
                locationName: _(cityName),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actRemoveTokenFromCity",
                args: {
                    tokenId: tokenId,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    RemoveTokenFromCityState.prototype.setTokensSelectable = function () {
        var _this = this;
        Object.entries(this.args.options).forEach(function (_a) {
            var tokenId = _a[0], cityName = _a[1];
            _this.game.setTokenSelectable({
                id: tokenId,
                callback: function () {
                    return _this.updateInterfaceConfirmSelectToken({ tokenId: tokenId, cityName: cityName });
                },
            });
        });
    };
    return RemoveTokenFromCityState;
}());
var SelectTokenState = (function () {
    function SelectTokenState(game) {
        this.game = game;
    }
    SelectTokenState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    SelectTokenState.prototype.onLeavingState = function () {
        debug("Leaving SelectTokenState");
    };
    SelectTokenState.prototype.setDescription = function (activePlayerId, args) {
        this.args = args;
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must select a ${tkn_mapToken} to place"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
                tkn_mapToken: tknMapToken(this.args.tokens[0].id),
            },
            nonActivePlayers: true,
        });
    };
    SelectTokenState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a ${tkn_mapToken} to place"),
            args: {
                you: "${you}",
                tkn_mapToken: tknMapToken(this.args.tokens[0].id),
            },
        });
        this.setTokensSelectable();
        this.game.addUndoButtons(this.args);
    };
    SelectTokenState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var id = _a.id;
        this.game.clearPossible();
        this.game.setTokenSelected({ id: id });
        this.game.clientUpdatePageTitle({
            text: _("Select ${tkn_mapToken} ?"),
            args: {
                tkn_mapToken: tknMapToken(this.args.tokens[0].id),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actSelectToken",
                args: {
                    tokenId: id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    SelectTokenState.prototype.setTokensSelectable = function () {
        var _this = this;
        this.args.tokens.forEach(function (_a) {
            var id = _a.id;
            _this.game.setTokenSelectable({
                id: id,
                callback: function () { return _this.updateInterfaceConfirm({ id: id }); },
            });
        });
    };
    return SelectTokenState;
}());
var TableauOpBeheadState = (function () {
    function TableauOpBeheadState(game) {
        this.game = game;
    }
    TableauOpBeheadState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    TableauOpBeheadState.prototype.onLeavingState = function () {
        debug("Leaving TableauOpBeheadState");
    };
    TableauOpBeheadState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must select a card to behead."),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    TableauOpBeheadState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a card to behead"),
            args: {
                you: "${you}",
            },
        });
        this.setCardsSelectable();
        this.game.addUndoButtons(this.args);
    };
    TableauOpBeheadState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var card = _a.card;
        this.game.clearPossible();
        this.game.setCardSelected({ id: card.id });
        this.game.clientUpdatePageTitle({
            text: _("Behead ${cardName}?"),
            args: {
                tkn_florin: tknFlorin(),
                cardName: card.type === EMPIRE_CARD ? _(card[card.side].name) : _(card.name),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actTableauOpBehead",
                args: {
                    cardId: card.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    TableauOpBeheadState.prototype.setCardsSelectable = function () {
        var _this = this;
        this.args.cards.forEach(function (card) {
            _this.game.setCardSelectable({
                id: card.id,
                callback: function () {
                    return _this.updateInterfaceConfirm({
                        card: card,
                    });
                },
            });
        });
    };
    return TableauOpBeheadState;
}());
var TableauOpCampaignState = (function () {
    function TableauOpCampaignState(game) {
        this.game = game;
    }
    TableauOpCampaignState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    TableauOpCampaignState.prototype.onLeavingState = function () {
        debug("Leaving TableauOpCampaignState");
    };
    TableauOpCampaignState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must select an Empire to campaign against"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    TableauOpCampaignState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select an Empire to campaign against"),
            args: {
                you: "${you}",
            },
        });
        this.setEmpiresSelectable();
        this.game.addUndoButtons(this.args);
    };
    TableauOpCampaignState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var cost = _a.cost, empire = _a.empire;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: empire.id });
        this.game.clientUpdatePageTitle({
            text: cost > 0
                ? _("Pay ${cost} ${tkn_florin} to campaign against ${empireName}?")
                : _("Campaign against ${empireName}?"),
            args: {
                empireName: _(empire.name),
                cost: cost,
                tkn_florin: tknFlorin(),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actTableauOpCampaign",
                args: {
                    empireId: empire.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    TableauOpCampaignState.prototype.setEmpiresSelectable = function () {
        var _this = this;
        this.args.options.forEach(function (option) {
            _this.game.setLocationSelectable({
                id: option.empire.id,
                callback: function () { return _this.updateInterfaceConfirm(option); },
            });
        });
    };
    return TableauOpCampaignState;
}());
var TableauOpCommerceState = (function () {
    function TableauOpCommerceState(game) {
        this.game = game;
    }
    TableauOpCommerceState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    TableauOpCommerceState.prototype.onLeavingState = function () {
        debug("Leaving TableauOpCommerceState");
    };
    TableauOpCommerceState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} may take one Florin"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    TableauOpCommerceState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a card in the market to take 1 ${tkn_florin} from"),
            args: {
                tkn_florin: tknFlorin(),
                you: "${you}",
            },
        });
        this.setCardsSelectable();
        this.setSpacesSelectable();
        this.game.addUndoButtons(this.args);
    };
    TableauOpCommerceState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var card = _a.card;
        this.game.clearPossible();
        var isTradeFairCard = Number(card.location.split("_")[2]) === 0;
        this.game.setCardSelected({ id: card.id });
        this.game.clientUpdatePageTitle({
            text: _("Take ${tkn_florin} from ${cardName}?"),
            args: {
                tkn_florin: tknFlorin(),
                cardName: isTradeFairCard ? _("trade fair card") : _(card.name),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actTableauOpCommerce",
                args: {
                    cardId: card.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    TableauOpCommerceState.prototype.updateInterfaceConfirmSpace = function (_a) {
        var _this = this;
        var space = _a.space;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: space });
        this.game.clientUpdatePageTitle({
            text: _("Take ${tkn_florin} from ${cardName}?"),
            args: {
                tkn_florin: tknFlorin(),
                cardName: _("trade fair space"),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actTableauOpCommerce",
                args: {
                    space: space,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    TableauOpCommerceState.prototype.setCardsSelectable = function () {
        var _this = this;
        this.args.options.cards.forEach(function (card) {
            _this.game.setCardSelectable({
                id: card.id,
                callback: function () {
                    return _this.updateInterfaceConfirm({
                        card: card,
                    });
                },
            });
        });
    };
    TableauOpCommerceState.prototype.setSpacesSelectable = function () {
        var _this = this;
        this.args.options.spaces.forEach(function (space) {
            _this.game.setLocationSelectable({
                id: space,
                callback: function () {
                    return _this.updateInterfaceConfirmSpace({
                        space: space,
                    });
                },
            });
        });
    };
    return TableauOpCommerceState;
}());
var TableauOpCorsairState = (function () {
    function TableauOpCorsairState(game) {
        this.game = game;
    }
    TableauOpCorsairState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    TableauOpCorsairState.prototype.onLeavingState = function () {
        debug("Leaving TableauOpCorsairState");
    };
    TableauOpCorsairState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must move a Pirate"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    TableauOpCorsairState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a Pirate to move"),
            args: {
                tkn_florin: tknFlorin(),
                you: "${you}",
            },
        });
        this.setTokensSelectable();
        this.game.addUndoButtons(this.args);
    };
    TableauOpCorsairState.prototype.updateInterfaceSelectDestination = function (_a) {
        var option = _a.option;
        this.game.clearPossible();
        var token = option.token, destinations = option.destinations;
        this.game.setTokenSelected({ id: token.id });
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a Sea Border to move ${tkn_mapToken} into"),
            args: {
                tkn_mapToken: tknMapToken(option.token.id),
                you: "${you}",
            },
        });
        this.setDestinationBordersSelectable({ option: option });
        this.game.addCancelButton();
    };
    TableauOpCorsairState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var destination = _a.destination, token = _a.token;
        this.game.clearPossible();
        this.game.setTokenSelected({ id: token.id });
        this.game.setLocationSelected({ id: destination.border.id });
        this.game.clientUpdatePageTitle({
            text: destination.token !== null
                ? _("Move ${tkn_mapToken} into ${borderName} and Kill ${tkn_mapToken_2}?")
                : _("Move ${tkn_mapToken} into ${borderName}?"),
            args: {
                tkn_mapToken: tknMapToken(token.id),
                tkn_mapToken_2: destination.token !== null ? tknMapToken(destination.token.id) : "",
                borderName: _(destination.border.name),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actTableauOpCorsair",
                args: {
                    tokenId: token.id,
                    destinationId: destination.border.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    TableauOpCorsairState.prototype.setDestinationBordersSelectable = function (_a) {
        var _this = this;
        var option = _a.option;
        Object.entries(option.destinations).forEach(function (_a) {
            var borderId = _a[0], destination = _a[1];
            _this.game.setLocationSelectable({
                id: borderId,
                callback: function () {
                    return _this.updateInterfaceConfirm({
                        token: option.token,
                        destination: destination,
                    });
                },
            });
        });
    };
    TableauOpCorsairState.prototype.setTokensSelectable = function () {
        var _this = this;
        Object.entries(this.args.options).forEach(function (_a) {
            var tokenId = _a[0], option = _a[1];
            _this.game.setTokenSelectable({
                id: tokenId,
                callback: function () {
                    return _this.updateInterfaceSelectDestination({
                        option: option,
                    });
                },
            });
        });
    };
    return TableauOpCorsairState;
}());
var TableauOpInquisitorState = (function () {
    function TableauOpInquisitorState(game) {
        this.game = game;
    }
    TableauOpInquisitorState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    TableauOpInquisitorState.prototype.onLeavingState = function () {
        debug("Leaving TableauOpRepressState");
    };
    TableauOpInquisitorState.prototype.setDescription = function (activePlayerId, args) {
        this.args = args;
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must select a ${tkn_mapToken} to move"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
                tkn_mapToken: tknMapToken(Object.keys(this.args.tokens)[0]),
            },
            nonActivePlayers: true,
        });
    };
    TableauOpInquisitorState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a ${tkn_mapToken} to move"),
            args: {
                tkn_mapToken: tknMapToken(Object.keys(this.args.tokens)[0]),
                you: "${you}",
            },
        });
        this.setTokensSelectable();
        this.game.addUndoButtons(this.args);
    };
    TableauOpInquisitorState.prototype.updateInterfaceSelectDestination = function (option) {
        var token = option.token, destinations = option.destinations;
        this.game.clearPossible();
        this.game.setTokenSelected({ id: token.id });
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a card to move ${tkn_mapToken} to"),
            args: {
                tkn_mapToken: tknMapToken(Object.keys(this.args.tokens)[0]),
                you: "${you}",
            },
        });
        this.game.addCancelButton();
        this.setCardsSelectable(option);
    };
    TableauOpInquisitorState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var token = _a.token, destination = _a.destination;
        this.game.clearPossible();
        this.game.setTokenSelected({ id: token.id });
        this.game.setCardSelected({ id: destination.id });
        this.game.clientUpdatePageTitle({
            text: _("Move ${tkn_mapToken} to ${cardName}?"),
            args: {
                tkn_mapToken: tknMapToken(token.id),
                cardName: destination.type === EMPIRE_CARD
                    ? destination[destination.side].name
                    : destination.name,
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actTableauOpInquisitor",
                args: {
                    tokenId: token.id,
                    destinationId: destination.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    TableauOpInquisitorState.prototype.setCardsSelectable = function (option) {
        var _this = this;
        option.destinations.forEach(function (destination) {
            _this.game.setCardSelectable({
                id: destination.id,
                callback: function () {
                    return _this.updateInterfaceConfirm({
                        token: option.token,
                        destination: destination,
                    });
                },
            });
        });
    };
    TableauOpInquisitorState.prototype.setTokensSelectable = function () {
        var _this = this;
        Object.values(this.args.tokens).forEach(function (option) {
            _this.game.setTokenSelectable({
                id: option.token.id,
                callback: function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    _this.updateInterfaceSelectDestination(option);
                },
            });
        });
    };
    return TableauOpInquisitorState;
}());
var TableauOpRepressState = (function () {
    function TableauOpRepressState(game) {
        this.game = game;
    }
    TableauOpRepressState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    TableauOpRepressState.prototype.onLeavingState = function () {
        debug("Leaving TableauOpRepressState");
    };
    TableauOpRepressState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} may Repress a Token"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    TableauOpRepressState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a Token to Repress"),
            args: {
                tkn_florin: tknFlorin(),
                you: "${you}",
            },
        });
        this.setTokensSelectable();
        this.game.addUndoButtons(this.args);
    };
    TableauOpRepressState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var token = _a.token;
        this.game.clearPossible();
        this.game.setTokenSelected({ id: token.id });
        this.game.clientUpdatePageTitle({
            text: _("Repress ${tkn_mapToken}?"),
            args: {
                tkn_mapToken: tknMapToken(token.id),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actTableauOpRepress",
                args: {
                    tokenId: token.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    TableauOpRepressState.prototype.setTokensSelectable = function () {
        var _this = this;
        Object.values(this.args.tokens).forEach(function (token) {
            _this.game.setTokenSelectable({
                id: token.id,
                callback: function () {
                    return _this.updateInterfaceConfirm({
                        token: token,
                    });
                },
            });
        });
    };
    return TableauOpRepressState;
}());
var TableauOpSiegeState = (function () {
    function TableauOpSiegeState(game) {
        this.game = game;
    }
    TableauOpSiegeState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    TableauOpSiegeState.prototype.onLeavingState = function () {
        debug("Leaving OnEnteringTableauOpSiegeArgs");
    };
    TableauOpSiegeState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} may Kill a Token"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    TableauOpSiegeState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a Token to Kill"),
            args: {
                tkn_florin: tknFlorin(),
                you: "${you}",
            },
        });
        this.setTokensSelectable();
        this.game.addUndoButtons(this.args);
    };
    TableauOpSiegeState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var token = _a.token;
        this.game.clearPossible();
        this.game.setTokenSelected({ id: token.id });
        this.game.clientUpdatePageTitle({
            text: _("Kill ${tkn_mapToken}?"),
            args: {
                tkn_mapToken: tknMapToken(token.id),
            },
        });
        var callback = function () {
            _this.game.clearPossible();
            _this.game.takeAction({
                action: "actTableauOpSiege",
                args: {
                    tokenId: token.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    TableauOpSiegeState.prototype.setTokensSelectable = function () {
        var _this = this;
        Object.values(this.args.tokens).forEach(function (token) {
            _this.game.setTokenSelectable({
                id: token.id,
                callback: function () {
                    return _this.updateInterfaceConfirm({
                        token: token,
                    });
                },
            });
        });
    };
    return TableauOpSiegeState;
}());
var TableauOpsSelectState = (function () {
    function TableauOpsSelectState(game) {
        this.game = game;
    }
    TableauOpsSelectState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    TableauOpsSelectState.prototype.onLeavingState = function () {
        debug("Leaving TableauOpsSelectState");
    };
    TableauOpsSelectState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} may select Ops to perform"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    TableauOpsSelectState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} may select an Op to perform"),
            args: {
                you: "${you}",
            },
        });
        this.setOperationsSelectable();
        this.game.addPassButton({
            text: _("Done"),
            optionalAction: this.args.optional,
        });
        this.game.addUndoButtons(this.args);
    };
    TableauOpsSelectState.prototype.updateInterfaceConfirmOp = function (_a) {
        var _this = this;
        var card = _a.card, operation = _a.operation;
        this.game.clearPossible();
        this.setOpSelected({ card: card, operation: operation });
        this.game.clientUpdatePageTitle({
            text: _("Perform ${tkn_tableauOp} with ${cardName}?"),
            args: {
                tkn_tableauOp: operation.id,
                cardName: _(card.type === EMPIRE_CARD ? card[card.side].name : card.name),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actTableauOpsSelect",
                args: {
                    cardId: card.id,
                    tableauOpId: operation.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    TableauOpsSelectState.prototype.setOperationsSelectable = function () {
        var _this = this;
        Object.entries(this.args.availableOps).forEach(function (_a) {
            var cardId = _a[0], operations = _a[1];
            var card = _this.args.tableauCards.find(function (card) { return card.id === cardId; });
            operations.forEach(function (operation) {
                var operationId = "".concat(card.id, "_").concat(operation.id).concat(card.type === EMPIRE_CARD ? "_".concat(card.side) : "");
                _this.game.setLocationSelectable({
                    id: operationId,
                    callback: function () {
                        _this.updateInterfaceConfirmOp({ card: card, operation: operation });
                    },
                });
            });
        });
    };
    TableauOpsSelectState.prototype.setOpSelected = function (_a) {
        var card = _a.card, operation = _a.operation;
        var operationId = "".concat(card.id, "_").concat(operation.id).concat(card.type === EMPIRE_CARD ? "_".concat(card.side) : "");
        this.game.setLocationSelected({
            id: operationId,
        });
    };
    return TableauOpsSelectState;
}());
var TableauOpTaxState = (function () {
    function TableauOpTaxState(game) {
        this.game = game;
    }
    TableauOpTaxState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    TableauOpTaxState.prototype.onLeavingState = function () {
        debug("Leaving TableauOpTaxState");
    };
    TableauOpTaxState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must select a Concession to Tax"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    TableauOpTaxState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a Concession to Tax"),
            args: {
                you: "${you}",
            },
        });
        this.setTokensSelectable();
        this.game.addUndoButtons(this.args);
    };
    TableauOpTaxState.prototype.updateInterfaceSelectEmpire = function (_a) {
        var _this = this;
        var token = _a.token, empires = _a.empires;
        this.game.clearPossible();
        this.game.setTokenSelected({ id: token.id });
        this.game.clientUpdatePageTitle({
            text: _("${you} must select the Empire to Tax"),
            args: {
                you: "${you}",
            },
        });
        empires.forEach(function (empire) {
            _this.game.setLocationSelectable({
                id: empire.id,
                callback: function () { return _this.updateInterfaceConfirm({ token: token, empire: empire }); },
            });
        });
    };
    TableauOpTaxState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var token = _a.token, empire = _a.empire;
        this.game.clearPossible();
        this.game.setTokenSelected({ id: token.id });
        this.game.setLocationSelected({ id: empire.id });
        this.game.clientUpdatePageTitle({
            text: _("Tax ${tkn_mapToken} in ${tkn_boldText}?"),
            args: {
                tkn_mapToken: tknMapToken(token.id),
                tkn_boldText: _(empire.name),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actTableauOpTax",
                args: {
                    tokenId: token.id,
                    empireId: empire.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    TableauOpTaxState.prototype.setTokensSelectable = function () {
        var _this = this;
        Object.values(this.args.tokens).forEach(function (_a) {
            var token = _a.token, empires = _a.empires;
            _this.game.setTokenSelectable({
                id: token.id,
                callback: function () {
                    if (empires.length > 1) {
                        _this.updateInterfaceSelectEmpire({
                            token: token,
                            empires: empires,
                        });
                    }
                    else {
                        _this.updateInterfaceConfirm({
                            token: token,
                            empire: empires[0],
                        });
                    }
                },
            });
        });
    };
    return TableauOpTaxState;
}());
var TableauOpTaxPayOrRepressState = (function () {
    function TableauOpTaxPayOrRepressState(game) {
        this.game = game;
    }
    TableauOpTaxPayOrRepressState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    TableauOpTaxPayOrRepressState.prototype.onLeavingState = function () {
        debug("Leaving TableauOpTaxState");
    };
    TableauOpTaxPayOrRepressState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must pay or Repress Concession"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    TableauOpTaxPayOrRepressState.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: this.args.empire.id });
        this.game.setTokenSelected({ id: this.args.token.id });
        this.game.clientUpdatePageTitle({
            text: _("Your ${tkn_mapToken} is taxed. ${you} must pay 1 ${tkn_florin} to China or Repress your ${tkn_mapToken}"),
            args: {
                you: "${you}",
                tkn_mapToken: tknMapToken(this.args.token.id),
                tkn_florin: tknFlorin(),
            },
        });
        this.game.addPrimaryActionButton({
            id: "pay_btn",
            text: _("Pay"),
            callback: function () {
                return _this.game.takeAction({
                    action: "actTableauOpTaxPayOrRepress",
                    args: {
                        pay: true,
                    },
                });
            },
        });
        this.game.addPrimaryActionButton({
            id: "repress_btn",
            text: _("Repress"),
            callback: function () {
                return _this.game.takeAction({
                    action: "actTableauOpTaxPayOrRepress",
                    args: {
                        pay: false,
                    },
                });
            },
        });
        this.game.addUndoButtons(this.args);
    };
    return TableauOpTaxPayOrRepressState;
}());
var TableauOpVoteState = (function () {
    function TableauOpVoteState(game) {
        this.game = game;
    }
    TableauOpVoteState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    TableauOpVoteState.prototype.onLeavingState = function () {
        debug("Leaving TableauOpVoteState");
    };
    TableauOpVoteState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must select an Empire to vote in"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    TableauOpVoteState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select an Empire to vote in"),
            args: {
                you: "${you}",
            },
        });
        this.setEmpiresSelectable();
        this.game.addUndoButtons(this.args);
    };
    TableauOpVoteState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var cost = _a.cost, empire = _a.empire;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: empire.id });
        this.game.clientUpdatePageTitle({
            text: cost > 0
                ? _("Pay ${cost} ${tkn_florin} to vote in ${empireName}?")
                : _("Vote in ${empireName}?"),
            args: {
                empireName: _(empire.name),
                cost: cost,
                tkn_florin: tknFlorin(),
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actTableauOpVote",
                args: {
                    empireId: empire.id,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    TableauOpVoteState.prototype.setEmpiresSelectable = function () {
        var _this = this;
        this.args.options.forEach(function (option) {
            _this.game.setLocationSelectable({
                id: option.empire.id,
                callback: function () { return _this.updateInterfaceConfirm(option); },
            });
        });
    };
    return TableauOpVoteState;
}());
var TradeFairLevyState = (function () {
    function TradeFairLevyState(game) {
        this.game = game;
    }
    TradeFairLevyState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    TradeFairLevyState.prototype.onLeavingState = function () {
        debug("Leaving TradeFairLevyState");
    };
    TradeFairLevyState.prototype.setDescription = function (activePlayerId) {
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must select a City to place a Levy"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
            },
            nonActivePlayers: true,
        });
    };
    TradeFairLevyState.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${you} must select a City in ${empireName} to place a Levy"),
            args: {
                you: "${you}",
                empireName: _(this.args.empire.name)
            },
        });
        Object.keys(this.args.possibleLevies).forEach(function (cityId) {
            _this.game.setLocationSelectable({
                id: cityId,
                callback: function () { return _this.updateInterfaceConfirmPlaceLevy({ cityId: cityId }); },
            });
        });
        this.game.addUndoButtons(this.args);
    };
    TradeFairLevyState.prototype.updateInterfaceConfirmPlaceLevy = function (_a) {
        var _this = this;
        var cityId = _a.cityId;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: cityId });
        var _b = this.args.possibleLevies[cityId].levy, separator = _b.separator, levyIcon = _b.levyIcon;
        this.game.clientUpdatePageTitle({
            text: _("Place ${tkn_mapToken} in ${cityName}?"),
            args: {
                tkn_mapToken: [separator, levyIcon].join('_'),
                cityName: _(this.args.possibleLevies[cityId].cityName)
            },
        });
        var callback = function () {
            return _this.game.takeAction({
                action: "actTradeFairLevy",
                args: {
                    cityId: cityId,
                },
            });
        };
        if (this.game.settings.get({
            id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        }) === ENABLED) {
            callback();
        }
        else {
            this.game.addConfirmButton({
                callback: callback,
            });
        }
        this.game.addCancelButton();
    };
    return TradeFairLevyState;
}());
var getEmpireName = function (empireId) {
    var _a;
    var map = (_a = {},
        _a[EAST] = _('The East'),
        _a[WEST] = _('The West'),
        _a[ARAGON] = _('Aragon'),
        _a[BYZANTIUM] = _('Byzantium'),
        _a[ENGLAND] = _('England'),
        _a[FRANCE] = _('France'),
        _a[HOLY_ROMAN_EMIRE] = _('Holy Roman Empire'),
        _a[HUNGARY] = _('Hungary'),
        _a[MAMLUK] = _('Mamluk'),
        _a[OTTOMAN] = _('Ottoman'),
        _a[PAPAL_STATES] = _('Papal States'),
        _a[PORTUGAL] = _('Portugal'),
        _a);
    return map[empireId];
};
var tplCardTooltipContainer = function (_a) {
    var card = _a.card, content = _a.content, style = _a.style;
    return "<div class=\"pr_card_tooltip\"".concat(style ? " style=\"".concat(style, "\"") : '', ">\n  <div class=\"pr_card_tooltip_inner_container\">\n    ").concat(content, "\n  </div>\n  ").concat(card, "\n</div>");
};
var tplOneShotSection = function (_a) {
    var oneShot = _a.oneShot, suitors = _a.suitors;
    return "\n    <span class=\"pr_section_title\">".concat(_('One-shot'), "</span>\n    ").concat(tplOneShotRow({ oneShot: oneShot }), "\n  ").concat(suitors ? tplSuitorsRow({ suitors: suitors }) : '', "\n  ");
};
var tplSuitorsRow = function (_a) {
    var suitors = _a.suitors;
    return "\n<div class=\"pr_card_tooltip_row\">\n  <div class=\"pr_card_tooltip_row_icon\">\n  </div>\n  <div class=\"pr_tooltip_row_text\">\n  <span class=\"pr_flavor_text\">".concat(_('Suitors'), "</span>\n  ").concat(suitors
        .map(function (suitor) {
        return "<span>".concat(_('• ${empireName}').replace('${empireName}', _(getEmpireName(suitor))), "</span>");
    })
        .join(''), "\n  </div>\n</div>");
};
var tplAgentsSection = function (_a) {
    var agents = _a.agents;
    var agentIcons = {};
    agents.forEach(function (agent) {
        var identifier = agent.type === PAWN ? PAWN : "".concat(agent.separator, "_").concat(agent.type);
        if (agentIcons[identifier]) {
            agentIcons[identifier] = agentIcons[identifier] + 1;
        }
        else {
            agentIcons[identifier] = 1;
        }
    });
    return "\n  <span class=\"pr_section_title\">".concat(_('Agents'), "</span>\n  ").concat(Object.entries(agentIcons)
        .map(function (_a) {
        var id = _a[0], count = _a[1];
        return tplAgentsRow({ id: id, count: count });
    })
        .join(''), "\n");
};
var tplAgentsRow = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var id = _a.id, count = _a.count;
    var agentIcon = "".concat(id, "_").concat(id === PAWN ? 1 : count);
    var text = (_b = {},
        _b["".concat(CATHOLIC, "_").concat(BISHOP)] = (_c = {},
            _c[1] = _('One Catholic Bishop'),
            _c[2] = _('Two Catholic Bishops'),
            _c),
        _b["".concat(ISLAMIC, "_").concat(BISHOP)] = (_d = {},
            _d[1] = _('One Islamic Bishop'),
            _d[2] = _('Two Islamic Bishops'),
            _d),
        _b["".concat(REFORMIST, "_").concat(BISHOP)] = (_e = {},
            _e[1] = _('One Reformist Bishop'),
            _e[2] = _('Two Reformist Bishops'),
            _e),
        _b["".concat(CATHOLIC, "_").concat(KNIGHT)] = (_f = {},
            _f[1] = _('One Catholic Knight'),
            _f[2] = _('Two Catholic Knights'),
            _f),
        _b["".concat(ISLAMIC, "_").concat(KNIGHT)] = (_g = {},
            _g[1] = _('One Islamic Knight'),
            _g[2] = _('Two Islamic Knights'),
            _g),
        _b["".concat(REFORMIST, "_").concat(KNIGHT)] = (_h = {},
            _h[1] = _('One Reformist Knight'),
            _h[2] = _('Two Reformist Knights'),
            _h),
        _b[PAWN] = (_j = {},
            _j[1] = _('One Pawn'),
            _j[2] = _('Two Pawns'),
            _j),
        _b["".concat(CATHOLIC, "_").concat(PIRATE)] = (_k = {},
            _k[1] = _('One Catholic Pirate'),
            _k[2] = _('Two Catholic Pirates'),
            _k),
        _b["".concat(ISLAMIC, "_").concat(PIRATE)] = (_l = {},
            _l[1] = _('One Islamic Pirate'),
            _l[2] = _('Two Islamic Pirates'),
            _l),
        _b["".concat(REFORMIST, "_").concat(PIRATE)] = (_m = {},
            _m[1] = _('One Reformist Pirate'),
            _m[2] = _('Two Reformist Pirates'),
            _m),
        _b["".concat(CATHOLIC, "_").concat(ROOK)] = (_o = {},
            _o[1] = _('One Catholic Rook'),
            _o[2] = _('Two Catholic Rooks'),
            _o),
        _b["".concat(ISLAMIC, "_").concat(ROOK)] = (_p = {},
            _p[1] = _('One Islamic Rook'),
            _p[2] = _('Two Islamic Rooks'),
            _p),
        _b["".concat(REFORMIST, "_").concat(ROOK)] = (_q = {},
            _q[1] = _('One Reformist Rook'),
            _q[2] = _('Two Reformist Rooks'),
            _q),
        _b);
    return "<div class=\"pr_card_tooltip_row\">\n  <div class=\"pr_card_tooltip_row_icon\">\n    <div class=\"pr_agent_icon\" data-agent-icon=\"".concat(agentIcon, "\"").concat(id === PAWN && count === 2 ? 'style="margin-left: -12px;"' : '', "></div>\n    ").concat(id === PAWN && count === 2
        ? "<div class=\"pr_agent_icon\" data-agent-icon=\"".concat(agentIcon, "\" style=\"margin-left: -23px; margin-right: -15px;\"></div>")
        : '', "\n  </div>\n  <div class=\"pr_tooltip_row_text\" style=\"margin-top: 12px;\">\n    <span>").concat(text[id][count], "</span>\n  </div>\n</div>");
};
var tplCardLocation = function (_a) {
    var location = _a.location;
    return "<div class=\"pr_card_tooltip_row\" style=\"align-items: center; font-weight: bold;\">\n  <div class=\"pr_card_tooltip_row_icon\">\n  <div class=\"pr_empire_icon\" data-empire-id=\"".concat(location, "\"></div>\n  </div>\n  <span>").concat(_(getEmpireName(location)), "</span>\n</div>");
};
var tplPrestigeRow = function (_a) {
    var _b;
    var prestige = _a.prestige;
    var prestigeTextMap = (_b = {},
        _b[CATHOLIC] = _('Catholic: Religion that recognizes the pope as the centralized authority. Counts for Holy Victory.'),
        _b[ISLAMIC] = _('Islam: Religion that uses the koran as its authority. Counts for Holy Victory.'),
        _b[REFORMIST] = _('Reformist: Religion that uses the bible/tanakh rather than the pope as its authority. Counts for Holy Victory.'),
        _b[DISCOVERY] = _('Discovery: The doctrine of maritime exploration and imperialism. Counts for Globalization Victory.'),
        _b[LAW] = _('Law - A constitution that recognizes rules of nature rather than humans as its authority. Counts for Renaissance Victory.'),
        _b[PATRON] = _('Patron. A financial sponsor of the artistic Renaissance. Counts for Patron Victory.'),
        _b);
    return "<div class=\"pr_card_tooltip_row\">\n  <div class=\"pr_card_tooltip_row_icon\">\n    <div class=\"pr_icon pr_prestige_icon\" data-icon=\"prestige_".concat(prestige, "\"></div>\n  </div>\n  <span>").concat(prestigeTextMap[prestige], "</span>\n</div>");
};
var tplOneShotRow = function (_a) {
    var oneShot = _a.oneShot;
    var titleMap = {
        APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT: _('Apostasy'),
        APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT: _('Apostasy'),
        APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT: _('Apostasy'),
        CONSPIRACY_ONE_SHOT: _('Conspiracy'),
        CORONATION_ONE_SHOT: _('Coronation'),
        CRUSADE_ONE_SHOT: _('Crusade'),
        JIHAD_ONE_SHOT: _('Jihad'),
        PEASANT_REVOLT_ONE_SHOT: _('Peasant Revolt'),
        REFORMATION_ONE_SHOT: _('Reformation'),
        TRADE_SHIFT_NOVGOROD_ONE_SHOT: _('Trade Shift'),
        TRADE_SHIFT_RED_SEA_ONE_SHOT: _('Trade Shift'),
        TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT: _('Trade Shift'),
        TRADE_SHIFT_TIMBUKTU_ONE_SHOT: _('Trade Shift'),
    };
    var infoMap = {
        APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT: _('Each player who has cards with Prestige icons of both indicated Religions in their Tableau must Discard all these cards.'),
        APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT: _('Each player who has cards with Prestige icons of both indicated Religions in their Tableau must Discard all these cards.'),
        APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT: _('Each player who has cards with Prestige icons of both indicated Religions in their Tableau must Discard all these cards.'),
        CONSPIRACY_ONE_SHOT: _("Launch a Conspiracy in this card's Location. This creates a Battle."),
        CORONATION_ONE_SHOT: _("Marry this Queen to a King. The King must be an Empire contained in the Queen's list of suitors, and must be unmarried, either in his Throne or in your Tableau."),
        CRUSADE_ONE_SHOT: _("Launch a Religious War in this card's Location. This creates a Battle between Believers and Heretics."),
        JIHAD_ONE_SHOT: _("Launch a Religious War in this card's Location. This creates a Battle between Believers and Heretics."),
        PEASANT_REVOLT_ONE_SHOT: _("Launch a Peasant Revolt in this card's Location. This creates a Battle."),
        REFORMATION_ONE_SHOT: _("Launch a Religious War in this card's Location. This creates a Battle between Believers and Heretics."),
        TRADE_SHIFT_NOVGOROD_ONE_SHOT: _('Move the busted disk covering the specified Emporium to cover the uncovered Emporium of the same color.'),
        TRADE_SHIFT_RED_SEA_ONE_SHOT: _('Move the busted disk covering the specified Emporium to cover the uncovered Emporium of the same color.'),
        TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT: _('Move the busted disk covering the specified Emporium to cover the uncovered Emporium of the same color. You must have at least one Discovery Prestige in your Tableau to activate this.'),
        TRADE_SHIFT_TIMBUKTU_ONE_SHOT: _('Move the busted disk covering the specified Emporium to cover the uncovered Emporium of the same color.'),
    };
    return "<div class=\"pr_card_tooltip_row\">\n  <div class=\"pr_card_tooltip_row_icon\">\n    <div class=\"pr_one_shot\" data-one-shot-id=\"".concat(oneShot, "\"></div>\n  </div>\n  <div class=\"pr_tooltip_row_text\">\n  ").concat("<span class=\"pr_flavor_text\">".concat(titleMap[oneShot] ? titleMap[oneShot] : '', "</span>"), "\n  <span>").concat(infoMap[oneShot] ? infoMap[oneShot] : '', "</span>\n</div>\n</div>");
};
var tplOpsRow = function (_a) {
    var _b, _c;
    var op = _a.op;
    var corsairText = _("Use this Op to move ${religion} Pirate in a Sea Border this card's Location to another Sea Border either in this card's Location or an Adjacent Location sharing a Sea Border.");
    var repressText = _("Use this Op to remove one ${token} of any color in this card's Location and place it as a Repressed Token on its corresponding Empire Square. Gain one Florin from China.");
    var voteOpText = _('Use this Op to cause a Regime Change in ${region} Empire. Its Empire Square can be in any Tableau, but it cannot be a Vassal.');
    var opTextMap = (_b = {},
        _b[BEHEAD_OP] = _('Use this Op to Discard one card in any Tableau. The Location of the beheaded card must share that of the acting card.'),
        _b[CAMPAIGN_OP] = _("Use this Op to create a Battle in a defending Empire Adjacent to this King's Location."),
        _b[COMMERCE_OP_EAST] = _('Use this Op to take one Florin from any card (including trade fair cards) in the East.'),
        _b[COMMERCE_OP_WEST] = _('Use this Op to take one Florin from any card (including trade fair cards) in the West.'),
        _b[CORSAIR_OP_CATHOLIC] = corsairText.replace('${religion}', _('a Catholic')),
        _b[CORSAIR_OP_ISLAMIC] = corsairText.replace('${religion}', _('an Islamic')),
        _b[CORSAIR_OP_REFORMIST] = corsairText.replace('${religion}', _('a Reformist')),
        _b[INQUISITOR_OP_CATHOLIC] = _('Use this Op to move a Catholic Bishop Token.'),
        _b[INQUISITOR_OP_ISLAMIC] = _('Use this Op to move an Islamic Bishop Token.'),
        _b[INQUISITOR_OP_REFORMIST] = _('Use this Op to move a Reformist Bishop Token.'),
        _b[REPRESS_OP_KNIGHT] = repressText.replace('${token}', _('Knight')),
        _b[REPRESS_OP_PAWN] = repressText.replace('${token}', _('Pawn')),
        _b[REPRESS_OP_PAWN_KNIGHT] = repressText.replace('${token}', _('Pawn or Knight')),
        _b[REPRESS_OP_PAWN_ROOK] = repressText.replace('${token}', _('Pawn or Rook')),
        _b[REPRESS_OP_PAWN_ROOK_KNIGHT] = repressText.replace('${token}', _('Pawn, Rook or Knight')),
        _b[REPRESS_OP_ROOK] = repressText.replace('${token}', _('Rook')),
        _b[REPRESS_OP_ROOK_KNIGHT] = repressText.replace('${token}', _('Rook or Knight')),
        _b[SIEGE_OP] = _("Use this Op to Kill one Rook, Knight, or Pirate of any color in this card's Location."),
        _b[TAX_OP] = _('Use this Op to tax one Concession bordering the Location this card.'),
        _b[VOTE_OP_EAST] = voteOpText.replace('${region}', _('an East')),
        _b[VOTE_OP_WEST] = voteOpText.replace('${region}', _('a West')),
        _b);
    var opNameMap = (_c = {},
        _c[BEHEAD_OP] = _('Behead'),
        _c[CAMPAIGN_OP] = _('Campaign'),
        _c[COMMERCE_OP_EAST] = _('Commerce'),
        _c[COMMERCE_OP_WEST] = _('Commerce'),
        _c[CORSAIR_OP_CATHOLIC] = _('Corsair'),
        _c[CORSAIR_OP_ISLAMIC] = _('Corsair'),
        _c[CORSAIR_OP_REFORMIST] = _('Corsair'),
        _c[INQUISITOR_OP_CATHOLIC] = _('Inquisitor'),
        _c[INQUISITOR_OP_ISLAMIC] = _('Inquisitor'),
        _c[INQUISITOR_OP_REFORMIST] = _('Inquisitor'),
        _c[REPRESS_OP_KNIGHT] = _('Repress'),
        _c[REPRESS_OP_PAWN] = _('Repress'),
        _c[REPRESS_OP_PAWN_KNIGHT] = _('Repress'),
        _c[REPRESS_OP_PAWN_ROOK] = _('Repress'),
        _c[REPRESS_OP_PAWN_ROOK_KNIGHT] = _('Repress'),
        _c[REPRESS_OP_ROOK] = _('Repress'),
        _c[REPRESS_OP_ROOK_KNIGHT] = _('Repress'),
        _c[SIEGE_OP] = _('Siege'),
        _c[TAX_OP] = _('Tax'),
        _c[VOTE_OP_EAST] = _('Vote'),
        _c[VOTE_OP_WEST] = _('Vote'),
        _c);
    var opTitleFormat = op.flavorText
        ? _('${opName} - ${opFlavorText}')
        : _('${opName}');
    var opTitle = opTitleFormat
        .replace('${opName}', opNameMap[op.id])
        .replace('${opFlavorText}', op.flavorText ? _(op.flavorText) : '');
    return "<div class=\"pr_card_tooltip_row\">\n  <div class=\"pr_card_tooltip_row_icon\">\n    <div class=\"pr_tableau_op\" data-tableau-op-id=\"".concat(op.id, "\"></div>\n    \n  </div>\n  <div class=\"pr_tooltip_row_text\">\n    <span class=\"pr_flavor_text\">").concat(opTitle, "</span>\n    <span>").concat((opTextMap === null || opTextMap === void 0 ? void 0 : opTextMap[op.id]) || '', "</span>\n  </div>\n</div>");
};
var tplTableauCardTooltip = function (_a) {
    var card = _a.card, game = _a.game, _b = _a.imageOnly, imageOnly = _b === void 0 ? false : _b;
    var cardHtml = "<div class=\"pr_card\" data-card-id=\"".concat(card.id.split('_')[0], "\"></div>");
    if (imageOnly) {
        return "<div style=\"--paxRenCardScale: 1.7;\">".concat(cardHtml, "</div>");
    }
    return tplCardTooltipContainer({
        card: cardHtml,
        content: "\n    <span class=\"pr_title\">".concat(_(card.name), "</span>\n      ").concat(card.flavorText
            .map(function (text) { return "<span class=\"pr_flavor_text\">".concat(_(text), "</span>"); })
            .join(''), "\n      ").concat((card === null || card === void 0 ? void 0 : card.empire) ? tplCardLocation({ location: card.empire }) : '', "\n      ").concat(card.prestige && card.prestige.length > 0
            ? "<span class=\"pr_section_title\">".concat(_('Prestige'), "</span>")
            : '', "\n      ").concat((card.prestige || [])
            .map(function (prestige) { return tplPrestigeRow({ prestige: prestige }); })
            .join(''), "\n      ").concat(card.ops && card.ops.length > 0
            ? "<span class=\"pr_section_title\">".concat(_('Ops'), "</span>")
            : '', "\n      ").concat((card.ops || []).map(function (op) { return tplOpsRow({ op: op }); }).join(''), "\n      ").concat(card.oneShot
            ? tplOneShotSection({
                oneShot: card.oneShot,
                suitors: card === null || card === void 0 ? void 0 : card.suitors,
            })
            : '', "\n      ").concat(card.agents ? tplAgentsSection({ agents: card.agents }) : '', "\n      ").concat((card.specialAbilities || [])
            .map(function (specialAbility) { return "\n        <span class=\"pr_section_title\">".concat(specialAbility.title ? _(specialAbility.title) : _('Ability'), "</span>\n        <span class=\"pr_section_text\">").concat(game.format_string_recursive(_(specialAbility.text.log), specialAbility.text.args), "</span>\n      "); })
            .join(''), "\n    "),
    });
};
var tplEmireCardTooltip = function (_a) {
    var card = _a.card, _b = _a.ageOfReformationPromo, ageOfReformationPromo = _b === void 0 ? false : _b, religion = _a.religion, imageOnly = _a.imageOnly;
    var cardHtml = "<div class=\"pr_square_card_tooltip_card_container\">\n  <div class=\"pr_square_card\" data-card-id=\"".concat(card.id, "_king\"").concat(ageOfReformationPromo ? ' data-map-type="ageOfReformation"' : '').concat(religion ? " data-religion=\"".concat(religion, "\"") : '', " style=\"margin-bottom: 16px;\"></div>\n  <div class=\"pr_square_card\" data-card-id=\"").concat(card.id, "_republic\"").concat(ageOfReformationPromo ? ' data-map-type="ageOfReformation"' : '', "></div>\n</div>");
    if (imageOnly) {
        return "<div style=\"--paxRenCardScale: 1.5;\">".concat(cardHtml, "</div>");
    }
    return tplCardTooltipContainer({
        card: cardHtml,
        content: "\n    <span class=\"pr_title\">".concat(_(card.king.name), "</span>\n    ").concat(card.king.flavorText
            .map(function (text) { return "<span class=\"pr_flavor_text\">".concat(_(text), "</span>"); })
            .join(''), "\n      ").concat(card.king.prestige && card.king.prestige.length > 0
            ? "<span class=\"pr_section_title\">".concat(_('Prestige'), "</span>")
            : '', "\n      ").concat((card.king.prestige || [])
            .map(function (prestige) { return tplPrestigeRow({ prestige: prestige }); })
            .join(''), "\n      ").concat(card.king.ops && card.king.ops.length > 0
            ? "<span class=\"pr_section_title\">".concat(_('Ops'), "</span>")
            : '', "\n      ").concat((card.king.ops || []).map(function (op) { return tplOpsRow({ op: op }); }).join(''), "\n    <span class=\"pr_title\" style=\"margin-top: 32px;\">").concat(_(card.republic.name), "</span>\n    ").concat(card.republic.flavorText
            .map(function (text) { return "<span class=\"pr_flavor_text\">".concat(_(text), "</span>"); })
            .join(''), "\n      ").concat(card.republic.prestige && card.republic.prestige.length > 0
            ? "<span class=\"pr_section_title\">".concat(_('Prestige'), "</span>")
            : '', "\n      ").concat((card.republic.prestige || [])
            .map(function (prestige) { return tplPrestigeRow({ prestige: prestige }); })
            .join(''), "\n      ").concat(card.republic.ops && card.republic.ops.length > 0
            ? "<span class=\"pr_section_title\">".concat(_('Ops'), "</span>")
            : '', "\n      ").concat((card.republic.ops || []).map(function (op) { return tplOpsRow({ op: op }); }).join(''), "\n    "),
    });
};
var tplVictoryCardTooltip = function (_a) {
    var card = _a.card, game = _a.game, imageOnly = _a.imageOnly;
    var cardHtml = "<div class=\"pr_square_card_tooltip_card_container\">\n  <div class=\"pr_square_card\" data-card-id=\"".concat(card.location, "_active\"></div>\n</div>");
    if (imageOnly) {
        return "<div style=\"--paxRenCardScale: 1.5;\">".concat(cardHtml, "</div>");
    }
    return tplCardTooltipContainer({
        style: 'min-height: 250px; width: 450px;',
        card: cardHtml,
        content: "\n      <span class=\"pr_title\">".concat(_(card.active.title), "</span>\n      ").concat(card.text
            .map(function (text) { return "\n      <span class=\"pr_section_text\">".concat(game.format_string_recursive(_(text.log), text.args), "</span>\n    "); })
            .join(''), "\n    "),
    });
};
var tplTooltipWithIcon = function (_a) {
    var title = _a.title, text = _a.text, iconHtml = _a.iconHtml, iconWidth = _a.iconWidth;
    return "<div class=\"pr_icon_tooltip\">\n            <div class=\"pr_icon_tooltip_icon\"".concat(iconWidth ? "style=\"min-width: ".concat(iconWidth, "px;\"") : '', ">\n              ").concat(iconHtml, "\n            </div>\n            <div class=\"pr_icon_tooltip_content\">\n              ").concat(title ? "<span class=\"pr_tooltip_title\" >".concat(title, "</span>") : '', "\n              <span class=\"pr_tooltip_text\">").concat(text, "</span>\n            </div>\n          </div>");
};
var tplTextTooltip = function (_a) {
    var text = _a.text;
    return "<span class=\"pr_text_tooltip\">".concat(text, "</span>");
};
var TooltipManager = (function () {
    function TooltipManager(game) {
        var _this = this;
        this.idRegex = /id="[a-z]*_[0-9]*_[0-9]*"/;
        this.cometCardInDrawDeckTooltip = function (_a) {
            var nodeId = _a.nodeId;
            _this.removeTooltip(nodeId);
            _this.game.framework().addTooltipHtml(nodeId, tplTextTooltip({
                text: _("Comet card is in the Draw Deck"),
            }), 250);
        };
        this.cometCardNoLongerInDrawDeckTooltip = function (_a) {
            var nodeId = _a.nodeId;
            _this.removeTooltip(nodeId);
            _this.game.framework().addTooltipHtml(nodeId, tplTextTooltip({
                text: _("Comet card is not in the Draw Deck"),
            }), 250);
        };
        this.setupDrawDeckTooltips = function () {
            var text = _("Number of cards in the ${region} Draw Deck");
            REGIONS.forEach(function (region) {
                _this.game.framework().addTooltipHtml("pr_market_".concat(region, "_deck_counter"), tplTextTooltip({
                    text: _this.game.format_string_recursive(text, {
                        region: region === EAST ? _("East") : _("West"),
                    }),
                }), 250);
            });
            [1, 2, 3, 4].forEach(function (number) {
                _this.cometCardInDrawDeckTooltip({
                    nodeId: "pr_deck_counter_comet".concat(number),
                });
            });
        };
        this.game = game;
    }
    TooltipManager.prototype.addTextToolTip = function (_a) {
        var nodeId = _a.nodeId, text = _a.text;
        this.game.framework().addTooltip(nodeId, _(text), "", 500);
    };
    TooltipManager.prototype.addIconTooltip = function (_a) {
        var nodeId = _a.nodeId, iconHtml = _a.iconHtml, text = _a.text, title = _a.title;
        var html = tplTooltipWithIcon({ iconHtml: iconHtml, text: text, title: title });
        this.game.framework().addTooltipHtml(nodeId, html, 250);
    };
    TooltipManager.prototype.removeTooltip = function (nodeId) {
        this.game.framework().removeTooltip(nodeId);
    };
    TooltipManager.prototype.setupTooltips = function () { };
    TooltipManager.prototype.addCardTooltip = function (_a) {
        var nodeId = _a.nodeId, card = _a.card;
        var html = tplTableauCardTooltip({
            card: card,
            game: this.game,
            imageOnly: this.game.settings.get({ id: CARD_INFO_IN_TOOLTIP }) === DISABLED,
        });
        this.game.framework().addTooltipHtml(nodeId, html, 500);
    };
    TooltipManager.prototype.addEmpireCardTooltip = function (_a) {
        var nodeId = _a.nodeId, card = _a.card, religion = _a.religion;
        var html = tplEmireCardTooltip({
            card: card,
            ageOfReformationPromo: this.game.gameOptions.ageOfReformationPromo,
            religion: religion,
            imageOnly: this.game.settings.get({ id: CARD_INFO_IN_TOOLTIP }) === DISABLED,
        });
        this.game.framework().addTooltipHtml(nodeId, html, 500);
    };
    TooltipManager.prototype.addVictoryCardTooltip = function (_a) {
        var nodeId = _a.nodeId, card = _a.card;
        var html = tplVictoryCardTooltip({
            card: card,
            game: this.game,
            imageOnly: this.game.settings.get({ id: CARD_INFO_IN_TOOLTIP }) === DISABLED,
        });
        this.game.framework().addTooltipHtml(nodeId, html, 500);
    };
    return TooltipManager;
}());
define([
    'dojo',
    'dojo/_base/declare',
    g_gamethemeurl + 'modules/js/vendor/nouislider.min.js',
    'dojo/fx',
    'dojox/fx/ext-dojo/complex',
    'ebg/core/gamegui',
    'ebg/counter',
], function (dojo, declare, noUiSliderDefined) {
    if (noUiSliderDefined) {
        noUiSlider = noUiSliderDefined;
    }
    return declare('bgagame.paxrenaissance', ebg.core.gamegui, new PaxRenaissance());
});
