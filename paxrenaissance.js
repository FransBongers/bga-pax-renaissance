var MIN_PLAY_AREA_WIDTH = 1516;
var CLIENT_DECLARE_VICTORY_STATE = "clientDeclareVictoryState";
var CLIENT_SELL_CARD_STATE = 'clientSellCardState';
var CLIENT_START_TRADE_FAIR_STATE = "clientStartTradeFairState";
var BLUE = "blue";
var GREEN = "green";
var PURPLE = "purple";
var YELLOW = "yellow";
var COLOR_MAP = {
    "1084c7": BLUE,
    bddcc6: GREEN,
    "732473": PURPLE,
    ffce00: YELLOW,
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
var WEST = "west";
var EAST = "east";
var REGIONS = [WEST, EAST];
var EMPIRE_CARD = "empireCard";
var TABLEAU_CARD = "tableauCard";
var VICTORY_CARD = "victoryCard";
var KING = "king";
var REPUBLIC = "republic";
var ACTIVE = 'active';
var INACTIVE = 'inactive';
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
    ENGLAND,
    FRANCE,
    HOLY_ROMAN_EMIRE,
    HUNGARY,
    BYZANTIUM,
    PORTUGAL,
    ARAGON,
    PAPAL_STATES,
    OTTOMAN,
    MAMLUK,
];
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
            position: 'fixed',
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
        this._notif_uid_to_log_id = {};
        this._last_notif = null;
        console.log("paxrenaissance constructor");
    }
    PaxRenaissance.prototype.setup = function (gamedatas) {
        var _a;
        var _this = this;
        dojo.place("<div id='customActions' style='display:inline-block'></div>", $("generalactions"), "after");
        this.gamedatas = gamedatas;
        debug("gamedatas", gamedatas);
        this._connections = [];
        this.activeStates = (_a = {},
            _a[CLIENT_DECLARE_VICTORY_STATE] = new ClientDeclareVictoryState(this),
            _a[CLIENT_SELL_CARD_STATE] = new ClientSellCardState(this),
            _a[CLIENT_START_TRADE_FAIR_STATE] = new ClientStartTradeFairState(this),
            _a.announceOneShot = new AnnounceOneShotState(this),
            _a.battleCasualties = new BattleCasualtiesState(this),
            _a.battleLocation = new BattleLocationState(this),
            _a.bishopPacification = new BishopPacificationState(this),
            _a.confirmPartialTurn = new ConfirmPartialTurnState(this),
            _a.confirmTurn = new ConfirmTurnState(this),
            _a.flipVictoryCard = new FlipVictoryCardState(this),
            _a.placeAgent = new PlaceAgentState(this),
            _a.playerAction = new PlayerActionState(this),
            _a.regimeChangeEmancipation = new RegimeChangeEmancipationState(this),
            _a.regimeChangeGoldenLiberty = new RegimeChangeGoldenLibertyState(this),
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
        this.animationManager = new AnimationManager(this, { duration: 500 });
        this.tableauCardManager = new TableauCardManager(this);
        this.gameMap = new GameMap(this);
        this.tooltipManager = new TooltipManager(this);
        this.hand = new Hand(this);
        this.playerManager = new PlayerManager(this);
        this.supply = new Supply(this);
        this.market = new Market(this);
        this.victoryCardManager = new VictoryCardManager(this);
        this.updatePlayAreaSize();
        window.addEventListener("resize", function () {
            _this.updatePlayAreaSize();
        });
        if (this.notificationManager != undefined) {
            this.notificationManager.destroy();
        }
        this.notificationManager = new NotificationManager(this);
        this.notificationManager.setupNotifications();
        this.tooltipManager.setupTooltips();
        debug("Ending game setup");
    };
    PaxRenaissance.prototype.updatePlayAreaSize = function () {
        var playAreaContainer = document.getElementById("pr_play_area_container");
        this.playAreaScale = Math.min(1, playAreaContainer.offsetWidth / MIN_PLAY_AREA_WIDTH);
        var playArea = document.getElementById("pr_play_area");
        playArea.style.transform = "scale(".concat(this.playAreaScale, ")");
        var playAreaHeight = playArea.offsetHeight;
        playArea.style.width =
            playAreaContainer.offsetWidth / this.playAreaScale + "px";
        console.log("playAreaHeight", playAreaHeight);
        playAreaContainer.style.height = playAreaHeight * this.playAreaScale + "px";
    };
    PaxRenaissance.prototype.setupNotifications = function () {
    };
    PaxRenaissance.prototype.onEnteringState = function (stateName, args) {
        console.log("Entering state: " + stateName, args);
        if (this.framework().isCurrentPlayerActive() &&
            this.activeStates[stateName]) {
            this.activeStates[stateName].onEnteringState(args.args);
        }
        else if (this.activeStates[stateName]) {
            this.activeStates[stateName].setDescription(Number(args.active_player), args.args);
        }
    };
    PaxRenaissance.prototype.onLeavingState = function (stateName) {
        console.log("Leaving state: " + stateName);
        this.clearPossible();
    };
    PaxRenaissance.prototype.moveFlorin = function (_a) {
        var _b;
        var index = _a.index;
        return __awaiter(this, void 0, void 0, function () {
            var node, element, fromRect;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        node = document.getElementById("pr_florins_counter_2371052_icon");
                        node.insertAdjacentHTML("beforeend", tplIcon({
                            id: "temp_florin_".concat(index),
                            icon: "florin",
                            style: "position: absolute;",
                        }));
                        element = document.getElementById("temp_florin_".concat(index));
                        fromRect = (_b = $("pr_market_west_3_florins")) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
                        this.market.incFlorinValue({ region: WEST, column: 3, value: -1 });
                        return [4, this.animationManager.play(new BgaSlideAnimation({
                                element: element,
                                transitionTimingFunction: "ease-in-out",
                                fromRect: fromRect,
                            }))];
                    case 1:
                        _c.sent();
                        element.remove();
                        this.playerManager
                            .getPlayer({ playerId: 2371052 })
                            .counters.florins.incValue(1);
                        return [2, true];
                }
            });
        });
    };
    PaxRenaissance.prototype.onUpdateActionButtons = function (stateName, args) {
        var _this = this;
        return;
        if (this.framework().isCurrentPlayerActive()) {
            this.addPrimaryActionButton({
                id: "draw_button",
                text: _("Draw Card"),
                callback: function () { return __awaiter(_this, void 0, void 0, function () {
                    var card;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                card = this.gamedatas.testCard;
                                card.location = "market_west_5";
                                return [4, this.market.drawCard(card)];
                            case 1:
                                _a.sent();
                                return [2];
                        }
                    });
                }); },
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
        console.log("clear interface");
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
        dojo.query(".".concat(PR_SELECTABLE)).removeClass(PR_SELECTABLE);
        dojo.query(".".concat(PR_SELECTED)).removeClass(PR_SELECTED);
    };
    PaxRenaissance.prototype.getPlayerId = function () {
        return Number(this.framework().player_id);
    };
    PaxRenaissance.prototype.getCurrentPlayer = function () {
        return this.playerManager.getPlayer({ playerId: this.getPlayerId() });
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
        var id = _a.id, callback = _a.callback, _b = _a.back, back = _b === void 0 ? false : _b;
        var nodeId = "".concat(id, "-").concat(back ? "back" : "front");
        var node = $(nodeId);
        if (node === null) {
            return;
        }
        node.classList.add(PR_SELECTABLE);
        this._connections.push(dojo.connect(node, "onclick", this, function () { return callback({ id: id }); }));
    };
    PaxRenaissance.prototype.setCardSelected = function (_a) {
        var id = _a.id, _b = _a.back, back = _b === void 0 ? false : _b;
        var nodeId = "".concat(id, "-").concat(back ? "back" : "front");
        var node = $(nodeId);
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
        this._connections.push(dojo.connect(node, "onclick", this, function () { return callback({ id: id }); }));
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
        this._connections.push(dojo.connect(node, "onclick", this, function () { return callback({ id: id }); }));
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
        this.framework().checkAction("actRestart");
        this.takeAction({
            action: "actUndoToStep",
            args: {
                stepId: stepId,
            },
        });
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
        var res = this.framework().inherited(arguments);
        this._notif_uid_to_log_id[msg.uid] = currentLogId;
        this._last_notif = {
            logId: currentLogId,
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
        });
    };
    PaxRenaissance.prototype.addLogClass = function () {
        if (this._last_notif == null)
            return;
        var notif = this._last_notif;
        if ($("log_" + notif.logId)) {
            var type = notif.msg.type;
            if (type == "history_history")
                type = notif.msg.args.originalType;
            dojo.addClass("log_" + notif.logId, "notif_" + type);
        }
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
    };
    PaxRenaissance.prototype.actionError = function (actionName) {
        this.framework().showMessage("cannot take ".concat(actionName, " action"), "error");
    };
    PaxRenaissance.prototype.takeAction = function (_a) {
        var action = _a.action, _b = _a.args, args = _b === void 0 ? {} : _b, checkAction = _a.checkAction;
        console.log("takeAction ".concat(action), args);
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
                            transitionTimingFunction: 'ease-in-out',
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
        _this.vassalStocks = {};
        return _this;
    }
    TableauCardManager.prototype.clearInterface = function () {
        var _this = this;
        Object.keys(this.vassalStocks).forEach(function (key) {
            _this.vassalStocks[key].removeAll();
            _this.removeStock(_this.vassalStocks[key]);
        });
    };
    TableauCardManager.prototype.setupDiv = function (card, div) {
        if (card.type === TABLEAU_CARD) {
            div.style.width = "calc(var(--paxRenCardScale) * 151px)";
            div.style.height = "calc(var(--paxRenCardScale) * 230px)";
        }
        else {
            div.style.minWidth = "calc(var(--paxRenCardScale) * 151px)";
            div.style.minHeight = "calc(var(--paxRenCardScale) * 151px)";
        }
        div.insertAdjacentHTML("beforeend", tplTokensContainer({ id: card.id }));
        if (card.type === EMPIRE_CARD) {
            div.insertAdjacentHTML("beforeend", tplVassalsContainer({ id: card.id }));
            this.vassalStocks[card.empire] = new LineStock(this, document.getElementById("vassals_".concat(card.id)), { gap: "12px", sort: sortFunction('state') });
        }
    };
    TableauCardManager.prototype.setupFrontDiv = function (card, div) {
        if (card.type === TABLEAU_CARD) {
            div.classList.add("pr_card");
            div.setAttribute("data-card-id", card.id.split("_")[0]);
            div.style.width = "calc(var(--paxRenCardScale) * 151px)";
            div.style.height = "calc(var(--paxRenCardScale) * 230px)";
        }
        else if (card.type === EMPIRE_CARD) {
            div.classList.add("pr_square_card");
            div.setAttribute("data-card-id", "".concat(card.id, "_king"));
            div.style.width = "calc(var(--paxRenCardScale) * 151px)";
            div.style.height = "calc(var(--paxRenCardScale) * 151px)";
        }
        if (card.type === TABLEAU_CARD) {
            this.game.tooltipManager.addCardTooltip({
                nodeId: card.id + "-front",
                card: card,
            });
        }
    };
    TableauCardManager.prototype.setupBackDiv = function (card, div) {
        if (card.type === TABLEAU_CARD) {
            div.classList.add("pr_card");
            div.setAttribute("data-card-id", card.region === EAST ? "EAST_BACK" : "WEST_BACK");
            div.style.width = "calc(var(--paxRenCardScale) * 151px)";
            div.style.height = "calc(var(--paxRenCardScale) * 230px)";
        }
        else if (card.type === EMPIRE_CARD) {
            div.classList.add("pr_square_card");
            div.setAttribute("data-card-id", "".concat(card.id, "_republic"));
            div.style.width = "calc(var(--paxRenCardScale) * 151px)";
            div.style.height = "calc(var(--paxRenCardScale) * 151px)";
        }
    };
    TableauCardManager.prototype.isCardVisible = function (card) {
        var location = card.location, type = card.type;
        if (location.startsWith("deck")) {
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
    TableauCardManager.prototype.addVassal = function (_a) {
        var vassal = _a.vassal, suzerain = _a.suzerain;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                this.updateEmpireCardHeight({ card: suzerain, vassalChange: 1 });
                this.vassalStocks[suzerain.empire].addCard(vassal);
                return [2];
            });
        });
    };
    TableauCardManager.prototype.removeVassal = function (_a) {
        var suzerain = _a.suzerain;
        this.updateEmpireCardHeight({ card: suzerain, vassalChange: -1 });
    };
    TableauCardManager.prototype.updateEmpireCardHeight = function (_a) {
        var card = _a.card, vassalChange = _a.vassalChange;
        var empire = card.empire;
        var numberOfVassals = this.vassalStocks[empire].getCards().length + vassalChange;
        var node = document.getElementById(card.id);
        node.style.minHeight = "calc(var(--paxRenCardScale) * ".concat((numberOfVassals + 1) * 151 + numberOfVassals * 12, "px)");
    };
    return TableauCardManager;
}(CardManager));
var tplTokensContainer = function (_a) {
    var id = _a.id;
    return "\n  <div id=\"".concat(id, "_tokens\" class=\"pr_card_tokens_container\"></div>");
};
var tplVassalsContainer = function (_a) {
    var id = _a.id;
    return "\n  <div id=\"vassals_".concat(id, "\" class=\"pr_vassals_container\"></div>");
};
var VictoryCardManager = (function (_super) {
    __extends(VictoryCardManager, _super);
    function VictoryCardManager(game) {
        var _this = _super.call(this, game, {
            getId: function (card) { return "".concat(card.id); },
            setupDiv: function (card, div) {
                div.style.width = "calc(var(--paxRenCardScale) * 151px)";
                div.style.height = "calc(var(--paxRenCardScale) * 151px)";
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
var EMPIRE_CARD_CONFIG = (_a = {},
    _a[ENGLAND] = {
        top: 120,
        left: 349,
    },
    _a[FRANCE] = {
        top: 120,
        left: 526,
    },
    _a[HOLY_ROMAN_EMIRE] = {
        top: 120,
        left: 700,
    },
    _a[HUNGARY] = {
        top: 120,
        left: 876,
    },
    _a[BYZANTIUM] = {
        top: 120,
        left: 1052,
    },
    _a[PORTUGAL] = {
        top: 754,
        left: 349,
    },
    _a[ARAGON] = {
        top: 754,
        left: 526,
    },
    _a[PAPAL_STATES] = {
        top: 754,
        left: 700,
    },
    _a[OTTOMAN] = {
        top: 754,
        left: 876,
    },
    _a[MAMLUK] = {
        top: 754,
        left: 1052,
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
        this.game = game;
        this.zoomLevel =
            Number(localStorage.getItem(LOCAL_STORAGE_MAP_ZOOM_KEY)) || 1;
        console.log("localStorage zoomLevel", this.zoomLevel);
        var gamedatas = game.gamedatas;
        this.setupGameMap({ gamedatas: gamedatas });
    }
    GameMap.prototype.clearInterface = function () {
        var _this = this;
        __spreadArray(__spreadArray([], BORDERS, true), CITIES, true).forEach(function (border) {
            var node = document.getElementById("pr_".concat(border));
            if (!node) {
                return;
            }
            var children = node.children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                child.remove();
            }
        });
        Object.keys(this.empireSquareStocks).forEach(function (stockId) {
            _this.empireSquareStocks[stockId].removeAll();
        });
    };
    GameMap.prototype.updateInterface = function (_a) {
        var gamedatas = _a.gamedatas;
        this.setupTokensBorders({ gamedatas: gamedatas });
        this.setupTokensCities({ gamedatas: gamedatas });
        this.updateEmpireCards({ gamedatas: gamedatas });
    };
    GameMap.prototype.setupTokensBorders = function (_a) {
        var gamedatas = _a.gamedatas;
        BORDERS.forEach(function (border) {
            var token = gamedatas.tokens.inPlay.find(function (piece) { return piece.location === border; });
            if (!token) {
                return;
            }
            var node = document.getElementById("pr_".concat(border));
            if (!node) {
                return;
            }
            node.insertAdjacentHTML("beforeend", tplToken(token));
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
            _b[ARAGON] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(ARAGON, "_throne"))),
            _b[BYZANTIUM] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(BYZANTIUM, "_throne"))),
            _b[ENGLAND] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(ENGLAND, "_throne"))),
            _b[FRANCE] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(FRANCE, "_throne"))),
            _b[HOLY_ROMAN_EMIRE] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(HOLY_ROMAN_EMIRE, "_throne"))),
            _b[HUNGARY] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(HUNGARY, "_throne"))),
            _b[MAMLUK] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(MAMLUK, "_throne"))),
            _b[OTTOMAN] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(OTTOMAN, "_throne"))),
            _b[PAPAL_STATES] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(PAPAL_STATES, "_throne"))),
            _b[PORTUGAL] = new LineStock(this.game.tableauCardManager, document.getElementById("pr_".concat(PORTUGAL, "_throne"))),
            _b);
        this.updateEmpireCards({ gamedatas: gamedatas });
    };
    GameMap.prototype.updateEmpireCards = function (_a) {
        var _this = this;
        var gamedatas = _a.gamedatas;
        gamedatas.gameMap.thrones.cards.forEach(function (card) {
            var empire = card.location.split("_")[1];
            if (_this.empireSquareStocks[empire]) {
                _this.empireSquareStocks[empire].addCard(card);
            }
        });
        gamedatas.gameMap.thrones.tokens.forEach(function (token) {
            var location = token.location;
            var node = document.getElementById("".concat(location, "_tokens"));
            if (!node) {
                return;
            }
            node.insertAdjacentHTML("beforeend", tplToken(token));
        });
    };
    GameMap.prototype.setupGameMap = function (_a) {
        var _this = this;
        var gamedatas = _a.gamedatas;
        document
            .getElementById("pr_play_area")
            .insertAdjacentHTML("afterbegin", tplGameMap());
        this.updateGameMapSize();
        window.addEventListener("resize", function () {
            _this.updateGameMapSize();
        });
        this.setupZoomButtons();
        this.setupEmpireCards({ gamedatas: gamedatas });
        this.setupTokensCities({ gamedatas: gamedatas });
        this.setupTokensBorders({ gamedatas: gamedatas });
        gamedatas.gameMap.empires.forEach(function (empire) {
            return _this.setEmpireReligion({ empireId: empire.id, religion: empire.religion });
        });
    };
    GameMap.prototype.setupZoomButtons = function () {
        var _this = this;
        dojo.connect($("pr_game_map_zoom_out_button"), "onclick", this, function () {
            return _this.zoom({ type: "out" });
        });
        dojo.connect($("pr_game_map_zoom_in_button"), "onclick", this, function () {
            return _this.zoom({ type: "in" });
        });
        this.checkZoomButtonClasses();
    };
    GameMap.prototype.getCurrentZoomIndex = function () {
        console.log("zoomLevel", this.zoomLevel);
        return ZOOM_LEVELS.indexOf(Number(localStorage.getItem(LOCAL_STORAGE_MAP_ZOOM_KEY)) || 1);
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
    GameMap.prototype.checkZoomButtonClasses = function () {
        var zoomInButton = $("pr_game_map_zoom_in_button");
        var zoomOutButton = $("pr_game_map_zoom_out_button");
        zoomInButton.classList.remove(DISABLED);
        zoomOutButton.classList.remove(DISABLED);
        if (this.zoomLevel === ZOOM_LEVELS[0]) {
            zoomOutButton.classList.add(DISABLED);
        }
        else if (this.zoomLevel === ZOOM_LEVELS[ZOOM_LEVELS.length - 1]) {
            zoomInButton.classList.add(DISABLED);
        }
    };
    GameMap.prototype.updateGameMapSize = function () {
        var map = document.getElementById("pr_game_map");
        map.style.transform = "scale(".concat(this.zoomLevel, ")");
        var mapContainer = document.getElementById("pr_game_map_container");
        mapContainer.style.width = "".concat(this.zoomLevel * MAX_MAP_WIDTH, "px");
        mapContainer.style.height = "".concat(this.zoomLevel * MAX_MAP_HEIGHT + 56, "px");
    };
    GameMap.prototype.zoom = function (_a) {
        var type = _a.type;
        var currentZoomIndex = this.getCurrentZoomIndex();
        if (type === "in" && currentZoomIndex !== ZOOM_LEVELS.length - 1) {
            this.zoomLevel = ZOOM_LEVELS[currentZoomIndex + 1];
        }
        else if (type === "out" && currentZoomIndex > 0) {
            this.zoomLevel = ZOOM_LEVELS[currentZoomIndex - 1];
        }
        this.updateGameMapSize();
        this.checkZoomButtonClasses();
        this.game.updatePlayAreaSize();
        localStorage.setItem(LOCAL_STORAGE_MAP_ZOOM_KEY, this.zoomLevel + "");
    };
    return GameMap;
}());
var tplToken = function (_a) {
    var id = _a.id, type = _a.type, separator = _a.separator;
    return "<div ".concat(id ? "id=\"".concat(id, "\"") : '', " class=\"pr_token pr_").concat(type, "\" data-separator=\"").concat(separator, "\"></div>");
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
var tplGameMapEmpireCards = function () { return "\n  ".concat(Object.entries(EMPIRE_CARD_CONFIG)
    .map(function (_a) {
    var empire = _a[0], _b = _a[1], top = _b.top, left = _b.left;
    return "<div id=\"pr_".concat(empire, "_throne\" class=\"pr_empire_throne\" style=\"top: calc(var(--paxRenCardScale) * ").concat(top, "px); left: calc(var(--paxRenCardScale) * ").concat(left, "px);\"></div>");
})
    .join(""), "\n"); };
var tplGameMapMapBorders = function () {
    return Object.entries(BORDER_CONFIG).map(function (_a) {
        var border = _a[0], coords = _a[1];
        return "<div id=\"pr_".concat(border, "\" class=\"pr_border\" style=\"top: calc(var(--paxRenMapScale) * ").concat(coords.top, "px); left: calc(var(--paxRenMapScale) * ").concat(coords.left, "px);\"></div>");
    }).join('');
};
var tplGameMapMapCards = function () {
    var htmlArray = Object.entries(MAP_CONFIG).map(function (_a) {
        var empire = _a[0], data = _a[1];
        return "\n  <div id=\"pr_".concat(empire, "\" class=\"pr_map_card\" data-card-id=\"medieval_").concat(empire, "\" style=\"top: calc(var(--paxRenMapScale) * ").concat(data.top, "px); left: calc(var(--paxRenMapScale) * ").concat(data.left, "px);\">\n    ").concat(Object.entries(data.cities)
            .map(function (_a) {
            var city = _a[0], coords = _a[1];
            return "<div id=\"pr_".concat(city, "\" class=\"pr_city\" style=\"top: calc(var(--paxRenMapScale) * ").concat(coords.top, "px); left: calc(var(--paxRenMapScale) * ").concat(coords.left, "px);\"></div>");
        })
            .join(""), "\n  </div>\n");
    });
    return htmlArray.join("");
};
var tplGameMapVictoryCards = function () { return "\n  ".concat(Object.entries(VICTORY_CARD_CONFIG)
    .map(function (_a) {
    var victory = _a[0], _b = _a[1], top = _b.top, left = _b.left;
    return "<div id=\"pr_".concat(victory, "_slot\" class=\"pr_victory_slot\" style=\"top: calc(var(--paxRenCardScale) * ").concat(top, "px); left: calc(var(--paxRenCardScale) * ").concat(left, "px);\"></div>");
})
    .join(""), "\n  "); };
var tplGameMap = function () { return "\n<div id=\"pr_game_map_container\">\n  <div class=\"pr_game_map_zoom_buttons\">\n    <button id=\"pr_game_map_zoom_out_button\" type=\"button\" class=\"bga-zoom-button bga-zoom-out-icon\" style=\"margin-bottom: -5px;\"></button>\n    <button id=\"pr_game_map_zoom_in_button\" type=\"button\" class=\"bga-zoom-button bga-zoom-in-icon\" style=\"margin-bottom: -5px;\"></button>\n  </div>\n  <div id=\"pr_game_map\">\n    ".concat(tplGameMapVictoryCards(), "\n    ").concat(tplGameMapEmpireCards(), "\n    ").concat(tplGameMapMapCards(), "\n    ").concat(tplGameMapMapBorders(), "\n    ").concat(tplGameMapSupply(), "\n    ").concat(tplGameMapMarket(), "\n  </div>\n</div>"); };
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
        var icon = _a.icon, initialValue = _a.initialValue, extraIconClasses = _a.extraIconClasses;
        var container = document.getElementById(this.containerId);
        if (!container) {
            return;
        }
        container.insertAdjacentHTML("beforeend", tplIconCounter({ extraIconClasses: extraIconClasses, icon: icon, iconCounterId: this.iconCounterId, value: initialValue }));
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
    var icon = _a.icon, iconCounterId = _a.iconCounterId, value = _a.value, extraIconClasses = _a.extraIconClasses;
    return "\n  <div id=\"".concat(iconCounterId, "\" class=\"pr_icon_counter_container").concat(value === 0 ? ' pr_none' : '', "\">\n    <span id=\"").concat(iconCounterId, "_counter\" class=\"pr_counter\"></span>\n    <div id=\"").concat(iconCounterId, "_icon\" class=\"pr_icon").concat(extraIconClasses ? " ".concat(extraIconClasses) : '', "\" data-icon=\"").concat(icon, "\"></div>\n  </div>");
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
var LOG_TOKEN_BOLD_TEXT = "boldText";
var LOG_TOKEN_CARD_NAME = "cardName";
var LOG_TOKEN_NEW_LINE = "newLine";
var LOG_TOKEN_PLAYER_NAME = "playerName";
var LOG_TOKEN_FLORIN = "florin";
var LOG_TOKEN_MAP_TOKEN = "mapToken";
var LOG_TOKEN_ONE_SHOT = "oneShot";
var LOG_TOKEN_PRESTIGE = 'prestige';
var LOG_TOKEN_TABLEAU_OP = 'tableauOp';
var tooltipIdCounter = 0;
var getTokenDiv = function (_a) {
    var key = _a.key, value = _a.value, game = _a.game;
    var splitKey = key.split("_");
    var type = splitKey[1];
    switch (type) {
        case LOG_TOKEN_BOLD_TEXT:
        case LOG_TOKEN_CARD_NAME:
            return tlpLogTokenBoldText({ text: value });
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
            return tplIcon({ icon: "prestige_".concat(value), classes: 'pr_prestige_icon' });
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
var tlpLogTokenBoldText = function (_a) {
    var text = _a.text;
    return "<span style=\"font-weight: 700;\">".concat(_(text), "</span>");
};
var tplLogTokenPlayerName = function (_a) {
    var name = _a.name, color = _a.color;
    return "<span class=\"playername\" ".concat(COLORS_WITH_SHADOW.includes(COLOR_MAP[color]) ? 'data-shadow="true"' : '', " style=\"color:#").concat(color, ";\">").concat(name, "</span>");
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
        var node = document.getElementById("pr_deck_counter_".concat(comet));
        if (node) {
            node.classList.add(PR_NONE);
        }
    };
    Market.prototype.removeCometOpacity = function (comet) {
        var node = document.getElementById("pr_deck_counter_".concat(comet));
        if (node) {
            node.classList.remove(PR_NONE);
        }
    };
    Market.prototype.moveFlorinAnimation = function (_a) {
        var index = _a.index, fromId = _a.fromId, toId = _a.toId;
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
                            style: "position: absolute;",
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
                                transitionTimingFunction: "ease-in-out",
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
                            .counters.florins.incValue(-1);
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
                            .counters.florins.incValue(1);
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
        console.log("notifications subscriptions setup");
        var notifs = [
            ["log", undefined],
            ["changeEmpireToMedievalState", undefined],
            ["changeEmpireToTheocracy", undefined],
            ["declareVictory", undefined],
            ["discardCard", undefined],
            ["flipEmpireCard", undefined],
            ["flipVictoryCard", undefined],
            ["moveEmpireSquare", undefined],
            ["moveToken", undefined],
            ["payFlorinsToChina", undefined],
            ["placeToken", undefined],
            ["playCard", undefined],
            ["purchaseCard", undefined],
            ["refreshHand", undefined],
            ["refreshMarket", undefined],
            ["refreshUI", undefined],
            ["repressToken", undefined],
            ["returnToSupply", undefined],
            ["sellCard", undefined],
            ["tableauOpCommerce", undefined],
            ["tableauOpTaxPay", undefined],
            ["tradeFairConvene", undefined],
            ["tradeFairEmporiumSubsidy", undefined],
            ["tradeFairProfitDispersalPirates", undefined],
            ["tradeFairProfitDispersalPlayer", undefined],
            ["vassalage", undefined],
        ];
        notifs.forEach(function (notif) {
            _this.subscriptions.push(dojo.subscribe(notif[0], _this, function (notifDetails) {
                debug("notif_".concat(notif[0]), notifDetails);
                var msg = _this.game.format_string_recursive(notifDetails.log, notifDetails.args);
                if (msg != "") {
                    $("gameaction_status").innerHTML = msg;
                    $("pagemaintitletext").innerHTML = msg;
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
                debug("notif_log", notif.args);
                return [2, Promise.resolve()];
            });
        });
    };
    NotificationManager.prototype.notif_changeEmpireToMedievalState = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var empire;
            return __generator(this, function (_a) {
                empire = notif.args.empire;
                this.game.gameMap.setEmpireReligion({
                    empireId: empire.id,
                    religion: MEDIEVAL,
                });
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_changeEmpireToTheocracy = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, empire, religion;
            return __generator(this, function (_b) {
                _a = notif.args, empire = _a.empire, religion = _a.religion;
                this.game.gameMap.setEmpireReligion({ empireId: empire.id, religion: religion });
                return [2];
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
            var _a, playerId, card, toLocationId;
            return __generator(this, function (_b) {
                _a = notif.args, playerId = _a.playerId, card = _a.card, toLocationId = _a.toLocationId;
                if (card.type === TABLEAU_CARD && toLocationId === DISCARD) {
                    this.game.tableauCardManager.removeCard(card);
                }
                else if (card.type === EMPIRE_CARD) {
                    this.game.gameMap
                        .getEmpireSquareStock({ empireId: card.empire })
                        .addCard(card);
                }
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_flipEmpireCard = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, card, formerSuzerain, oldSide, player;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, card = _a.card, formerSuzerain = _a.formerSuzerain;
                        oldSide = card.side === REPUBLIC ? KING : REPUBLIC;
                        player = this.getPlayer({ playerId: playerId });
                        this.removePrestige({ prestige: card[oldSide].prestige, player: player });
                        if (!(formerSuzerain !== null)) return [3, 2];
                        this.game.tableauCardManager.removeVassal({ suzerain: formerSuzerain });
                        return [4, player.tableau.addCard(card)];
                    case 1:
                        _b.sent();
                        return [3, 3];
                    case 2:
                        this.game.tableauCardManager.updateCardInformations(card);
                        _b.label = 3;
                    case 3:
                        this.addPrestige({ prestige: card[card.side].prestige, player: player });
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
            var _a, playerId, card, from, player;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, card = _a.card, from = _a.from;
                        this.handleEmpireSquareOririnData({ card: card, from: from });
                        player = this.getPlayer({ playerId: playerId });
                        return [4, player.tableau.addCard(card)];
                    case 1:
                        _b.sent();
                        this.addPrestige({ prestige: card[card.side].prestige, player: player });
                        return [2];
                }
            });
        });
    };
    NotificationManager.prototype.notif_moveToken = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, token, tokenNode, node;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, token = _a.token;
                        tokenNode = document.getElementById(token.id);
                        node = document.getElementById(token["type"] === BISHOP
                            ? "".concat(token.location, "_tokens")
                            : "pr_".concat(token.location));
                        if (!tokenNode) return [3, 2];
                        return [4, this.game.animationManager.attachWithAnimation(new BgaSlideAnimation({ element: tokenNode }), node)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2, Promise.resolve()];
                }
            });
        });
    };
    NotificationManager.prototype.notif_payFlorinsToChina = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, amount;
            return __generator(this, function (_b) {
                _a = notif.args, playerId = _a.playerId, amount = _a.amount;
                this.getPlayer({ playerId: playerId }).counters.florins.incValue(-amount);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_placeToken = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, token, fromLocationId, split, isPawn, isBishop, fromSupply, node, tokenNode;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, token = _a.token, fromLocationId = _a.fromLocationId;
                        split = token.id.split("_");
                        isPawn = split[0] === PAWN;
                        isBishop = split[0] === BISHOP;
                        fromSupply = fromLocationId.startsWith("supply");
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
                        node = document.getElementById(isBishop ? "".concat(token.location, "_tokens") : "pr_".concat(token.location));
                        if (!node) {
                            return [2];
                        }
                        if (!fromSupply) return [3, 1];
                        node.insertAdjacentHTML("beforeend", tplToken(token));
                        return [3, 3];
                    case 1:
                        tokenNode = document.getElementById(token.id);
                        if (!tokenNode) return [3, 3];
                        return [4, this.game.animationManager.attachWithAnimation(new BgaSlideAnimation({ element: tokenNode }), node)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2, Promise.resolve()];
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
                        player.counters.cards[card.region].incValue(-1);
                        return [4, player.tableau.addCard(card)];
                    case 1:
                        _b.sent();
                        card.prestige.forEach(function (prestige) {
                            return player.counters.prestige[prestige].incValue(1);
                        });
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
            var _a, cardMoves, cardDraws, _i, cardMoves_1, move, from, to, card, _b, _1, fromRegion, fromColumn, _c, _2, toRegion, toCol, florinsOnCard, _d, cardDraws_1, card;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = notif.args, cardMoves = _a.cardMoves, cardDraws = _a.cardDraws;
                        _i = 0, cardMoves_1 = cardMoves;
                        _e.label = 1;
                    case 1:
                        if (!(_i < cardMoves_1.length)) return [3, 4];
                        move = cardMoves_1[_i];
                        from = move.from, to = move.to, card = move.card;
                        _b = from.split("_"), _1 = _b[0], fromRegion = _b[1], fromColumn = _b[2];
                        _c = to.split("_"), _2 = _c[0], toRegion = _c[1], toCol = _c[2];
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
                        return [4, this.game.market
                                .getStock({
                                region: toRegion,
                                column: Number(toCol),
                            })
                                .addCard(card)];
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
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_repressToken = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, token, cost, element, empireSquareId, toNode;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = notif.args, playerId = _a.playerId, token = _a.token, cost = _a.cost;
                        this.getPlayer({ playerId: playerId }).counters.florins.incValue(-cost);
                        element = document.getElementById(token.id);
                        empireSquareId = token.location;
                        toNode = document.getElementById("".concat(empireSquareId, "_tokens"));
                        if (!(element && toNode)) {
                            return [2];
                        }
                        return [4, this.game.animationManager.attachWithAnimation(new BgaSlideAnimation({ element: element }), toNode)];
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
                player.counters.florins.incValue(value);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_returnToSupply = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, token, node, split;
            return __generator(this, function (_b) {
                _a = notif.args, playerId = _a.playerId, token = _a.token;
                node = document.getElementById(token.id);
                if (node) {
                    node.remove();
                }
                split = token.id.split("_");
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
            });
        });
    };
    NotificationManager.prototype.notif_tableauOpCommerce = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, playerId, card, _b, _, region, column;
            return __generator(this, function (_c) {
                _a = notif.args, playerId = _a.playerId, card = _a.card;
                _b = card.location.split("_"), _ = _b[0], region = _b[1], column = _b[2];
                this.game.market.incFlorinValue({
                    region: region,
                    column: Number(column),
                    value: -1,
                });
                this.getPlayer({ playerId: playerId }).counters.florins.incValue(1);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_tableauOpTaxPay = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var playerId;
            return __generator(this, function (_a) {
                playerId = notif.args.playerId;
                this.getPlayer({ playerId: playerId }).counters.florins.incValue(-1);
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_tradeFairConvene = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, florinsFromChina, region, stock, card;
            return __generator(this, function (_b) {
                _a = notif.args, florinsFromChina = _a.florinsFromChina, region = _a.region;
                this.game.market.incFlorinValue({
                    region: region,
                    column: 0,
                    value: florinsFromChina,
                });
                stock = this.game.market.getStock({ region: region, column: 0 });
                card = stock.getCards()[0];
                stock.removeCard(card);
                return [2, Promise.resolve()];
            });
        });
    };
    NotificationManager.prototype.notif_tradeFairEmporiumSubsidy = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, amount, playerId, region;
            return __generator(this, function (_b) {
                _a = notif.args, amount = _a.amount, playerId = _a.playerId, region = _a.region;
                this.game.market.incFlorinValue({
                    region: region,
                    column: 0,
                    value: -amount,
                });
                this.getPlayer({ playerId: playerId }).counters.florins.incValue(amount);
                return [2, Promise.resolve()];
            });
        });
    };
    NotificationManager.prototype.notif_tradeFairProfitDispersalPirates = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var region;
            return __generator(this, function (_a) {
                region = notif.args.region;
                this.game.market.incFlorinValue({
                    region: region,
                    column: 0,
                    value: -1,
                });
                return [2, Promise.resolve()];
            });
        });
    };
    NotificationManager.prototype.notif_tradeFairProfitDispersalPlayer = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, region, playerId;
            return __generator(this, function (_b) {
                _a = notif.args, region = _a.region, playerId = _a.playerId;
                this.game.market.incFlorinValue({
                    region: region,
                    column: 0,
                    value: -1,
                });
                this.getPlayer({ playerId: playerId }).counters.florins.incValue(1);
                return [2, Promise.resolve()];
            });
        });
    };
    NotificationManager.prototype.notif_vassalage = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, from, vassal, suzerain, playerId, player;
            return __generator(this, function (_b) {
                _a = notif.args, from = _a.from, vassal = _a.vassal, suzerain = _a.suzerain, playerId = _a.playerId;
                this.handleEmpireSquareOririnData({ from: from, card: vassal });
                this.game.tableauCardManager.addVassal({ vassal: vassal, suzerain: suzerain });
                player = this.getPlayer({ playerId: playerId });
                this.addPrestige({ player: player, prestige: vassal[vassal.side].prestige });
                return [2];
            });
        });
    };
    NotificationManager.prototype.notif_smallRefreshInterface = function (notif) {
        var updatedGamedatas = __assign(__assign({}, this.game.gamedatas), notif.args);
        this.game.clearInterface();
        this.game.gamedatas = updatedGamedatas;
        this.game.playerManager.updatePlayers({ gamedatas: updatedGamedatas });
    };
    NotificationManager.prototype.handleEmpireSquareOririnData = function (_a) {
        var card = _a.card, from = _a.from;
        var suzerain = from.suzerain, previousOwnerId = from.previousOwnerId, wasRepublic = from.wasRepublic;
        if (suzerain && previousOwnerId) {
            this.game.tableauCardManager.removeVassal({ suzerain: suzerain });
        }
        if (previousOwnerId) {
            var previousOwner = this.getPlayer({ playerId: previousOwnerId });
            this.removePrestige({
                player: previousOwner,
                prestige: card[wasRepublic ? REPUBLIC : KING].prestige,
            });
        }
    };
    NotificationManager.prototype.addPrestige = function (_a) {
        var player = _a.player, prestige = _a.prestige;
        prestige.forEach(function (prestige) {
            player.counters.prestige[prestige].incValue(1);
        });
    };
    NotificationManager.prototype.removePrestige = function (_a) {
        var player = _a.player, prestige = _a.prestige;
        prestige.forEach(function (prestige) {
            player.counters.prestige[prestige].incValue(-1);
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
        var _b = location.split("_"), _ = _b[0], region = _b[1], colummn = _b[2];
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
var PlayerManager = (function () {
    function PlayerManager(game) {
        console.log("Constructor PlayerManager");
        this.game = game;
        this.players = {};
        this.setupPlayerTableaux({
            playerOrder: game.gamedatas.playerorder.map(function (playerId) {
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
            .getElementById("pr_play_area")
            .insertAdjacentHTML("beforeend", tplPlayerTableauxContainer({ playerOrder: playerOrder }));
    };
    PlayerManager.prototype.getPlayer = function (_a) {
        var playerId = _a.playerId;
        return this.players[playerId];
    };
    PlayerManager.prototype.getPlayers = function () {
        return Object.values(this.players);
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
        };
        this.game = game;
        this.bank = player.bank;
        var playerId = player.id;
        this.playerId = Number(playerId);
        this.player = player;
        this.playerName = player.name;
        this.playerColor = COLOR_MAP[player.color];
        this.playerHexColor = player.color;
        var gamedatas = game.gamedatas;
        this.setupPlayer({ gamedatas: gamedatas, player: player });
    }
    PRPlayer.prototype.clearInterface = function () {
        this.tableau.clearInterface();
    };
    PRPlayer.prototype.updatePlayer = function (_a) {
        var gamedatas = _a.gamedatas;
        var playerGamedatas = gamedatas.players[this.playerId];
        this.player = playerGamedatas;
        this.updatePlayerPanel({ playerGamedatas: playerGamedatas });
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
        this.setupPlayerPanel({ playerGamedatas: playerGamedatas, player: player });
        this.setupHand({ gamedatas: gamedatas, player: player });
    };
    PRPlayer.prototype.setupPlayerPanel = function (_a) {
        var _this = this;
        var playerGamedatas = _a.playerGamedatas, player = _a.player;
        var playerBoardDiv = $("player_board_" + this.playerId);
        playerBoardDiv.insertAdjacentHTML("beforeend", tplPlayerPanel({ playerId: this.playerId }));
        [CATHOLIC, ISLAMIC, REFORMIST].forEach(function (prestige) {
            _this.counters.prestige[prestige] = new IconCounter({
                containerId: "pr_player_panel_icons_".concat(_this.playerId),
                extraIconClasses: "pr_prestige_icon",
                icon: "prestige_".concat(prestige),
                iconCounterId: "pr_prestige_".concat(prestige, "_counter_").concat(_this.playerId),
                initialValue: 0,
            });
        });
        this.counters.cards.west = new IconCounter({
            containerId: "pr_player_panel_icons_".concat(this.playerId),
            extraIconClasses: "pr_card_back_icon",
            icon: "west_back",
            iconCounterId: "pr_cards_west_counter_".concat(this.playerId),
            initialValue: 0,
        });
        [LAW, DISCOVERY, PATRON].forEach(function (prestige) {
            _this.counters.prestige[prestige] = new IconCounter({
                containerId: "pr_player_panel_icons_".concat(_this.playerId),
                extraIconClasses: "pr_prestige_icon",
                icon: "prestige_".concat(prestige),
                iconCounterId: "pr_prestige_".concat(prestige, "_counter_").concat(_this.playerId),
                initialValue: 0,
            });
        });
        this.counters.cards.east = new IconCounter({
            containerId: "pr_player_panel_icons_".concat(this.playerId),
            extraIconClasses: "pr_card_back_icon",
            icon: "east_back",
            iconCounterId: "pr_cards_east_counter_".concat(this.playerId),
            initialValue: 0,
        });
        this.counters.florins = new IconCounter({
            containerId: "pr_player_panel_icons_".concat(this.playerId),
            icon: "florin",
            iconCounterId: "pr_florins_counter_".concat(this.playerId),
            initialValue: player.florins,
        });
        if (COLORS_WITH_SHADOW.includes(this.getColor())) {
            var node = document.getElementById("player_name_".concat(this.playerId));
            if (node) {
                node.setAttribute("data-shadow", "true");
            }
        }
        this.updatePlayerPanel({ playerGamedatas: playerGamedatas });
    };
    PRPlayer.prototype.updatePlayerPanel = function (_a) {
        var _this = this;
        var _b;
        var playerGamedatas = _a.playerGamedatas;
        this.counters.cards.east.setValue(this.player.hand.counts.east);
        this.counters.cards.west.setValue(this.player.hand.counts.west);
        if ((_b = this.game.framework().scoreCtrl) === null || _b === void 0 ? void 0 : _b[this.playerId]) {
            this.game
                .framework()
                .scoreCtrl[this.playerId].setValue(Number(playerGamedatas.score));
        }
        var allCards = __spreadArray(__spreadArray([], playerGamedatas.tableau.cards.east, true), playerGamedatas.tableau.cards.west, true);
        allCards.forEach(function (card) {
            if (card.type === TABLEAU_CARD) {
                card.prestige.forEach(function (prestige) {
                    _this.counters.prestige[prestige].incValue(1);
                });
            }
            else if (card.type === EMPIRE_CARD) {
                card[card.side].prestige.forEach(function (prestige) {
                    _this.counters.prestige[prestige].incValue(1);
                });
            }
        });
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
                                toId: "overall_player_board_".concat(this.playerId),
                                remove: true,
                            })];
                    case 3:
                        _b.sent();
                        this.game.tableauCardManager.removeCard(card);
                        _b.label = 4;
                    case 4:
                        this.counters.cards[card.region].incValue(1);
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
                        this.counters.cards[card.region].incValue(-1);
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
        this.game = game;
        this.setup({ player: player });
    }
    PlayerTableau.prototype.clearInterface = function () {
        this.tableauEast.removeAll();
        this.tableauWest.removeAll();
    };
    PlayerTableau.prototype.updateInterface = function (_a) {
        var player = _a.player;
        this.updateCards({ player: player });
    };
    PlayerTableau.prototype.setup = function (_a) {
        var player = _a.player;
        document
            .getElementById("pr_player_tableau_".concat(player.id))
            .insertAdjacentHTML("beforeend", tplPlayerTableauContent({
            player: player,
            title: _("${tkn_playerName}'s tableau").replace("${tkn_playerName}", tplLogTokenPlayerName({
                name: player.name,
                color: player.color,
            })),
        }));
        this.tableauEast = new LineStock(this.game.tableauCardManager, document.getElementById("tableau_east_".concat(player.id)), { center: false, sort: sortFunction("state"), gap: "12px" });
        this.tableauWest = new LineStock(this.game.tableauCardManager, document.getElementById("tableau_west_".concat(player.id)), { center: false, sort: sortFunction("state"), gap: "12px" });
        this.updateCards({ player: player });
    };
    PlayerTableau.prototype.updateCards = function (_a) {
        var _this = this;
        var player = _a.player;
        this.tableauEast.addCards(player.tableau.cards[EAST].filter(function (card) { return card.type === TABLEAU_CARD || !card.isVassal; }));
        this.tableauWest.addCards(player.tableau.cards[WEST].filter(function (card) { return card.type === TABLEAU_CARD || !card.isVassal; }));
        player.tableau.tokens.forEach(function (token) {
            var location = token.location;
            var node = document.getElementById("".concat(location, "_tokens"));
            if (!node) {
                return;
            }
            node.insertAdjacentHTML("beforeend", tplToken(token));
        });
        __spreadArray(__spreadArray([], player.tableau.cards[EAST], true), player.tableau.cards[WEST], true).filter(function (card) { return card.type === EMPIRE_CARD && card.isVassal; })
            .forEach(function (card) {
            _this.game.tableauCardManager.addVassal({
                vassal: card,
                suzerain: _this.game.gamedatas.empireSquares.find(function (empireCard) { return empireCard.id === card.suzerainId; }),
            });
        });
    };
    PlayerTableau.prototype.addCard = function (card) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(card.location.split("_")[1] === EAST)) return [3, 2];
                        return [4, this.tableauEast.addCard(card)];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2: return [4, this.tableauWest.addCard(card)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    return PlayerTableau;
}());
var tplPlayerTableauContent = function (_a) {
    var player = _a.player, title = _a.title;
    var playerId = player.id;
    return "\n  <div class=\"pr_player_tableau_title\"><span>".concat(title, "</span></div>\n  <div class=\"pr_player_tableau_cards_container\">\n    <div id=\"tableau_west_").concat(playerId, "\" class=\"pr_player_board_tableau_cards\" data-region=\"west\"></div>\n    <div class=\"pr_player_board\" data-color=\"").concat(COLOR_MAP[player.color], "\"></div>\n    <div id=\"tableau_east_").concat(playerId, "\" class=\"pr_player_board_tableau_cards\" data-region=\"east\"></div>\n  </div>\n    ");
};
var tplPlayerPanel = function (_a) {
    var playerId = _a.playerId;
    return "<div id=\"pr_player_panel_".concat(playerId, "\" class=\"pr_player_panel\">\n            <div id=\"pr_player_panel_icons_").concat(playerId, "\" class=\"pr_player_panel_icons\"></div>\n          </div>");
};
var tplPlayerTableauxContainer = function (_a) {
    var playerOrder = _a.playerOrder;
    console.log("playerOrderInTpl", playerOrder);
    return "\n    <div id=\"pr_player_tableaux\">\n    ".concat(playerOrder
        .map(function (playerId) {
        return "<div id=\"pr_player_tableau_".concat(playerId, "\" class=\"pr_player_tableau\"></div>");
    })
        .join(""), "\n    </div>\n  ");
};
var TokenCounter = (function () {
    function TokenCounter() {
        this.counter = new ebg.counter();
    }
    TokenCounter.prototype.setup = function (_a) {
        var separator = _a.separator, type = _a.type, value = _a.value;
        var supplyContainer = document.getElementById('pr_supply');
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
        console.log("setupTokenCounters");
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
    return "\n    <div class=\"pr_token_counter_container\">\n      <span id=\"".concat(id, "_counter\" ></span>\n      <div class=\"pr_token_counter_token\">\n        ").concat(tplToken({ id: id, type: type, separator: separator }), "\n      </div>\n    </div>");
};
var tplGameMapSupply = function () {
    return "\n    <div id=\"pr_supply\">\n      \n    </div>\n  ";
};
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
                tkn_playerName: this.game.playerManager.getPlayer({ playerId: activePlayerId }).getName()
            },
            nonActivePlayers: true,
        });
    };
    AnnounceOneShotState.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must decide if ${tkn_oneShot} One-shot occurs"),
            args: {
                tkn_playerName: '${you}',
                tkn_oneShot: this.args.oneShot,
            },
        });
        this.game.addPrimaryActionButton({
            id: "occurs_button",
            text: _("Yes, occurs"),
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
            text: _("No, does not occur"),
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
            text: _("${tkn_playerName} must select a Tokens to eliminate ${remaining}"),
            args: {
                tkn_playerName: "${you}",
                remaining: {
                    log: _("(${number} remaining)"),
                    args: {
                        number: this.args.numberToEliminate,
                    },
                },
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
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actBattleCasualties",
                    args: {
                        agent: agent,
                    },
                });
            },
        });
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
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actBattleCasualties",
                    args: {
                        tokenId: token.id,
                    },
                });
            },
        });
        this.game.addCancelButton();
    };
    BattleCasualtiesState.prototype.addAgentButtons = function () {
        var _this = this;
        this.args.agents.forEach(function (agent, index) {
            _this.game.addPrimaryActionButton({
                id: "agent_button_".concat(index),
                text: "".concat(agent.type, " agent"),
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
            text: _("${tkn_playerName} must select an Empire to Battle in"),
            args: {
                tkn_playerName: "${you}",
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
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actBattleLocation",
                    args: {
                        empireId: empire.id,
                    },
                });
            },
        });
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
                tkn_playerName: this.game.playerManager.getPlayer({ playerId: activePlayerId }).getName()
            },
            nonActivePlayers: true,
        });
    };
    BishopPacificationState.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} may choose a Token to Kill"),
            args: {
                tkn_playerName: '${you}'
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
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actBishopPacification",
                    args: {
                        tokenId: token.id,
                    },
                });
            },
        });
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
var ClientDeclareVictoryState = (function () {
    function ClientDeclareVictoryState(game) {
        this.game = game;
    }
    ClientDeclareVictoryState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    ClientDeclareVictoryState.prototype.onLeavingState = function () {
        debug("Leaving ClientStartTradeFairState");
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
        this.game.addConfirmButton({
            callback: function () { return _this.game.takeAction({
                action: "actPlayerAction",
                args: {
                    action: "declareVictory",
                    cardId: _this.args.victoryCard.id,
                },
            }); },
        });
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
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must select a card to sell"),
            args: {
                tkn_playerName: "${you}",
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
            text: _("Sell ${cardName}?"),
            args: {
                cardName: card.type === TABLEAU_CARD ? card.name : card[card.side].name,
            },
        });
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actPlayerAction",
                    args: {
                        action: "sellCard",
                        cardId: card.id,
                    },
                });
            },
        });
        this.game.addCancelButton();
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
        this.game.setCardSelected({ id: this.args.card.id, back: true });
        this.game.setLocationSelected({ id: this.args.city.id });
        this.game.clientUpdatePageTitle({
            text: _("Convene ${region} trade fair from ${cityName}?"),
            args: {
                cityName: _(this.args.city.name),
                region: this.args.city.emporium === EAST ? _("East") : _("West"),
            },
        });
        this.game.addConfirmButton({
            callback: function () { return _this.game.takeAction({
                action: "actPlayerAction",
                args: {
                    action: "tradeFair",
                    region: _this.args.city.emporium,
                },
            }); },
        });
        this.game.addCancelButton();
    };
    return ClientStartTradeFairState;
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
            text: _("${tkn_playerName} must confirm the switch of player. You will not be able to restart your turn"),
            args: {
                tkn_playerName: '${you}'
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
            text: _("${tkn_playerName} must confirm or restart your turn"),
            args: {
                tkn_playerName: '${you}'
            },
        });
        this.game.addConfirmButton({
            callback: function () { return _this.game.takeAction({ action: 'actConfirmTurn' }); }
        });
        this.game.addUndoButtons(this.args);
    };
    return ConfirmTurnState;
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
                tkn_playerName: this.game.playerManager.getPlayer({ playerId: activePlayerId }).getName()
            },
            nonActivePlayers: true,
        });
    };
    FlipVictoryCardState.prototype.updateInterfaceInitialStep = function () {
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must flip an inactive Victory Card"),
            args: {
                tkn_playerName: '${you}'
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
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actFlipVictoryCard",
                    args: {
                        cardId: card.id,
                    },
                });
            },
        });
        this.game.addCancelButton();
    };
    FlipVictoryCardState.prototype.setVictoryCardsSelectable = function () {
        var _this = this;
        this.args.victoryCards.forEach(function (card) {
            var node = document.getElementById("".concat(card.id, "-back"));
            if (!node) {
                return;
            }
            node.classList.add(PR_SELECTABLE);
            _this.game._connections.push(dojo.connect(node, "onclick", _this, function () {
                return _this.updateInterfaceConfirmSelectCard({ card: card });
            }));
        });
    };
    return FlipVictoryCardState;
}());
var PlaceAgentState = (function () {
    function PlaceAgentState(game) {
        this.game = game;
    }
    PlaceAgentState.prototype.onEnteringState = function (args) {
        this.args = args;
        this.updateInterfaceInitialStep();
    };
    PlaceAgentState.prototype.onLeavingState = function () {
        debug("Leaving PlaceAgentState");
    };
    PlaceAgentState.prototype.setDescription = function (activePlayerId, args) {
        this.args = args;
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} may place ${tkn_mapToken}"),
            args: {
                tkn_playerName: this.game.playerManager
                    .getPlayer({ playerId: activePlayerId })
                    .getName(),
                tkn_mapToken: this.createMapTokenId(),
            },
            nonActivePlayers: true,
        });
    };
    PlaceAgentState.prototype.updateInterfaceInitialStep = function () {
        var _this = this;
        this.game.clearPossible();
        this.updatePageTitle();
        this.setLocationsSelectable();
        if (this.args.optionalAction) {
            this.game.addSkipButton({
                callback: function () {
                    return _this.game.takeAction({
                        action: "actPlaceAgent",
                        args: {
                            agent: _this.args.agents[0],
                            locationId: null,
                        },
                    });
                },
            });
        }
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
                tkn_playerName: "${you}",
                tkn_mapToken: this.createMapTokenId(),
                location: _(card.type === EMPIRE_CARD ? card[card.side].name : card.name),
            },
        });
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actPlaceAgent",
                    args: {
                        agent: _this.args.agents[0],
                        locationId: id,
                    },
                });
            },
        });
        this.game.addCancelButton();
    };
    PlaceAgentState.prototype.updateInterfaceConfirmLocation = function (_a) {
        var _this = this;
        var id = _a.id, location = _a.location;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: id });
        this.updatePageTitleConfirmLocation({ location: location });
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actPlaceAgent",
                    args: {
                        agent: _this.args.agents[0],
                        locationId: id,
                    },
                });
            },
        });
        this.game.addCancelButton();
    };
    PlaceAgentState.prototype.createMapTokenId = function () {
        var agent = this.args.agents[0];
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
                    callback: function () { return _this.updateInterfaceConfirmLocation({ id: id, location: location }); },
                });
            }
        });
    };
    PlaceAgentState.prototype.updatePageTitle = function () {
        this.game.clientUpdatePageTitle({
            text: this.args.optionalAction
                ? _("${tkn_playerName} may select a location to place ${tkn_mapToken}")
                : _("${tkn_playerName} must select a location to place ${tkn_mapToken}"),
            args: {
                tkn_playerName: "${you}",
                tkn_mapToken: this.createMapTokenId(),
            },
        });
    };
    PlaceAgentState.prototype.updatePageTitleConfirmLocation = function (_a) {
        var location = _a.location;
        var name = location.name, cost = location.cost, repressed = location.repressed;
        if (repressed) {
            this.game.clientUpdatePageTitle({
                text: cost > 0
                    ? _("Place ${tkn_mapToken} on ${location} and pay ${cost} ${tkn_florin} to Repress ${tkn_mapToken_repressed} ?")
                    : _("Place ${tkn_mapToken} on ${location} and Repress ${tkn_mapToken_repressed} ?"),
                args: {
                    tkn_playerName: "${you}",
                    tkn_mapToken: this.createMapTokenId(),
                    location: _(name),
                    cost: cost,
                    tkn_florin: tknFlorin(),
                    tkn_mapToken_repressed: tknMapToken(repressed.id),
                },
            });
        }
        else {
            this.game.clientUpdatePageTitle({
                text: _("Place ${tkn_mapToken} on ${location}?"),
                args: {
                    tkn_playerName: "${you}",
                    tkn_mapToken: this.createMapTokenId(),
                    location: _(name),
                },
            });
        }
    };
    return PlaceAgentState;
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
        debug("Leaving PlayerActionsState");
    };
    PlayerActionState.prototype.setDescription = function (activePlayerId) {
        console.log("setDescription playerAction", activePlayerId);
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} may perform actions"),
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
        this.setVictoryCardsSelectable();
        this.addActionButtons();
        this.game.addUndoButtons(this.args);
    };
    PlayerActionState.prototype.updateInterfaceConfirmPurchase = function (_a) {
        var _this = this;
        var card = _a.card, column = _a.column;
        this.game.clearPossible();
        this.game.setCardSelected({ id: card.id });
        this.game.clientUpdatePageTitle({
            text: _("Purchase ${cardName} for ${amount} ${tkn_florin} ?"),
            args: {
                amount: column,
                cardName: _(card.name),
                tkn_florin: _("Florin(s)"),
            },
        });
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actPlayerAction",
                    args: {
                        action: "purchaseCard",
                        cardId: card.id,
                    },
                });
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
            text: _("Play ${cardName} to tableau?"),
            args: {
                cardName: _(card.name),
            },
        });
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actPlayerAction",
                    args: {
                        action: "playCard",
                        cardId: card.id,
                    },
                });
            },
        });
        this.game.addCancelButton();
    };
    PlayerActionState.prototype.addActionButtons = function () {
        var _this = this;
        REGIONS.forEach(function (region) {
            if (Object.keys(_this.args.availableOps[region]).length > 0) {
                _this.game.addPrimaryActionButton({
                    id: "".concat(region, "_ops_btn"),
                    text: region === EAST ? _("Tableau Ops East") : _("Tableau Ops West"),
                    callback: function () {
                        return _this.game.takeAction({
                            action: "actPlayerAction",
                            args: {
                                action: "tableauOps",
                                region: region,
                            },
                        });
                    },
                });
            }
        });
        if (this.args.cardsPlayerCanSell.length > 0) {
            this.game.addPrimaryActionButton({
                id: 'sell_card_btn',
                text: _('Sell card'),
                callback: function () {
                    return _this.game
                        .framework()
                        .setClientState(CLIENT_SELL_CARD_STATE, {
                        args: {
                            cards: _this.args.cardsPlayerCanSell
                        },
                    });
                },
            });
        }
    };
    PlayerActionState.prototype.addTest = function () {
        var _this = this;
        this.game.addPrimaryActionButton({
            text: "Test",
            id: "test_button",
            callback: function () {
                console.log("Testing");
                var card = _this.game.gameMap
                    .getEmpireSquareStock({ empireId: ENGLAND })
                    .getCards()[0];
                console.log("card", card);
                var node = document.getElementById("EmpireSquare_Aragon");
                console.log("node", node);
                node.style.minHeight = "calc(var(--paxRenCardScale) * ".concat(2 * 151, "px)");
                console.log(_this.game.tableauCardManager.vassalStocks);
                _this.game.tableauCardManager.vassalStocks[ARAGON].addCard(card);
            },
        });
        this.game.addPrimaryActionButton({
            text: "Test2",
            id: "test2_button",
            callback: function () {
                console.log("Testing");
                var card = _this.game.gameMap
                    .getEmpireSquareStock({ empireId: HOLY_ROMAN_EMIRE })
                    .getCards()[0];
                console.log("card", card);
                var node = document.getElementById("EmpireSquare_Aragon");
                console.log("node", node);
                node.style.minHeight = "calc(var(--paxRenCardScale) * ".concat(3 * 151, "px)");
                console.log(_this.game.tableauCardManager.vassalStocks);
                _this.game.tableauCardManager.vassalStocks[ARAGON].addCard(card);
            },
        });
        this.game.addPrimaryActionButton({
            text: "Test3",
            id: "test3_button",
            callback: function () {
                console.log("Testing");
                var card = _this.game.gameMap
                    .getEmpireSquareStock({ empireId: HUNGARY })
                    .getCards()[0];
                console.log("card", card);
                var node = document.getElementById("EmpireSquare_Aragon");
                console.log("node", node);
                node.style.minHeight = "calc(var(--paxRenCardScale) * ".concat(4 * 151, "px)");
                console.log(_this.game.tableauCardManager.vassalStocks);
                _this.game.tableauCardManager.vassalStocks[ARAGON].addCard(card);
            },
        });
    };
    PlayerActionState.prototype.updatePageTitle = function () {
        var remainingActions = this.args.remainingActions;
        var titleText = _("${tkn_playerName} may perform an action");
        if (remainingActions === 1) {
            titleText += _(" (1 remaining)");
        }
        else if (remainingActions === 2) {
            titleText += _(" (2 remaining)");
        }
        this.game.clientUpdatePageTitle({
            text: titleText,
            args: {
                tkn_playerName: "${you}",
            },
        });
    };
    PlayerActionState.prototype.setHandCardsSelectable = function () {
        var _this = this;
        var cards = this.game.hand.getCards();
        cards.forEach(function (card) {
            var id = card.id;
            var nodeId = "".concat(id, "-front");
            var node = $(nodeId);
            if (node === null) {
                return;
            }
            node.classList.add(PR_SELECTABLE);
            _this.game._connections.push(dojo.connect(node, "onclick", _this, function () {
                return _this.updateInterfaceOnClickHandCard({ card: card });
            }));
        });
    };
    PlayerActionState.prototype.setMarketCardsSelectable = function () {
        var _this = this;
        this.args.cardsPlayerCanPurchase.forEach(function (card) {
            var id = card.id, location = card.location;
            var _a = location.split("_"), market = _a[0], region = _a[1], column = _a[2];
            var nodeId = "".concat(id, "-front");
            var node = $(nodeId);
            if (node === null) {
                return;
            }
            node.classList.add(PR_SELECTABLE);
            _this.game._connections.push(dojo.connect(node, "onclick", _this, function () {
                return _this.updateInterfaceConfirmPurchase({ card: card, column: Number(column) });
            }));
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
                back: true,
                callback: function () {
                    return _this.game
                        .framework()
                        .setClientState(CLIENT_START_TRADE_FAIR_STATE, { args: _this.args.tradeFair[region] });
                },
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
        var _this = this;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} may select a Repressed Token to move onto the Map"),
            args: {
                tkn_playerName: "${you}",
            },
        });
        this.game.addSkipButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actRegimeChangeEmancipation",
                    args: {
                        tokenId: null,
                        locationId: null,
                    },
                });
            },
        });
        this.setTokensSelectable();
        this.game.addUndoButtons(this.args);
    };
    RegimeChangeEmancipationState.prototype.updateInterfaceSelectLocation = function (_a) {
        var locations = _a.locations, tokenId = _a.tokenId;
        this.game.clearPossible();
        this.game.setTokenSelected({ id: tokenId });
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} must select a ${borderOrCity} to move ${tkn_mapToken} onto"),
            args: {
                tkn_playerName: "${you}",
                borderOrCity: this.args.tokens.find(function (token) { return token.id === tokenId; }).type === PAWN
                    ? _("Border")
                    : _("City"),
                tkn_mapToken: tknMapToken(tokenId),
            },
        });
        this.game.addCancelButton();
        this.setLocationsSelectable({ locations: locations, tokenId: tokenId });
    };
    RegimeChangeEmancipationState.prototype.updateInterfaceConfirmLocation = function (_a) {
        var _this = this;
        var location = _a.location, tokenId = _a.tokenId;
        this.game.clearPossible();
        this.game.setLocationSelected({ id: location.id });
        this.game.setTokenSelected({ id: tokenId });
        this.game.clientUpdatePageTitle({
            text: _("Move ${tkn_mapToken} onto ${locationName}?"),
            args: {
                tkn_mapToken: tknMapToken(tokenId),
                locationName: _(location.name),
            },
        });
        this.game.addConfirmButton({
            callback: function () {
                _this.game.clearPossible();
                _this.game.takeAction({
                    action: "actRegimeChangeEmancipation",
                    args: {
                        tokenId: tokenId,
                        locationId: location.id,
                    },
                });
            },
        });
        this.game.addCancelButton();
    };
    RegimeChangeEmancipationState.prototype.setLocationsSelectable = function (_a) {
        var _this = this;
        var locations = _a.locations, tokenId = _a.tokenId;
        locations.forEach(function (location) {
            _this.game.setLocationSelectable({
                id: location.id,
                callback: function () {
                    return _this.updateInterfaceConfirmLocation({ location: location, tokenId: tokenId });
                },
            });
        });
    };
    RegimeChangeEmancipationState.prototype.setTokensSelectable = function () {
        var _this = this;
        Object.entries(this.args.options).forEach(function (_a) {
            var tokenId = _a[0], locations = _a[1];
            _this.game.setTokenSelectable({
                id: tokenId,
                callback: function () {
                    return _this.updateInterfaceSelectLocation({ locations: locations, tokenId: tokenId });
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
            text: _("Golden Liberty: ${tkn_playerName} may change ${empireName} to a Medieval state"),
            args: {
                tkn_playerName: "${you}",
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
            text: _("${tkn_playerName} must select a ${tkn_mapToken} to place"),
            args: {
                tkn_playerName: "${you}",
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
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actSelectToken",
                    args: {
                        tokenId: id,
                    },
                });
            },
        });
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
            text: _("${tkn_playerName} must select a card to behead"),
            args: {
                tkn_playerName: "${you}",
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
                cardName: _(card.name),
            },
        });
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actTableauOpBehead",
                    args: {
                        cardId: card.id,
                    },
                });
            },
        });
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
                back: card.location.split("_")[2] === "0",
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
            text: _("${tkn_playerName} must select an Empire to campaign against"),
            args: {
                tkn_playerName: "${you}",
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
            text: cost > 0 ? _("Pay ${cost} ${tkn_florin} to campaign against ${empireName}?") : _("Campaign against ${empireName}?"),
            args: {
                empireName: _(empire.name),
                cost: cost,
                tkn_florin: tknFlorin(),
            },
        });
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actTableauOpCampaign",
                    args: {
                        empireId: empire.id,
                    },
                });
            },
        });
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
            text: _("${tkn_playerName} must select a card in the market to take 1 ${tkn_florin} from"),
            args: {
                tkn_florin: tknFlorin(),
                tkn_playerName: "${you}",
            },
        });
        this.setCardsSelectable();
        this.game.addUndoButtons(this.args);
    };
    TableauOpCommerceState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var card = _a.card;
        this.game.clearPossible();
        var isTradeFairCard = Number(card.location.split("_")[2]) === 0;
        this.game.setCardSelected({ id: card.id, back: isTradeFairCard });
        this.game.clientUpdatePageTitle({
            text: _("Take ${tkn_florin} from ${cardName}?"),
            args: {
                tkn_florin: tknFlorin(),
                cardName: isTradeFairCard ? _("trade fair card") : _(card.name),
            },
        });
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actTableauOpCommerce",
                    args: {
                        cardId: card.id,
                    },
                });
            },
        });
        this.game.addCancelButton();
    };
    TableauOpCommerceState.prototype.setCardsSelectable = function () {
        var _this = this;
        this.args.cards.forEach(function (card) {
            _this.game.setCardSelectable({
                id: card.id,
                callback: function () {
                    return _this.updateInterfaceConfirm({
                        card: card,
                    });
                },
                back: card.location.split("_")[2] === "0",
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
            text: _("${tkn_playerName} must select a Pirate to move"),
            args: {
                tkn_florin: tknFlorin(),
                tkn_playerName: "${you}",
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
            text: _("${tkn_playerName} must select a Sea Border to move ${tkn_mapToken} into"),
            args: {
                tkn_mapToken: tknMapToken(option.token.id),
                tkn_playerName: "${you}",
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
            text: destination.token !== null ? _("Move ${tkn_mapToken} into ${borderName} and Kill ${tkn_mapToken_2}?") : _("Move ${tkn_mapToken} into ${borderName}?"),
            args: {
                tkn_mapToken: tknMapToken(token.id),
                tkn_mapToken_2: destination.token !== null ? tknMapToken(destination.token.id) : '',
                borderName: _(destination.border.name),
            },
        });
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actTableauOpCorsair",
                    args: {
                        tokenId: token.id,
                        destinationId: destination.border.id,
                    },
                });
            },
        });
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
            text: _("${tkn_playerName} must select a ${tkn_mapToken} to move"),
            args: {
                tkn_mapToken: tknMapToken(Object.keys(this.args.tokens)[0]),
                tkn_playerName: "${you}",
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
            text: _("${tkn_playerName} must select a card to move ${tkn_mapToken} to"),
            args: {
                tkn_mapToken: tknMapToken(Object.keys(this.args.tokens)[0]),
                tkn_playerName: "${you}",
            },
        });
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
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actTableauOpInquisitor",
                    args: {
                        tokenId: token.id,
                        destinationId: destination.id,
                    },
                });
            },
        });
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
                callback: function () { return _this.updateInterfaceSelectDestination(option); },
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
            text: _("${tkn_playerName} must select a Token to Repress"),
            args: {
                tkn_florin: tknFlorin(),
                tkn_playerName: "${you}",
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
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actTableauOpRepress",
                    args: {
                        tokenId: token.id,
                    },
                });
            },
        });
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
            text: _("${tkn_playerName} must select a Token to Kill"),
            args: {
                tkn_florin: tknFlorin(),
                tkn_playerName: "${you}",
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
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actTableauOpSiege",
                    args: {
                        tokenId: token.id,
                    },
                });
            },
        });
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
        var _this = this;
        this.game.clearPossible();
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} may select a card to perform Ops"),
            args: {
                tkn_playerName: "${you}",
            },
        });
        this.setCardsSelectable();
        if (this.args.optional) {
            this.game.addSkipButton({
                callback: function () {
                    return _this.game.takeAction({
                        action: "actTableauOpsSelect",
                        args: {
                            cardId: null,
                            tableauOpId: null,
                        },
                    });
                },
            });
        }
        this.game.addUndoButtons(this.args);
    };
    TableauOpsSelectState.prototype.updateInterfaceConfirm = function (_a) {
        var _this = this;
        var cardId = _a.cardId, ops = _a.ops;
        this.game.clearPossible();
        this.game.setCardSelected({ id: cardId });
        this.game.clientUpdatePageTitle({
            text: _("${tkn_playerName} may choose an Op to perform"),
            args: {
                tkn_playerName: "${you}",
            },
        });
        ops.forEach(function (tableauOp, index) {
            _this.game.addPrimaryActionButton({
                id: "".concat(tableauOp.id, "_").concat(index, "_btn"),
                text: _(tableauOp.name),
                callback: function () {
                    return _this.game.takeAction({
                        action: "actTableauOpsSelect",
                        args: {
                            cardId: cardId,
                            tableauOpId: tableauOp.id,
                        },
                    });
                },
            });
        });
        this.game.addCancelButton();
    };
    TableauOpsSelectState.prototype.setCardsSelectable = function () {
        var _this = this;
        Object.keys(this.args.availableOps).forEach(function (id) {
            _this.game.setCardSelectable({
                id: id,
                callback: function () {
                    return _this.updateInterfaceConfirm({
                        cardId: id,
                        ops: _this.args.availableOps[id],
                    });
                },
            });
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
            text: _("${tkn_playerName} must select a Concession to Tax"),
            args: {
                tkn_playerName: "${you}",
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
            text: _("${tkn_playerName} must select the Empire to Tax"),
            args: {
                tkn_playerName: "${you}",
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
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actTableauOpTax",
                    args: {
                        tokenId: token.id,
                        empireId: empire.id,
                    },
                });
            },
        });
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
            text: _("Your ${tkn_mapToken} is taxed. ${tkn_playerName} must pay 1 ${tkn_florin} to China or Repress your ${tkn_mapToken}"),
            args: {
                tkn_playerName: "${you}",
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
            text: _("${tkn_playerName} must select an Empire to vote in"),
            args: {
                tkn_playerName: "${you}",
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
            text: cost > 0 ? _("Pay ${cost} ${tkn_florin} to vote in ${empireName}?") : _("Vote in ${empireName}?"),
            args: {
                empireName: _(empire.name),
                cost: cost,
                tkn_florin: tknFlorin(),
            },
        });
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actTableauOpVote",
                    args: {
                        empireId: empire.id,
                    },
                });
            },
        });
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
            text: _("${tkn_playerName} must select a City in ${empireName} to place a Levy"),
            args: {
                tkn_playerName: "${you}",
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
        var _b = this.args.possibleLevies[cityId].levy, religion = _b.religion, levyIcon = _b.levyIcon;
        this.game.clientUpdatePageTitle({
            text: _("Place ${tkn_mapToken} in ${cityName}?"),
            args: {
                tkn_mapToken: [religion, levyIcon].join('_'),
                cityName: _(this.args.possibleLevies[cityId].cityName)
            },
        });
        this.game.addConfirmButton({
            callback: function () {
                return _this.game.takeAction({
                    action: "actTradeFairLevy",
                    args: {
                        cityId: cityId,
                    },
                });
            },
        });
        this.game.addCancelButton();
    };
    return TradeFairLevyState;
}());
var tplCardTooltipContainer = function (_a) {
    var card = _a.card, content = _a.content;
    return "<div class=\"pr_card_tooltip\">\n  <div class=\"pr_card_tooltip_inner_container\">\n    ".concat(content, "\n  </div>\n  ").concat(card, "\n</div>");
};
var tplTableauCardTooltip = function (_a) {
    var card = _a.card;
    return tplCardTooltipContainer({
        card: "<div class=\"pr_card\" data-card-id=\"".concat(card.id.split('_')[0], "\"></div>"),
        content: "\n      <span class=\"pr_title\">".concat(_(card.name), "</span>\n      ").concat(card.flavorText.map(function (text) { return "<span class=\"pr_flavor_text\">".concat(_(text), "</span>"); }).join(''), "\n    ")
    });
};
var TooltipManager = (function () {
    function TooltipManager(game) {
        this.idRegex = /id="[a-z]*_[0-9]*_[0-9]*"/;
        this.game = game;
    }
    TooltipManager.prototype.addTextToolTip = function (_a) {
        var nodeId = _a.nodeId, text = _a.text;
        this.game.framework().addTooltip(nodeId, _(text), '', 500);
    };
    TooltipManager.prototype.removeTooltip = function (nodeId) {
        this.game.framework().removeTooltip(nodeId);
    };
    TooltipManager.prototype.setupTooltips = function () {
    };
    TooltipManager.prototype.addCardTooltip = function (_a) {
        var nodeId = _a.nodeId, card = _a.card;
        var html = tplTableauCardTooltip({ card: card });
        this.game.framework().addTooltipHtml(nodeId, html, 500);
    };
    return TooltipManager;
}());
define([
    'dojo',
    'dojo/_base/declare',
    'dojo/fx',
    'dojox/fx/ext-dojo/complex',
    'ebg/core/gamegui',
    'ebg/counter',
], function (dojo, declare) {
    return declare('bgagame.paxrenaissance', ebg.core.gamegui, new PaxRenaissance());
});
